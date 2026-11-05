import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';
import { ListaProiecte } from './ListaProiecte';
import { Proiect } from './Proiect';
import styles from './Portofoliu.module.css';

/* Portofoliul de pe prima pagina, in stilul serviciilor (2026-10-19): cateva proiecte alese, fiecare
   cu captura site-ului intr-o fereastra de browser pe fundal gri; celelalte sunt pe pagina de
   portofoliu. Pe ecranele mari, proiectele stau intr-un chenar ca al hero-ului, despartite de linii
   fine; pe telefon si tableta, fiecare e un card. Fiecare proiect duce la site-ul lui, intr-o fila
   noua. Cat timp proiectul e sub mouse sau, pe ecranele fara mouse, la mijlocul ecranului, captura
   coboara pe pagina si urca inapoi, pe rand (ListaProiecte). */

// proiectele alese de proprietar (2026-11-05), in ordinea de pe pagina, cu ce fel de proiect e fiecare
const ALESE = [
  { id: 'hobbyroom', descriere: 'Magazin online de seturi de construcție' },
  { id: 'esafe', descriere: 'Magazin online de echipamente de protecție' },
  { id: 'atp-autoteile', descriere: 'Magazin online de piese auto' },
  { id: 'edinio', descriere: 'Platformă SaaS pentru magazine online' },
  { id: 'bridge', descriere: 'Platformă SaaS pentru întâlniri video cu AI' },
  { id: 'inpardoseala', descriere: 'Website pentru pardoseli din beton' },
];

// pe telefon se vad doar primele atatea
const PE_TELEFON = 4;

// latimea la care se deseneaza captura: 84% din card (fereastra lasa 8% pe laterale), dupa marginile
// sectiunii (--rama), golurile grilei si paddingul cardului; se schimba odata cu Portofoliu.module.css
const LATIME = '(min-width: 1024px) calc(28vw - 48px), (min-width: 640px) calc(42vw - 34px), calc(84vw - 34px)';

const PROIECTE = ALESE.flatMap(({ id, descriere }) => {
  const p = PORTFOLIO_PROJECTS.find((x) => x.id === id);
  return p ? [{ ...p, descriere }] : [];
});

export function Portofoliu() {
  return (
    <section className={styles.portofoliu} aria-labelledby="portofoliu-titlu">
      <div className={styles.cap}>
        <h2 id="portofoliu-titlu" className={styles.titlu}>
          Proiecte care vorbesc de la sine
        </h2>
        <p className={styles.lead}>
          Peste 200 de proiecte livrate. Aici e o parte din ele, fiecare cu obiectivul lui, fiecare livrat
          la termen.
        </p>
      </div>

      <div className={styles.chenar}>
        <ListaProiecte className={styles.grila}>
          {PROIECTE.map((p, k) => (
            <Proiect key={p.id} p={p} descriere={p.descriere} sizes={LATIME} inPlus={k >= PE_TELEFON} />
          ))}
        </ListaProiecte>
      </div>

      <div className={styles.actiuni}>
        <Link href="/portofoliu" className={styles.primar}>
          Vezi portofoliul
          <ArrowRight aria-hidden />
        </Link>
      </div>
    </section>
  );
}
