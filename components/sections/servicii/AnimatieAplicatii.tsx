'use client';

import type { Limba } from '@/lib/i18n/config';
import { Animatie } from './Animatie';
import styles from './AnimatieAplicatii.module.css';

const incarca = () => import('./filmAplicatii');

// descrierea animatiei pentru cititoarele de ecran, in limba paginii
const ETICHETA: Record<Limba, string> = {
  ro: 'Animație: o aplicație SaaS în funcțiune: autentificare, dashboard, arhitectură, abonamente și scalare automată.',
  en: 'Animation: a SaaS app in action: sign-in, dashboard, architecture, subscriptions and automatic scaling.',
  de: 'Animation: Eine SaaS-App im Einsatz: Anmeldung, Dashboard, Architektur, Abonnements und automatische Skalierung.',
  fr: 'Animation\u202f: une application SaaS en action\u202f: connexion, tableau de bord, architecture, abonnements et mise à l’échelle automatique.',
};

export function AnimatieAplicatii({ lang = 'ro' }: { lang?: Limba }) {
  return <Animatie incarca={incarca} className={styles.aplicatii} eticheta={ETICHETA[lang]} lang={lang} />;
}
