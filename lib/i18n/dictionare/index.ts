import type { Limba } from '../config';
import { ro, type Dictionar } from './ro';
import { en } from './en';
import { de } from './de';
import { fr } from './fr';

/* Dictionarele se folosesc doar pe server (layout-uri si pagini); componentele de client primesc prin
   props doar bucata de care au nevoie, ca sa nu ajunga toate limbile in JavaScript-ul din browser. */

const DICTIONARE: Record<Limba, Dictionar> = { ro, en, de, fr };

export const dictionar = (lang: Limba): Dictionar => DICTIONARE[lang];

/** Inlocuieste {cheie} intr-un text: format('© {an} Inovex', { an: 2026 }). */
export const format = (text: string, valori: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, k: string) => String(valori[k] ?? `{${k}}`));

export type { Dictionar };
