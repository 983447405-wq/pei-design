import type { ContentAdapter } from "./types";

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

export const rssAdapter: ContentAdapter = {
  channel: "rss",
  async transform(content) {
    return `<item>
  <title>${escapeXml(content.title)}</title>
  <link>${content.canonicalUrl}</link>
  <guid>${content.canonicalUrl}</guid>
  <description>${escapeXml(content.description)}</description>
  <pubDate>${new Date(content.publishDate).toUTCString()}</pubDate>
</item>`;
  }
};
