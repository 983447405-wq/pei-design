import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Code2, ImageIcon, PenLine, Sparkles } from "lucide-react";
import { ContactCTA } from "@/components/cta";
import LineWaves from "@/components/line-waves";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { SplashCursorAfterHero } from "@/components/splash-cursor-after-hero";
import { VideoRotationCarousel } from "@/components/video-rotation-carousel";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

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

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "zh") as Locale;
  const dict = dictionary[locale];
  const featured = projects.filter((project) => project.featured);
  const writingTitle = locale === "zh" ? "分享关于产品设计、AI 和创造力的思考。" : "Sharing ideas about Product Design, AI and Creativity.";
  const projectTitle = locale === "zh" ? "用大图卡片展示核心项目。" : "Large visual cards for selected product work.";
  const aboutTitle = locale === "zh" ? "Hi, I'm Pei." : "Hi, I'm Pei.";

  return (
    <main>
      <SplashCursorAfterHero />
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[calc(100svh+6rem)] min-h-[760px] opacity-100">
          <LineWaves
            speed={0.3}
            innerLineCount={32}
            outerLineCount={36}
            warpIntensity={1}
            rotation={-45}
            edgeFadeWidth={0}
            colorCycleSpeed={1}
            brightness={0.2}
            color1="#ffffff"
            color2="#ffffff"
            color3="#ffffff"
            enableMouseInteraction
            mouseInfluence={2}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(94,106,210,0.14),transparent_30rem),linear-gradient(90deg,rgba(1,1,2,0.5),rgba(1,1,2,0.14)_46%,rgba(1,1,2,0.5)),linear-gradient(180deg,rgba(1,1,2,0.10),rgba(1,1,2,0.24)_58%,#010102_100%)]" />
        </div>

        <div className="shell motion-rise grid min-h-[calc(100svh-4rem)] place-items-center py-20 text-center md:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-blue">{profile.name}</p>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.06em] text-text md:text-7xl lg:text-8xl">
              {profile.role[locale]}
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-8 text-muted md:text-2xl">{profile.tagline[locale]}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                className="focus-ring motion-sheen rounded-md bg-text px-5 py-3 text-sm font-semibold text-ink transition hover:bg-blue"
                href={localizedPath(locale, "/projects")}
              >
                {dict.common.viewProjects}
              </Link>
            </div>
          </div>

          <a
            aria-label={locale === "zh" ? "滚动到视频作品" : "Scroll to motion showcase"}
            className="focus-ring absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-3 rounded-full px-3 py-2 text-xs text-muted transition hover:text-text"
            href="#motion-showcase"
          >
            <span className="h-12 w-px overflow-hidden rounded-full bg-white/15">
              <span className="motion-scroll-line block h-5 w-px rounded-full bg-white/80" />
            </span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </section>

      <VideoRotationCarousel locale={locale} />

      <Section eyebrow="About" title={aboutTitle}>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="sticky top-24 hidden rounded-2xl border border-line bg-panel/60 p-6 lg:block">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue">{profile.meta[locale]}</p>
            <div className="mt-8 grid gap-3">
              {["AI", "Product", "UX", "Motion"].map((item) => (
                <span className="rounded-full border border-line bg-ink/45 px-4 py-2 text-sm text-muted" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            {profile.about[locale].map((paragraph) => (
              <p className="text-balance text-2xl leading-10 tracking-[-0.035em] text-text md:text-4xl md:leading-[1.16]" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Featured Projects" title={projectTitle} description={dict.projects.subtitle}>
        <div className="grid gap-5 lg:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard project={project} locale={locale} key={project.slug} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Impact"
        title={locale === "zh" ? "Design should create measurable value." : "Design should create measurable value."}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {profile.impact.map((item) => (
            <div className="glass motion-card rounded-2xl p-6" key={item.label.en}>
              <strong className="block text-4xl font-semibold tracking-[-0.05em] text-text md:text-5xl">{item.value}</strong>
              <span className="mt-7 block text-sm leading-6 text-muted">{item.label[locale]}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Experience" title={dict.home.experienceTitle}>
        <div className="relative">
          <div className="grid gap-5">
            {profile.experience.map((item) => (
              <article className="grid gap-4 md:grid-cols-[180px_1fr]" key={item.company}>
                <time className="font-mono text-sm text-blue">{item.period}</time>
                <div className="glass motion-card relative rounded-2xl p-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.035em] text-text">{item.company}</h3>
                  <p className="mt-1 text-sm font-medium text-blue">{item.title[locale]}</p>
                  <p className="mt-4 max-w-3xl leading-7 text-muted">{item.body[locale]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Articles" title={writingTitle}>
        <div className="grid gap-5 md:grid-cols-3">
          {profile.writingChannels.map((channel) => (
            <a className="glass motion-card group rounded-2xl p-6" href={channel.href} key={channel.name} rel="noreferrer" target="_blank">
              <div className="mb-10 flex items-center justify-between">
                <PenLine className="h-5 w-5 text-blue" />
                <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-text">{channel.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{channel.topics.join(" / ")}</p>
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
              <div className="glass motion-card mb-5 break-inside-avoid rounded-2xl p-6" key={item}>
                <Icon className="mb-10 h-5 w-5 text-blue" />
                <h3 className="text-xl font-semibold tracking-[-0.035em] text-text">{item}</h3>
                <div className="mt-8 h-24 rounded-xl border border-line bg-[radial-gradient(circle_at_30%_20%,rgba(94,106,210,0.22),transparent_12rem),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))]" />
              </div>
            );
          })}
        </div>
      </Section>

      <ContactCTA locale={locale} />
    </main>
  );
}
