import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Flame, PenLine, Sparkles } from "lucide-react";
import { ContactCTA } from "@/components/cta";
import { ProjectCard } from "@/components/project-card";
import { RecognitionSection } from "@/components/recognition-section";
import { Section } from "@/components/section";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

const backgroundVideoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4";

const insightIcons = [PenLine, Sparkles, PenLine, Flame];
const heroTags = ["AI Product", "AIGC", "E-commerce", "Interaction"];

const insightCards = [
  {
    category: "Product Writing",
    title: {
      zh: "如何用 Markdown 标注文档提升产品工作效能",
      en: "Using Markdown annotation to improve product workflow efficiency"
    },
    description: {
      zh: "用结构化标注提升需求、评审和协作中的文档效率。",
      en: "Using structured annotation to improve product documentation, reviews, and collaboration."
    },
    metric: {
      zh: "1.2K 阅读",
      en: "1.2K reads"
    },
    platform: "人人都是产品经理",
    date: "2026",
    href: "https://www.woshipm.com/share/6194629.html"
  },
  {
    category: "WeChat",
    title: {
      zh: "看到前产品写下 7.5 万字《置身钉内》后，我开始理解：为什么 AI 产品越来越难做成",
      en: "Why AI products are getting harder to build"
    },
    description: {
      zh: "从一篇深度产品复盘，重新理解 AI 产品、组织协作与真实用户价值。",
      en: "Rethinking AI products, team collaboration, and real user value through a product deep dive."
    },
    metric: {
      zh: "100+ 阅读",
      en: "100+ reads"
    },
    platform: "微信公众号",
    date: "2026",
    href: "https://mp.weixin.qq.com/s/ppbFJpUQmFvN5nKQs9TFGg"
  },
  {
    category: "Tutorial",
    title: {
      zh: "全网最邪修的 Claude Code 安装",
      en: "The wildest Claude Code installation guide"
    },
    description: {
      zh: "面向设计师和产品人的 AI Coding 工具安装与上手教程。",
      en: "A practical setup guide for designers and product makers getting into AI coding."
    },
    metric: {
      zh: "9.7K 阅读",
      en: "9.7K reads"
    },
    platform: "优设",
    date: "2026",
    href: "https://www.uisdc.com/group/668627.html"
  },
  {
    category: "Design",
    title: {
      zh: "识货 APP 竞品分析",
      en: "Shihuo App Competitive Analysis"
    },
    description: {
      zh: "从竞品结构、核心体验与视觉表达拆解消费决策路径。",
      en: "A competitive analysis of product structure, core experience, and visual expression."
    },
    metric: {
      zh: "1.1K 阅读",
      en: "1.1K reads"
    },
    iconCount: 3,
    platform: "ZCOOL",
    date: "Portfolio",
    href: "https://www.zcool.com.cn/work/ZNjczODc4ODg=.html"
  }
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const dict = dictionary[locale];

  return {
    title: locale === "zh" ? "Pei Jinxian | AI Product Designer" : "Pei Jinxian | AI Product Designer",
    description: dict.home.subtitle
  };
}

function RootNoiseFilter() {
  return (
    <svg aria-hidden="true" className="absolute" height="0" width="0">
      <filter id="portfolio-noise">
        <feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" type="fractalNoise" />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
        <feComposite in2="SourceGraphic" operator="in" result="noise" />
        <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
      </filter>
    </svg>
  );
}

function ImpactShowcase({ locale }: { locale: Locale }) {
  return (
    <section className="shell motion-rise py-16 md:py-24" id="design-impact">
      <div className="mb-10 max-w-3xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">Impact</p>
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
          {locale === "zh" ? "设计创造价值，而不仅仅是界面。" : "Design creates value, not just interfaces."}
        </h2>
        <p className="mt-4 text-base leading-8 text-white/55 md:text-lg">
          {locale === "zh"
            ? "每一个数字背后，都是一次产品判断、团队协作与持续迭代的结果。"
            : "Behind every number is a product decision, team collaboration, and continuous iteration."}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-6">
        {profile.impact.map((item, index) => (
          <article
            className={`impact-card liquid-glass motion-card rounded-2xl p-6 ${
              index < 2 ? "md:col-span-3" : index === 2 ? "md:col-span-2" : "md:col-span-2"
            }`}
            key={item.label.en}
            tabIndex={0}
          >
            <div className="flex items-start gap-5">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/25">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <strong className="mt-10 block text-4xl font-semibold tracking-[-0.055em] text-white md:text-6xl">{item.value}</strong>
            <p className="mt-4 text-sm font-medium leading-6 text-white/72">{item.label[locale]}</p>
            <p className="mt-2 text-xs leading-5 text-white/42">{item.project[locale]}</p>
            <p className="impact-card-description mt-3 min-h-12 max-w-md text-sm leading-6 text-white/58">{item.description[locale]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "zh") as Locale;
  const dict = dictionary[locale];
  const featured = projects.filter((project) => project.featured);
  const writingTitle = locale === "zh" ? "分享关于产品设计、AI 和创造力的思考。" : "Sharing ideas about Product Design, AI and Creativity.";
  const projectTitle = locale === "zh" ? "大图卡片呈现核心项目。" : "Image-first cases with product depth.";
  const aboutTitle = locale === "zh" ? "Hi, I'm Pei." : "Hi, I'm Pei.";

  return (
    <main className="portfolio-root">
      <RootNoiseFilter />
      <div className="portfolio-bg-video">
        <video autoPlay loop muted playsInline src={backgroundVideoUrl} />
      </div>
      <div className="portfolio-bg-overlay" />

      <section className="portfolio-hero" id="home">
        <div className="mx-auto max-w-5xl">
          <p className="hero-kicker mx-auto mb-6 max-w-xl text-xs font-medium uppercase text-white/52">
            <span>{profile.name}</span>
            <span>AI · Product · Experience Design</span>
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-[1.08] tracking-[-0.06em] md:text-7xl lg:text-8xl">
            <span className="portfolio-gradient-text animate-shiny block">{profile.role[locale]}</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-balance text-base leading-[1.55] text-white/70 md:text-lg">{profile.tagline[locale]}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a className="portfolio-button portfolio-button-primary" href="#featured-projects">
              <span>{dict.common.viewProjects}</span>
            </a>
          </div>
        </div>

        <a
          aria-label={locale === "zh" ? "滚动到关于我" : "Scroll to about"}
          className="focus-ring absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-3 rounded-full px-3 py-2 text-xs text-white/45 transition hover:text-white"
          href="#about"
        >
          <span className="h-12 w-px overflow-hidden rounded-full bg-white/15">
            <span className="motion-scroll-line block h-5 w-px rounded-full bg-white/80" />
          </span>
          <ArrowDown className="h-4 w-4" />
        </a>
      </section>

      <section className="shell motion-rise py-16 md:py-24" id="about">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">About</p>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-text md:text-5xl">{aboutTitle}</h2>
          </div>
          <div className="flex flex-wrap gap-2 lg:pb-2">
            {heroTags.map((tag) => (
              <span className="hero-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div className="about-visual lg:sticky lg:top-24">
            <div className="about-portrait">
              <Image
                alt={locale === "zh" ? "裴锦贤艺术照" : "Portrait of Pei Jinxian"}
                className="about-portrait-image"
                height={1046}
                priority
                src="/about-portrait.png"
                width={1044}
              />
            </div>
          </div>
          <div className="about-copy max-w-3xl space-y-5">
            {profile.about[locale].map((paragraph) => (
              <p
                className="text-pretty text-base font-normal leading-8 tracking-normal text-white/72 md:text-xl md:leading-9"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <Section
        className="experience-section"
        eyebrow="Project Timeline"
        title={
          locale === "zh" ? (
            <>
              项目时间线，
              <br />
              记录设计如何推动真实业务。
            </>
          ) : (
            dict.home.experienceTitle
          )
        }
      >
        <div className="experience-trail-region" id="experience">
          <div className="experience-trail-content grid gap-5">
            {profile.experience.map((item) => {
              const hasFlipGallery = Boolean(item.trailItems?.length);

              return (
                <article
                  className={`experience-row relative grid gap-4 md:grid-cols-[180px_1fr] ${
                    hasFlipGallery ? "experience-row--flippable" : ""
                  }`}
                  data-company={item.company}
                  key={item.company}
                  tabIndex={hasFlipGallery ? 0 : undefined}
                >
                  <time className="font-mono text-sm text-white/50">{item.period}</time>
                  <div className="experience-flip-shell">
                    <div className="experience-flip-card">
                      <div className="experience-card experience-flip-face experience-flip-front liquid-glass relative rounded-2xl p-6">
                        {item.logo ? (
                          <Image
                            alt=""
                            aria-hidden="true"
                            className="absolute right-6 top-6 z-[5] h-11 w-11 rounded-xl object-cover"
                            height={44}
                            src={item.logo}
                            width={44}
                          />
                        ) : null}
                        <div className={`relative z-[5] ${item.logo ? "pr-16" : ""}`}>
                          <h3 className="text-2xl font-semibold tracking-[-0.035em] text-white">
                            {item.displayName?.[locale] ?? item.company}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-white/55">{item.title[locale]}</p>
                        </div>
                        <div className="relative z-[5] mt-4 max-w-3xl space-y-3 leading-7 text-white/60">
                          {(Array.isArray(item.body[locale]) ? item.body[locale] : [item.body[locale]]).map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                      {hasFlipGallery ? (
                        <div aria-hidden="true" className="experience-flip-back experience-flip-face rounded-2xl">
                          <div className="experience-flip-gallery">
                            {item.trailItems?.map((imageSrc) => (
                              <span className="experience-flip-image" key={imageSrc}>
                                <Image
                                  alt=""
                                  className="experience-flip-image-media"
                                  fill
                                  sizes="(min-width: 768px) 18vw, 32vw"
                                  src={imageSrc}
                                />
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      <RecognitionSection locale={locale} />

      <Section eyebrow="Featured Projects" id="featured-projects" title={projectTitle} description={dict.projects.subtitle}>
        <div className="grid gap-5 lg:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              locale={locale}
              project={project}
              titleOverride={locale === "zh" && project.slug === "ai-short-drama-studio" ? "AI短剧出海平台" : undefined}
            />
          ))}
        </div>
      </Section>

      <ImpactShowcase locale={locale} />

      <Section eyebrow="Influence" id="impact" title={writingTitle}>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {profile.writingChannels.map((channel) => (
            <a
              className="group liquid-glass motion-card rounded-2xl p-6"
              href={channel.href}
              key={channel.name}
              rel="noreferrer"
              target="_blank"
            >
              <div className="mb-10 flex items-center justify-between">
                <PenLine className="h-5 w-5 text-white/55" />
                <ArrowUpRight className="h-5 w-5 text-white/45 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-white">{channel.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">{channel.topics.join(" / ")}</p>
            </a>
          ))}
        </div>
      </Section>

      <section className="shell motion-rise py-16 md:py-24" id="insights">
        <div className="mb-10 max-w-4xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">Insights</p>
          <h2 className="insights-title text-balance text-4xl font-bold leading-none text-white md:text-6xl">INSIGHTS</h2>
          <p className="mt-5 text-base leading-8 text-white/55 md:text-lg">
            {locale === "zh" ? "关于 AI、产品设计与未来体验的思考。" : "Thoughts on AI, product design, and future experiences."}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {insightCards.map((card, index) => {
            const Icon = insightIcons[index % insightIcons.length];
            const isExternal = card.href.startsWith("http");
            return (
              <a
                className="insight-card group liquid-glass rounded-2xl p-6"
                href={isExternal ? card.href : localizedPath(locale, card.href)}
                key={card.title.en}
                rel={isExternal ? "noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
              >
                <div className="flex items-center justify-between">
                  <span className="insight-category">{card.category}</span>
                  <ArrowUpRight className="h-5 w-5 text-white/38 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
                <div className="mt-10 flex gap-1.5">
                  {Array.from({ length: "iconCount" in card ? card.iconCount : 1 }).map((_, iconIndex) => (
                    <Icon className="h-5 w-5 text-white/45 transition group-hover:text-blue" key={iconIndex} />
                  ))}
                </div>
                <h3 className="mt-6 text-balance text-2xl font-semibold tracking-[-0.035em] text-white md:text-3xl">
                  {card.title[locale]}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/56 md:text-base md:leading-7">{card.description[locale]}</p>
                <div className="insight-meta mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs text-white/45">
                  <span className="insight-views font-mono uppercase tracking-[0.12em]">{card.metric[locale]}</span>
                  <span>
                    {card.platform} · {card.date}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <ContactCTA locale={locale} />
    </main>
  );
}
