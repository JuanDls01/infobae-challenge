import { generateArticleFromUrl } from "@/actions/generate-article";
import { ArticleGenerator } from "@/components/article-generator";
import { Chat } from "@/components/chat";
import { ArticleComposer } from "@/components/chat-v2";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";

interface ArticlePageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function ArticlePage(props: ArticlePageProps) {
  const params = await props.searchParams;
  console.log({ params });
  //   const article = await generateArticleFromUrl({ url: params.source! });
  return (
    <main className="grid grid-cols-1 px-12 py-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Generación de Artículos
          </CardTitle>
          <CardDescription>Genera artículos a partir de URLs</CardDescription>
        </CardHeader>
        <CardContent>
          {" "}
          <ArticleGenerator url={params.source!} />
        </CardContent>
      </Card>
      {/* <div>
        <h1 className="text-3xl font-bold">Generación de Articulos con IA</h1>
        <p>A partir de una URL puede generar un artículo periodistico</p>
      </div>
      <ArticleGenerator />
      <ArticleComposer url={params.source!} />
      {JSON.stringify(article)}
      <Chat url={params.source!} /> */}
    </main>
  );
}
