'use client';

import { Animatie } from './Animatie';
import styles from './AnimatieMagazin.module.css';

const incarca = () => import('./filmMagazin');

export function AnimatieMagazin() {
  return (
    <Animatie
      incarca={incarca}
      className={styles.magazin}
      eticheta="Animație: un magazin online se construiește pas cu pas: design, coș, plată, factură și AWB."
    />
  );
}
