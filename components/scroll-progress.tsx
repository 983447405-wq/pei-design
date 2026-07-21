"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const progress = Math.min(1, Math.max(0, nextProgress));
      progressRef.current?.style.setProperty("transform", `scaleX(${progress})`);
    };

    const requestProgressUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={progressRef} style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
