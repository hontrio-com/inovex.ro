import type { Limba } from '@/lib/i18n/config';
import type { TextLegal } from './tipuri';
import { de } from './de';
import { en } from './en';
import { fr } from './fr';
import { ro } from './ro';

/* Textele paginilor legale, pe limbi. Romana e originalul; celelalte sunt traduceri ale ei. */

const TEXTE: Record<Limba, TextLegal> = { ro, en, de, fr };

export const textLegal = (lang: Limba): TextLegal => TEXTE[lang];

export type { Bloc, CategorieCookie, DocumentLegal, Sectiune, TextLegal } from './tipuri';
