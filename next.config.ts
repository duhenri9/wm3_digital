import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.wm3digital.com.br' },
      { protocol: 'https', hostname: 'wm3digital.com.br' },
      { protocol: 'http', hostname: 'localhost' },
    ],
    formats: ["image/webp", "image/avif"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
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

export default withNextIntl(nextConfig);
