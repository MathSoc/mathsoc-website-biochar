import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/oauth2/callback",
        destination: "/api/auth/callback/azure-ad",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
