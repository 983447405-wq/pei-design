import type { ContentAdapter } from "./types";

export const wechatAdapter: ContentAdapter = {
  channel: "wechat",
  async transform(content) {
    return [`# ${content.title}`, "", content.description, "", content.body, "", `原文链接：${content.canonicalUrl}`].join("\n");
  }
};
