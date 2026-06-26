import type { Metadata } from "next";
import { Section } from "@/components/section";
import { dictionary } from "@/content/dictionary";
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

  const principles = [
    locale === "zh" ? "先定义产品判断，再定义界面。" : "Define product judgment before interface details.",
    locale === "zh" ? "AI 体验的核心是控制感、可解释性和失败恢复。" : "AI UX depends on control, explainability, and recovery.",
    locale === "zh"
      ? "设计系统应该沉淀产品行为，而不只是视觉组件。"
      : "Design systems should codify product behavior, not just UI components.",
    locale === "zh" ? "好的设计交付要能降低工程和业务不确定性。" : "Good design delivery reduces engineering and business uncertainty."
  ];

  return (
    <main>
      <Section eyebrow="About" title={dict.about.title} description={dict.about.intro}>
        <div className="grid gap-5 md:grid-cols-2">
          {principles.map((principle, index) => (
            <div className="glass motion-card rounded-xl p-6" key={principle}>
              <span className="font-mono text-sm text-blue">0{index + 1}</span>
              <p className="mt-8 text-xl leading-8 text-text">{principle}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Capability"
        title={locale === "zh" ? "我能进入模糊阶段，也能推动落地。" : "I can enter ambiguous stages and drive delivery."}
      >
        <div className="glass motion-card rounded-2xl p-6 md:p-8">
          {[
            [
              "Strategy",
              locale === "zh"
                ? "AI 产品机会识别、MVP 范围、体验原则、评测指标。"
                : "AI opportunity framing, MVP scope, UX principles, evaluation metrics."
            ],
            [
              "UX / UI",
              locale === "zh"
                ? "信息架构、复杂工作流、设计系统、高保真原型。"
                : "Information architecture, complex workflows, design systems, high-fidelity prototypes."
            ],
            [
              "Delivery",
              locale === "zh"
                ? "与产品、算法、工程对齐拆解，减少交付损耗。"
                : "Align with product, ML, and engineering to reduce delivery loss."
            ]
          ].map(([title, body]) => (
            <div className="grid gap-3 border-b border-line py-6 last:border-0 md:grid-cols-[180px_1fr]" key={title}>
              <h3 className="text-xl font-semibold text-text">{title}</h3>
              <p className="leading-7 text-muted">{body}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
