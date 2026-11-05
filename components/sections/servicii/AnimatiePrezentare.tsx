'use client';

import { Animatie } from './Animatie';
import styles from './AnimatiePrezentare.module.css';

const incarca = () => import('./filmPrezentare');

export function AnimatiePrezentare() {
  return (
    <Animatie
      incarca={incarca}
      className={styles.prezentare}
      eticheta="Animație: un website de prezentare se construiește de la zero: design, cod, SEO și recomandări în asistenții AI."
    />
  );
}
