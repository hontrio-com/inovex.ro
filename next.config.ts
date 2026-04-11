import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'inovex.ro' },
      { protocol: 'https', hostname: 'www.inovex.ro' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  async headers() {
    const csp = [
      "default-src 'self'",
      // Scripts: GTM, GA4, Google Ads, Meta Pixel, YouTube embeds
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://analytics.google.com https://googleadservices.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://connect.facebook.net https://www.youtube.com https://s.ytimg.com",
      // Styles: Google Fonts + inline styles (needed for Next.js)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: analytics pixels, Supabase, YouTube thumbnails
      "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.google.com https://www.facebook.com https://*.facebook.com https://*.supabase.co https://*.ytimg.com https://*.youtube.com https://inovex.ro https://www.inovex.ro",
      // Fetch/XHR: analytics endpoints, Supabase, our own API
      "connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://*.googletagmanager.com https://www.facebook.com https://*.facebook.com https://*.supabase.co wss://*.supabase.co",
      // Frames: GTM iframe fallback, YouTube embeds
      "frame-src https://www.googletagmanager.com https://td.doubleclick.net https://www.youtube.com https://www.youtube-nocookie.com",
      // Media
      "media-src 'self' https://*.supabase.co",
    ].join('; ')

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
      {
        source: '/imagini/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/servicii',
        destination: '/servicii/magazine-online',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
