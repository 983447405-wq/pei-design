"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateLocale, localeName, switchLocalePath, type Locale } from "@/lib/i18n";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const nextLocale = alternateLocale(locale);

  return (
    <Link
      className="focus-ring rounded-md border border-line bg-panel px-3 py-2 text-xs font-medium text-muted transition hover:border-lineStrong hover:text-text"
      href={switchLocalePath(pathname, nextLocale)}
      aria-label={`Switch language to ${localeName(nextLocale)}`}
    >
      {nextLocale.toUpperCase()}
    </Link>
  );
}
