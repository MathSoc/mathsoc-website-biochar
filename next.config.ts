import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/oauth2/callback",
        destination: "/api/auth/callback/azure-ad",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/:path*",
        destination: "/documents/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
