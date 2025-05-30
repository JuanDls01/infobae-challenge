import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import Image from "next/image";

interface SearchResultCardProps {
  icon?: string;
  url: string;
  title: string | null;
  text: string;
  author?: string;
  publishedDate?: string;
}

export const SearchResultCard = ({
  icon,
  url,
  title,
  text,
  author,
  publishedDate,
}: SearchResultCardProps) => {
  return (
    <Card className="w-60 h-60 justify-between">
      <CardHeader className="flex items-center gap-3 h-10">
        {icon && (
          <Image
            src={icon}
            alt="Favicon"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        )}
        {title ? (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:underline line-clamp-2"
          >
            {title}
          </Link>
        ) : (
          <span className="italic text-gray-500">Sin título</span>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-sm text-gray-600 line-clamp-3">{text}</p>
        <div className="flex justify-between text-xs text-gray-500 gap-2">
          <span className="line-clamp-1">{author || "Autor desconocido"}</span>
          <span>
            {publishedDate
              ? new Date(publishedDate).toLocaleDateString()
              : "Sin fecha"}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          Crear articulo <Icons.arrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
