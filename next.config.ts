import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot: path.join(process.cwd()),
  async headers() {
    const longCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];
    return [
      { source: "/assets/:path*", headers: longCache },
      { source: "/_next/static/:path*", headers: longCache },
    ];
  },
  async redirects() {
    return [
      { source: "/favicon.ico", destination: "/favicon.svg", permanent: false },
      { source: "/landing-page-simples", destination: "/", permanent: true },
    ];
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
