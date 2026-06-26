import type { NextConfig } from "next";

const isCloudflareStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  ...(isCloudflareStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: {
          unoptimized: true
        }
      }
    : {})
};

export default nextConfig;
