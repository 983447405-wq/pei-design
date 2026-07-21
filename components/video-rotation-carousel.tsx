"use client";

import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent
} from "react";
import { localizedPath, type Locale } from "@/lib/i18n";

type CarouselVideo = {
  id: string;
  title: Record<Locale, string>;
  poster: string;
  src: string;
  href: string;
  gradient: string;
};

const videos: CarouselVideo[] = [
  {
    id: "ai-commerce-hero",
    title: { zh: "AI 带货视频", en: "AI Commerce Video" },
    poster: "/about-trail/agent-flow.svg",
    src: "/videos/showcase/ai-commerce-hero.webm",
    href: "/projects/ai-short-drama-studio",
    gradient: "linear-gradient(135deg, #25103a, #a855f7)"
  },
  {
    id: "digital-human-commerce",
    title: { zh: "数字人带货", en: "Digital Human Commerce" },
    poster: "/about-trail/evaluation.svg",
    src: "/videos/showcase/digital-human-commerce.webm",
    href: "/projects/falcocut",
    gradient: "linear-gradient(135deg, #071d2b, #22d3ee)"
  },
  {
    id: "digital-human-commerce-02",
    title: { zh: "数字人带货 2.0", en: "Digital Human Commerce 2.0" },
    poster: "/about-trail/prototype.svg",
    src: "/videos/showcase/digital-human-commerce-02.webm",
    href: "/projects/honor-smart-video",
    gradient: "linear-gradient(135deg, #10172a, #5e6ad2)"
  },
  {
    id: "dual-presenter-commerce",
    title: { zh: "双人带货讲解", en: "Dual Presenter Commerce" },
    poster: "/about-trail/design-system.svg",
    src: "/videos/showcase/dual-presenter-commerce.webm",
    href: "/projects/ai-shopping-assistant",
    gradient: "linear-gradient(135deg, #112315, #4ade80)"
  },
  {
    id: "ai-influencer",
    title: { zh: "AI Influencer", en: "AI Influencer" },
    poster: "/about-trail/research.svg",
    src: "/videos/showcase/ai-influencer.webm",
    href: "/projects/ai-virtual-try-on",
    gradient: "linear-gradient(135deg, #2b1027, #ff3bd5)"
  },
  {
    id: "agent-generate",
    title: { zh: "Agent 视频生成", en: "Agent Video Generation" },
    poster: "/about-trail/ai-product.svg",
    src: "/videos/showcase/agent-generate.webm",
    href: "/projects/ai-short-drama-studio",
    gradient: "linear-gradient(135deg, #0f1529, #7690ff)"
  },
  {
    id: "generation-model-02",
    title: { zh: "生成模型 2.0", en: "Generation Model 2.0" },
    poster: "/about-trail/prototype.svg",
    src: "/videos/showcase/generation-model-02.webm",
    href: "/projects/falcocut",
    gradient: "linear-gradient(135deg, #27170a, #ff9f1c)"
  },
  {
    id: "template-video-gallery",
    title: { zh: "模板视频画廊", en: "Template Video Gallery" },
    poster: "/about-trail/agent-flow.svg",
    src: "/videos/showcase/template-video-gallery.webm",
    href: "/projects/ai-virtual-try-on",
    gradient: "linear-gradient(135deg, #03151b, #00e5ff)"
  },
  {
    id: "generated-video-01",
    title: { zh: "AI 生成视频 01", en: "AI Generated Video 01" },
    poster: "/about-trail/evaluation.svg",
    src: "/videos/showcase/generated-video-01.webm",
    href: "/projects/tongyi-app",
    gradient: "linear-gradient(135deg, #1c1532, #c8ff48)"
  },
  {
    id: "generated-video-02",
    title: { zh: "AI 生成视频 02", en: "AI Generated Video 02" },
    poster: "/about-trail/design-system.svg",
    src: "/videos/showcase/generated-video-02.webm",
    href: "/resources",
    gradient: "linear-gradient(135deg, #2a1308, #ff7a3d)"
  }
];

const AUTO_ROTATE_MS = 7000;

function mod(value: number, size: number) {
  return ((value % size) + size) % size;
}

function nearestDistance(index: number, activeIndex: number, count: number) {
  let distance = index - activeIndex;

  if (distance > count / 2) distance -= count;
  if (distance < -count / 2) distance += count;

  return distance;
}

function useCarousel(count: number) {
  const [rotationIndex, setRotationIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const activeIndex = mod(rotationIndex, count);
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, moved: false });

  const goTo = useCallback(
    (index: number) => {
      const targetIndex = mod(index, count);

      setRotationIndex((current) => {
        const currentIndex = mod(current, count);
        const forwardDistance = mod(targetIndex - currentIndex, count);
        const shortestDistance = forwardDistance <= count / 2 ? forwardDistance : forwardDistance - count;
        return current + shortestDistance;
      });
    },
    [count]
  );

  const goBy = useCallback((delta: number) => {
    setRotationIndex((current) => current + delta);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      goBy(1);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [goBy, isPaused]);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      moved: false
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag.active || drag.pointerId !== event.pointerId) return;

    if (Math.abs(event.clientX - drag.startX) > 8) {
      drag.moved = true;
    }
  }, []);

  const onPointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - drag.startX;
      dragRef.current = { active: false, pointerId: -1, startX: 0, moved: drag.moved };
      setIsDragging(false);

      if (Math.abs(deltaX) > 46) {
        goBy(deltaX < 0 ? 1 : -1);
      }

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      window.setTimeout(() => {
        dragRef.current.moved = false;
      }, 0);
    },
    [goBy]
  );

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goBy(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goBy(-1);
      }
    },
    [goBy]
  );

  return {
    activeIndex,
    goBy,
    goTo,
    isDragging,
    isMuted,
    isPaused,
    rotationIndex,
    setIsMuted,
    setIsPaused,
    dragRef,
    bind: {
      onKeyDown,
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd
    }
  };
}

function VideoFace({
  video,
  locale,
  isActive,
  isInView,
  isMuted,
  isBack,
  movedRef,
  onSelect
}: {
  video: CarouselVideo;
  locale: Locale;
  isActive: boolean;
  isInView: boolean;
  isMuted: boolean;
  isBack?: boolean;
  movedRef: React.MutableRefObject<{ active: boolean; pointerId: number; startX: number; moved: boolean }>;
  onSelect: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    let cancelled = false;

    node.muted = isMuted || !isActive;
    node.volume = isActive && !isMuted ? 0.62 : 0;

    if (!isInView) {
      node.pause();
      return;
    }

    void node
      .play()
      .then(() => {
        if (cancelled) node.pause();
      })
      .catch(() => {
        node.muted = true;
      });

    return () => {
      cancelled = true;
      node.pause();
    };
  }, [isActive, isInView, isMuted, video.src]);

  return (
    <Link
      aria-label={video.title[locale]}
      className={`case-video-face ${isBack ? "case-video-face-back" : "case-video-face-front"}`}
      draggable={false}
      href={localizedPath(locale, video.href)}
      onClick={(event) => {
        if (movedRef.current.moved || !isActive) {
          event.preventDefault();
        }

        if (!movedRef.current.moved && !isActive) {
          onSelect();
        }
      }}
      tabIndex={isActive && !isBack ? 0 : -1}
    >
      {!isBack && video.src ? (
        <video
          ref={videoRef}
          aria-hidden="true"
          autoPlay={isInView}
          className="case-video-media"
          draggable={false}
          loop
          muted={isMuted || !isActive}
          playsInline
          poster={video.poster}
          preload={isInView ? "auto" : "metadata"}
          src={video.src}
        />
      ) : null}
      <div className="case-video-poster" aria-hidden="true" />
      <span className="case-video-title">{video.title[locale]}</span>
    </Link>
  );
}

function CarouselCard({
  video,
  locale,
  index,
  spacing,
  activeIndex,
  isInView,
  isMuted,
  movedRef,
  onSelect
}: {
  video: CarouselVideo;
  locale: Locale;
  index: number;
  spacing: number;
  activeIndex: number;
  isInView: boolean;
  isMuted: boolean;
  movedRef: React.MutableRefObject<{ active: boolean; pointerId: number; startX: number; moved: boolean }>;
  onSelect: () => void;
}) {
  const distance = Math.abs(nearestDistance(index, activeIndex, videos.length));
  const isActive = index === activeIndex;
  const style = {
    "--angle": `${index * spacing}deg`,
    "--poster": video.gradient,
    "--opacity": 1,
    "--brightness": Math.max(0.62, 1.04 - distance * 0.06),
    "--saturation": Math.max(0.72, 1.04 - distance * 0.05)
  } as CSSProperties;

  return (
    <article className="case-video-card" data-active={isActive} style={style}>
      <VideoFace
        isActive={isActive}
        isInView={isInView}
        isMuted={isMuted}
        locale={locale}
        movedRef={movedRef}
        onSelect={onSelect}
        video={video}
      />
      <VideoFace
        isActive={isActive}
        isBack
        isInView={isInView}
        isMuted={isMuted}
        locale={locale}
        movedRef={movedRef}
        onSelect={onSelect}
        video={video}
      />
    </article>
  );
}

function CarouselIndicator({
  locale,
  activeIndex,
  isMuted,
  onNext,
  onPrevious,
  onSelect,
  onToggleMuted
}: {
  locale: Locale;
  activeIndex: number;
  isMuted: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSelect: (index: number) => void;
  onToggleMuted: () => void;
}) {
  return (
    <div className="case-video-controls" aria-label={locale === "zh" ? "视频轮播控制" : "Video carousel controls"}>
      <div className="case-video-pagination">
        <button
          aria-label={locale === "zh" ? "上一张视频" : "Previous video"}
          className="case-video-nav"
          type="button"
          onClick={onPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="case-video-dots" aria-label={locale === "zh" ? "选择视频" : "Select video"}>
          {videos.map((video, index) => (
            <button
              aria-current={index === activeIndex}
              aria-label={video.title[locale]}
              className="case-video-dot"
              key={video.id}
              type="button"
              onClick={() => onSelect(index)}
            />
          ))}
        </div>
        <button aria-label={locale === "zh" ? "下一张视频" : "Next video"} className="case-video-nav" type="button" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <button
        aria-label={
          isMuted
            ? locale === "zh"
              ? "当前静音，点击开启声音"
              : "Muted, enable sound"
            : locale === "zh"
              ? "当前有声，点击静音"
              : "Sound on, mute"
        }
        aria-pressed={isMuted}
        className="case-video-mute"
        type="button"
        onClick={onToggleMuted}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

function HeroCarousel({ locale }: { locale: Locale }) {
  const carousel = useCarousel(videos.length);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { onKeyDown, ...dragBind } = carousel.bind;
  const spacing = 360 / videos.length;
  const copy = useMemo(
    () => ({
      eyebrow: locale === "zh" ? "MOTION SHOWCASE" : "MOTION SHOWCASE",
      title: locale === "zh" ? "Selected Motion" : "Selected Motion"
    }),
    [locale]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      rootMargin: "120px 0px",
      threshold: 0.08
    });
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="case-video-title"
      className="case-video-band"
      id="motion-showcase"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onBlur={() => carousel.setIsPaused(false)}
      onFocus={() => carousel.setIsPaused(true)}
      onMouseEnter={() => carousel.setIsPaused(true)}
      onMouseLeave={() => carousel.setIsPaused(false)}
      onDragStart={(event) => event.preventDefault()}
    >
      <div className="case-video-backdrop" aria-hidden="true" />
      <div className="case-video-heading">
        <p>{copy.eyebrow}</p>
        <h2 id="case-video-title">{copy.title}</h2>
      </div>
      <div className={`case-video-stage ${carousel.isDragging ? "is-dragging" : ""}`} {...dragBind}>
        <div className="case-video-scene">
          <div className="case-video-track" style={{ "--current-rotation": `${-carousel.rotationIndex * spacing}deg` } as CSSProperties}>
            {videos.map((video, index) => (
              <CarouselCard
                activeIndex={carousel.activeIndex}
                index={index}
                isInView={isInView}
                isMuted={carousel.isMuted}
                key={video.id}
                locale={locale}
                movedRef={carousel.dragRef}
                onSelect={() => carousel.goTo(index)}
                spacing={spacing}
                video={video}
              />
            ))}
          </div>
        </div>
      </div>
      <CarouselIndicator
        activeIndex={carousel.activeIndex}
        isMuted={carousel.isMuted}
        locale={locale}
        onNext={() => carousel.goBy(1)}
        onPrevious={() => carousel.goBy(-1)}
        onSelect={carousel.goTo}
        onToggleMuted={() => carousel.setIsMuted((current) => !current)}
      />
    </section>
  );
}

export function VideoRotationCarousel({ locale }: { locale: Locale }) {
  return <HeroCarousel locale={locale} />;
}
