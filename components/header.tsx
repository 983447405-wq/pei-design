import Link from "next/link";
import { dictionary } from "@/content/dictionary";
import { localizedPath, type Locale } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";

const navItems = [
  ["projects", "/projects"],
  ["blog", "/blog"],
  ["resources", "/resources"],
  ["about", "/about"],
  ["contact", "/contact"]
] as const;

export function Header({ locale }: { locale: Locale }) {
  const dict = dictionary[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/78 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link className="focus-ring rounded-lg text-sm font-semibold text-text" href={localizedPath(locale)}>
          Product Designer
        </Link>

        <nav className="hidden items-center gap-1 rounded-lg bg-panel/55 p-1 md:flex" aria-label="Main navigation">
          {navItems.map(([key, href]) => (
            <Link
              className="focus-ring rounded-md px-3 py-2 text-sm text-muted transition hover:bg-white/[0.055] hover:text-text"
              href={localizedPath(locale, href)}
              key={key}
            >
              {dict.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle locale={locale} />
          <Link
            className="focus-ring rounded-md bg-text px-4 py-2 text-sm font-semibold text-ink transition hover:bg-blue"
            href={localizedPath(locale, "/contact")}
          >
            {dict.common.contactMe}
          </Link>
        </div>
      </div>
    </header>
  );
}
