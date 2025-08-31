import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["example.com", "via.placeholder.com"], // add your domains here
  },
};

export default nextConfig;
