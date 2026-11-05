"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RefreshCw } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Props = {
  src: string;
  poster: string;
  label: string;
  locale: Locale;
  background?: boolean;
  controls?: boolean;
};

export function PortfolioVideo({ src, poster, label, locale, background = false, controls = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [frameReady, setFrameReady] = useState(false);
  const [status, setStatus] = useState<"loading" | "paused" | "playing" | "error">(controls ? "paused" : "loading");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = background;
    let disposed = false;
    let retries = 0;
    let lastProgress = 0;
    let idleTicks = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const tryPlay = () => {
      if (controls || !visible || document.hidden || !video.src) return;
      video.muted = true;
      video.defaultMuted = true;
      void video.play().catch((error: DOMException) => {
        if (!disposed && error.name !== "AbortError") setStatus(error.name === "NotAllowedError" ? "paused" : "error");
      });
    };
    const reload = () => {
      if (!visible || document.hidden || !video.src) return;
      setStatus("loading");
      video.load();
      tryPlay();
    };
    const recover = () => {
      retries = 0;
      idleTicks = 0;
      if (video.error) reload();
      else tryPlay();
    };
    const onError = () => {
      setStatus("error");
      if (!visible || retries >= 2 || !navigator.onLine) return;
      retries += 1;
      retryTimer = setTimeout(reload, retries * 3000);
    };
    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnabled(true);
          nearby.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) tryPlay();
      else if (!controls) video.pause();
    });
    nearby.observe(video);
    observer.observe(video);
    const onVisibility = () => {
      if (!document.hidden) recover();
    };
    const onPause = () => {
      if (visible && !document.hidden && !controls) setStatus("paused");
    };
    const onPlaying = () => {
      setFrameReady(true);
      setStatus("playing");
      idleTicks = 0;
    };
    const onGesture = () => {
      if (video.paused) tryPlay();
    };
    // WeChat may release media playback only after its bridge is ready or a real touch.
    document.addEventListener("WeixinJSBridgeReady", recover);
    document.addEventListener("touchend", onGesture, { passive: true });
    document.addEventListener("pointerup", onGesture, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("online", recover);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("error", onError);
    video.addEventListener("pause", onPause);
    video.addEventListener("playing", onPlaying);
    const watchdog = setInterval(() => {
      if (!visible || document.hidden || !video.src || controls) return;
      const buffered = video.buffered.length ? video.buffered.end(video.buffered.length - 1) : 0;
      const progress = buffered + video.currentTime;
      idleTicks = progress > lastProgress ? 0 : idleTicks + 1;
      lastProgress = progress;
      if (idleTicks >= 4 && video.readyState < 2) {
        setStatus("error");
        if (retries < 2 && navigator.onLine) {
          retries += 1;
          reload();
        }
        idleTicks = 0;
      }
    }, 5000);
    if (background) setEnabled(true);
    return () => {
      disposed = true;
      clearTimeout(retryTimer);
      clearInterval(watchdog);
      nearby.disconnect();
      observer.disconnect();
      document.removeEventListener("WeixinJSBridgeReady", recover);
      document.removeEventListener("touchend", onGesture);
      document.removeEventListener("pointerup", onGesture);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("online", recover);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("error", onError);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("playing", onPlaying);
    };
  }, [background, controls, src]);

  const playbackButton =
    !controls && (status === "paused" || status === "error") ? (
      <button
        type="button"
        aria-label={locale === "zh" ? (background ? "播放背景视频" : "播放视频") : "Play video"}
        className={
          background
            ? "fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/70 px-4 py-2 text-xs text-white"
            : "absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/40 bg-black/75 px-5 py-3 text-sm text-white"
        }
        style={{ pointerEvents: "auto" }}
        onClick={() => {
          const video = videoRef.current;
          if (!video) return;
          setEnabled(true);
          if (video.error || status === "error") video.load();
          void video.play().catch(() => setStatus("error"));
        }}
      >
        {status === "error" ? <RefreshCw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        {locale === "zh" ? (status === "error" ? "点击重试" : background ? "播放背景" : "点击播放") : status === "error" ? "Retry" : "Play"}
      </button>
    ) : null;

  return (
    <>
      <div
        className={background ? "portfolio-bg-video" : "relative aspect-video w-full overflow-hidden bg-black"}
        style={{
          backgroundImage: frameReady ? "none" : `url("${poster}")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <video
          ref={videoRef}
          aria-label={label}
          autoPlay={!controls}
          className={background ? undefined : "block h-full w-full"}
          controls={controls}
          controlsList="nodownload"
          loop={!controls}
          muted={!controls}
          playsInline
          webkit-playsinline="true"
          poster={poster}
          preload={enabled ? "metadata" : "none"}
          src={enabled ? src : undefined}
          style={!frameReady && !controls ? { opacity: 0 } : undefined}
        />
        {!background ? playbackButton : null}
      </div>
      {background ? playbackButton : null}
    </>
  );
}
