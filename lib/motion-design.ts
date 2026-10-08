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

/**
 * Pretul total, in lei, pentru n videoclipuri. De la 4 videoclipuri reducerea
 * creste cu 3 puncte la fiecare videoclip in plus (35% la 4), pana la 50%.
 * Totalul se rotunjeste la un pret "curat", terminat in 9.
 */
export function motionPrice(n: number): number {
  if (FIXED_TOTALS[n]) return FIXED_TOTALS[n];
  const discount = Math.min(50, 35 + (n - 4) * 3) / 100;
  return Math.round((n * UNIT_PRICE * (1 - discount)) / 10) * 10 - 1;
}

/** Cat economiseste clientul fata de cumpararea aceluiasi numar de clipuri la bucata. */
export function motionSavings(n: number): number {
  return Math.max(0, n * UNIT_PRICE - motionPrice(n));
}

/** Reducerea, in procente intregi, fata de pretul la bucata. */
export function motionDiscountPercent(n: number): number {
  return Math.round((motionSavings(n) / (n * UNIT_PRICE)) * 100);
}

export function motionLabel(n: number): string {
  return n === 1 ? '1 videoclip' : `${n} videoclipuri`;
}

export function formatLei(amount: number): string {
  return `${amount.toLocaleString('ro-RO')} lei`;
}

/** Ce primeste clientul pentru fiecare videoclip, indiferent de pachet. */
export const MOTION_INCLUDED: string[] = [
  'Videoclip de pana la 60 de secunde',
  'Scenariu si storyboard realizate de noi',
  'Animatie in identitatea vizuala a brandului tau',
  'Muzica si efecte sonore cu licenta comerciala',
  'Formate 16:9, 9:16 si 1:1 pentru toate platformele',
  '2 runde de revizii incluse',
  'Livrare in maximum 48 de ore',
  'Factura emisa automat in SPV (e-Factura)',
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
