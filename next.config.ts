import type { NextConfig } from "next";

const isPagesExport = process.env.PAGES_EXPORT === "true";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (PAGES_EXPORT=true in CI).
  // Remove once Vercel is configured as the primary deployment target.
  ...(isPagesExport && {
    output: "export",
    trailingSlash: true,
  }),
};

export default nextConfig;
