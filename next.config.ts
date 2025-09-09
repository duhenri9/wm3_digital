import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['www.wm3digital.com.br']
  },

};

export default nextConfig;
