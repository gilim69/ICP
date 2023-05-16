/** @type {import('next').NextConfig} */
const nextConfig = {
//  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['s3.us-west-2.amazonaws.com','secure.notion-static.com', 'www.google.com', 'goo.gl'],
  },
}

module.exports = nextConfig
