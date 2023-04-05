/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "www.linkpicture.com"],
  },
  transpilePackages: ["@stripe/firestore-stripe-payments"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
