"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Loader2, Lightbulb, Copy, Check } from "lucide-react";

interface GeneratedTitle {
  title: string;
  style: string;
  tone: string;
}

export function TitleGenerator() {
  const [articleText, setArticleText] = useState("");
  const [titleCount, setTitleCount] = useState([3]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTitles, setGeneratedTitles] = useState<GeneratedTitle[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [copiedTitle, setCopiedTitle] = useState<string | null>(null);

  const handleGenerateTitles = async () => {
    if (!articleText.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-titles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleText,
          count: titleCount[0],
        }),
      });

      const data = await response.json();
      setGeneratedTitles(data.titles || []);
    } catch (error) {
      console.error("Error generando títulos:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyTitle = async (title: string) => {
    try {
      await navigator.clipboard.writeText(title);
      setCopiedTitle(title);
      setTimeout(() => setCopiedTitle(null), 2000);
    } catch (error) {
      console.error("Error copiando título:", error);
    }
  };

  const handleSelectTitle = (title: string) => {
    setSelectedTitle(title);
  };

  return (
    <div className="space-y-6">
      {/* Article Text Input */}
      <div className="space-y-2">
        <Label htmlFor="article-text">Texto del Artículo</Label>
        <Textarea
          id="article-text"
          placeholder="Pega aquí el texto de tu artículo para generar títulos relevantes..."
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
          className="min-h-[200px]"
        />
      </div>

      {/* Title Count Slider */}
      <div className="space-y-3">
        <Label>Número de Títulos a Generar: {titleCount[0]}</Label>
        <Slider
          value={titleCount}
          onValueChange={setTitleCount}
          max={10}
          min={1}
          step={1}
          className="w-full"
        />
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerateTitles}
        disabled={isGenerating || !articleText.trim()}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Generando Títulos...
          </>
        ) : (
          <>
            <Lightbulb className="w-4 h-4 mr-2" />
            Generar Títulos
          </>
        )}
      </Button>

      {/* Generated Titles */}
      {generatedTitles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Títulos Generados</h3>

          <div className="grid gap-3">
            {generatedTitles.map((titleObj, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all ${
                  selectedTitle === titleObj.title
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:shadow-md"
                }`}
                onClick={() => handleSelectTitle(titleObj.title)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {titleObj.title}
                      </h4>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {titleObj.style}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {titleObj.tone}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyTitle(titleObj.title);
                      }}
                    >
                      {copiedTitle === titleObj.title ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Title Display */}
          {selectedTitle && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-sm">Título Seleccionado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-blue-900">{selectedTitle}</p>
                <Button
                  size="sm"
                  className="mt-3"
                  onClick={() => handleCopyTitle(selectedTitle)}
                >
                  Usar en Editor
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
