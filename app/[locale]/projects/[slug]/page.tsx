import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BarChart3, FileText, ImageIcon, MousePointer2, Play } from "lucide-react";
import { dictionary } from "@/content/dictionary";
import { ProjectFooter } from "@/components/project-footer";
import { getProject, listedProjects, projects } from "@/content/projects";
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

const projectImageSequences: Partial<Record<string, string[]>> = {
  "ai-short-drama-studio": Array.from({ length: 11 }, (_, index) => `/project-details/ai-short-drama-studio/${index + 2}.png?v=20261030b`),
  falcocut: [13, 14, 15, 16, 18, 19, 20, 21, 22, 23].map(
    (page) => `/project-details/falcocut/${page}.${page === 14 || page === 19 ? "webm" : "png"}`
  ),
  "ai-shopping-assistant": ["23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "34", "35", "36"].map(
    (name) => `/project-details/ai-shopping-assistant/${name}.png`
  ),
  "tongyi-app": ["04", "05", "07", "08", "09", "10", "11", "12", "14-updated", "15", "17", "19", "20", "21", "22"].map(
    (name) => `/project-details/tongyi-app/${name}.png`
  ),
  "ziroom-enterprise-platform": [
    "03",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "31.2",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "40"
  ].map((name) => `/project-details/ziroom-enterprise-platform/${name}.png`)
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
  const hideHeroMetrics = project.slug === "ai-shopping-assistant";
  const projectImages = projectImageSequences[project.slug] ?? [];
  const hasProjectImages = projectImages.length > 0;
  const isShortDrama = project.slug === "ai-short-drama-studio";
  const projectIndex = listedProjects.findIndex((item) => item.slug === project.slug);
  const previousProject = projectIndex < 0 ? undefined : listedProjects[projectIndex - 1];
  const nextProject = projectIndex < 0 ? undefined : listedProjects[projectIndex + 1];
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

      <Link
        className="focus-ring mb-10 inline-flex items-center gap-2 rounded-md text-sm text-muted transition hover:text-text"
        href={`${localizedPath(locale, "")}#featured-projects`}
      >
        <ArrowLeft className="h-4 w-4" />
        {dict.common.backToList}
      </Link>

      {isShortDrama ? (
        <section className="overflow-hidden bg-black" aria-label={project.title[locale]} data-project-page>
          <video
            aria-label={locale === "zh" ? "AI短剧出海平台封面动画" : "AI Short Drama Studio cover animation"}
            autoPlay
            className="block aspect-video w-full"
            loop
            muted
            playsInline
            poster="/project-cases/ai-short-drama-studio-cover-poster.jpg"
            preload="auto"
          >
            <source src="/project-cases/ai-short-drama-studio-cover.webm" type="video/webm" />
            <source src="/project-cases/ai-short-drama-studio-cover-fallback.mp4" type="video/mp4" />
          </video>
        </section>
      ) : hasProjectImages ? null : (
        <section className="glass gradient-border overflow-hidden rounded-2xl">
          <div className={`grid gap-8 p-6 md:p-10 ${hideHeroMetrics ? "" : "lg:grid-cols-[1fr_0.72fr]"}`}>
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span className="rounded-md border border-line bg-panel2 px-3 py-1.5 font-mono text-xs text-muted" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">
                {project.year} / {project.role[locale]}
              </p>
              <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-text md:text-6xl">
                {project.title[locale]}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted md:text-xl">{project.summary[locale]}</p>
            </div>

            {hideHeroMetrics ? null : (
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
            )}
          </div>
        </section>
      )}

      {isShortDrama ? (
        <section className="mt-8 grid gap-5" data-project-sequence>
          {projectImages.map((src, index) => (
            <div className="overflow-hidden bg-black" data-project-page key={src}>
              <Image
                alt={locale === "zh" ? `AI短剧出海平台第 ${index + 2} 页` : `AI Short Drama Studio page ${index + 2}`}
                className="h-auto w-full select-none"
                draggable={false}
                height={2160}
                sizes="(min-width: 1280px) 1200px, 100vw"
                src={src}
                width={3840}
              />
            </div>
          ))}
        </section>
      ) : hasProjectImages ? (
        <section className="mt-8 grid gap-5" data-project-sequence>
          {project.slug === "tongyi-app" ? (
            <div className="overflow-hidden bg-black" data-project-page>
              <video
                aria-label={locale === "zh" ? "通义千问 Logo 动画" : "Tongyi logo animation"}
                autoPlay
                className="block aspect-video w-full"
                loop
                muted
                playsInline
                poster="/project-details/tongyi-app/logo-animation-poster.jpg"
                preload="auto"
              >
                <source src="/project-details/tongyi-app/logo-animation.webm" type="video/webm" />
              </video>
            </div>
          ) : null}
          {projectImages.map((src, index) => (
            <div className="overflow-hidden bg-black" data-project-page key={src}>
              {src.endsWith(".webm") ? (
                <video
                  aria-label={locale === "zh" ? `FalcoCut 第 ${index + 1} 页视频演示` : `FalcoCut page ${index + 1} video demo`}
                  autoPlay
                  className="block aspect-video w-full"
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src={src} type="video/webm" />
                </video>
              ) : (
                <Image
                  alt={`${project.title[locale]} project page ${index + 1}`}
                  className="h-auto w-full select-none"
                  draggable={false}
                  height={project.slug === "falcocut" ? 1620 : 1080}
                  priority={index === 0 && project.slug !== "tongyi-app"}
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  src={src}
                  width={project.slug === "falcocut" ? 2880 : 1920}
                />
              )}
            </div>
          ))}
          {project.slug === "ziroom-enterprise-platform" ? (
            <div className="overflow-hidden bg-black" data-project-page>
              <video
                aria-label={locale === "zh" ? "自如项目作品视频" : "Ziroom project showreel"}
                className="block aspect-video w-full"
                controls
                controlsList="nodownload"
                playsInline
                poster="/project-details/ziroom-enterprise-platform/showreel-poster.jpg"
                preload="metadata"
              >
                <source src="/project-details/ziroom-enterprise-platform/showreel.webm" type="video/webm" />
              </video>
            </div>
          ) : null}
        </section>
      ) : (
        <>
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
        </>
      )}
      <ProjectFooter
        locale={locale}
        previous={
          previousProject
            ? { href: localizedPath(locale, `/projects/${previousProject.slug}`), title: previousProject.title[locale] }
            : null
        }
        next={nextProject ? { href: localizedPath(locale, `/projects/${nextProject.slug}`), title: nextProject.title[locale] } : null}
      />
    </main>
  );
}
