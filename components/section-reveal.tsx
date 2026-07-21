"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SECTION_SELECTOR = "main > section";

export function SectionReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    sections.forEach((section, index) => {
      section.dataset.reveal = "section";
      section.style.setProperty("--reveal-order", String(index % 4));
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-inview"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-inview");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.05
      }
    );

    sections.forEach((section) => {
      const bounds = section.getBoundingClientRect();

      if (bounds.top < window.innerHeight * 0.88) {
        section.classList.add("is-inview");
        return;
      }

      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
