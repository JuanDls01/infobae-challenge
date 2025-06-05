"use client";

import { useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderIcon, StopCircle } from "lucide-react";
import { MarkdownEditor } from "./ui/editor";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { generateTitles } from "@/actions/generate-title";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";

export function ArticleComposer({ url }: { url: string }) {
  const [article, setArticle] = useState("Esperando para escribir algo...");
  const [titles, setTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");
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
    initialInput: url,
    maxSteps: 2,
    onFinish(message) {
      const mkdown = message.content;
      setArticle(mkdown);
      ref.current?.insertMarkdown(mkdown);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-7xl mx-auto">
      <Card className="flex-1 border shadow-md">
        <CardHeader>
          <CardTitle>Editor de artículo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedTitle && (
            <div className="text-lg font-semibold text-indigo-700">
              {selectedTitle}
            </div>
          )}
          <MarkdownEditor className="h-[500px]" markdown={article} ref={ref} />
        </CardContent>
      </Card>

      <div className="w-full md:w-[320px] space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Generar títulos</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={async () => {
                const { titles } = await generateTitles({
                  qty: 5,
                  article,
                });
                setTitles(titles);
              }}
              className="mb-4"
            >
              Generar títulos sugeridos
            </Button>

            <div className="flex flex-col gap-2">
              {titles.map((title, i) => (
                <Button
                  key={i}
                  variant={title === selectedTitle ? "default" : "outline"}
                  onClick={() => setSelectedTitle(title)}
                >
                  {title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-full">
              Ver conversación
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <CardContent className="p-6">
              <ScrollArea className="h-[400px] pr-4">
                <div className="flex flex-col gap-4">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`rounded-md px-4 py-2 max-w-[80%] text-sm whitespace-pre-wrap ${
                        m.role === "user"
                          ? "ml-auto bg-indigo-100 text-right"
                          : "mr-auto bg-gray-100"
                      }`}
                    >
                      {m.content}
                    </div>
                  ))}
                </div>

                {isLoading && (
                  <div className="text-center mt-4 text-muted-foreground text-sm">
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
                  placeholder="Dale una nueva instrucción al modelo..."
                  disabled={status !== "ready"}
                />
                <Button type="submit" disabled={status !== "ready"}>
                  Enviar
                </Button>
              </form>
            </CardContent>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
