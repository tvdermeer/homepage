import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      'html2canvas': 'html2canvas-pro',
    },
  },
  webpack: (config) => {
    config.resolve.alias.html2canvas = 'html2canvas-pro';
    return config;
  },
};

export default nextConfig;
