import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Each route exports as folder/index.html, which every static host serves correctly.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
