"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SECTION_SELECTOR = "main > section:not([data-project-page]):not([data-project-sequence])";
const PROJECT_PAGE_SELECTOR = "main [data-project-page]";

export function SectionReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
    const projectPages = Array.from(document.querySelectorAll<HTMLElement>(PROJECT_PAGE_SELECTOR));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    sections.forEach((section, index) => {
      section.dataset.reveal = "section";
      section.style.setProperty("--reveal-order", String(index % 4));
    });

    projectPages.forEach((page) => {
      page.dataset.reveal = "page";
    });

    const targets = [...sections, ...projectPages];

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-inview"));
      return;
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-inview");
          sectionObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -6% 0px",
        threshold: 0.05
      }
    );

    const pageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.5) return;

          entry.target.classList.add("is-inview");
          pageObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const bounds = section.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.88) {
        section.classList.add("is-inview");
        return;
      }

      sectionObserver.observe(section);
    });

    projectPages.forEach((page) => {
      const bounds = page.getBoundingClientRect();
      const visibleHeight = Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0));

      if (bounds.bottom <= 0 || (bounds.height > 0 && visibleHeight / bounds.height >= 0.5)) {
        page.classList.add("is-inview");
        return;
      }

      pageObserver.observe(page);
    });

    return () => {
      sectionObserver.disconnect();
      pageObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
