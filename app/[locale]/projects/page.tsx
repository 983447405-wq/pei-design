import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { dictionary } from "@/content/dictionary";
import { projects } from "@/content/projects";
import { isLocale, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const dict = dictionary[locale];

  return {
    title: dict.projects.title,
    description: dict.projects.subtitle
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "zh") as Locale;
  const dict = dictionary[locale];

  return (
    <main>
      <Section eyebrow="Projects" title={dict.projects.title} description={dict.projects.subtitle}>
        <div className="mb-8 flex flex-wrap gap-2">
          {["AI Content", "AI Video", "Retail AI", "Virtual Try-on", "Enterprise SaaS", "Motion", "Design System"].map((tag) => (
            <span className="rounded-md border border-line bg-panel px-3 py-2 font-mono text-xs text-muted" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard project={project} locale={locale} key={project.slug} />
          ))}
        </div>
      </Section>
    </main>
  );
}
