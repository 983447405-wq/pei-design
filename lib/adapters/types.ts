export type PublishChannel = "wechat" | "xiaohongshu" | "zhihu" | "notion" | "rss";

export type NormalizedContent = {
  title: string;
  description: string;
  body: string;
  cover?: string;
  tags: string[];
  canonicalUrl: string;
  publishDate: string;
  author: string;
};

export type ContentAdapter = {
  channel: PublishChannel;
  transform: (content: NormalizedContent) => Promise<string>;
  publish?: (payload: string) => Promise<void>;
};
