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
  category: Record<Locale, string>;
  poster: string;
  src: string;
  href: string;
  gradient: string;
};

const videos: CarouselVideo[] = [
  {
    id: "ai-generated-video",
    category: { zh: "VIDEO 01", en: "VIDEO 01" },
    title: { zh: "AI Generated Videos", en: "AI Generated Videos" },
    poster: "/about-trail/agent-flow.svg",
    src: "",
    href: "/projects/ai-short-drama-studio",
    gradient: "linear-gradient(135deg, #25103a, #a855f7)"
  },
  {
    id: "interface-motion",
    category: { zh: "VIDEO 02", en: "VIDEO 02" },
    title: { zh: "Interface Motion", en: "Interface Motion" },
    poster: "/about-trail/evaluation.svg",
    src: "",
    href: "/projects/falcocut",
    gradient: "linear-gradient(135deg, #071d2b, #22d3ee)"
  },
  {
    id: "product-animation",
    category: { zh: "VIDEO 03", en: "VIDEO 03" },
    title: { zh: "Product Animation", en: "Product Animation" },
    poster: "/about-trail/prototype.svg",
    src: "",
    href: "/projects/honor-smart-video",
    gradient: "linear-gradient(135deg, #10172a, #5e6ad2)"
  },
  {
    id: "lottie-animation",
    category: { zh: "VIDEO 04", en: "VIDEO 04" },
    title: { zh: "Lottie Animation", en: "Lottie Animation" },
    poster: "/about-trail/design-system.svg",
    src: "",
    href: "/projects/ai-shopping-assistant",
    gradient: "linear-gradient(135deg, #112315, #4ade80)"
  },
  {
    id: "motion-graphics",
    category: { zh: "VIDEO 05", en: "VIDEO 05" },
    title: { zh: "Motion Graphics", en: "Motion Graphics" },
    poster: "/about-trail/research.svg",
    src: "",
    href: "/projects/ai-virtual-try-on",
    gradient: "linear-gradient(135deg, #2b1027, #ff3bd5)"
  },
  {
    id: "short-drama-motion",
    category: { zh: "VIDEO 06", en: "VIDEO 06" },
    title: { zh: "AI Short Drama Motion", en: "AI Short Drama Motion" },
    poster: "/about-trail/ai-product.svg",
    src: "",
    href: "/projects/ai-short-drama-studio",
    gradient: "linear-gradient(135deg, #0f1529, #7690ff)"
  },
  {
    id: "video-editing-reel",
    category: { zh: "VIDEO 07", en: "VIDEO 07" },
    title: { zh: "Video Editing Reel", en: "Video Editing Reel" },
    poster: "/about-trail/prototype.svg",
    src: "",
    href: "/projects/falcocut",
    gradient: "linear-gradient(135deg, #27170a, #ff9f1c)"
  },
  {
    id: "virtual-try-on-motion",
    category: { zh: "VIDEO 08", en: "VIDEO 08" },
    title: { zh: "Virtual Try-on Motion", en: "Virtual Try-on Motion" },
    poster: "/about-trail/agent-flow.svg",
    src: "",
    href: "/projects/ai-virtual-try-on",
    gradient: "linear-gradient(135deg, #03151b, #00e5ff)"
  },
  {
    id: "tongyi-interaction",
    category: { zh: "VIDEO 09", en: "VIDEO 09" },
    title: { zh: "Tongyi AI Interaction", en: "Tongyi AI Interaction" },
    poster: "/about-trail/evaluation.svg",
    src: "",
    href: "/projects/tongyi-app",
    gradient: "linear-gradient(135deg, #1c1532, #c8ff48)"
  },
  {
    id: "creative-coding",
    category: { zh: "VIDEO 10", en: "VIDEO 10" },
    title: { zh: "Creative Coding", en: "Creative Coding" },
    poster: "/about-trail/design-system.svg",
    src: "",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const activeIndexRef = useRef(activeIndex);
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, moved: false });

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(mod(index, count));
    },
    [count]
  );

  const goBy = useCallback(
    (delta: number) => {
      setActiveIndex((current) => mod(current + delta, count));
    },
    [count]
  );

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
    activeIndexRef,
    goBy,
    goTo,
    isDragging,
    isMuted,
    isPaused,
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
  isMuted,
  isBack,
  movedRef,
  onSelect
}: {
  video: CarouselVideo;
  locale: Locale;
  isActive: boolean;
  isMuted: boolean;
  isBack?: boolean;
  movedRef: React.MutableRefObject<{ active: boolean; pointerId: number; startX: number; moved: boolean }>;
  onSelect: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    node.muted = isMuted || !isActive;
    node.volume = isActive && !isMuted ? 0.62 : 0;

    if (isActive && video.src) {
      void node.play().catch(() => {
        node.muted = true;
      });
    }
  }, [isActive, isMuted, video.src]);

  return (
    <Link
      aria-label={`${video.category[locale]}: ${video.title[locale]}`}
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
          autoPlay
          className="case-video-media"
          loop
          muted={isMuted || !isActive}
          playsInline
          poster={video.poster}
          preload="metadata"
          src={video.src}
        />
      ) : null}
      <div className="case-video-poster" aria-hidden="true" />
      <span className="case-video-label">{video.category[locale]}</span>
      <strong className="case-video-number">{video.category[locale].slice(-2)}</strong>
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
  isMuted,
  movedRef,
  onSelect
}: {
  video: CarouselVideo;
  locale: Locale;
  index: number;
  spacing: number;
  activeIndex: number;
  isMuted: boolean;
  movedRef: React.MutableRefObject<{ active: boolean; pointerId: number; startX: number; moved: boolean }>;
  onSelect: () => void;
}) {
  const distance = Math.abs(nearestDistance(index, activeIndex, videos.length));
  const isActive = index === activeIndex;
  const style = {
    "--angle": `${index * spacing}deg`,
    "--poster": video.gradient,
    "--opacity": Math.max(0.32, 1 - distance * 0.09),
    "--brightness": Math.max(0.62, 1.04 - distance * 0.06),
    "--saturation": Math.max(0.72, 1.04 - distance * 0.05)
  } as CSSProperties;

  return (
    <article className="case-video-card" data-active={isActive} style={style}>
      <VideoFace isActive={isActive} isMuted={isMuted} locale={locale} movedRef={movedRef} onSelect={onSelect} video={video} />
      <VideoFace isActive={isActive} isBack isMuted={isMuted} locale={locale} movedRef={movedRef} onSelect={onSelect} video={video} />
    </article>
  );
}

function CarouselControls({ locale, onPrevious, onNext }: { locale: Locale; onPrevious: () => void; onNext: () => void }) {
  return (
    <>
      <button
        aria-label={locale === "zh" ? "上一张视频" : "Previous video"}
        className="case-video-nav case-video-nav-prev"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        onPointerDown={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label={locale === "zh" ? "下一张视频" : "Next video"}
        className="case-video-nav case-video-nav-next"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        onPointerDown={(event) => event.stopPropagation()}
        onPointerUp={(event) => event.stopPropagation()}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </>
  );
}

function CarouselIndicator({
  locale,
  activeIndex,
  isMuted,
  onSelect,
  onToggleMuted
}: {
  locale: Locale;
  activeIndex: number;
  isMuted: boolean;
  onSelect: (index: number) => void;
  onToggleMuted: () => void;
}) {
  return (
    <div className="case-video-controls" aria-label={locale === "zh" ? "视频轮播控制" : "Video carousel controls"}>
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
  const spacing = 360 / videos.length;
  const copy = useMemo(
    () => ({
      eyebrow: locale === "zh" ? "MOTION SHOWCASE" : "MOTION SHOWCASE",
      title: locale === "zh" ? "Selected Motion" : "Selected Motion"
    }),
    [locale]
  );

  return (
    <section
      aria-labelledby="case-video-title"
      className="case-video-band"
      id="motion-showcase"
      tabIndex={0}
      onBlur={() => carousel.setIsPaused(false)}
      onFocus={() => carousel.setIsPaused(true)}
      onMouseEnter={() => carousel.setIsPaused(true)}
      onMouseLeave={() => carousel.setIsPaused(false)}
      {...carousel.bind}
    >
      <div className="case-video-backdrop" aria-hidden="true" />
      <div className="case-video-heading">
        <p>{copy.eyebrow}</p>
        <h2 id="case-video-title">{copy.title}</h2>
      </div>
      <div className={`case-video-stage ${carousel.isDragging ? "is-dragging" : ""}`}>
        <div className="case-video-scene">
          <div className="case-video-track" style={{ "--current-rotation": `${-carousel.activeIndex * spacing}deg` } as CSSProperties}>
            {videos.map((video, index) => (
              <CarouselCard
                activeIndex={carousel.activeIndex}
                index={index}
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
        <CarouselControls locale={locale} onNext={() => carousel.goBy(1)} onPrevious={() => carousel.goBy(-1)} />
      </div>
      <CarouselIndicator
        activeIndex={carousel.activeIndex}
        isMuted={carousel.isMuted}
        locale={locale}
        onSelect={carousel.goTo}
        onToggleMuted={() => carousel.setIsMuted((current) => !current)}
      />
    </section>
  );
}

export function VideoRotationCarousel({ locale }: { locale: Locale }) {
  return <HeroCarousel locale={locale} />;
}
