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
};

export default nextConfig;
