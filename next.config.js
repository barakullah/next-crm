// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* con√fig options here */
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.178.206",
      },
      {
        protocol: "https",
        hostname: "cdn.addevent.com",
      },
      {
        protocol: "https",
        hostname: "admin.atfx.digital",
      },
    ],
  },
};

module.exports = nextConfig;
