"use client";

import { useEffect, useState } from "react";
import SplashCursor from "@/components/splash-cursor";

export function SplashCursorAfterHero() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const videoSection = document.querySelector(".case-video-band");

      if (!videoSection) {
        setEnabled(false);
        frame = 0;
        return;
      }

      setEnabled(videoSection.getBoundingClientRect().bottom < 0);
      frame = 0;
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <SplashCursor
      DENSITY_DISSIPATION={2}
      VELOCITY_DISSIPATION={2}
      PRESSURE={0.3}
      CURL={3}
      SPLAT_RADIUS={0.4}
      SPLAT_FORCE={10000}
      COLOR_UPDATE_SPEED={10}
      SHADING
      RAINBOW_MODE={false}
      COLOR="#3e0eff"
    />
  );
}
