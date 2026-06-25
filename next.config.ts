import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(process.cwd()),
  async redirects() {
    return [{ source: "/favicon.ico", destination: "/favicon.svg", permanent: false }];
  },
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
};

export default nextConfig;
