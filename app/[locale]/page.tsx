import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Layers3, LineChart, Sparkles } from "lucide-react";
import { ContactCTA } from "@/components/cta";
import LineWaves from "@/components/line-waves";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { SplashCursorAfterHero } from "@/components/splash-cursor-after-hero";
import { TextType } from "@/components/text-type";
import { posts } from "@/content/blog";
import { dictionary } from "@/content/dictionary";
import { projects } from "@/content/projects";
import { resources } from "@/content/resources";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const dict = dictionary[locale];

  return {
    title: locale === "zh" ? "AI 产品设计师作品集" : "AI Product Designer Portfolio",
    description: dict.home.subtitle
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "zh") as Locale;
  const dict = dictionary[locale];
  const featured = projects.filter((project) => project.featured);
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 2);
  const featuredResources = resources.filter((resource) => resource.featured).slice(0, 2);
  const heroTextTypeLines =
    locale === "zh"
      ? [
          dict.home.subtitle,
          "覆盖 AI 产品定义、Agent 工作流、设计系统、评测体系和前端落地能力。",
          "为 HR、设计负责人和 AI 创业团队，呈现从判断到交付的完整设计能力。"
        ]
      : [
          dict.home.subtitle,
          "It frames AI workflows, system patterns, evaluation loops, and frontend execution for teams building with models.",
          "Built for hiring teams, design leaders, and AI startups that need product judgment beyond polished UI."
        ];

  const skills = [
    {
      icon: BrainCircuit,
      title: locale === "zh" ? "AI 产品定义" : "AI product definition",
      body:
        locale === "zh"
          ? "从模型能力、用户任务和商业目标之间找到可上线范围。"
          : "Translate model capability, user tasks, and business goals into shippable scope."
    },
    {
      icon: Layers3,
      title: locale === "zh" ? "复杂交互与设计系统" : "Interaction and systems",
      body:
        locale === "zh"
          ? "沉淀 Agent、评测、生成工具的状态、反馈和组件模式。"
          : "Codify states, feedback, and components for agents, evaluation, and creation tools."
    },
    {
      icon: LineChart,
      title: locale === "zh" ? "评测与数据结果" : "Evaluation and metrics",
      body:
        locale === "zh"
          ? "把主观体验质量拆解为团队可共同优化的指标。"
          : "Turn subjective AI experience quality into metrics teams can improve together."
    },
    {
      icon: Sparkles,
      title: locale === "zh" ? "前端可实现性" : "Frontend fluency",
      body:
        locale === "zh"
          ? "理解组件、响应式和动效边界，减少设计到工程的损耗。"
          : "Understand components, responsive behavior, and motion constraints to reduce handoff loss."
    }
  ];

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_22%,rgba(94,106,210,0.16),transparent_28rem),linear-gradient(90deg,rgba(1,1,2,0.42),rgba(1,1,2,0.14)_44%,rgba(1,1,2,0.52)),linear-gradient(180deg,rgba(1,1,2,0.10),rgba(1,1,2,0.28)_58%,#010102_100%)]" />
        </div>
        <div className="shell motion-rise grid min-h-[calc(100svh-4rem)] items-center py-20 md:py-28">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 text-xs text-white">
              <span className="h-2 w-2 rounded-full bg-blue shadow-[0_0_18px_rgba(94,106,210,0.8)]" />
              {dict.common.availability}
            </div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-blue">{dict.home.eyebrow}</p>
            <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-text md:text-6xl lg:text-7xl">
              {dict.home.title}
            </h1>
            <p className="mt-6 min-h-[8rem] max-w-2xl text-lg leading-8 text-muted sm:min-h-[6rem] md:min-h-[5rem] md:text-xl">
              <span className="sr-only">{dict.home.subtitle}</span>
              <TextType
                texts={heroTextTypeLines}
                typingSpeed={24}
                deletingSpeed={14}
                pauseDuration={1850}
                className="inline"
                cursorClassName="text-type-cursor text-blue"
              />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="focus-ring motion-sheen rounded-md bg-text px-5 py-3 text-sm font-semibold text-ink transition hover:bg-blue"
                href={localizedPath(locale, "/projects")}
              >
                {dict.common.viewProjects}
              </Link>
              <Link
                className="focus-ring rounded-md border border-line px-5 py-3 text-sm font-semibold text-text transition hover:border-lineStrong hover:bg-white/[0.05]"
                href={localizedPath(locale, "/contact")}
              >
                {dict.common.contactMe}
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-2">
              {[
                ["0→1", locale === "zh" ? "产品定义" : "Product definition"],
                ["12+", locale === "zh" ? "AI 工作流" : "AI workflows"],
                ["8", locale === "zh" ? "评测维度" : "Eval dimensions"]
              ].map(([value, label]) => (
                <div className="rounded-lg border border-line bg-panel px-3 py-3" key={label}>
                  <strong className="block text-xl text-text">{value}</strong>
                  <span className="text-xs text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Skills" title={dict.home.skillsTitle}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div className="glass motion-card rounded-xl p-5" key={skill.title}>
                <Icon className="mb-8 h-6 w-6 text-blue" />
                <h3 className="text-lg font-semibold text-text">{skill.title}</h3>
                <p className="mt-3 leading-7 text-muted">{skill.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Projects" title={dict.common.selectedWork}>
        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard project={project} locale={locale} key={project.slug} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Writing" title={dict.common.latestWriting}>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <Link className="glass motion-card group rounded-2xl p-6" href={localizedPath(locale, `/blog/${post.slug}`)} key={post.slug}>
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-md border border-line bg-panel2 px-3 py-1.5 font-mono text-xs text-muted">
                  {post.topic[locale]}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-text">{post.title[locale]}</h3>
              <p className="mt-4 leading-7 text-muted">{post.excerpt[locale]}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-md border border-line bg-panel2 px-2.5 py-1 font-mono text-[11px] text-muted">{post.date}</span>
                <span className="rounded-md border border-line bg-panel2 px-2.5 py-1 font-mono text-[11px] text-muted">
                  {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Resources" title={dict.common.featuredResources}>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredResources.map((resource) => (
            <Link
              className="glass motion-card group rounded-2xl p-6"
              href={localizedPath(locale, `/resources/${resource.slug}`)}
              key={resource.slug}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-md border border-line bg-panel2 px-3 py-1.5 font-mono text-xs uppercase text-muted">
                  {resource.type}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-text">{resource.title[locale]}</h3>
              <p className="mt-4 leading-7 text-muted">{resource.description[locale]}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {resource.tags.slice(0, 3).map((tag) => (
                  <span className="rounded-md border border-line bg-panel2 px-2.5 py-1 font-mono text-[11px] text-muted" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Experience" title={dict.home.experienceTitle}>
        <div className="glass motion-card rounded-2xl p-6 md:p-8">
          {[
            [
              "2024 - 2026",
              "Lead AI Product Designer",
              locale === "zh"
                ? "主导 Agent 工作台、AI 设计系统和 LLM 体验评测体系。"
                : "Led agent workspaces, AI design systems, and LLM experience evaluation."
            ],
            [
              "2021 - 2024",
              "Senior Product Designer",
              locale === "zh"
                ? "负责 B 端平台、创作工具和复杂工作流产品体验。"
                : "Owned B2B platforms, creation tools, and complex workflow experiences."
            ],
            [
              "2018 - 2021",
              "UX / UI Designer",
              locale === "zh"
                ? "建立用户研究、原型、视觉和交付规范基本功。"
                : "Built foundations across research, prototyping, visual design, and delivery specs."
            ]
          ].map(([time, title, body]) => (
            <div className="grid gap-3 border-b border-line py-6 last:border-0 md:grid-cols-[180px_1fr]" key={time}>
              <time className="font-mono text-sm text-blue">{time}</time>
              <div>
                <h3 className="text-xl font-semibold text-text">{title}</h3>
                <p className="mt-2 leading-7 text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <ContactCTA locale={locale} />
    </main>
  );
}
