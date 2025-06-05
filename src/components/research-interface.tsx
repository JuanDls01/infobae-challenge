"use client";

import { useState, useTransition } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Search, ExternalLink, Plus } from "lucide-react";
import { searchWithExa } from "@/actions/search";
import Link from "next/link";
// import type { ResearchResult } from "@/lib/types";

export function ResearchInterface() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any>([]);
  const [isPending, startTransition] = useTransition();

  //   const router = useRouter();
  //   const searchParams = useSearchParams();

  const submitAction = async () => {
    startTransition(async () => {
      console.log({ search });
      if (!search) return;
      try {
        const searchResult = await searchWithExa(search);
        setResults(searchResult || []);
      } catch (err) {
        console.log("Error: ", err);
      }

      //   router.push(`/?q=${encodeURIComponent(search)}`);
    });
  };

  const handleExpandResult = async (result: ResearchResult) => {
    // Aquí se podría integrar con el generador de artículos
    console.log("Expandiendo resultado:", result);
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="space-y-2">
        <Label htmlFor="topic">Tema de Investigación</Label>
        <form action={submitAction} className="flex gap-3 flex-col">
          <div className="flex gap-2">
            <Input
              id="topic"
              placeholder="Ej: Inteligencia artificial en el periodismo"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={isPending}
            />
            <Button
              //   onClick={handleResearch}
              //   disabled={isLoading || !topic.trim()}
              type="submit"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Investigar
            </Button>
          </div>
        </form>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Resultados de Investigación</h3>

          {/* Worth Expanding */}
          <div>
            <h4 className="text-md font-medium text-green-700 mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Vale la pena expandir (
              {results.filter((r) => r?.score >= 0.25).length})
            </h4>
            <div className="grid gap-3">
              {results
                .filter((result) => result?.score >= 0.25)
                .map((result, index) => (
                  <Card key={index} className="border-green-200">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Image
                          src={result.favicon}
                          alt="Favicon"
                          width={20}
                          height={20}
                          className="w-7 h-7"
                        />
                        <CardTitle>{result.title}</CardTitle>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          Expandir
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm mb-3 line-clamp-3">
                        {result.text}
                      </CardDescription>
                      <div className="flex gap-2">
                        <Link
                          href={`/article?source=${result.url}`}
                          //   size="sm"
                          //   onClick={() => handleExpandResult(result)}
                        >
                          <Button className="bg-green-600 hover:bg-green-700">
                            Crear Artículo
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Ver Fuente
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          <Separator />

          {/* Not Worth Expanding */}
          <div>
            <h4 className="text-md font-medium text-gray-600 mb-3">
              No vale la pena expandir (
              {results.filter((r) => !r.score || r.score < 0.25).length})
            </h4>
            <div className="grid gap-2">
              {results
                .filter((result) => !result.score || result.score < 0.25)
                .map((result, index) => (
                  <Card key={index} className="border-gray-200 bg-gray-50">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-gray-700">
                            {result.title}
                          </h5>
                          <p className="text-xs text-gray-600 mt-1">
                            {result.summary}
                          </p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          Descartar
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
