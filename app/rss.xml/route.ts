import { posts } from "@/content/blog";
import { projects } from "@/content/projects";
import { resources } from "@/content/resources";
import { localizedPath } from "@/lib/i18n";
import { site } from "@/lib/seo";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = [
    ...posts.map((post) => ({
      title: post.title.zh,
      description: post.excerpt.zh,
      url: `${site.url}${localizedPath("zh", `/blog/${post.slug}`)}`,
      date: post.updated,
      category: post.category.zh
    })),
    ...projects.map((project) => ({
      title: project.title.zh,
      description: project.summary.zh,
      url: `${site.url}${localizedPath("zh", `/projects/${project.slug}`)}`,
      date: `${project.year}-01-01`,
      category: "Portfolio"
    })),
    ...resources.map((resource) => ({
      title: resource.title.zh,
      description: resource.description.zh,
      url: `${site.url}${localizedPath("zh", `/resources/${resource.slug}`)}`,
      date: resource.updated,
      category: resource.category.zh
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items
      .map(
        (item) => `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <description>${escapeXml(item.description)}</description>
      <category>${escapeXml(item.category)}</category>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`
      )
      .join("\n    ")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
