/** @type {import('next').NextConfig} */
const nextConfig = {
//  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['s3.us-west-2.amazonaws.com','secure.notion-static.com', 'www.notion.so', 'file.notion.so', 'www.google.com', 'goo.gl'],
  },
  i18n: {
    locales: ['en', 'mx'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
