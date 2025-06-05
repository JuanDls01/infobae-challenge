"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, Download, Upload, Type } from "lucide-react";

export function TextEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
    setCharacterCount(content.length);
  }, [content]);

  const handleSave = () => {
    const article = { title, content, timestamp: new Date().toISOString() };
    localStorage.setItem("current-article", JSON.stringify(article));
    alert("Artículo guardado localmente");
  };

  const handleLoad = () => {
    const saved = localStorage.getItem("current-article");
    if (saved) {
      const article = JSON.parse(saved);
      setTitle(article.title || "");
      setContent(article.content || "");
    }
  };

  const handleExport = () => {
    const article = `# ${title}\n\n${content}`;
    const blob = new Blob([article], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "articulo"}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportTitle = () => {
    // Esta función se conectaría con el generador de títulos
    const sampleTitle = "Título de ejemplo desde el generador";
    setTitle(sampleTitle);
  };

  return (
    <div className="space-y-6">
      {/* Editor Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleLoad}>
            <Upload className="w-4 h-4 mr-2" />
            Cargar
          </Button>
          <Button size="sm" variant="outline" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>

        <div className="text-sm text-gray-600">
          {wordCount} palabras • {characterCount} caracteres
        </div>
      </div>

      {/* Title Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Título del Artículo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Ingresa el título de tu artículo..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium"
            />
            <Button size="sm" variant="outline" onClick={handleImportTitle}>
              <Type className="w-4 h-4 mr-2" />
              Importar Título
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Contenido del Artículo</CardTitle>
          <CardDescription>
            Escribe y edita el contenido de tu artículo periodístico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Comienza a escribir tu artículo aquí..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[500px] text-base leading-relaxed"
          />
        </CardContent>
      </Card>

      {/* Writing Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Estadísticas del Texto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {wordCount}
              </div>
              <div className="text-sm text-gray-600">Palabras</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {characterCount}
              </div>
              <div className="text-sm text-gray-600">Caracteres</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {Math.ceil(wordCount / 200)}
              </div>
              <div className="text-sm text-gray-600">Min. lectura</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {
                  content.split("\n\n").filter((p) => p.trim().length > 0)
                    .length
                }
              </div>
              <div className="text-sm text-gray-600">Párrafos</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      {(title || content) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Vista Previa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
              {content && (
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {content}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
