"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import imageManifest from "@/lib/portfolio-images.json";

type ImageAsset = { width: number; height: number; variants: { src: string; width: number }[]; preview: string };
const assets: Record<string, ImageAsset> = imageManifest;

type Props = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  draggable?: boolean;
};

export function PortfolioImage({ src, alt, className = "", fill, width, height, sizes, priority, draggable = false }: Props) {
  const asset = assets[src.split("?")[0]];
  const imageRef = useRef<HTMLImageElement>(null);
  const retries = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const addRetry = (url: string) => (attempt ? `${url}${url.includes("?") ? "&" : "?"}retry=${attempt}` : url);

  useEffect(() => {
    let slowTimer: ReturnType<typeof setTimeout> | undefined;
    // A cached load or early network error can finish before React attaches its handlers.
    const initialImage = imageRef.current;
    if (initialImage?.complete) {
      if (initialImage.naturalWidth > 0) setLoaded(true);
      else timer.current = setTimeout(() => setAttempt((value) => value + 1), 1000);
    }
    const recover = () => {
      const image = imageRef.current;
      if (image && image.naturalWidth === 0) {
        retries.current = 0;
        setAttempt((value) => value + 1);
        setFailed(false);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      slowTimer = setTimeout(() => {
        if (imageRef.current?.naturalWidth === 0) setFailed(true);
      }, 20000);
      observer.disconnect();
    });
    if (initialImage) observer.observe(initialImage);
    window.addEventListener("online", recover);
    return () => {
      clearTimeout(timer.current);
      clearTimeout(slowTimer);
      observer.disconnect();
      window.removeEventListener("online", recover);
    };
  }, []);

  const retry = () => {
    clearTimeout(timer.current);
    setFailed(false);
    setAttempt((value) => value + 1);
  };
  const previewStyle: CSSProperties = {
    backgroundColor: "#171922",
    ...(!loaded && asset ? { backgroundImage: `url("${asset.preview}")`, backgroundSize: "100% 100%" } : {})
  };

  return (
    <span className={fill ? "absolute inset-0 block" : "relative block"} style={previewStyle}>
      {/* Static responsive files also work on the Cloudflare export, without an image API. */}
      <picture>
        {asset ? <source media="(max-width: 767px)" srcSet={addRetry(asset.variants[0].src)} /> : null}
        <img
          ref={imageRef}
          alt={alt}
          className={`${fill ? "absolute inset-0 h-full w-full " : ""}${className}`}
          decoding="async"
          draggable={draggable}
          fetchPriority={priority ? "high" : "auto"}
          height={height ?? asset?.height}
          loading={priority ? "eager" : "lazy"}
          onError={() => {
            if (retries.current < 2) {
              retries.current += 1;
              timer.current = setTimeout(retry, retries.current * 2000);
            } else setFailed(true);
          }}
          onLoad={() => {
            setLoaded(true);
            setFailed(false);
          }}
          sizes={sizes}
          src={addRetry(asset?.variants.at(-1)?.src ?? src)}
          srcSet={asset?.variants.map((variant) => `${addRetry(variant.src)} ${variant.width}w`).join(", ")}
          style={{ opacity: loaded ? 1 : 0 }}
          width={width ?? asset?.width}
        />
      </picture>
      {failed ? (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            retries.current = 0;
            retry();
          }}
          className="absolute inset-x-0 bottom-4 mx-auto w-fit rounded-full border border-white/30 bg-black/75 px-4 py-2 text-xs text-white"
        >
          图片加载失败，点击重试 / Retry
        </button>
      ) : null}
    </span>
  );
}
