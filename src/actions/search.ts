import Exa from "exa-js";
// import data from "./data.json";
import mockedData from "../../mock-exa-response.json";

export async function searchWithExa(query: string) {
  const exa = new Exa(process.env.EXA_API_KEY);
  try {
    // const { results } = await exa.searchAndContents(query, { text: true });
    console.log({ mockedData });
    const { data } = mockedData;
    return data.results;
  } catch (err) {
    console.error(`Error consultando Exa: ${err}`);
  }
}
