"use client";

import { useEffect, useMemo, useState } from "react";

type TextTypeProps = {
  texts: string[];
  className?: string;
  cursorClassName?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  cursorCharacter?: string;
};

export function TextType({
  texts,
  className,
  cursorClassName,
  typingSpeed = 34,
  deletingSpeed = 18,
  initialDelay = 260,
  pauseDuration = 1600,
  cursorCharacter = "|"
}: TextTypeProps) {
  const phrases = useMemo(() => texts.map((text) => text.trim()).filter(Boolean), [texts]);
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(media.matches);

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!phrases.length) return;

    if (prefersReducedMotion) {
      setDisplayText(phrases[0]);
      setCharCount(phrases[0].length);
      return;
    }

    const currentPhrase = phrases[phraseIndex % phrases.length];
    const delay = phase === "pausing" ? pauseDuration : phase === "deleting" ? deletingSpeed : charCount === 0 ? initialDelay : typingSpeed;

    const timeout = window.setTimeout(() => {
      if (phase === "typing") {
        const nextCount = Math.min(charCount + 1, currentPhrase.length);
        setDisplayText(currentPhrase.slice(0, nextCount));
        setCharCount(nextCount);

        if (nextCount === currentPhrase.length) {
          setPhase("pausing");
        }
        return;
      }

      if (phase === "pausing") {
        if (phrases.length === 1) return;
        setPhase("deleting");
        return;
      }

      const nextCount = Math.max(charCount - 1, 0);
      setDisplayText(currentPhrase.slice(0, nextCount));
      setCharCount(nextCount);

      if (nextCount === 0) {
        setPhraseIndex((index) => (index + 1) % phrases.length);
        setPhase("typing");
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [charCount, deletingSpeed, initialDelay, pauseDuration, phase, phraseIndex, phrases, prefersReducedMotion, typingSpeed]);

  return (
    <span aria-hidden="true" className={className}>
      {displayText}
      {!prefersReducedMotion ? <span className={cursorClassName ?? "text-type-cursor"}>{cursorCharacter}</span> : null}
    </span>
  );
}
