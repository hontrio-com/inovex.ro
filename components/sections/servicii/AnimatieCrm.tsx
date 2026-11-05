'use client';

import { Animatie } from './Animatie';
import styles from './AnimatieCrm.module.css';

const incarca = () => import('./filmCrm');

export function AnimatieCrm() {
  return (
    <Animatie
      incarca={incarca}
      className={styles.crm}
      eticheta="Animație: fișiere și aplicații împrăștiate devin o singură platformă CMS, CRM și ERP, cu comenzi, AWB, facturi și rapoarte."
    />
  );
}
