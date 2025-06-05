"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ResearchInterface } from "@/components/research-interface";
// import { ArticleGenerator } from "@/components/article-generator";
// import { TitleGenerator } from "@/components/title-generator";
// import { TextEditor } from "@/components/text-editor";
import { Search, FileText, Lightbulb, Edit } from "lucide-react";
import { ResearchInterface } from "@/components/research-interface";

export default function JournalismPlatform() {
  const [activeTab, setActiveTab] = useState("research");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Plataforma de Investigación Periodística
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Herramienta integral para investigación, generación de contenido y
            edición de artículos periodísticos
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="research" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Investigación
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generar Artículo
            </TabsTrigger>
            <TabsTrigger value="titles" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Títulos
            </TabsTrigger>
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Editor
            </TabsTrigger>
          </TabsList>

          {/* Research Tab */}
          <TabsContent value="research">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Investigación con API de Exa
                </CardTitle>
                <CardDescription>
                  Inicia una consulta de investigación y categoriza los
                  resultados automáticamente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResearchInterface />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Article Generation Tab */}
          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generación de Artículos
                </CardTitle>
                <CardDescription>
                  Genera artículos a partir de URLs o imágenes usando IA
                </CardDescription>
              </CardHeader>
              <CardContent>{/* <ArticleGenerator /> */}</CardContent>
            </Card>
          </TabsContent>

          {/* Title Generation Tab */}
          <TabsContent value="titles">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Generación de Títulos
                </CardTitle>
                <CardDescription>
                  Genera títulos dinámicos basados en el contenido del artículo
                </CardDescription>
              </CardHeader>
              <CardContent>{/* <TitleGenerator /> */}</CardContent>
            </Card>
          </TabsContent>

          {/* Editor Tab */}
          <TabsContent value="editor">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  Editor de Texto
                </CardTitle>
                <CardDescription>
                  Editor integrado para desarrollar y refinar artículos
                </CardDescription>
              </CardHeader>
              <CardContent>{/* <TextEditor /> */}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
