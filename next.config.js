/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'mx', 'ru-RU'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['s3.us-west-2.amazonaws.com','secure.notion-static.com', 'www.google.com'],
  },
    eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
