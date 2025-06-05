"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function generateTitles({
  qty,
  article,
}: {
  qty: number | string;
  article: string;
}) {
  const { object: titles } = await generateObject({
    model: openai("gpt-4.1-nano"),
    system: `Genera ${qty} cantidad de titulos para el articulo provisto.`,
    prompt: article,
    // output: "array",
    schema: z.array(z.string()),
  });

  return { titles };
}
