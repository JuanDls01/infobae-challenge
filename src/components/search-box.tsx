"use client";
import { useState, useTransition } from "react";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useRouter, useSearchParams } from "next/navigation";
import { Icons } from "./ui/icons";

const questions = [
  {
    id: "1",
    label: "Breakthrough AI startups",
    query: "startup that has developed a breakthrough AI model",
  },
  {
    id: "2",
    label: "Open-source quantum computing libraries on GitHub",
    query:
      "GitHub repository for a popular open-source quantum computing libra",
  },
  // {
  //     id: "3",
  //     question: "Que son los Large Langauge Models",
  // },
];

export const SearchBox = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? "Blog post about AI"
  );

  const [isPending, startTransition] = useTransition();

  const submitAction = async () => {
    startTransition(async () => {
      console.log({ search });
      if (!search) return;

      router.push(`/?q=${encodeURIComponent(search)}`);
    });
  };

  return (
    <Card className="w-96">
      <CardContent>
        <form action={submitAction} className="flex gap-3 flex-col">
          <Textarea
            placeholder="Ingresa algun tema"
            className="max-w"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isPending}
          />
          <div className="flex justify-between w-full">
            <Select onValueChange={(value) => setSearch(value)}>
              <SelectTrigger className="w-52 hover:cursor-pointer">
                <SelectValue placeholder="Prueba con un ejemplo" />
              </SelectTrigger>
              <SelectContent className="overflow-ellipsis">
                {questions.map((question) => (
                  <SelectItem key={question.id} value={question.query}>
                    {question.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="hover:cursor-pointer">
              <Icons.sparkles /> {isPending ? "Cargando..." : "Run"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
