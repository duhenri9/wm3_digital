import type { NextConfig } from "next";

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    domains: ["www.wm3digital.com.br", "localhost"],
    formats: ["image/webp", "image/avif"],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
} satisfies NextConfig;

export default nextConfig;
