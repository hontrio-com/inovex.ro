import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase-middleware';
import { cale, citesteCale, existaIn, rutaPublica, type Limba } from '@/lib/i18n/config';
import { COOKIE_LIMBA, limbaPentru } from '@/lib/i18n/detectare';

/* Ce nu e pagina a site-ului public: adminul, API-ul, semnarea contractelor, rutele Next/Vercel si
   fisierele (imagini, manifest, sitemap-uri, fonturi, .well-known). Extensiile sunt enumerate, ca un
   slug cu punct (ex. un produs din marketplace) sa ramana pagina. */
const NU_E_SITE = /^\/(admin|api|contract|_next|_vercel|__nextjs|\.well-known)(\/|$)/;
const FISIER = /\.(png|jpe?g|webp|avif|gif|svg|ico|txt|xml|json|webmanifest|js|mjs|css|map|woff2?|ttf|otf|pdf|mp4|webm|mp3|zip)$/i;
const esteSitePublic = (pathname: string) => !NU_E_SITE.test(pathname) && !FISIER.test(pathname);

/* ── Limba vizitatorului nou (2026-11-07, lib/i18n/detectare.ts): la prima pagina, dupa tara (Vercel) si
   limbile browserului. Daca pagina exista in limba lui, redirect temporar spre ea (cu tot cu ?utm/gclid);
   limba ramane intr-un cookie un an, deci detectarea se face o singura data, iar alegerea facuta de mana
   (selectorul din subsol scrie acelasi cookie) are mereu ultimul cuvant. Robotii (motoare de cautare,
   verificarea reclamelor, previzualizari de linkuri, unelte de test) nu sunt redirectionati niciodata: vad
   exact pagina ceruta, altfel Google n-ar mai indexa paginile romanesti (crawlerul lui vine din SUA). */
const ROBOT =
  /bot|crawl|spider|slurp|mediapartners|google-inspectiontool|googleother|feedfetcher|facebookexternalhit|meta-externalagent|embedly|quora link preview|outbrain|vkshare|w3c_validator|whatsapp|skypeuripreview|bingpreview|lighthouse|pagespeed|headlesschrome|gtmetrix|ahrefs|semrush|petalbot|yandex|baidu|duckduck|applebot|gptbot|chatgpt-user|oai-searchbot|claude|anthropic|perplexity|ccbot|bytespider|amazonbot|diffbot|curl|wget|python-requests|python-urllib|httpclient|node-fetch|undici|axios|go-http-client|java\/|okhttp|scrapy|phantomjs|selenium|puppeteer|playwright/i;

function tineLimba(response: NextResponse, lang: Limba) {
  response.cookies.set(COOKIE_LIMBA, lang, {
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

/** Ce face cu un vizitator nou: redirect spre limba lui, doar tine minte limba (e deja pe ea) sau nimic. */
function limbaAutomata(request: NextRequest): { redirect: NextResponse } | { tine: Limba } | null {
  if (request.method !== 'GET' || request.cookies.has(COOKIE_LIMBA)) return null;
  const ua = request.headers.get('user-agent') ?? '';
  if (!ua || ROBOT.test(ua)) return null;
  // doar navigarea propriu-zisa, nu cererile routerului (RSC, prefetch)
  if (request.headers.has('rsc') || request.headers.has('next-router-prefetch') || request.headers.get('purpose') === 'prefetch') return null;
  const destinatie = request.headers.get('sec-fetch-dest');
  if (destinatie && destinatie !== 'document') return null;
  // tara vine de la Vercel (x-vercel-ip-country, ce citeste si geolocation() din @vercel/functions); fara ea nu ghicim
  const tara = request.headers.get('x-vercel-ip-country');
  if (!tara) return null;

  const dorita = limbaPentru(tara, request.headers.get('accept-language'));
  const { lang, intern } = citesteCale(request.nextUrl.pathname);
  if (dorita === lang) return { tine: dorita };
  // pagina nu exista in limba lui (ex. un articol de blog romanesc): ramane aici; urmatoarea pagina mai incearca
  if (!existaIn(dorita, intern)) return null;
  const url = request.nextUrl.clone();
  url.pathname = cale(dorita, intern);
  const redirect = NextResponse.redirect(url, 307);
  redirect.headers.set('Cache-Control', 'private, no-store');
  tineLimba(redirect, dorita);
  return { redirect };
}

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
    // Scripts: GTM, GA4, Google Ads, Meta Pixel, YouTube, TikTok, OpenAI Ads, LinkedIn Insight Tag
    `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://www.googletagmanager.com https://ssl.google-analytics.com https://www.google-analytics.com https://googleadservices.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://connect.facebook.net https://analytics.tiktok.com https://www.youtube.com https://s.ytimg.com https://bzrcdn.openai.com https://snap.licdn.com`,
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
    // Fetch/XHR: all analytics endpoints + Supabase + Meta Conversions API + OpenAI Ads + LinkedIn Insight Tag
    // (insight.min.js trimite prin fetch / sendBeacon la px.ads.linkedin.com; imaginile trec prin img-src https:)
    "connect-src 'self' https://px.ads.linkedin.com https://bzr.openai.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://*.googletagmanager.com https://googleadservices.com https://www.googleadservices.com https://www.google.com https://www.facebook.com https://*.facebook.com https://*.facebook.net https://analytics.tiktok.com https://log.tiktokv.com https://business-api.tiktok.com https://*.supabase.co wss://*.supabase.co https://*.run.app https://conversionsapigateway.com https://*.conversionsapigateway.com",
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

  let response = NextResponse.next({ request });

  /* ── Auth: doar PAGINILE de admin verifica sesiunea in proxy.
     Rutele /api/admin/* se protejeaza singure (requireAuth/requireRole in
     fiecare handler), deci nu mai facem un getUser aici — economisim un
     round-trip catre Supabase pe fiecare request de API. */
  if (isAdminPage) {
    const { response: sessionResponse, user } = await updateSession(request);
    response = sessionResponse;

    if (pathname !== '/admin/login' && !user) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return applySecurityHeaders(copyCookies(NextResponse.redirect(loginUrl), response), pathname);
    }
    if (pathname === '/admin/login' && user) {
      return applySecurityHeaders(copyCookies(NextResponse.redirect(new URL('/admin', request.url)), response), pathname);
    }
  }

  /* ── Site public pe limbi (2026-11-05, lib/i18n/config.ts): paginile stau sub app/[lang]. Romana ramane
     la adresele de pana acum (/contact se rescrie intern pe /ro/contact), engleza/germana/franceza au
     adrese traduse (/de/kontakt -> /de/contact), /ro/... trimite la adresa fara prefix, iar o pagina
     netradusa inca da 404 in limba ceruta. */
  if (esteSitePublic(pathname)) {
    const automata = limbaAutomata(request);
    if (automata && 'redirect' in automata) return applySecurityHeaders(automata.redirect, pathname);
    const ruta = rutaPublica(pathname);
    const url = request.nextUrl.clone();
    url.pathname = ruta.cale;
    if (ruta.tip === 'redirect') return applySecurityHeaders(NextResponse.redirect(url, 308), pathname);
    response = NextResponse.rewrite(url, { request });
    if (automata) tineLimba(response, automata.tine);
  }

  /* ── LinkedIn Ads: click ID-ul din link-ul reclamei (?li_fat_id=…) ramane 30 de zile intr-un cookie primar,
     ca lead-ul de pe site sa-l poata trimite prin Conversions API (lib/crm/website-lead.ts). Insight Tag pune
     acelasi cookie, dar nu si cand e blocat de un ad blocker — exact cazul pentru care exista trimiterea de pe server. */
  const liFatId = request.nextUrl.searchParams.get('li_fat_id');
  if (liFatId && /^[A-Za-z0-9-]{8,100}$/.test(liFatId) && !isAdminPage && !pathname.startsWith('/api')) {
    response.cookies.set('li_fat_id', liFatId, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  return applySecurityHeaders(response, pathname);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|images|imagini|robots\\.txt|sitemap.*\\.xml).*)',
  ],
};
