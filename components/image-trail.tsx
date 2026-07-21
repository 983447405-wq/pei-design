"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Point = {
  x: number;
  y: number;
};

type TrailItem = {
  element: HTMLDivElement;
  inner: HTMLDivElement;
  width: number;
  height: number;
};

type ImageTrailProps = {
  items?: string[];
  variant?: 1;
};

function lerp(start: number, end: number, amount: number) {
  return (1 - amount) * start + amount * end;
}

function distanceBetween(first: Point, second: Point) {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

function localPointerPosition(event: MouseEvent, rect: DOMRect): Point {
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

export function ImageTrail({ items = [], variant = 1 }: ImageTrailProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const surface = root?.closest<HTMLElement>("[data-image-trail-surface]");

    if (!root || !surface || items.length === 0) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return;

    const trailItems: TrailItem[] = Array.from(root.querySelectorAll<HTMLDivElement>(".image-trail__item")).flatMap((element) => {
      const inner = element.querySelector<HTMLDivElement>(".image-trail__img");
      if (!inner) return [];
      const rect = element.getBoundingClientRect();
      return [{ element, inner, width: rect.width, height: rect.height }];
    });

    if (trailItems.length === 0) return;

    let surfaceRect = surface.getBoundingClientRect();
    let pointer: Point = { x: 0, y: 0 };
    let cachedPointer: Point = { x: 0, y: 0 };
    let lastPointer: Point = { x: 0, y: 0 };
    let itemIndex = 0;
    let zIndex = 1;
    let frameId: number | null = null;
    let active = false;

    const measure = () => {
      surfaceRect = surface.getBoundingClientRect();
      trailItems.forEach((item) => {
        const rect = item.element.getBoundingClientRect();
        item.width = rect.width;
        item.height = rect.height;
      });
    };

    const showNextImage = () => {
      const item = trailItems[itemIndex];
      itemIndex = (itemIndex + 1) % trailItems.length;
      zIndex += 1;

      if (zIndex > 100) zIndex = 2;

      gsap.killTweensOf([item.element, item.inner]);

      gsap
        .timeline()
        .fromTo(
          item.element,
          {
            autoAlpha: 1,
            scale: 0.78,
            rotation: gsap.utils.random(-4, 4),
            zIndex,
            x: cachedPointer.x - item.width / 2,
            y: cachedPointer.y - item.height / 2
          },
          {
            duration: 0.42,
            ease: "power2.out",
            scale: 1,
            x: pointer.x - item.width / 2,
            y: pointer.y - item.height / 2,
            overwrite: "auto"
          },
          0
        )
        .fromTo(item.inner, { scale: 1.1 }, { duration: 0.55, ease: "power2.out", scale: 1 }, 0)
        .to(
          item.element,
          {
            autoAlpha: 0,
            duration: 0.58,
            ease: "power3.in",
            scale: 0.42
          },
          0.42
        );
    };

    const render = () => {
      if (!active) return;

      cachedPointer = {
        x: lerp(cachedPointer.x, pointer.x, 0.12),
        y: lerp(cachedPointer.y, pointer.y, 0.12)
      };

      if (distanceBetween(pointer, lastPointer) > 76) {
        showNextImage();
        lastPointer = { ...pointer };
      }

      frameId = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!active) {
        measure();
        pointer = localPointerPosition(event, surfaceRect);
        cachedPointer = { ...pointer };
        lastPointer = { ...pointer };
        active = true;
        frameId = window.requestAnimationFrame(render);
        return;
      }

      pointer = localPointerPosition(event, surfaceRect);
    };

    const handleMouseLeave = () => {
      active = false;
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      frameId = null;
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(surface);
    surface.addEventListener("mousemove", handleMouseMove);
    surface.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      active = false;
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      surface.removeEventListener("mousemove", handleMouseMove);
      surface.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(trailItems.flatMap((item) => [item.element, item.inner]));
    };
  }, [items, variant]);

  return (
    <div aria-hidden="true" className="image-trail" data-variant={variant} ref={rootRef}>
      {items.map((url, index) => (
        <div className="image-trail__item" key={`${url}-${index}`}>
          <div className="image-trail__img" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  );
}
