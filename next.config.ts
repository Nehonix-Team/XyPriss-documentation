import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next",
  experimental: {
    // Helps with filesystem watching on some network/virtual drives
    useWatchman: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "dll.nehonix.com",
      },
      {
        protocol: "https",
        hostname: "dll.nehonix.com",
      },
    ],
  },
};

export default nextConfig;
