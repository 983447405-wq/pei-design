import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { localizedPath, type Locale } from "@/lib/i18n";

const coverGradient = {
  cyan: "radial-gradient(circle at 22% 18%, rgba(34, 211, 238, 0.38), transparent 18rem), linear-gradient(135deg, #04151f, #0f3a4a 46%, #071014)",
  blue: "radial-gradient(circle at 22% 18%, rgba(94, 106, 210, 0.42), transparent 18rem), linear-gradient(135deg, #080c18, #1d2552 46%, #06070b)",
  violet:
    "radial-gradient(circle at 22% 18%, rgba(255, 59, 213, 0.28), transparent 18rem), linear-gradient(135deg, #160a21, #3f1c63 46%, #08040c)"
} satisfies Record<Project["tone"], string>;

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <Link
      className="project-visual-card motion-card group block overflow-hidden rounded-2xl"
      href={localizedPath(locale, `/projects/${project.slug}`)}
    >
      <div className="project-visual-cover" style={{ "--project-cover": coverGradient[project.tone] } as CSSProperties}>
        <div className="project-visual-window">
          <div className="project-visual-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="project-visual-orbit" />
          <div className="project-visual-panel project-visual-panel-a" />
          <div className="project-visual-panel project-visual-panel-b" />
          <div className="project-visual-panel project-visual-panel-c" />
        </div>
        <span className="project-visual-year">{project.year}</span>
      </div>
      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span className="rounded-full border border-line bg-panel2 px-2.5 py-1 font-mono text-[11px] text-muted" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-text md:text-3xl">{project.title[locale]}</h3>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
        </div>
        <p className="max-w-xl leading-7 text-muted">{project.summary[locale]}</p>
        <p className="mt-5 border-t border-line pt-4 font-mono text-xs uppercase tracking-[0.08em] text-blue">{project.impact[locale]}</p>
      </div>
    </Link>
  );
}
