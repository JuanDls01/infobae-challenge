import { openai } from "@ai-sdk/openai";
import { streamText, tool, ToolInvocation } from "ai";

import { errorHandler } from "@/utils/error-handler";
import z from "zod";
import Exa from "exa-js";

// Allow streaming responses up to 30 seconds
const exa = new Exa(process.env.EXA_API_KEY!);

interface Message {
  role: "user" | "assistant";
  content: string;
  toolInvocations?: ToolInvocation[];
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();
  console.log(process.env.OPENAI_API_KEY, messages);

  const result = streamText({
    model: openai("gpt-4.1-nano"),
    system:
      "Generá el primer parrafo de un artículo periodístico informativo para infobae, a partir del contenido de una pagina, utilizando formato Markdown.",
    messages,
    tools: {
      exaTool: tool({
        description:
          "Obtene el contenido, resumen y metada de una pagina a partir de us url.",
        parameters: z.object({
          url: z
            .string()
            .describe("Url a partir de la cual obtener el contenido"),
        }),
        execute: async ({ url }) => {
          const { results } = await exa.getContents([url], { text: true });

          return results;
        },
      }),
      // client-side tool that starts user interaction:
      askForGenerateTitle: {
        description:
          "Pregunta al usuario si desea generar titulos para el Ask the user for confirmation.",
        parameters: z.object({
          message: z
            .string()
            .describe(
              "El mensaje para preguntar el numero de titulos a generar."
            ),
        }),
      },
    },
  });

  const parsedResult = result.toDataStreamResponse({
    getErrorMessage: errorHandler,
  });
  return parsedResult;
}
