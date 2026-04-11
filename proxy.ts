import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminToken } from '@/lib/admin-auth';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* ── Protectie pagini admin (altele decat /admin/login) ── */
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (!token || !verifyAdminToken(token)) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  /* ── Protectie API admin (altele decat /api/admin/auth) ── */
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')) {
    const token = request.cookies.get('admin_token')?.value;
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const response = NextResponse.next();
  const isDev = process.env.NODE_ENV === 'development';

  /* ── Security headers ── */
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  const csp = [
    "default-src 'self'",
    // Scripts: GTM, GA4, Google Ads, Meta Pixel, YouTube, TikTok
    `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://www.googletagmanager.com https://ssl.google-analytics.com https://www.google-analytics.com https://googleadservices.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://connect.facebook.net https://analytics.tiktok.com https://www.youtube.com https://s.ytimg.com`,
    // Styles
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Fonts
    "font-src 'self' data: https://fonts.gstatic.com",
    // Images: analytics pixels, Supabase, social
    "img-src 'self' data: blob: https: http:",
    // Media
    "media-src 'self' https://www.youtube.com https://*.supabase.co",
    // Frames: GTM noscript, YouTube, DoubleClick
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com https://td.doubleclick.net",
    // Fetch/XHR: all analytics endpoints + Supabase + Meta Conversions API
    "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://*.googletagmanager.com https://googleadservices.com https://www.googleadservices.com https://www.google.com https://www.facebook.com https://*.facebook.com https://*.facebook.net https://analytics.tiktok.com https://log.tiktokv.com https://business-api.tiktok.com https://*.supabase.co wss://*.supabase.co https://*.run.app https://conversionsapigateway.com https://*.conversionsapigateway.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
  ]
    .filter(Boolean)
    .join('; ');

  response.headers.set('Content-Security-Policy', csp);

  /* ── noindex pentru admin si api ── */
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|images|imagini|robots\\.txt|sitemap.*\\.xml).*)',
  ],
};
