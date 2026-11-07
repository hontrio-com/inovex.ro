/* Limbile site-ului (adaugate pe 2026-11-05, pentru campaniile din afara Romaniei).

   Romana ramane la adresele de pana acum (inovex.ro/contact), fara prefix. Engleza, germana si franceza
   stau sub /en, /de si /fr, cu adrese traduse (inovex.ro/de/kontakt). Intern, toate paginile sunt sub
   app/[lang], cu numele romanesti ale folderelor: proxy.ts rescrie adresa publica in calea interna
   (/contact -> /ro/contact, /de/kontakt -> /de/contact). Componentele construiesc linkurile cu cale(). */

export const LIMBI = ['ro', 'en', 'de', 'fr'] as const;
export type Limba = (typeof LIMBI)[number];
export type LimbaStraina = Exclude<Limba, 'ro'>;

export const LIMBA_IMPLICITA: Limba = 'ro';
export const LIMBI_STRAINE: LimbaStraina[] = ['en', 'de', 'fr'];

export const esteLimba = (v: string | undefined | null): v is Limba => !!v && (LIMBI as readonly string[]).includes(v);

export const NUME_LIMBI: Record<Limba, { cod: string; nume: string; og: string }> = {
  ro: { cod: 'RO', nume: 'Română', og: 'ro_RO' },
  en: { cod: 'EN', nume: 'English', og: 'en_GB' },
  de: { cod: 'DE', nume: 'Deutsch', og: 'de_DE' },
  fr: { cod: 'FR', nume: 'Français', og: 'fr_FR' },
};

export const SITE_URL = 'https://inovex.ro';

/** Adresele traduse ale paginilor. Cheia e adresa romaneasca, care e si calea interna (sub app/[lang]). */
export const RUTE: Record<string, Record<LimbaStraina, string>> = {
  '/': { en: '/', de: '/', fr: '/' },
  '/portofoliu': { en: '/portfolio', de: '/referenzen', fr: '/realisations' },
  '/contact': { en: '/contact', de: '/kontakt', fr: '/contact' },
  '/oferta': { en: '/get-a-quote', de: '/angebot-anfordern', fr: '/demande-de-devis' },
  '/despre-noi': { en: '/about-us', de: '/ueber-uns', fr: '/a-propos' },
  '/servicii/magazine-online': { en: '/services/online-stores', de: '/leistungen/online-shops', fr: '/services/boutiques-en-ligne' },
  '/servicii/website-de-prezentare': { en: '/services/business-websites', de: '/leistungen/unternehmenswebsites', fr: '/services/sites-vitrines' },
  '/servicii/aplicatii-web-saas': { en: '/services/web-apps-saas', de: '/leistungen/web-apps-saas', fr: '/services/applications-web-saas' },
  '/servicii/cms-crm-erp': { en: '/services/cms-crm-erp', de: '/leistungen/cms-crm-erp', fr: '/services/cms-crm-erp' },
  '/servicii/aplicatii-mobile': { en: '/services/mobile-apps', de: '/leistungen/mobile-apps', fr: '/services/applications-mobiles' },
  '/servicii/automatizari-ai': { en: '/services/ai-automation', de: '/leistungen/ki-automatisierung', fr: '/services/automatisation-ia' },
  '/servicii/video-motion-design': { en: '/services/motion-design-video', de: '/leistungen/motion-design-video', fr: '/services/video-motion-design' },
  '/servicii/video-motion-design/multumim': {
    en: '/services/motion-design-video/thank-you',
    de: '/leistungen/motion-design-video/danke',
    fr: '/services/video-motion-design/merci',
  },
  '/configurare-magazin-online': { en: '/configure/online-store', de: '/konfigurator/online-shop', fr: '/configurateur/boutique-en-ligne' },
  '/configurare-website-prezentare': { en: '/configure/business-website', de: '/konfigurator/unternehmenswebsite', fr: '/configurateur/site-vitrine' },
  '/configurare-aplicatie-web': { en: '/configure/web-app', de: '/konfigurator/web-app', fr: '/configurateur/application-web' },
  '/configurare-automatizari-ai': { en: '/configure/ai-automation', de: '/konfigurator/ki-automatisierung', fr: '/configurateur/automatisation-ia' },
  '/politica-de-confidentialitate': { en: '/privacy-policy', de: '/datenschutz', fr: '/politique-de-confidentialite' },
  '/politica-cookies': { en: '/cookie-policy', de: '/cookie-richtlinie', fr: '/politique-de-cookies' },
  '/termeni-si-conditii': { en: '/terms-and-conditions', de: '/agb', fr: '/conditions-generales' },
};

/**
 * Paginile deja traduse, deci vizibile si pe /en, /de, /fr. Celelalte (inca netraduse, sau doar pentru
 * Romania: blog, Invata gratuit, Marketplace) raspund 404 in celelalte limbi. Se adauga pe rand.
 */
export const TRADUSE = new Set<string>([
  '/',
  '/contact',
  '/oferta',
  '/politica-de-confidentialitate',
  '/politica-cookies',
  '/termeni-si-conditii',
  '/servicii/video-motion-design',
  '/servicii/video-motion-design/multumim',
  '/configurare-magazin-online',
  '/configurare-website-prezentare',
  '/configurare-aplicatie-web',
  '/configurare-automatizari-ai',
  // in EN/DE/FR, cu portofoliul international (lib/portofoliu-international.ts)
  '/portofoliu',
]);

export const existaIn = (lang: Limba, intern: string) => lang === 'ro' || TRADUSE.has(intern);

// adresa tradusa -> calea interna, pe fiecare limba
const INVERS = Object.fromEntries(
  LIMBI_STRAINE.map((lang) => [lang, new Map(Object.entries(RUTE).map(([intern, tr]) => [tr[lang], intern]))]),
) as Record<LimbaStraina, Map<string, string>>;

// desparte „/oferta?serviciu=x#formular” in cale si rest
function desparte(href: string): [string, string] {
  const i = href.search(/[?#]/);
  return i === -1 ? [href, ''] : [href.slice(0, i), href.slice(i)];
}

/** Adresa publica a unei pagini in limba data: cale('de', '/contact') = '/de/kontakt'. Accepta ?query si #ancora. */
export function cale(lang: Limba, intern: string): string {
  if (lang === 'ro') return intern;
  const [p, rest] = desparte(intern);
  const tradusa = RUTE[p]?.[lang] ?? p;
  return (tradusa === '/' ? `/${lang}` : `/${lang}${tradusa}`) + rest;
}

/**
 * Ce tine locul paginilor netraduse in EN/DE/FR. Decizia userului (2026-11-07): paginile de servicii si
 * „Despre noi” raman deocamdata doar in romana. Ca niciun link de pe paginile traduse sa nu duca la 404,
 * serviciile duc la configuratorul lor (sau la cererea de oferta, cu serviciul ales). Portofoliul e tradus
 * (2026-11-07), deci linkul lui duce la pagina; inlocuitorul ramane doar ca rezerva.
 */
const INLOCUITORI: Record<string, string> = {
  '/portofoliu': '/#portofoliu',
  '/servicii/magazine-online': '/configurare-magazin-online',
  '/servicii/website-de-prezentare': '/configurare-website-prezentare',
  '/servicii/aplicatii-web-saas': '/configurare-aplicatie-web',
  '/servicii/automatizari-ai': '/configurare-automatizari-ai',
  '/servicii/cms-crm-erp': `/oferta?serviciu=${encodeURIComponent('CMS, CRM & ERP')}`,
  '/servicii/aplicatii-mobile': `/oferta?serviciu=${encodeURIComponent('Aplicatie Mobila')}`,
};

/**
 * Linkul spre o pagina in limba data: pagina insasi, daca exista in limba aceea (in romana, mereu);
 * altfel inlocuitorul ei tradus (INLOCUITORI); altfel null, iar linkul nu se afiseaza.
 */
export function linkPagina(lang: Limba, intern: string): string | null {
  const [p] = desparte(intern);
  if (existaIn(lang, p)) return cale(lang, intern);
  return INLOCUITORI[p] ? cale(lang, INLOCUITORI[p]) : null;
}

/**
 * Limba si calea interna pentru o adresa publica: '/de/kontakt' -> { lang: 'de', intern: '/contact' }.
 * Primeste si forma interna ('/ro/contact', '/de/contact'), ca sa mearga oricum ar veni adresa.
 */
export function citesteCale(pathname: string): { lang: Limba; intern: string } {
  const seg = pathname.split('/')[1];
  if (esteLimba(seg)) {
    const rest = pathname.slice(seg.length + 1) || '/';
    if (seg === 'ro') return { lang: 'ro', intern: rest };
    return { lang: seg, intern: INVERS[seg].get(rest) ?? rest };
  }
  return { lang: 'ro', intern: pathname || '/' };
}

/** Echivalentul paginii curente in fiecare limba; unde pagina nu exista inca, prima pagina a limbii. */
export function alternante(pathname: string): Record<Limba, string> {
  const { intern } = citesteCale(pathname);
  return Object.fromEntries(LIMBI.map((l) => [l, cale(l, existaIn(l, intern) ? intern : '/')])) as Record<Limba, string>;
}

/**
 * Pentru proxy.ts: ce face cu o adresa publica a site-ului. Romana se rescrie sub /ro; o adresa tradusa
 * se rescrie pe calea interna; /ro/... si adresele interne folosite in alte limbi trimit la adresa corecta;
 * o pagina care nu exista (inca) in limba ceruta duce la 404.
 */
export function rutaPublica(pathname: string): { tip: 'rescrie' | 'redirect'; cale: string } {
  const seg = pathname.split('/')[1];
  if (!esteLimba(seg)) return { tip: 'rescrie', cale: pathname === '/' ? '/ro' : `/ro${pathname}` };
  if (seg === 'ro') return { tip: 'redirect', cale: pathname.slice(3) || '/' };

  const rest = pathname.slice(seg.length + 1) || '/';
  const intern = INVERS[seg].get(rest);
  if (intern && TRADUSE.has(intern)) return { tip: 'rescrie', cale: intern === '/' ? `/${seg}` : `/${seg}${intern}` };
  // adresa romaneasca folosita sub /en (ex. /en/portofoliu): trimite la cea tradusa
  if (!intern && RUTE[rest] && TRADUSE.has(rest)) return { tip: 'redirect', cale: cale(seg, rest) };
  return { tip: 'rescrie', cale: `/${seg}/__negasit` };
}

/** hreflang + canonical pentru metadata unei pagini traduse. */
export function alternanteMetadata(lang: Limba, intern: string) {
  const url = (l: Limba) => `${SITE_URL}${cale(l, intern) === '/' ? '' : cale(l, intern)}`;
  if (!TRADUSE.has(intern)) return { canonical: url(lang) };
  return {
    canonical: url(lang),
    languages: {
      ro: url('ro'),
      en: url('en'),
      de: url('de'),
      fr: url('fr'),
      // vizitatorii din alte tari (fara pagina in limba lor) primesc engleza
      'x-default': url('en'),
    },
  };
}
