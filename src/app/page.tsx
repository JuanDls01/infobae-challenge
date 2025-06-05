// import { searchWithExa } from "@/actions/search";
// import { SearchBox } from "@/components/search-box";
// import { SearchResultCard } from "@/components/search-result-card";

// interface HomeProps {
//   searchParams: Promise<{ [key: string]: string | undefined }>;
// }

// export default async function Home({ searchParams }: HomeProps) {
//   const { q: query = "" } = await searchParams;

//   const searchResult = query ? await searchWithExa(query) : [];
//   const relevantResults = searchResult?.filter(
//     (res) => res?.score && res?.score >= 0.3
//   );
//   const irrelevantResults = searchResult?.filter(
//     (res) => !res?.score || res?.score < 0.3
//   );
//   console.log(!!relevantResults);

//   return (
//     <div className="items-center justify-center min-h-screen p-8 pb-20 gap-16">
//       <main className="flex flex-col gap-[32px] items-center">
//         <h1 className="text-3xl font-bold py-4">Search Powered By AI 🧠</h1>
//         <SearchBox />
//         {relevantResults?.length > 0 && (
//           <div>
//             <h3 className="text-2xl font-bold py-6">Relevant Results</h3>
//             <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
//               {relevantResults?.map((res) => (
//                 <li key={res.id}>
//                   <SearchResultCard
//                     url={res.url}
//                     title={res.title}
//                     text={res.text}
//                     icon={res.favicon}
//                     author={res.author}
//                     publishedDate={res.publishedDate}
//                     isRelevant
//                   />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {relevantResults?.length > 0 && (
//           <div>
//             <h3 className="text-2xl font-bold py-6">Irrelevant Results</h3>
//             <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {irrelevantResults.map((res) => (
//                 <li key={res.id}>
//                   <SearchResultCard
//                     url={res.url}
//                     title={res.title}
//                     text={res.text}
//                     icon={res.favicon}
//                     author={res.author}
//                     publishedDate={res.publishedDate}
//                   />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {/* </div> */}
//       </main>
//     </div>
//   );
// }
