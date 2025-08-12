import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate a fully static site for GitHub Pages
  output: "export",
  // Use <img> fallback for next/image since there's no image optimizer on Pages
  images: { unoptimized: true },
  // Ensure routes resolve to /path/index.html on GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
