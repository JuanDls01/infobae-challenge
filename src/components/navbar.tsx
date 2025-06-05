import { FileText, Lightbulb, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <header className="w-full border-b shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-12 py-3 flex items-center justify-between">
        <a
          href="https://www.infobae.com/"
          target="_blank"
          className="text-xl font-bold text-primary"
        >
          Infobae Challenge
        </a>
        <nav>
          <ul className="flex gap-4 text-sm font-medium text-gray-700">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                <Button variant={"ghost"}>
                  <Search />
                  Search
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href="/article"
                className="hover:text-primary transition-colors"
              >
                <Button variant={"ghost"}>
                  <FileText />
                  Article
                </Button>
              </Link>
            </li>
            <li>
              <Link
                href="/titles"
                // className="hover:text-primary transition-colors"
              >
                <Button variant={"ghost"}>
                  <Lightbulb />
                  Titles
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
