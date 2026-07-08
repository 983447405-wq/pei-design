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

function LogoMark({ className = "h-6 w-6 shrink-0" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" shapeRendering="geometricPrecision" viewBox="0 0 40 40">
      <path
        d="M20 0C20 11.0457 28.9543 20 40 20C28.9543 20 20 28.9543 20 40C20 28.9543 11.0457 20 0 20C11.0457 20 20 11.0457 20 0Z"
        fill="currentColor"
      />
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
