import { useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cale, linkPagina, type Limba } from '@/lib/i18n/config';
import type { Dictionar } from '@/lib/i18n/dictionare/ro';
import { DEZVOLTARE_WEB, PROIECT_MENIU as proiect, SOLUTII_COMPLETE } from './date';
import styles from './MeniuServicii.module.css';

/* Meniul „Servicii” de pe desktop, „Bara prelungita” (ales de proprietar dintre 5 modele,
   2026-10-17): panoul e lipit sub bara antetului, cat ea de lat, si continua in jos aceeasi
   suprafata alba. Doua coloane cu servicii si, in dreapta, un proiect mare din portofoliu. */

type Props = {
  lang: Limba;
  t: Dictionar['servicii'];
  /** inchide meniul dupa un clic pe un link */
  onNavigate: () => void;
  /** true cand bara e desprinsa (pagina derulata) */
  plutitor: boolean;
};

export function MeniuServicii({ lang, t, onNavigate, plutitor }: Props) {
  const grupuri = [
    { titlu: t.grupDezvoltare, servicii: DEZVOLTARE_WEB },
    { titlu: t.grupSolutii, servicii: SOLUTII_COMPLETE },
  ];

  return (
    <div className={styles.panou} data-plutitor={plutitor}>
      <div className={styles.inner}>
        <div className={styles.grila}>
          {grupuri.map((grup) => (
            <Grup key={grup.titlu} lang={lang} t={t} titlu={grup.titlu} servicii={grup.servicii} onNavigate={onNavigate} />
          ))}

          <Link href={linkPagina(lang, '/portofoliu') ?? cale(lang, '/')} onClick={onNavigate} className={styles.proiect}>
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
                <span className={styles.proiectTip}>{t.proiectTip}</span>
              </span>
              <span className={styles.vezi}>
                {t.veziPortofoliul}
                <ArrowRight aria-hidden className={styles.sageata} />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Grup({
  lang,
  t,
  titlu,
  servicii,
  onNavigate,
}: {
  lang: Limba;
  t: Dictionar['servicii'];
  titlu: string;
  servicii: string[];
  onNavigate: () => void;
}) {
  // eticheta coloanei da si numele listei, pentru cititoarele de ecran
  const id = useId();

  return (
    <div>
      <p id={id} className={styles.eticheta}>
        {titlu}
      </p>
      <ul aria-labelledby={id} className={styles.lista}>
        {servicii.map((intern) => {
          // in EN/DE/FR, pagina netradusa a serviciului e inlocuita de configuratorul lui (linkPagina)
          const href = linkPagina(lang, intern);
          return (
            href && (
              <li key={intern}>
                <Link href={href} onClick={onNavigate} className={styles.item}>
                  <span className={styles.itemTitlu}>{t.lista[intern]?.titlu}</span>
                  <span className={styles.itemDesc}>{t.lista[intern]?.descriere}</span>
                </Link>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
