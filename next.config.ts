import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.prismic.io" },
      { protocol: "https", hostname: "*.cdn.prismic.io" },
      { protocol: "https", hostname: "*.prismic.io" },
      { protocol: "https", hostname: "prismic-io.s3.amazonaws.com" },
    ],
  },
};

export default nextConfig;
