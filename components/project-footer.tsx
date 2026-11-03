import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Neighbor = { href: string; title: string } | null;

export function ProjectFooter({ locale, previous, next }: { locale: Locale; previous: Neighbor; next: Neighbor }) {
  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <nav aria-label={locale === "zh" ? "切换项目" : "Project navigation"} className="grid gap-6 sm:grid-cols-2">
        {previous ? (
          <Link
            className="group inline-flex w-fit flex-col gap-2 py-3 text-white transition hover:text-blue focus-visible:text-blue"
            href={previous.href}
          >
            <span className="text-sm text-muted">{locale === "zh" ? "上一篇" : "Previous project"}</span>
            <span className="relative inline-block text-lg font-medium transition-transform duration-300 group-hover:translate-x-7 group-focus-visible:translate-x-7">
              <ArrowLeft className="absolute right-full top-1/2 mr-2 h-5 w-5 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            className="group inline-flex w-fit flex-col justify-self-end gap-2 py-3 text-right text-white transition hover:text-blue focus-visible:text-blue"
            href={next.href}
          >
            <span className="text-sm text-muted">{locale === "zh" ? "下一篇" : "Next project"}</span>
            <span className="relative inline-block text-lg font-medium transition-transform duration-300 group-hover:-translate-x-7 group-focus-visible:-translate-x-7">
              {next.title}
              <ArrowRight className="absolute left-full top-1/2 ml-2 h-5 w-5 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
            </span>
          </Link>
        ) : null}
      </nav>
    </section>
  );
}
