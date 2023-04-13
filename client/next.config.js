/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:slug',
        destination: '/api/:slug', // Matched parameters can be used in the destination
      }
    ]
  },
}

module.exports = nextConfig
