import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Production configuration */
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Enable static exports if needed
  // output: 'export',
  // distDir: 'out',
};

export default nextConfig;
