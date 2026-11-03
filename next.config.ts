import type { NextConfig } from "next";

const isCloudflareStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    unoptimized: true
  },
  ...(isCloudflareStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true
      }
    : {})
};

export default nextConfig;
