"use client";

import type React from "react";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Loader2,
  Link,
  ImageIcon,
  RefreshCw,
  StopCircle,
  LoaderIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function ArticleGenerator({ url }: { url: string }) {
  // const [url, setUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  // const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState("");

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
      setGeneratedArticle(mkdown);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  // const { messages, input, handleInputChange, handleSubmit, isLoading } =
  //   useChat({
  //     api: "/api/generate-article",
  //     onFinish: (message) => {
  //       setGeneratedArticle(message.content);
  //     },
  //   });

  // const handleGenerateFromUrl = async () => {
  //   if (!url.trim()) return;

  //   setIsGenerating(true);
  //   try {
  //     const response = await fetch("/api/generate-article", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         type: "url",
  //         content: url,
  //         prompt:
  //           "Genera un artículo periodístico basado en el contenido de esta URL",
  //       }),
  //     });

  //     if (response.body) {
  //       const reader = response.body.getReader();
  //       const decoder = new TextDecoder();
  //       let article = "";

  //       while (true) {
  //         const { done, value } = await reader.read();
  //         if (done) break;

  //         const chunk = decoder.decode(value);
  //         article += chunk;
  //         setGeneratedArticle(article);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error generando artículo:", error);
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setImageFile(file);
  //   }
  // };

  // const handleReinterpret = async () => {
  //   if (!generatedArticle) return;

  //   setIsGenerating(true);
  //   try {
  //     const response = await fetch("/api/generate-article", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         type: "reinterpret",
  //         content: generatedArticle,
  //         prompt: "Reinterpreta y mejora este artículo periodístico",
  //       }),
  //     });

  //     if (response.body) {
  //       const reader = response.body.getReader();
  //       const decoder = new TextDecoder();
  //       let article = "";

  //       while (true) {
  //         const { done, value } = await reader.read();
  //         if (done) break;

  //         const chunk = decoder.decode(value);
  //         article += chunk;
  //         setGeneratedArticle(article);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error reinterpretando artículo:", error);
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  console.log(messages);
  return (
    <div className="space-y-6">
      {/* Streaming Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Chat con IA</CardTitle>
          <CardDescription>
            Interactúa con la IA para refinar el artículo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-100 ml-8"
                    : "bg-gray-100 mr-8"
                }`}
              >
                <div className="text-sm font-medium mb-1">
                  {message.role === "user" ? "Tú" : "IA"}
                </div>
                <div className="text-sm whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            ))}
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

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/articulo"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Enviar"
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
      {/* Generated Article Display */}
      {generatedArticle && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Artículo Generado</CardTitle>
              {/* <Button
                variant="outline"
                size="sm"
                onClick={handleReinterpret}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Reinterpretar
              </Button> */}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <Textarea
                value={generatedArticle}
                onChange={(e) => setGeneratedArticle(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
                placeholder="El artículo generado aparecerá aquí..."
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
