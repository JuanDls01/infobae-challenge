"use client";

import { useRef, useState } from "react";

import { useChat } from "@ai-sdk/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderIcon, StopCircle } from "lucide-react";
import { MarkdownEditor } from "./ui/editor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { generateTitles } from "@/actions/generate-title";

export function Chat({ url }: { url: string }) {
  const [article, setArticle] = useState("Esperando para escribir algo...");
  const [titles, setTitles] = useState("");
  const ref = useRef<MDXEditorMethods>(null);
  const {
    error,
    input,
    status,
    handleInputChange,
    handleSubmit,
    messages,
    reload,
    stop,
  } = useChat({
    initialInput: url, // `Con la siguiente url: ${url} escribime un parrafo de articulo para Infobae en formato markdown`,
    maxSteps: 2,
    onFinish(message, { usage, finishReason }) {
      console.log("Usage", usage);
      console.log("FinishReason", finishReason);
      const mkdown = message.content;
      // .findLast((m) => m.role === "assistant")?.content ?? "";
      setArticle(mkdown);
      ref.current?.insertMarkdown(mkdown);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";
  return (
    <div className="flex gap-4">
      <Card className="w-full max-w-2xl mx-auto my-12 flex flex-col border shadow-md">
        <CardHeader>
          <CardTitle>Modifica tu articulo</CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownEditor className="h-full" markdown={article} ref={ref} />
        </CardContent>
      </Card>
      <Button
        onClick={async () => {
          const { titles } = await generateTitles({ qty: 3, article });

          setTitles(JSON.stringify(titles, null, 2));
        }}
      >
        Generar titulos
      </Button>
      {titles}
      <Card className="w-full max-w-2xl mx-auto my-12 flex flex-col border shadow-md">
        <CardContent className="p-6">
          <ScrollArea className="h-[500px] pr-4">
            <div className="flex flex-col gap-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-md px-4 py-2 max-w-[80%] ${
                    m.role === "user"
                      ? "ml-auto bg-indigo-100 text-right"
                      : "mr-auto bg-gray-100"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                </div>
              ))}
            </div>

            {isLoading && (
              <div className="text-center mt-4 text-sm text-muted-foreground">
                {status === "submitted" ? "Cargando respuesta..." : null}
                <Button
                  onClick={stop}
                  size="sm"
                  variant="outline"
                  className="mt-2"
                >
                  <StopCircle className="mr-2 h-4 w-4" />
                  Detener
                </Button>
              </div>
            )}

            {error && (
              <div className="text-center mt-4 text-red-500 text-sm">
                Ocurrió un error.
                <Button
                  onClick={() => reload()}
                  size="sm"
                  variant="outline"
                  className="mt-2"
                >
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  Reintentar
                </Button>
              </div>
            )}
          </ScrollArea>
          <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Escribí algo..."
              disabled={status !== "ready"}
            />
            <Button type="submit" disabled={status !== "ready"}>
              Generar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
