"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export function ShortDramaCoverVideo({ locale }: { locale: Locale }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (document.hidden || !video.paused) return;
      void video
        .play()
        .then(() => setNeedsTap(false))
        .catch(() => setNeedsTap(true));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
      },
      { threshold: 0.1 }
    );
    const onVisibilityChange = () => {
      if (!document.hidden) tryPlay();
    };

    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const playFromTap = () => {
    const video = videoRef.current;
    if (!video) return;
    void video
      .play()
      .then(() => setNeedsTap(false))
      .catch(() => setNeedsTap(true));
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        aria-label={locale === "zh" ? "AI短剧出海平台封面动画" : "AI Short Drama Studio cover animation"}
        autoPlay
        className="block aspect-video w-full"
        loop
        muted
        playsInline
        poster="/project-cases/ai-short-drama-studio-cover-poster.jpg"
        preload="auto"
        onPause={() => {
          const video = videoRef.current;
          if (!video || document.hidden) return;
          const rect = video.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) setNeedsTap(true);
        }}
        onPlaying={() => setNeedsTap(false)}
      >
        <source src="/project-cases/ai-short-drama-studio-cover-fallback.mp4" type="video/mp4" />
        <source src="/project-cases/ai-short-drama-studio-cover.webm" type="video/webm" />
      </video>
      {needsTap ? (
        <button
          aria-label={locale === "zh" ? "播放封面动画" : "Play cover animation"}
          className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/40 bg-black/75 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm"
          onClick={playFromTap}
          type="button"
        >
          <Play className="h-4 w-4 fill-current" />
          {locale === "zh" ? "点击播放" : "Tap to play"}
        </button>
      ) : null}
    </div>
  );
}
