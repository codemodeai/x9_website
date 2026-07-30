import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Chrome resolves `localhost` to ::1 here, which the dev server does not
  // serve, so local review happens over 127.0.0.1. Without this, HMR and other
  // /_next dev resources are blocked as cross-origin.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
