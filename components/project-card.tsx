import Link from "next/link";
import { ArrowUpRight, FileText, ImageIcon, MousePointer2, Play } from "lucide-react";
import type { Project } from "@/content/projects";
import { dictionary } from "@/content/dictionary";
import { localizedPath, type Locale } from "@/lib/i18n";

const mediaIcon = {
  Images: ImageIcon,
  PDF: FileText,
  Video: Play,
  Prototype: MousePointer2
};

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const dict = dictionary[locale];

  return (
    <article className="glass motion-card group overflow-hidden rounded-2xl">
      <div className="relative min-h-56 border-b border-line bg-panel2 p-4">
        <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_18%_12%,rgba(94,106,210,0.18),transparent_16rem)]" />
        <div className="relative rounded-xl border border-line bg-ink/55 p-3">
          <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
            <span className="font-mono text-[11px] text-dim">{project.year}</span>
          </div>
          <div className="mb-4 rounded-lg border border-line bg-panel px-3 py-2 font-mono text-xs text-muted">/case/{project.slug}</div>
          <div className="grid gap-2">
            {project.media.map((asset) => {
              const Icon = mediaIcon[asset.type];
              return (
                <div
                  className="flex items-center justify-between rounded-lg border border-line bg-white/[0.025] px-3 py-2"
                  key={asset.label.en}
                >
                  <span className="flex min-w-0 items-center gap-2 text-sm text-text">
                    <Icon className="h-4 w-4 shrink-0 text-blue" />
                    <span className="truncate">{asset.label[locale]}</span>
                  </span>
                  <span className="font-mono text-[11px] text-dim">{asset.type}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span className="rounded-md border border-line bg-panel2 px-2.5 py-1 font-mono text-[11px] text-muted" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-[-0.035em] text-text">{project.title[locale]}</h3>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
        </div>
        <p className="mb-5 min-h-14 leading-7 text-muted">{project.summary[locale]}</p>
        <div className="mb-6 grid grid-cols-3 gap-2">
          {project.metrics.map((metric) => (
            <div className="rounded-lg border border-line bg-panel2 p-3" key={metric.label.en}>
              <strong className="block text-lg text-text">{metric.value}</strong>
              <span className="text-xs text-muted">{metric.label[locale]}</span>
            </div>
          ))}
        </div>
        <Link
          className="focus-ring inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-text transition hover:border-lineStrong hover:bg-white/[0.055]"
          href={localizedPath(locale, `/projects/${project.slug}`)}
        >
          {dict.common.viewCase}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
