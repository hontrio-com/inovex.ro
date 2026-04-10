import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, host, protocol } = request.nextUrl;
  const url = request.nextUrl.clone();

  // 1. www -> non-www redirect
  if (host.startsWith('www.')) {
    url.host = host.slice(4);
    return NextResponse.redirect(url, { status: 301 });
  }

  // 2. HTTP -> HTTPS redirect (production only)
  if (protocol === 'http:' && process.env.NODE_ENV === 'production') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, { status: 301 });
  }

  const response = NextResponse.next();

  // 3. Security headers
  const isDev = process.env.NODE_ENV === 'development';

  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com https://www.youtube.com https://player.vimeo.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https: http:",
    "media-src 'self' https://www.youtube.com https://player.vimeo.com",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.google.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com https://*.supabase.co wss://*.supabase.co",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ]
    .filter(Boolean)
    .join('; ');

  response.headers.set('Content-Security-Policy', cspDirectives);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // noindex: admin + api + configurator confirmation
  const noindexPaths = ['/admin', '/api', '/oferta/confirmare'];
  if (noindexPaths.some((p) => pathname.startsWith(p))) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};
