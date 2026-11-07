'use client';

import type { Limba } from '@/lib/i18n/config';
import { Animatie } from './Animatie';
import styles from './AnimatieMagazin.module.css';

const incarca = () => import('./filmMagazin');

// descrierea animatiei pentru cititoarele de ecran, in limba paginii
const ETICHETA: Record<Limba, string> = {
  ro: 'Animație: un magazin online se construiește pas cu pas: design, coș, plată, factură și AWB.',
  en: 'Animation: an online store is built step by step: design, cart, payment, invoice and shipping label.',
  de: 'Animation: Ein Online-Shop entsteht Schritt für Schritt: Design, Warenkorb, Zahlung, Rechnung und Versandetikett.',
  fr: 'Animation\u202f: une boutique en ligne se construit étape par étape\u202f: design, panier, paiement, facture et étiquette d’expédition.',
};

export function AnimatieMagazin({ lang = 'ro' }: { lang?: Limba }) {
  return <Animatie incarca={incarca} className={styles.magazin} eticheta={ETICHETA[lang]} lang={lang} />;
}
