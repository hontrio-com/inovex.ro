import type { MarketplaceCategory } from '@/types/marketplace';
import { CATEGORY_LABELS } from '@/types/marketplace';

// etichetele categoriilor cu diacritice, pentru site; CATEGORY_LABELS (fara diacritice) ramane pentru admin
export const ETICHETE_CATEGORII: Record<MarketplaceCategory, string> = {
  ...CATEGORY_LABELS,
  'aplicatie-web': 'Aplicație Web',
  platforma: 'Platformă / SaaS',
};
