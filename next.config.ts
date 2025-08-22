import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/wp-content/uploads/:path*",
        destination: "/documents/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
