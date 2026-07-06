"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateLocale, localeName, switchLocalePath, type Locale } from "@/lib/i18n";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const nextLocale = alternateLocale(locale);

  return (
    <Link
      className="focus-ring rounded-full border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
      href={switchLocalePath(pathname, nextLocale)}
      aria-label={`Switch language to ${localeName(nextLocale)}`}
    >
      {nextLocale.toUpperCase()}
    </Link>
  );
}
