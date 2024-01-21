const { sources } = require("next/dist/compiled/webpack/webpack");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "books.google.com",
      },
    ],
  },
};

module.exports = nextConfig;
