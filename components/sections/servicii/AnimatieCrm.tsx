'use client';

import type { Limba } from '@/lib/i18n/config';
import { Animatie } from './Animatie';
import styles from './AnimatieCrm.module.css';

const incarca = () => import('./filmCrm');

// descrierea animatiei pentru cititoarele de ecran, in limba paginii
const ETICHETA: Record<Limba, string> = {
  ro: 'Animație: fișiere și aplicații împrăștiate devin o singură platformă CMS, CRM și ERP, cu comenzi, AWB, facturi și rapoarte.',
  en: 'Animation: scattered files and apps become a single CMS, CRM and ERP platform, with orders, shipping labels, invoices and reports.',
  de: 'Animation: Verstreute Dateien und Apps werden zu einer einzigen CMS-, CRM- und ERP-Plattform mit Bestellungen, Versandetiketten, Rechnungen und Berichten.',
  fr: 'Animation\u202f: des fichiers et applications éparpillés deviennent une seule plateforme CMS, CRM et ERP, avec commandes, étiquettes d’expédition, factures et rapports.',
};

export function AnimatieCrm({ lang = 'ro' }: { lang?: Limba }) {
  return <Animatie incarca={incarca} className={styles.crm} eticheta={ETICHETA[lang]} lang={lang} />;
}
