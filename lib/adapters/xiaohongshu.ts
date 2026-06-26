import type { ContentAdapter } from "./types";

export const xiaohongshuAdapter: ContentAdapter = {
  channel: "xiaohongshu",
  async transform(content) {
    const tags = content.tags.map((tag) => `#${tag.replace(/\s+/g, "")}`).join(" ");

    return [`${content.title}`, "", content.description, "", content.body, "", tags, content.canonicalUrl].join("\n");
  }
};
