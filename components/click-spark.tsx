"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ClickSpark({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const spark = (clientX?: number, clientY?: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    cancelAnimationFrame(frameRef.current);
    const rootRect = root.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvasRect.width * ratio);
    canvas.height = Math.round(canvasRect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const x = (clientX ?? rootRect.left + rootRect.width / 2) - canvasRect.left;
    const y = (clientY ?? rootRect.top + rootRect.height / 2) - canvasRect.top;
    const start = performance.now();
    const angles = Array.from({ length: 8 }, (_, index) => (index * Math.PI) / 4 + (Math.random() - 0.5) * 0.18);

    const draw = (now: number) => {
      const progress = Math.min((now - start) / 500, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);
      ctx.lineCap = "round";
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(255, 255, 255, ${1 - progress})`;
      angles.forEach((angle) => {
        const distance = 30 * eased;
        const length = 14 * Math.pow(1 - progress, 1.6);
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(angle) * distance, y + Math.sin(angle) * distance);
        ctx.lineTo(x + Math.cos(angle) * (distance + length), y + Math.sin(angle) * (distance + length));
        ctx.stroke();
      });
      if (progress < 1) frameRef.current = requestAnimationFrame(draw);
    };
    frameRef.current = requestAnimationFrame(draw);
  };

  return (
    <div
      className="relative inline-flex"
      onClick={(event) => spark(event.detail === 0 ? undefined : event.clientX, event.detail === 0 ? undefined : event.clientY)}
      ref={rootRef}
    >
      {children}
      <canvas
        aria-hidden="true"
        className="pointer-events-none absolute -inset-12 z-10 h-[calc(100%+6rem)] w-[calc(100%+6rem)]"
        ref={canvasRef}
      />
    </div>
  );
}
