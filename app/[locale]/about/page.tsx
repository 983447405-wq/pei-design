import type { Metadata } from "next";
import { BrainCircuit, Layers3, Sparkles, Workflow } from "lucide-react";
import { Section } from "@/components/section";
import { dictionary } from "@/content/dictionary";
import { profile } from "@/content/profile";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  return {
    title: dictionary[locale].nav.about,
    description: dictionary[locale].about.intro
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "zh") as Locale;
  const dict = dictionary[locale];
  const principleIcons = [BrainCircuit, Workflow, Layers3, Sparkles];
  const principles = [
    {
      title: locale === "zh" ? "产品判断先于界面" : "Product judgment before UI",
      body:
        locale === "zh"
          ? "先明确用户问题、业务目标、AI 能力边界和成功指标，再进入界面表达。"
          : "Clarify user problems, business goals, AI capability boundaries, and success metrics before interface design."
    },
    {
      title: locale === "zh" ? "复杂能力要被理解" : "Complex capability must be understood",
      body:
        locale === "zh"
          ? "AI 体验需要让用户知道系统在做什么、为什么这样做，以及失败时如何恢复。"
          : "AI experiences should show what the system is doing, why it behaves that way, and how users can recover from failure."
    },
    {
      title: locale === "zh" ? "系统沉淀长期价值" : "Systems create long-term value",
      body:
        locale === "zh"
          ? "设计系统不只是视觉组件，而是产品行为、状态反馈、动效节奏和交付规范。"
          : "Design systems are not just UI components. They encode product behavior, state feedback, motion rhythm, and delivery rules."
    },
    {
      title: locale === "zh" ? "动效让体验有记忆点" : "Motion makes experience memorable",
      body:
        locale === "zh"
          ? "动效不是装饰，它帮助用户理解状态变化、建立预期，并让 AI 产品更可信。"
          : "Motion is not decoration. It helps users understand state changes, build expectations, and trust AI products."
    }
  ];

  return (
    <main>
      <Section eyebrow="About" title={dict.about.title} description={dict.about.intro}>
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="glass gradient-border motion-card rounded-2xl p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue">{profile.meta[locale]}</p>
            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.045em] text-text md:text-5xl">{profile.name}</h2>
            <p className="mt-4 text-xl leading-8 text-text">{profile.tagline[locale]}</p>
            <div className="mt-8 grid gap-3">
              {profile.numbers.slice(0, 4).map((item) => (
                <div className="rounded-xl border border-line bg-panel/70 p-4" key={item.label.en}>
                  <strong className="block text-2xl text-text">{item.value}</strong>
                  <span className="text-sm text-muted">{item.label[locale]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {profile.about[locale].map((paragraph) => (
              <p className="glass rounded-2xl p-6 text-lg leading-8 text-muted" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Philosophy" title={profile.philosophy.title[locale]} description={profile.philosophy.body[locale]}>
        <div className="grid gap-5 md:grid-cols-2">
          {principles.map((principle, index) => {
            const Icon = principleIcons[index] ?? Sparkles;
            return (
              <div className="glass motion-card rounded-xl p-6" key={principle.title}>
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-blue" />
                  <span className="font-mono text-sm text-blue">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-text">{principle.title}</h3>
                <p className="mt-3 leading-7 text-muted">{principle.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Workflow" title={profile.workflow.title[locale]}>
        <div className="glass motion-card rounded-2xl p-6 md:p-8">
          <div className="grid gap-3 md:grid-cols-7">
            {profile.workflow.steps.map((step, index) => (
              <div className="rounded-xl border border-line bg-ink/45 p-4" key={step}>
                <span className="font-mono text-[11px] text-blue">0{index + 1}</span>
                <p className="mt-6 text-sm font-medium leading-5 text-text">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {profile.tools.map((tool) => (
              <span className="rounded-md border border-line bg-panel2 px-3 py-2 font-mono text-xs text-muted" key={tool}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
