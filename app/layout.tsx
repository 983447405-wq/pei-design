import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { site } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`
  },
  description: site.description,
  authors: [{ name: site.author }],
  creator: site.author,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description
  }
};

export const viewport: Viewport = {
  themeColor: "#010102",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <CursorSpotlight />
        {children}
      </body>
    </html>
  );
}
