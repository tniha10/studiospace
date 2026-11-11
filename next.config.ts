import type { NextConfig } from "next";

// The Express API runs separately from Next.js. During development it is on
// port 5000. On Render (or any host) set API_URL to the public server URL.
const apiUrl = (process.env.API_URL ?? "http://localhost:5000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,

  // Keep cookies first-party: the browser only ever talks to the Next.js
  // origin, and Next.js forwards /api/* to Express.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Hosts and members can paste any image URL. ImgBB uploads are included.
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
