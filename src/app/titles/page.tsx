import { TitleGenerator } from "@/components/title-generator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function TitlesPage() {
  return (
    <main className="grid grid-cols-1 px-12 py-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Lightbulb className="w-6 h-6" />
            Generación de Títulos Dinámicos
          </CardTitle>
          <CardDescription className="text-base">
            Genera títulos atractivos y dinámicos basados en el contenido de tu
            artículo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TitleGenerator />
        </CardContent>
      </Card>
    </main>
  );
}
