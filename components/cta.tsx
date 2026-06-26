import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { dictionary } from "@/content/dictionary";
import { localizedPath, type Locale } from "@/lib/i18n";

export function ContactCTA({ locale }: { locale: Locale }) {
  const dict = dictionary[locale];

  return (
    <section className="shell pb-20">
      <div className="glass gradient-border motion-card overflow-hidden rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">Contact</p>
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-text md:text-5xl">{dict.home.ctaTitle}</h2>
          <p className="mt-5 text-lg leading-8 text-muted">{dict.home.ctaBody}</p>
          <Link
            className="focus-ring motion-sheen mt-8 inline-flex items-center gap-2 rounded-md bg-text px-5 py-3 text-sm font-semibold text-ink transition hover:bg-blue"
            href={localizedPath(locale, "/contact")}
          >
            {dict.common.contactMe}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
