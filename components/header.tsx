import Link from "next/link";
import { dictionary } from "@/content/dictionary";
import { localizedPath, type Locale } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";

const navItems = [
  [{ zh: "视频", en: "Video" }, "/#motion-showcase"],
  [{ zh: "项目", en: "Projects" }, "/projects"],
  [{ zh: "影响力", en: "Impact" }, "/#impact"],
  [{ zh: "文章", en: "Writing" }, "/blog"],
  [{ zh: "联系", en: "Contact" }, "/contact"]
] as const;

function LogoMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 256 256">
      <path d="M0 128c70.692 0 128 57.308 128 128H64c0-35.346-28.654-64-64-64Zm256 64c-35.346 0-64 28.654-64 64h-64c0-70.692 57.308-128 128-128ZM128 0C128 70.692 70.692 128 0 128V64c35.346 0 64-28.654 64-64Zm64 0c0 35.346 28.654 64 64 64v64c-70.692 0-128-57.308-128-128Z" />
    </svg>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const dict = dictionary[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link
          className="focus-ring inline-flex items-center gap-3 rounded-lg text-sm font-semibold text-white"
          href={localizedPath(locale)}
        >
          <LogoMark />
          <span>Pei Jinxian</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <Link
              className="focus-ring rounded-md text-sm font-medium text-white/70 transition hover:text-white"
              href={localizedPath(locale, href)}
              key={href}
            >
              {label[locale]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle locale={locale} />
          <Link
            className="focus-ring rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
            href={localizedPath(locale, "/contact")}
          >
            {dict.common.contactMe}
          </Link>
        </div>
      </div>
    </header>
  );
}
