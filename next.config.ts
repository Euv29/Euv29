import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=()" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'" },
        ],
      },
    ];
  },
  images: {
    // Either disable optimization for all images:
    // unoptimized: true,
    
    // Or configure optimization to skip GIFs:
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // If you have remote image sources, configure them here
    ],
    // This is implied - Next.js won't try to optimize GIFs
  },
  /* other config options here */
};

export default nextConfig;
