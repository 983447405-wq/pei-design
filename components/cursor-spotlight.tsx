"use client";

import { useEffect } from "react";

export function CursorSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let x = -999;
    let y = -999;

    const commit = () => {
      root.style.setProperty("--cursor-x", `${x}px`);
      root.style.setProperty("--cursor-y", `${y}px`);
      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(commit);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-spotlight" aria-hidden="true" />;
}
