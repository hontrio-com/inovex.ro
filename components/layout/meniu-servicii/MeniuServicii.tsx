import { useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { GRUPURI, PROIECT_MENIU as proiect, type Serviciu } from './date';
import styles from './MeniuServicii.module.css';

/* Meniul „Servicii” de pe desktop, „Bara prelungita” (ales de proprietar dintre 5 modele,
   2026-10-17): panoul e lipit sub bara antetului, cat ea de lat, si continua in jos aceeasi
   suprafata alba. Doua coloane cu servicii si, in dreapta, un proiect mare din portofoliu. */

type Props = {
  /** inchide meniul dupa un clic pe un link */
  onNavigate: () => void;
  /** true cand bara e desprinsa (pagina derulata) */
  plutitor: boolean;
};

export function MeniuServicii({ onNavigate, plutitor }: Props) {
  return (
    <div className={styles.panou} data-plutitor={plutitor}>
      <div className={styles.inner}>
        <div className={styles.grila}>
          {GRUPURI.map((grup) => (
            <Grup key={grup.titlu} titlu={grup.titlu} servicii={grup.servicii} onNavigate={onNavigate} />
          ))}

          <Link href="/portofoliu" onClick={onNavigate} className={styles.proiect}>
            <span className={styles.imagine}>
              <Image
                src={proiect.imagine}
                alt={proiect.titlu}
                fill
                sizes="(min-width: 1280px) 360px, 30vw"
                unoptimized
                className={styles.foto}
              />
            </span>
            <span className={styles.proiectRand}>
              <span className={styles.proiectText}>
                <span className={styles.proiectTitlu}>{proiect.titlu}</span>
                <span className={styles.proiectTip}>{proiect.tip}</span>
              </span>
              <span className={styles.vezi}>
                Vezi portofoliul
                <ArrowRight aria-hidden className={styles.sageata} />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Grup({ titlu, servicii, onNavigate }: { titlu: string; servicii: Serviciu[]; onNavigate: () => void }) {
  // eticheta coloanei da si numele listei, pentru cititoarele de ecran
  const id = useId();

  return (
    <div>
      <p id={id} className={styles.eticheta}>
        {titlu}
      </p>
      <ul aria-labelledby={id} className={styles.lista}>
        {servicii.map((s) => (
          <li key={s.href}>
            <Link href={s.href} onClick={onNavigate} className={styles.item}>
              <span className={styles.itemTitlu}>{s.titlu}</span>
              <span className={styles.itemDesc}>{s.descriere}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
