/** @type {import('next').NextConfig} */
const nextConfig = {
  // Les redirections SEO propres
  async redirects() {
    return [
      { source: '/category/:path*', destination: '/', permanent: true },
      { source: '/2025/:path*', destination: '/', permanent: true },
      { source: '/:slug*.php', destination: '/', permanent: true },
      { source: '/blog/:path*', destination: '/', permanent: true },
      { source: '/author/:path*', destination: '/', permanent: true }
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.boulanger.com' },
      { protocol: 'https', hostname: '**.coffee-webstore.com' },
      { protocol: 'https', hostname: '**.maxicoffee.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: '**.scene7.com' }
    ],
  },
};

export default nextConfig;
