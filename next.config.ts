import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    API_ADMIN: process.env.NEXT_PUBLIC_API_ADMIN,
    API_CLIENT: process.env.NEXT_PUBLIC_API_CLIENT,
    CALLBACK_URL: process.env.NEXT_PUBLIC_CALLBACK_URL,
    CALLBACK_URL_BE: process.env.NEXT_PUBLIC_CALLBACK_URL_BE,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
