import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Each route exports as folder/index.html, which every static host serves correctly.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // The whole stylesheet is ~10KB gzipped. Inlining it removes the only render-blocking
    // request, which otherwise shares the connection with the font preloads and delays
    // first paint on slow mobile networks.
    inlineCss: true,
  },
};

export default nextConfig;
