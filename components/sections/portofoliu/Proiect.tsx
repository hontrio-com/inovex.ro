import { ArrowUpRight } from 'lucide-react';
import type { PortfolioProject } from '@/lib/portfolio-data';
import { Fereastra } from './Fereastra';
import styles from './Portofoliu.module.css';

/* Un proiect din portofoliul de pe prima pagina: captura site-ului intr-o fereastra de browser pe fundal
   gri, numele, descrierea si sageata; tot proiectul duce la site, intr-o fila noua. Pe pagina /portofoliu,
   proiectele sunt FisaProiect (cu fisa). Elementul e un <li> pentru ListaProiecte (captura care coboara
   pe pagina). */
export function Proiect({
  p,
  descriere,
  sizes,
  priority = false,
  inPlus = false,
}: {
  p: PortfolioProject;
  descriere: string;
  sizes: string;
  priority?: boolean;
  inPlus?: boolean;
}) {
  return (
    <li className={styles.celula} data-in-plus={inPlus ? '' : undefined}>
      <a href={p.url} target="_blank" rel="noopener noreferrer" className={styles.proiect}>
        <Fereastra src={p.image} adresa={p.urlDisplay} sizes={sizes} priority={priority} />
        <div className={styles.text}>
          <h3 className={styles.nume}>{p.title}</h3>
          <p className={styles.descriere}>{descriere}</p>
          <span className={styles.sageata} aria-hidden>
            <ArrowUpRight />
          </span>
        </div>
        <span className={styles.ascuns}> (se deschide într-o filă nouă)</span>
      </a>
    </li>
  );
}
