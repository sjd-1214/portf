import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repository name is NOT "sjd-1214.github.io" (e.g., it's "portfolio"), 
  // you MUST uncomment the line below and set it to your repo name:
  // basePath: '/portfolio', 
};

export default nextConfig;
