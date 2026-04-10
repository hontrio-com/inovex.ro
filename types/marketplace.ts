/* ══════════════════════════════════════════════════════
   MARKETPLACE — TypeScript Types
══════════════════════════════════════════════════════ */

export type MarketplaceCategory =
  | 'magazin-online'
  | 'website-prezentare'
  | 'aplicatie-web'
  | 'platforma';

export const CATEGORY_LABELS: Record<MarketplaceCategory, string> = {
  'magazin-online':      'Magazin Online',
  'website-prezentare':  'Website de Prezentare',
  'aplicatie-web':       'Aplicatie Web',
  'platforma':           'Platforma / SaaS',
};

export const PLATFORM_OPTIONS: Record<MarketplaceCategory, string[]> = {
  'magazin-online':     ['WooCommerce', 'Shopify', 'OpenCart', 'Custom'],
  'website-prezentare': ['WordPress', 'Next.js', 'Custom'],
  'aplicatie-web':      ['Next.js', 'React', 'Vue.js', 'Custom'],
  'platforma':          ['Laravel', 'Node.js', 'Custom'],
};

export type GalleryItem = {
  src: string;
  label: string;
  alt: string;
};

export type IncludedPage = {
  pageName: string;
  pageDescription: string;
};

export type FeatureCategory = {
  category: string;
  features: string[];
};

export type NotIncludedItem = {
  item: string;
  explanation?: string;
};

export type TechSpecs = {
  platform: string;
  phpVersion?: string;
  hostingRequirements: string;
  browserCompatibility: string;
  language: string;
  technologies: string[];
};

export type DeliveryStep = {
  stepNumber: number;
  timeframe: string;
  title: string;
  description: string;
  icon: 'ClipboardList' | 'Settings' | 'Eye' | 'Rocket' | 'Headphones';
};

export type ProductFAQ = {
  question: string;
  answer: string;
};

export type MarketplaceProduct = {
  id: string;
  slug: string;
  category: MarketplaceCategory;
  platform: string;           // e.g. 'WooCommerce', 'WordPress', 'Next.js', 'Custom'
  niche: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  mainImage: string;
  gallery: GalleryItem[];
  demoUrl: string;
  price: number;              // EUR, fara TVA
  deliveryDays: number;
  badge?: string;             // text custom setat de admin, ex: 'NOU', 'CEL MAI VIZIONAT'
  includedPages: IncludedPage[];
  includedFeatures: FeatureCategory[];
  notIncluded: NotIncludedItem[];
  techSpecs: TechSpecs;
  deliverySteps: DeliveryStep[];
  faq: ProductFAQ[];
  totalSales: number;
  featured: boolean;
  status: 'published' | 'draft' | 'sold';
  publishedAt: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  relatedSlugs: string[];
  // Exclusivitate
  isExclusive?: boolean;
  isSold?: boolean;
  soldToBusinessName?: string;
  soldDate?: string;
  workingDaysDelivery?: number;
};

/* ── Bid (oferta counter) ──────────────────────── */
export type BidPayload = {
  productSlug: string;
  productTitle: string;
  name: string;
  email: string;
  phone: string;
  offeredPrice: number;
  message?: string;
};
