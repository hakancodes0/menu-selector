import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/menu-selector",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
