import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://static.tildacdn.com/**")],
  },
  // Exclude problematic dependencies from server bundle (works with both webpack and turbopack)
  serverExternalPackages: [
    "node-telegram-bot-api",
    "array.prototype.findindex",
    "asn1",
    "assert-plus",
  ],
  // Turbopack configuration (empty config to silence the warning)
  turbopack: {},
};

export default nextConfig;
