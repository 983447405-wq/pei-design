import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BarChart3, FileText, ImageIcon, MousePointer2, Play } from "lucide-react";
import { dictionary } from "@/content/dictionary";
import { getProject, projects } from "@/content/projects";
import { isLocale, locales, localizedPath, type Locale } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const mediaIcon = {
  Images: ImageIcon,
  PDF: FileText,
  Video: Play,
  Prototype: MousePointer2
};

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const project = getProject(slug);

  if (!project) return {};

  const path = localizedPath(locale, `/projects/${project.slug}`);

  return {
    title: project.title[locale],
    description: project.summary[locale],
    alternates: {
      canonical: absoluteUrl(path)
    },
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title: project.title[locale],
      description: project.summary[locale]
    },
    twitter: {
      card: "summary_large_image",
      title: project.title[locale],
      description: project.summary[locale]
    }
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "zh") as Locale;
  const project = getProject(slug);

  if (!project) notFound();

  const dict = dictionary[locale];
  const canonicalUrl = absoluteUrl(localizedPath(locale, `/projects/${project.slug}`));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title[locale],
    description: project.summary[locale],
    url: canonicalUrl,
    author: {
      "@type": "Person",
      name: site.author
    },
    keywords: project.tags.join(", ")
  };

  const caseSections = [
    {
      label: locale === "zh" ? "项目背景" : "Background",
      body: project.sections.background[locale]
    },
    {
      label: locale === "zh" ? "我的职责" : "My role",
      list: project.sections.responsibilities.map((item) => item[locale])
    },
    {
      label: locale === "zh" ? "设计过程" : "Design process",
      list: project.sections.process.map((item) => item[locale])
    },
    {
      label: locale === "zh" ? "最终成果" : "Outcome",
      list: project.sections.outcome.map((item) => item[locale])
    },
    {
      label: locale === "zh" ? "数据结果" : "Results",
      list: project.sections.results.map((item) => item[locale])
    }
  ];

  return (
    <main className="shell py-14 md:py-20">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link className="focus-ring mb-10 inline-flex items-center gap-2 rounded-md text-sm text-muted transition hover:text-text" href={localizedPath(locale, "/projects")}>
        <ArrowLeft className="h-4 w-4" />
        {dict.common.backToList}
      </Link>

      <section className="glass gradient-border overflow-hidden rounded-2xl">
        <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span className="rounded-md border border-line bg-panel2 px-3 py-1.5 font-mono text-xs text-muted" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">{project.year} / {project.role[locale]}</p>
            <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-text md:text-6xl">{project.title[locale]}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted md:text-xl">{project.summary[locale]}</p>
          </div>

          <div className="rounded-2xl border border-line bg-panel p-5">
            <BarChart3 className="mb-6 h-6 w-6 text-blue" />
            <div className="grid gap-3">
              {project.metrics.map((metric) => (
                <div className="rounded-xl border border-line bg-ink/45 p-4" key={metric.label.en}>
                  <strong className="block text-2xl text-text">{metric.value}</strong>
                  <span className="text-sm text-muted">{metric.label[locale]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {project.media.map((asset) => {
          const Icon = mediaIcon[asset.type];
          return (
            <div className="glass motion-card rounded-2xl p-5" key={asset.label.en}>
              <Icon className="mb-8 h-6 w-6 text-blue" />
              <span className="font-mono text-xs text-muted">{asset.type}</span>
              <h2 className="mt-3 text-xl font-semibold text-text">{asset.label[locale]}</h2>
              <p className="mt-3 leading-7 text-muted">{asset.detail[locale]}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-8 grid gap-5">
        {caseSections.map((section, index) => (
          <div className="glass rounded-2xl p-6 md:p-8" key={section.label}>
            <span className="font-mono text-xs text-blue">0{index + 1}</span>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-text md:text-3xl">{section.label}</h2>
            {section.body ? <p className="mt-4 text-base leading-8 text-muted md:text-lg">{section.body}</p> : null}
            {section.list ? (
              <ul className="mt-5 grid gap-3">
                {section.list.map((item) => (
                  <li className="rounded-xl border border-line bg-panel/70 p-4 leading-7 text-muted" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </section>
    </main>
  );
}
