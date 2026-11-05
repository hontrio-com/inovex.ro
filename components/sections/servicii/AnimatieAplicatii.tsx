'use client';

import { Animatie } from './Animatie';
import styles from './AnimatieAplicatii.module.css';

const incarca = () => import('./filmAplicatii');

export function AnimatieAplicatii() {
  return (
    <Animatie
      incarca={incarca}
      className={styles.aplicatii}
      eticheta="Animație: o aplicație SaaS în funcțiune: autentificare, dashboard, arhitectură, abonamente și scalare automată."
    />
  );
}
