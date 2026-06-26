export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "zh" ? "en" : "zh";
}

export function localeName(locale: Locale) {
  return locale === "zh" ? "中文" : "English";
}

export function switchLocalePath(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/");
  if (isLocale(parts[1] ?? "")) {
    parts[1] = nextLocale;
    return parts.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}

export function localizedPath(locale: Locale, path = "") {
  if (!path || path === "/") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}
