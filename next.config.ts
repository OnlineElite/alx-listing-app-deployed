import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["example.com", "via.placeholder.com", "a0.muscache.com"], // add your domains here
  },
};

export default nextConfig;
