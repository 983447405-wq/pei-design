import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { posts } from "@/content/blog";
import { dictionary } from "@/content/dictionary";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  return {
    title: dictionary[locale].blog.title,
    description: dictionary[locale].blog.subtitle
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "zh") as Locale;
  const dict = dictionary[locale];

  return (
    <main>
      <Section eyebrow="Blog" title={dict.blog.title} description={dict.blog.subtitle}>
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link
              className="glass motion-card group rounded-2xl p-6 transition hover:border-lineStrong"
              href={localizedPath(locale, `/blog/${post.slug}`)}
              key={post.slug}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2 text-xs text-muted">
                    <span className="rounded-md border border-line bg-panel px-3 py-1 font-mono">{post.topic[locale]}</span>
                    <span className="rounded-md border border-line bg-panel px-3 py-1 font-mono">{post.date}</span>
                    <span className="rounded-md border border-line bg-panel px-3 py-1 font-mono">{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold tracking-[-0.035em] text-text md:text-3xl">{post.title[locale]}</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-muted">{post.excerpt[locale]}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}
