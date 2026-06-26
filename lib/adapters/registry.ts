import type { ContentAdapter, PublishChannel } from "./types";
import { notionAdapter } from "./notion";
import { rssAdapter } from "./rss";
import { wechatAdapter } from "./wechat";
import { xiaohongshuAdapter } from "./xiaohongshu";
import { zhihuAdapter } from "./zhihu";

export const contentAdapters: Record<PublishChannel, ContentAdapter> = {
  wechat: wechatAdapter,
  xiaohongshu: xiaohongshuAdapter,
  zhihu: zhihuAdapter,
  notion: notionAdapter,
  rss: rssAdapter
};

export function getContentAdapter(channel: PublishChannel) {
  return contentAdapters[channel];
}
