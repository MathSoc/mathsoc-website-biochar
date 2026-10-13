import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/wp-content/uploads/:path*",
        destination: "/documents/:path*",
        permanent: true,
      },
    ];
  },
  outputFileTracingExcludes: {
    "/*": ["public/img/cartoons**/*"],
  },
  outputFileTracingIncludes: {
    "/api/board-games": [
      "./src/app/board-games/bgg-matches.csv",
    ],
  },
};

export default nextConfig;