/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'github.com',
      'avatars.githubusercontent.com',
      'm.media-amazon.com',
      'images.unsplash.com',
    ],
  },
}

module.exports = nextConfig
