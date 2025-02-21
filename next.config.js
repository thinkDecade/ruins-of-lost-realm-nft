/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io'], // Add your IPFS gateway or image domains here
  },
}

module.exports = nextConfig 