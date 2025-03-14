/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        'react-server-dom-webpack/server.edge': 'react-server-dom-webpack/server.node'
      }
    }
  },
  output: 'standalone',
  images: {
    unoptimized: true
  },
  async headers() {
    return [
      {
        source: '/video/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 