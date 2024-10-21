/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true, // Add this line for static exports
};

module.exports = nextConfig;
