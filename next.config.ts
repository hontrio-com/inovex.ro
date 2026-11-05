import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compress: true,

  // Include fonturile TTF in bundle-ul rutei de semnare (PDF pe serverless).
  outputFileTracingIncludes: {
    '/api/contract/[token]/sign': ['./public/fonts/**'],
  },

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
    // Cache-ul lung doar in productie. In `next dev` fisierele isi pastreaza numele cand li se
    // schimba continutul, iar un cache „immutable” ar lasa browserul cu versiunea veche (de ex. CSS).
    const cacheLung =
      process.env.NODE_ENV === 'production'
        ? [
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
          ]
        : [];

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      ...cacheLung,
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
