import Image from 'next/image';
import styles from './Portofoliu.module.css';

/* Captura unui site intr-o fereastra de browser care urca din fundalul gri, folosita de proiectele de pe
   prima pagina (Proiect) si de pe pagina /portofoliu (FisaProiect). Captura coboara pe pagina cat timp
   proiectul e sub mouse sau, pe ecranele fara mouse, la mijlocul ecranului (ListaProiecte). */
export function Fereastra({
  src,
  adresa,
  sizes,
  priority = false,
}: {
  src: string;
  adresa: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={styles.vizual}>
      <div className={styles.fereastra}>
        <div className={styles.bara} aria-hidden>
          <span className={styles.butoane}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.adresa}>{adresa}</span>
        </div>
        <div className={styles.captura}>
          <Image src={src} alt="" fill sizes={sizes} priority={priority} className={styles.imagine} />
        </div>
      </div>
    </div>
  );
}
