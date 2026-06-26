import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { dictionary } from "@/content/dictionary";
import { resources } from "@/content/resources";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";

  return {
    title: dictionary[locale].resources.title,
    description: dictionary[locale].resources.subtitle
  };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "zh") as Locale;
  const dict = dictionary[locale];

  return (
    <main>
      <Section eyebrow="Resources" title={dict.resources.title} description={dict.resources.subtitle}>
        <div className="mb-8 flex flex-wrap gap-2">
          {["Template", "Checklist", "Prompt", "Workflow", "AI Design"].map((tag) => (
            <span className="rounded-md border border-line bg-panel px-3 py-2 font-mono text-xs text-muted" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {resources.map((resource) => (
            <Link className="glass motion-card group rounded-2xl p-6" href={localizedPath(locale, `/resources/${resource.slug}`)} key={resource.slug}>
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-md border border-line bg-panel2 px-3 py-1.5 font-mono text-xs uppercase text-muted">{resource.type}</span>
                <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
              </div>
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-text">{resource.title[locale]}</h2>
              <p className="mt-4 min-h-24 leading-7 text-muted">{resource.description[locale]}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span className="rounded-md border border-line bg-panel2 px-2.5 py-1 font-mono text-[11px] text-muted" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}
