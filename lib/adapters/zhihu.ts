import type { ContentAdapter } from "./types";

export const zhihuAdapter: ContentAdapter = {
  channel: "zhihu",
  async transform(content) {
    return [`# ${content.title}`, "", `> ${content.description}`, "", content.body, "", `首发：${content.canonicalUrl}`].join("\n");
  }
};
