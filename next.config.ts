import type { NextConfig } from "next";

const isCloudflareStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
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
