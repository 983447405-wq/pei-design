import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Code2, ImageIcon, PenLine, Sparkles } from "lucide-react";
import { ContactCTA } from "@/components/cta";
import { ProjectImageGallery } from "@/components/circular-gallery";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { VideoRotationCarousel } from "@/components/video-rotation-carousel";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

const backgroundVideoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4";

const playgroundIcons = [ImageIcon, Sparkles, Code2];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const dict = dictionary[locale];

  return {
    title: locale === "zh" ? "Pei Jinxian | Product Designer" : "Pei Jinxian | Product Designer",
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

function LogoMark({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 256 256">
      <path d="M0 128c70.692 0 128 57.308 128 128H64c0-35.346-28.654-64-64-64Zm256 64c-35.346 0-64 28.654-64 64h-64c0-70.692 57.308-128 128-128ZM128 0C128 70.692 70.692 128 0 128V64c35.346 0 64-28.654 64-64Zm64 0c0 35.346 28.654 64 64 64v64c-70.692 0-128-57.308-128-128Z" />
    </svg>
  );
}

function ImpactShowcase({ locale }: { locale: Locale }) {
  return (
    <section className="shell motion-rise py-16 md:py-24" id="impact">
      <div className="mb-10 max-w-3xl">
        <p className="portfolio-eyebrow mb-4">Impact</p>
        <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-white md:text-5xl">
          {locale === "zh" ? "一些被验证过的设计结果。" : "Selected signals from shipped work."}
        </h2>
        <p className="mt-4 text-base leading-8 text-white/55 md:text-lg">
          {locale === "zh"
            ? "不把作品集做成销售页，只保留能说明产品判断、协作深度和落地价值的关键片段。"
            : "A quiet record of product judgment, collaboration depth, and outcomes from real shipped work."}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-6">
        {profile.impact.map((item, index) => (
          <article
            className={`liquid-glass motion-card rounded-2xl p-6 ${
              index < 2 ? "md:col-span-3" : index === 2 ? "md:col-span-2" : "md:col-span-2"
            }`}
            key={item.label.en}
          >
            <div className="flex items-start justify-between gap-5">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/35">{String(index + 1).padStart(2, "0")}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/45">
                {locale === "zh" ? "作品信号" : "Portfolio signal"}
              </span>
            </div>
            <strong className="mt-10 block text-4xl font-semibold tracking-[-0.055em] text-white md:text-6xl">{item.value}</strong>
            <p className="mt-4 text-sm leading-6 text-white/58">{item.label[locale]}</p>
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
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-white/45">{profile.name} · UED / Product Design Lead</p>
          <h1 className="text-balance text-5xl font-semibold leading-[1.08] tracking-[-0.06em] md:text-7xl lg:text-8xl">
            <span className="block text-white">{profile.name}</span>
            <span className="portfolio-gradient-text animate-shiny block">{profile.role[locale]}</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-balance text-base leading-[1.5] text-white/60 md:text-lg">{profile.tagline[locale]}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link className="portfolio-button portfolio-button-primary" href={localizedPath(locale, "/projects")}>
              <LogoMark className="h-4 w-4" />
              <span>{dict.common.viewProjects}</span>
            </Link>
            <a className="portfolio-button portfolio-button-secondary" href="#motion-showcase">
              <span>{locale === "zh" ? "查看视频" : "View Video"}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <a
          aria-label={locale === "zh" ? "滚动到动效画廊" : "Scroll to motion showcase"}
          className="focus-ring absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-3 rounded-full px-3 py-2 text-xs text-white/45 transition hover:text-white"
          href="#motion-showcase"
        >
          <span className="h-12 w-px overflow-hidden rounded-full bg-white/15">
            <span className="motion-scroll-line block h-5 w-px rounded-full bg-white/80" />
          </span>
          <ArrowDown className="h-4 w-4" />
        </a>
      </section>

      <VideoRotationCarousel locale={locale} />

      <ProjectImageGallery locale={locale} />

      <Section eyebrow="Featured Projects" title={projectTitle} description={dict.projects.subtitle}>
        <div className="grid gap-5 lg:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} locale={locale} project={project} />
          ))}
        </div>
      </Section>

      <Section eyebrow="About" title={aboutTitle}>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="sticky top-24 hidden rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl lg:block">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/50">{profile.meta[locale]}</p>
            <div className="mt-8 grid gap-3">
              {["AI", "Product", "UX", "Motion"].map((item) => (
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            {profile.about[locale].map((paragraph) => (
              <p className="text-balance text-2xl leading-10 tracking-[-0.035em] text-white md:text-4xl md:leading-[1.16]" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <ImpactShowcase locale={locale} />

      <Section eyebrow="Experience" title={dict.home.experienceTitle}>
        <div className="grid gap-5">
          {profile.experience.map((item) => (
            <article className="grid gap-4 md:grid-cols-[180px_1fr]" key={item.company}>
              <time className="font-mono text-sm text-white/50">{item.period}</time>
              <div className="liquid-glass motion-card relative rounded-2xl p-6">
                <h3 className="text-2xl font-semibold tracking-[-0.035em] text-white">{item.company}</h3>
                <p className="mt-1 text-sm font-medium text-white/55">{item.title[locale]}</p>
                <p className="mt-4 max-w-3xl leading-7 text-white/60">{item.body[locale]}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Articles" title={writingTitle}>
        <div className="grid gap-5 md:grid-cols-3">
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

      <Section
        eyebrow="Playground"
        title={locale === "zh" ? "设计、AI 和动效之间的实验场。" : "Experiments at the intersection of design, AI, and motion."}
      >
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {profile.playground.map((item, index) => {
            const Icon = playgroundIcons[index % playgroundIcons.length];
            return (
              <div className="liquid-glass motion-card mb-5 break-inside-avoid rounded-2xl p-6" key={item}>
                <Icon className="mb-10 h-5 w-5 text-white/55" />
                <h3 className="text-xl font-semibold tracking-[-0.035em] text-white">{item}</h3>
                <div className="mt-8 h-24 rounded-xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(0,210,255,0.18),transparent_12rem),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))]" />
              </div>
            );
          })}
        </div>
      </Section>

      <ContactCTA locale={locale} />
    </main>
  );
}
