import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentPosts, getPost, posts } from "@/content/blog";
import { dictionary } from "@/content/dictionary";
import { isLocale, locales, localizedPath, type Locale } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "zh";
  const post = getPost(slug);

  if (!post) return {};

  const path = localizedPath(locale, `/blog/${post.slug}`);

  return {
    title: post.title[locale],
    description: post.excerpt[locale],
    alternates: {
      canonical: absoluteUrl(path)
    },
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title: post.title[locale],
      description: post.excerpt[locale],
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      tags: post.tags
    },
    twitter: {
      card: "summary_large_image",
      title: post.title[locale],
      description: post.excerpt[locale]
    }
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "zh") as Locale;
  const post = getPost(slug);

  if (!post) notFound();

  const dict = dictionary[locale];
  const adjacent = getAdjacentPosts(post.slug);
  const canonicalUrl = absoluteUrl(localizedPath(locale, `/blog/${post.slug}`));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.excerpt[locale],
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      "@type": "Person",
      name: post.author
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    },
    mainEntityOfPage: canonicalUrl,
    keywords: post.tags.join(", ")
  };

  return (
    <main className="shell py-14 md:py-20">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link
        className="focus-ring mb-10 inline-flex items-center gap-2 rounded-md text-sm text-muted transition hover:text-text"
        href={localizedPath(locale, "/blog")}
      >
        <ArrowLeft className="h-4 w-4" />
        {dict.common.backToList}
      </Link>

      <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <div className="mb-5 flex flex-wrap gap-2 text-xs text-muted">
            <span className="rounded-md border border-line bg-panel px-3 py-1 font-mono">{post.category[locale]}</span>
            <span className="rounded-md border border-line bg-panel px-3 py-1 font-mono">{post.date}</span>
            <span className="rounded-md border border-line bg-panel px-3 py-1 font-mono">{post.readTime}</span>
          </div>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-text md:text-6xl">{post.title[locale]}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted md:text-xl">{post.excerpt[locale]}</p>

          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span className="rounded-md border border-line bg-panel2 px-3 py-1.5 font-mono text-xs text-muted" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-6">
            {post.sections.map((section, index) => (
              <section className="glass rounded-2xl p-6 md:p-8" id={`section-${index + 1}`} key={section.heading.en}>
                <span className="font-mono text-xs text-blue">0{index + 1}</span>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-text md:text-3xl">{section.heading[locale]}</h2>
                <p className="mt-4 text-base leading-8 text-muted md:text-lg">{section.body[locale]}</p>
              </section>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass rounded-2xl p-5">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-blue">TOC</p>
            <nav className="grid gap-3 text-sm text-muted">
              {post.sections.map((section, index) => (
                <a className="transition hover:text-text" href={`#section-${index + 1}`} key={section.heading.en}>
                  {section.heading[locale]}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </article>

      <nav className="mt-12 grid gap-4 md:grid-cols-2">
        {adjacent.previous ? (
          <Link className="glass motion-card rounded-2xl p-5" href={localizedPath(locale, `/blog/${adjacent.previous.slug}`)}>
            <span className="mb-3 flex items-center gap-2 text-sm text-muted">
              <ArrowLeft className="h-4 w-4" />
              {dict.common.previous}
            </span>
            <strong className="text-lg text-text">{adjacent.previous.title[locale]}</strong>
          </Link>
        ) : (
          <div />
        )}
        {adjacent.next ? (
          <Link className="glass motion-card rounded-2xl p-5 md:text-right" href={localizedPath(locale, `/blog/${adjacent.next.slug}`)}>
            <span className="mb-3 flex items-center gap-2 text-sm text-muted md:justify-end">
              {dict.common.next}
              <ArrowRight className="h-4 w-4" />
            </span>
            <strong className="text-lg text-text">{adjacent.next.title[locale]}</strong>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
