/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "rb.gy", "assets.nflxext.com"],
  },
  transpilePackages: ["@stripe/firestore-stripe-payments"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
