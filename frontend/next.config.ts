import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Smaller, modern image formats + long cache for optimized variants.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "www.figma.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  // One Terms page to maintain; the old address keeps working.
  async redirects() {
    return [{ source: "/terms-and-conditions", destination: "/terms", permanent: true }];
  },
  // Tree-shake heavy barrel imports (lucide-react is optimized by default).
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  // Strip console.* (except errors/warnings) from production bundles.
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
