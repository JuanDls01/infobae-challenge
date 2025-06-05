import { errorHandler } from "@/utils/error-handler";
import { openai } from "@ai-sdk/openai";
import { generateText, streamText, tool } from "ai";
import { Exa } from "exa-js";
import z from "zod";

const exa = new Exa(process.env.EXA_API_KEY!);

export async function generateArticleFromUrl({ url }: { url: string }) {
  // const url = formData.get("url") as string;
  console.log({ url });

  const result = generateText({
    model: openai("gpt-4.1-nano"),
    tools: {
      exaTool: tool({
        description:
          "Get the full page contents, summaries, and metadata for a provided url",
        parameters: z.object({
          url: z.string().describe("The url to get the content for"),
        }),
        execute: async ({ url }) => {
          const { results } = await exa.getContents([url], { text: true });

          return results;
        },
      }),
    },
    toolChoice: { type: "tool", toolName: "exaTool" },
    prompt: `Usá la tool exaTool para obtener el contenido de la URL "${url}" y luego escribí un artículo periodístico informativo basado en eso.`,
  });

  const parsedResult = result.toDataStreamResponse({
    getErrorMessage: errorHandler,
  });
  console.log({ parsedResult, result });
  return parsedResult;
}
