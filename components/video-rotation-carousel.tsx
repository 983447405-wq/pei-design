"use client";

import { ChevronLeft, ChevronRight, Play, VolumeX } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { localizedPath, type Locale } from "@/lib/i18n";

type VideoShowcaseSlide = {
  id: string;
  tag: Record<Locale, string>;
  title: Record<Locale, string>;
  prompt: Record<Locale, string>;
  metric: string;
  href: string;
  gradient: string;
  videoSrc?: string;
  posterSrc?: string;
};

const slides: VideoShowcaseSlide[] = [
  {
    id: "agent-copilot",
    tag: { zh: "AGENT WORKFLOW", en: "AGENT WORKFLOW" },
    title: { zh: "企业 Agent 工作台", en: "Enterprise Agent Workspace" },
    prompt: {
      zh: "把模型执行、人工接管和审计记录做成可控工作流",
      en: "Make agent execution, takeover, and audit trails controllable"
    },
    metric: "+38%",
    href: "/projects/enterprise-agent-copilot",
    gradient:
      "radial-gradient(circle at 28% 18%, rgba(125,242,255,.72), transparent 22rem), linear-gradient(135deg, #101d2a 0%, #182f36 42%, #111317 100%)"
  },
  {
    id: "llm-eval",
    tag: { zh: "LLM EVALUATION", en: "LLM EVALUATION" },
    title: { zh: "AI 体验评测看板", en: "AI Experience Scoreboard" },
    prompt: {
      zh: "把主观体验质量拆成可评分、可复盘的产品指标",
      en: "Turn subjective AI quality into measurable product signals"
    },
    metric: "-42%",
    href: "/projects/llm-experience-evaluation",
    gradient:
      "radial-gradient(circle at 70% 24%, rgba(94,106,210,.86), transparent 20rem), linear-gradient(135deg, #10111b 0%, #1d2450 48%, #07080c 100%)"
  },
  {
    id: "creation-studio",
    tag: { zh: "MULTIMODAL TOOL", en: "MULTIMODAL TOOL" },
    title: { zh: "多模态创作控制台", en: "Multimodal Creation Console" },
    prompt: {
      zh: "用一条连续链路管理素材、参数、版本和预览",
      en: "Connect assets, parameters, versions, and previews in one loop"
    },
    metric: "9→4",
    href: "/projects/multimodal-creation-studio",
    gradient:
      "radial-gradient(circle at 48% 20%, rgba(255,63,214,.64), transparent 19rem), linear-gradient(135deg, #241120 0%, #3b1837 44%, #0b0d11 100%)"
  },
  {
    id: "handoff-system",
    tag: { zh: "DESIGN SYSTEM", en: "DESIGN SYSTEM" },
    title: { zh: "AI 状态组件系统", en: "AI State Component System" },
    prompt: {
      zh: "统一等待、生成、失败、风险和完成状态",
      en: "Unify waiting, generating, failure, risk, and completion states"
    },
    metric: "32",
    href: "/projects",
    gradient:
      "radial-gradient(circle at 60% 20%, rgba(93,255,181,.58), transparent 19rem), linear-gradient(135deg, #0d1b16 0%, #14352b 44%, #08090b 100%)"
  },
  {
    id: "ai-research",
    tag: { zh: "USER RESEARCH", en: "USER RESEARCH" },
    title: { zh: "AI 任务场景研究", en: "AI Task Scenario Research" },
    prompt: {
      zh: "从用户判断节点反推 Agent 产品边界",
      en: "Map user judgment points back to agent product boundaries"
    },
    metric: "12",
    href: "/projects",
    gradient:
      "radial-gradient(circle at 36% 18%, rgba(255,184,77,.62), transparent 20rem), linear-gradient(135deg, #241708 0%, #3b2412 45%, #08090c 100%)"
  },
  {
    id: "launch-metrics",
    tag: { zh: "PRODUCT OUTCOME", en: "PRODUCT OUTCOME" },
    title: { zh: "上线指标复盘", en: "Launch Metrics Review" },
    prompt: {
      zh: "把设计决策连接到完成率、接管率和风险发现",
      en: "Connect design decisions to completion, takeover, and risk discovery"
    },
    metric: "+55%",
    href: "/projects",
    gradient:
      "radial-gradient(circle at 74% 18%, rgba(118,144,255,.72), transparent 18rem), linear-gradient(135deg, #0f1529 0%, #1a2348 48%, #07080d 100%)"
  }
];

function wrappedIndex(value: number, length: number) {
  return ((value % length) + length) % length;
}

function circularDistance(index: number, active: number, length: number) {
  const raw = Math.abs(index - active);
  return Math.min(raw, length - raw);
}

export function VideoRotationCarousel({ locale }: { locale: Locale }) {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotionRef = useRef(false);
  const count = slides.length;
  const spacing = 360 / count;
  const active = wrappedIndex(position, count);

  const copy = useMemo(
    () => ({
      eyebrow: locale === "zh" ? "Case Videos" : "Case Videos",
      titleTop: locale === "zh" ? "项目案例" : "Product Cases",
      titleAccent: locale === "zh" ? "转成动态叙事" : "Built In Motion",
      body:
        locale === "zh"
          ? "这里预留案例视频位，当前用产品片段占位。后续把每张卡片的 videoSrc 换成 MP4 / WebM，就能成为真实视频作品墙。"
          : "A motion-ready wall for case videos. Replace each slide videoSrc with MP4 or WebM when final project footage is ready.",
      previous: locale === "zh" ? "上一个案例" : "Previous case",
      next: locale === "zh" ? "下一个案例" : "Next case",
      open: locale === "zh" ? "查看案例" : "Open case",
      muted: locale === "zh" ? "静音预览" : "Muted preview"
    }),
    [locale]
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = media.matches;

    const handleChange = () => {
      reducedMotionRef.current = media.matches;
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotionRef.current) return;

    const timer = window.setInterval(() => {
      setPosition((current) => current + 1);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  function move(delta: number) {
    setPosition((current) => current + delta);
  }

  function goTo(index: number) {
    setPosition((current) => {
      const currentRound = Math.round(current / count);
      const candidates = [currentRound * count + index, (currentRound - 1) * count + index, (currentRound + 1) * count + index];

      return candidates.reduce((best, candidate) => (Math.abs(candidate - current) < Math.abs(best - current) ? candidate : best));
    });
  }

  return (
    <section
      className="case-video-band relative isolate overflow-hidden py-20 md:py-28"
      aria-labelledby="case-video-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_4%,rgba(255,47,196,0.16),transparent_24rem),radial-gradient(circle_at_16%_54%,rgba(94,106,210,0.12),transparent_20rem),linear-gradient(180deg,#010102_0%,#050506_48%,#010102_100%)]" />
      <div className="shell">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-blue">{copy.eyebrow}</p>
          <h2
            id="case-video-title"
            className="mt-5 text-balance text-4xl font-semibold uppercase tracking-[-0.055em] text-text md:text-6xl"
          >
            <span className="block">{copy.titleTop}</span>
            <span className="block text-[#ff32c6]">{copy.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg">{copy.body}</p>
        </div>

        <div className="case-video-stage mx-[calc(50%-50vw)] mt-8 md:mt-12">
          <div
            className="case-video-track"
            style={
              {
                "--case-rotation": `${-position * spacing}deg`
              } as CSSProperties
            }
          >
            {slides.map((slide, index) => {
              const distance = circularDistance(index, active, count);
              const isActive = distance === 0;
              const cardStyle = {
                "--case-angle": `${index * spacing}deg`,
                "--case-card-opacity": distance > 2 ? 0.18 : isActive ? 1 : 0.72,
                "--case-card-scale": isActive ? 1 : 0.94,
                "--case-card-blur": distance > 2 ? "2px" : "0px",
                "--case-card-saturation": distance > 1 ? 0.78 : 1,
                background: slide.gradient
              } as CSSProperties;

              return (
                <Link
                  aria-label={`${copy.open}: ${slide.title[locale]}`}
                  className="case-video-card group"
                  href={localizedPath(locale, slide.href)}
                  key={slide.id}
                  style={cardStyle}
                  tabIndex={isActive ? 0 : -1}
                >
                  {slide.videoSrc ? (
                    <video
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover"
                      loop
                      muted
                      playsInline
                      poster={slide.posterSrc}
                      preload="metadata"
                      src={slide.videoSrc}
                    />
                  ) : null}
                  <div className="case-video-frame" aria-hidden="true">
                    <div className="case-video-orbit case-video-orbit-a" />
                    <div className="case-video-orbit case-video-orbit-b" />
                    <div className="case-video-grid">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                    <span className="rounded-md border border-white/20 bg-white/12 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-md">
                      {slide.tag[locale]}
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-black/24 text-white/80 backdrop-blur-md">
                      <Play className="h-3.5 w-3.5 fill-current" />
                    </span>
                  </div>
                  <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-black/38 p-4 text-left shadow-[0_16px_34px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold tracking-[-0.035em] text-white md:text-2xl">{slide.title[locale]}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/72">{slide.prompt[locale]}</p>
                      </div>
                      <strong className="shrink-0 rounded-md bg-[#ff32c6] px-3 py-2 text-sm font-semibold text-white shadow-[0_0_28px_rgba(255,50,198,0.42)]">
                        {slide.metric}
                      </strong>
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] text-white/50">
                    <VolumeX className="h-3 w-3" />
                    {copy.muted}
                  </span>
                </Link>
              );
            })}
          </div>

          <button aria-label={copy.previous} className="case-video-nav case-video-nav-prev" type="button" onClick={() => move(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button aria-label={copy.next} className="case-video-nav case-video-nav-next" type="button" onClick={() => move(1)}>
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="case-video-dots" aria-label={locale === "zh" ? "选择案例视频" : "Select case video"}>
            {slides.map((slide, index) => (
              <button
                aria-current={index === active}
                aria-label={`${copy.open}: ${slide.title[locale]}`}
                className="case-video-dot"
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
