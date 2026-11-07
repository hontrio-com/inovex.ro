import type { Limba } from '@/lib/i18n/config';

/* Traducerile animatiilor din „Servicii” (2026-11-05). Pentru fiecare film: textul romanesc, asa cum apare
   in animatie, si traducerile lui [engleza, germana, franceza]. In romana nu se traduce nimic. In celelalte
   limbi, animatiile sunt adaptate pietei: sume in euro (rotunjite), nume, adrese si firme de acolo. */

export type Tr = readonly [en: string, de: string, fr: string];

const POZ = { en: 0, de: 1, fr: 2 } as const;

/** Harta text romanesc -> traducere, pentru limba data (null in romana: nimic de tradus). */
export function harta(texte: Record<string, Tr>, lang: Limba): Record<string, string> | null {
  if (lang === 'ro') return null;
  const i = POZ[lang];
  return Object.fromEntries(Object.entries(texte).map(([k, v]) => [k, v[i]]));
}

/** Alege varianta limbii dintr-un obiect { ro, en, de, fr }. */
export const pe = <T>(lang: Limba, v: Record<Limba, T>): T => v[lang];

/** O suma in moneda limbii: lei in romana (1.383,20 lei), euro in rest (€279.20, 279,20 €). */
export function bani(lang: Limba, v: number, zecimale = 2): string {
  const opt = { minimumFractionDigits: zecimale, maximumFractionDigits: zecimale };
  if (lang === 'ro') {
    const [a, b] = v.toFixed(zecimale).split('.');
    return a.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (b ? ',' + b : '') + ' lei';
  }
  if (lang === 'en') return (v < 0 ? '−' : '') + '€' + Math.abs(v).toLocaleString('en-GB', opt);
  return (v < 0 ? '−' : '') + Math.abs(v).toLocaleString(lang === 'de' ? 'de-DE' : 'fr-FR', opt) + ' €';
}
