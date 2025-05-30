import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="w-full border-b shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
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
                Search
              </Link>
            </li>
            <li>
              <Link
                href="/article"
                className="hover:text-primary transition-colors"
              >
                Article
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
