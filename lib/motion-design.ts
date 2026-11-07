/* ══════════════════════════════════════════════════════
   Serviciul "Video Motion Design" — sursa unica pentru preturi, ce include
   si exemple. Pagina afiseaza de aici, iar /api/checkout/motion-design
   taxeaza tot de aici: pretul NU vine niciodata din browser.
══════════════════════════════════════════════════════ */

export const MOTION_SLUG = 'video-motion-design';
export const MOTION_PATH = `/servicii/${MOTION_SLUG}`;

/** Pretul unui singur videoclip — reperul fata de care se calculeaza reducerea. */
const UNIT_PRICE = 249;

/** Totaluri fixe pentru primele trepte; de la 4 in sus pretul se calculeaza. */
const FIXED_TOTALS: Record<number, number> = { 1: UNIT_PRICE, 2: 399, 3: 499 };

export const MOTION_MAX_VIDEOS = 20;
/** Cantitatile afisate ca optiuni directe; restul se aleg din "Mai multe". */
export const MOTION_QUICK_OPTIONS = [1, 2, 3];
export const MOTION_POPULAR = 2;

export function isValidMotionQuantity(n: unknown): n is number {
  return typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= MOTION_MAX_VIDEOS;
}

/* ── Moneda (2026-11-06): in romana preturile sunt in lei; in engleza, germana si franceza, in euro,
   la cursul BNR, rotunjite la euro intregi (asa reducerile raman aceleasi ca in lei). Cursul se schimba
   doar aici; pagina, plata Stripe si emailurile il iau de aici. ── */
export type MonedaMotion = 'RON' | 'EUR';

/** Cursul BNR din 6 noiembrie 2026 (curs.bnr.ro/nbrfxrates.xml): 1 EUR = 5,3408 lei. */
export const CURS_EUR_RON = 5.3408;

export const monedaMotion = (lang: string): MonedaMotion => (lang === 'ro' ? 'RON' : 'EUR');

/**
 * Pretul total, in lei, pentru n videoclipuri. De la 4 videoclipuri reducerea
 * creste cu 3 puncte la fiecare videoclip in plus (35% la 4), pana la 50%.
 * Totalul se rotunjeste la un pret "curat", terminat in 9.
 */
function pretLei(n: number): number {
  if (FIXED_TOTALS[n]) return FIXED_TOTALS[n];
  const discount = Math.min(50, 35 + (n - 4) * 3) / 100;
  return Math.round((n * UNIT_PRICE * (1 - discount)) / 10) * 10 - 1;
}

/** Pretul total pentru n videoclipuri: in lei, sau in euro (pretul in lei la cursul BNR, rotunjit). */
export function motionPrice(n: number, moneda: MonedaMotion = 'RON'): number {
  const lei = pretLei(n);
  return moneda === 'RON' ? lei : Math.round(lei / CURS_EUR_RON);
}

/** Cat economiseste clientul fata de cumpararea aceluiasi numar de clipuri la bucata. */
export function motionSavings(n: number, moneda: MonedaMotion = 'RON'): number {
  return Math.max(0, n * motionPrice(1, moneda) - motionPrice(n, moneda));
}

/** Reducerea, in procente intregi, fata de pretul la bucata. */
export function motionDiscountPercent(n: number, moneda: MonedaMotion = 'RON'): number {
  return Math.round((motionSavings(n, moneda) / (n * motionPrice(1, moneda))) * 100);
}

export function motionLabel(n: number): string {
  return n === 1 ? '1 videoclip' : `${n} videoclipuri`;
}

export function formatLei(amount: number): string {
  return `${amount.toLocaleString('ro-RO')} lei`;
}

/**
 * Pretul afisat in limba paginii: 249 lei; €47 (engleza); 47 € (germana); 47 € cu spatiu fin
 * (franceza). Euro in romana (emailul intern) apare ca „47 EUR”. Sumele sunt numere intregi.
 */
export function formatPret(amount: number, moneda: MonedaMotion, lang: string): string {
  if (moneda === 'RON') return formatLei(amount);
  const n = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  if (lang === 'en') return `€${n}`;
  if (lang === 'de') return `${n.replace('.', ',')} €`;
  if (lang === 'fr') return `${n.replace('.', ',')} €`;
  return `${n.replace('.', ',')} EUR`;
}

/** Ce primeste clientul pentru fiecare videoclip, indiferent de pachet. */
export const MOTION_INCLUDED: string[] = [
  'Videoclip de până la 60 de secunde',
  'Scenariu și storyboard realizate de noi',
  'Animație în identitatea vizuală a brandului tău',
  'Muzică și efecte sonore cu licență comercială',
  'Formate 16:9, 9:16 și 1:1 pentru toate platformele',
  '2 runde de revizii incluse',
  'Livrare în maximum 48 de ore',
  'Factură emisă automat în SPV (e-Factura)',
];

/* ── Materiale atasate la brief (logo, imagini etc.) ──
   Se urca direct din browser in bucket-ul privat crm-files, sub motion-briefs/<orderId>/. */
export const MOTION_BRIEF_PREFIX = 'motion-briefs';
export const MOTION_MAX_FILES = 8;
export const MOTION_MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
export const MOTION_ALLOWED_EXT = [
  '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.pdf',
  '.ai', '.eps', '.psd', '.zip', '.mp4', '.mov', '.otf', '.ttf',
];

export interface MotionPortfolioItem {
  /** Clientul pentru care a fost facut videoclipul. */
  client: string;
  title: string;
  /** Fisier .mp4 vertical (9:16) din /public. */
  src: string;
  /** Cadru afisat pana porneste videoclipul. */
  poster: string;
}

const EXEMPLE_DIR = '/imagini/servicii/motion';

export const MOTION_PORTFOLIO: MotionPortfolioItem[] = [
  { client: 'FUMOAR',         title: 'Reclama video',          src: `${EXEMPLE_DIR}/fumoar.mp4`,              poster: `${EXEMPLE_DIR}/fumoar.jpg` },
  { client: 'Neurotechvoice', title: 'Video de prezentare',    src: `${EXEMPLE_DIR}/neurotechvoice.mp4`,      poster: `${EXEMPLE_DIR}/neurotechvoice.jpg` },
  { client: 'Edinio.com',     title: '2015 vs 2026',           src: `${EXEMPLE_DIR}/edinio-2015-vs-2026.mp4`, poster: `${EXEMPLE_DIR}/edinio-2015-vs-2026.jpg` },
  { client: 'Edinio.com',     title: 'Bonul',                  src: `${EXEMPLE_DIR}/edinio-bonul.mp4`,        poster: `${EXEMPLE_DIR}/edinio-bonul.jpg` },
];
