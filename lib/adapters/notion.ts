import type { ContentAdapter } from "./types";

export const notionAdapter: ContentAdapter = {
  channel: "notion",
  async transform(content) {
    return JSON.stringify(
      {
        title: content.title,
        description: content.description,
        body: content.body,
        tags: content.tags,
        canonicalUrl: content.canonicalUrl,
        publishDate: content.publishDate,
        author: content.author
      },
      null,
      2
    );
  }
};
