'use client';

import type { Limba } from '@/lib/i18n/config';
import { Animatie } from './Animatie';
import styles from './AnimatiePrezentare.module.css';

const incarca = () => import('./filmPrezentare');

// descrierea animatiei pentru cititoarele de ecran, in limba paginii
const ETICHETA: Record<Limba, string> = {
  ro: 'Animație: un website de prezentare se construiește de la zero: design, cod, SEO și recomandări în asistenții AI.',
  en: 'Animation: a business website is built from scratch: design, code, SEO and recommendations in AI assistants.',
  de: 'Animation: Eine Unternehmenswebsite entsteht von Grund auf: Design, Code, SEO und Empfehlungen in KI-Assistenten.',
  fr: 'Animation\u202f: un site vitrine se construit de zéro\u202f: design, code, SEO et recommandations dans les assistants IA.',
};

export function AnimatiePrezentare({ lang = 'ro' }: { lang?: Limba }) {
  return <Animatie incarca={incarca} className={styles.prezentare} eticheta={ETICHETA[lang]} lang={lang} />;
}
