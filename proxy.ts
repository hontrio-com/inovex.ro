import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase-middleware';

/* ── Copiaza cookie-urile de sesiune (refresh Supabase) pe un raspuns nou ── */
function copyCookies(target: NextResponse, source: NextResponse) {
  source.cookies.getAll().forEach((cookie) => target.cookies.set(cookie));
  return target;
}

/* ── Security headers + CSP + noindex (aplicate pe orice raspuns) ── */
function applySecurityHeaders(response: NextResponse, pathname: string) {
  const isDev = process.env.NODE_ENV === 'development';

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

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');
  // Endpointul de login (POST) trebuie accesibil fara sesiune.
  const isAuthEndpoint = pathname.startsWith('/api/admin/auth');

  let response = NextResponse.next({ request });

  /* ── Auth: doar zona de admin verifica sesiunea Supabase ──
     (evitam un round-trip catre Supabase pe fiecare pagina publica) */
  if ((isAdminPage || isAdminApi) && !isAuthEndpoint) {
    const { response: sessionResponse, user } = await updateSession(request);
    response = sessionResponse;

    // Pagini admin (fara /admin/login) — necesita sesiune.
    if (isAdminPage && pathname !== '/admin/login' && !user) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return applySecurityHeaders(copyCookies(NextResponse.redirect(loginUrl), response), pathname);
    }

    // Utilizator deja logat pe pagina de login — trimite-l in dashboard.
    if (pathname === '/admin/login' && user) {
      return applySecurityHeaders(
        copyCookies(NextResponse.redirect(new URL('/admin', request.url)), response),
        pathname,
      );
    }

    // API admin (fara /api/admin/auth) — necesita sesiune.
    if (isAdminApi && !user) {
      return applySecurityHeaders(
        copyCookies(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), response),
        pathname,
      );
    }
  }

  return applySecurityHeaders(response, pathname);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|images|imagini|robots\\.txt|sitemap.*\\.xml).*)',
  ],
};
