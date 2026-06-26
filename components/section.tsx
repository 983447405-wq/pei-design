import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, description, children, className = "" }: SectionProps) {
  return (
    <section className={`shell motion-rise py-16 md:py-24 ${className}`}>
      {(eyebrow || title || description) && (
        <div className="mb-10 max-w-3xl">
          {eyebrow ? <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">{eyebrow}</p> : null}
          {title ? <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] text-text md:text-5xl">{title}</h2> : null}
          {description ? <p className="mt-4 text-base leading-8 text-muted md:text-lg">{description}</p> : null}
        </div>
      )}
      {children}
    </section>
  );
}
