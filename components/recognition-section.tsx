import Image from "next/image";
import type { Locale } from "@/lib/i18n";

const recognitionCards = [
  {
    year: "2026",
    title: {
      zh: "获评金河豚年度 AI（漫）剧创作平台",
      en: "Golden Pufferfish Annual AI Comic Drama Creation Platform"
    },
    image: "/recognition/golden-puffer-ai-drama.png",
    width: 2084,
    height: 1564,
    fit: "cover"
  },
  {
    year: "2025",
    title: {
      zh: "AI短剧出海入选“一带一路”人工智能应用场景案例集",
      en: "AI short drama overseas selected for the Belt and Road AI Application Scenario Case Collection"
    },
    image: "/recognition/ai-scenario-case.png",
    width: 1064,
    height: 782,
    fit: "cover"
  },
  {
    year: "2024",
    title: {
      zh: "业务线获创新突破最佳团队奖",
      en: "Best Innovation Breakthrough Team Award"
    },
    image: "/recognition/innovation-team-award.png",
    width: 1242,
    height: 858,
    fit: "cover"
  },
  {
    year: "2024",
    title: {
      zh: "2024 年中国零售数字化及新技术应用创新案例集",
      en: "Selected for the 2024 China Retail Digitalization and New Technology Application Innovation Case Collection"
    },
    image: "/recognition/retail-digital-case.png",
    width: 1060,
    height: 1484,
    fit: "contain"
  }
] as const;

const recognitionSectionCopy = {
  zh: {
    eyebrow: "Recognition",
    title: "荣誉认可",
    description: "来自 AI 产品创新与体验设计实践的行业认可。"
  },
  en: {
    eyebrow: "Recognition",
    title: "RECOGNITION",
    description: "Recognition from product design and AI innovation."
  }
} as const;

type RecognitionSectionProps = {
  locale: Locale;
};

export function RecognitionSection({ locale }: RecognitionSectionProps) {
  const copy = recognitionSectionCopy[locale];

  return (
    <section className="shell motion-rise py-16 md:py-24" id="recognition">
      <div className="mb-10 max-w-4xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">{copy.eyebrow}</p>
        <h2 className="insights-title text-balance text-4xl font-bold leading-none text-white md:text-6xl">{copy.title}</h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/55 md:text-lg">{copy.description}</p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-8 xl:gap-10">
        {recognitionCards.map((card) => (
          <article className="recognition-item" key={card.year}>
            <div className="recognition-thumb group">
              <Image
                alt=""
                aria-hidden="true"
                className="recognition-thumb-backdrop"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                src={card.image}
              />
              <Image
                alt=""
                className={`recognition-thumb-image recognition-thumb-image-${card.fit}`}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                src={card.image}
              />
            </div>
            <div className="recognition-copy">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-blue">{card.year}</span>
              <h3 className="mt-3 text-balance text-base font-semibold leading-snug tracking-[-0.01em] text-white">{card.title[locale]}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
