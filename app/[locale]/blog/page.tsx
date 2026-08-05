import { redirect } from "next/navigation";
import { isLocale, localizedPath } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";

  redirect(localizedPath(locale, "/#insights"));
}
