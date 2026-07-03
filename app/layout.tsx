import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { ScrollProgress } from "@/components/scroll-progress";
import { site } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: "Pei Design",
  title: {
    default: site.name,
    template: `%s | ${site.name}`
  },
  description: site.description,
  authors: [{ name: site.author }],
  creator: site.author,
  publisher: site.author,
  category: "portfolio",
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/zh",
      "en-US": "/en"
    },
    types: {
      "application/rss+xml": "/rss.xml"
    }
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "512x512" }
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Pei Design - Product Designer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/og.svg"]
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
        <ScrollProgress />
        <CursorSpotlight />
        {children}
      </body>
    </html>
  );
}
