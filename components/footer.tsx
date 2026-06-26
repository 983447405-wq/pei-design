import Link from "next/link";
import { dictionary } from "@/content/dictionary";
import { localizedPath, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const dict = dictionary[locale];

  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col gap-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© 2026 AI Product Designer Portfolio</p>
        <div className="flex flex-wrap gap-4">
          <Link href={localizedPath(locale, "/projects")} className="focus-ring rounded-md transition hover:text-text">
            {dict.nav.projects}
          </Link>
          <Link href={localizedPath(locale, "/about")} className="focus-ring rounded-md transition hover:text-text">
            {dict.nav.about}
          </Link>
          <Link href={localizedPath(locale, "/blog")} className="focus-ring rounded-md transition hover:text-text">
            {dict.nav.blog}
          </Link>
          <Link href={localizedPath(locale, "/resources")} className="focus-ring rounded-md transition hover:text-text">
            {dict.nav.resources}
          </Link>
          <Link href={localizedPath(locale, "/contact")} className="focus-ring rounded-md transition hover:text-text">
            {dict.nav.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
