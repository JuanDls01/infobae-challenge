"use server";

import Exa from "exa-js";
import mockedData from "../../mock-exa-response.json";

export async function searchWithExa(query: string) {
  const exa = new Exa(process.env.EXA_API_KEY);
  try {
    const { results } = await exa.searchAndContents(query, { text: true });
    // const {
    //   data: { results },
    // } = mockedData;
    console.log({ results });
    return results;
  } catch (err) {
    console.error(`Error consultando Exa: ${err}`);
    return [];
  }
}
