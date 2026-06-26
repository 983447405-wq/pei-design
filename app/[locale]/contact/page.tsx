import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";
import { dictionary } from "@/content/dictionary";
import { isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  return {
    title: dictionary[locale].nav.contact,
    description: dictionary[locale].contact.subtitle
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "zh") as Locale;
  const dict = dictionary[locale];

  const options = [
    locale === "zh" ? "AI 产品设计负责人机会" : "AI product design lead roles",
    locale === "zh" ? "0→1 AI 产品体验顾问" : "0-to-1 AI product UX consulting",
    locale === "zh" ? "Agent / LLM 工具设计系统" : "Agent and LLM tool design systems"
  ];

  return (
    <main className="shell grid min-h-[calc(100svh-4rem)] items-center py-16">
      <section className="glass gradient-border motion-rise overflow-hidden rounded-2xl p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">Contact</p>
            <h1 className="text-balance text-4xl font-semibold tracking-[-0.055em] text-text md:text-6xl">{dict.contact.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{dict.contact.subtitle}</p>
            <Link
              className="focus-ring motion-sheen mt-8 inline-flex items-center gap-2 rounded-md bg-text px-5 py-3 text-sm font-semibold text-ink transition hover:bg-blue"
              href={`mailto:${site.email}`}
            >
              <Mail className="h-4 w-4" />
              {dict.contact.emailLabel}
            </Link>
          </div>
          <div className="rounded-xl border border-line bg-panel p-5">
            <Sparkles className="mb-8 h-6 w-6 text-blue" />
            <div className="grid gap-3">
              {options.map((option) => (
                <div className="rounded-lg border border-line bg-ink/40 p-4 text-muted" key={option}>
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
