import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';
import { cale, existaIn, type Limba } from '@/lib/i18n/config';
import { dictionar } from '@/lib/i18n/dictionare';
import { textAcasa } from '@/lib/i18n/pagini/acasa';
import { descriereScurta, portofoliuInternational } from '@/lib/portofoliu-international';
import { ListaProiecte } from './ListaProiecte';
import { Proiect } from './Proiect';
import styles from './Portofoliu.module.css';

/* Portofoliul de pe prima pagina, in stilul serviciilor (2026-10-19): cateva proiecte alese, fiecare
   cu captura site-ului intr-o fereastra de browser pe fundal gri; celelalte sunt pe pagina de
   portofoliu. Pe ecranele mari, proiectele stau intr-un chenar ca al hero-ului, despartite de linii
   fine; pe telefon si tableta, fiecare e un card. Fiecare proiect duce la site-ul lui, intr-o fila
   noua. Cat timp proiectul e sub mouse sau, pe ecranele fara mouse, la mijlocul ecranului, captura
   coboara pe pagina si urca inapoi, pe rand (ListaProiecte). */

// in romana, proiectele alese de proprietar (2026-11-05), in ordinea de pe pagina, cu ce fel de proiect e
// fiecare in lib/i18n/pagini/acasa.ts; in engleza, germana si franceza, primele PE_PRIMA din portofoliul
// international (lib/portofoliu-international.ts, in ordinea data de proprietar pe 2026-11-07)
const ALESE = ['hobbyroom', 'esafe', 'atp-autoteile', 'edinio', 'bridge', 'inpardoseala'];
const PE_PRIMA = 6;

// pe telefon se vad doar primele atatea
const PE_TELEFON = 4;

// latimea la care se deseneaza captura: 84% din card (fereastra lasa 8% pe laterale), dupa marginile
// sectiunii (--rama), golurile grilei si paddingul cardului; se schimba odata cu Portofoliu.module.css
const LATIME = '(min-width: 1024px) calc(28vw - 48px), (min-width: 640px) calc(42vw - 34px), calc(84vw - 34px)';

const PROIECTE = ALESE.flatMap((id) => PORTFOLIO_PROJECTS.filter((x) => x.id === id));

export function Portofoliu({ lang = 'ro' }: { lang?: Limba }) {
  const t = textAcasa(lang).portofoliu;
  const d = dictionar(lang);
  const proiecte = lang === 'ro' ? PROIECTE : portofoliuInternational(lang).slice(0, PE_PRIMA);
  const descriere = (id: string) => (lang === 'ro' ? t.descrieri[id] ?? '' : descriereScurta(lang, id));
  return (
    <section id="portofoliu" className={styles.portofoliu} aria-labelledby="portofoliu-titlu">
      <div className={styles.cap}>
        <h2 id="portofoliu-titlu" className={styles.titlu}>
          {t.titlu}
        </h2>
        <p className={styles.lead}>{t.lead}</p>
      </div>

      <div className={styles.chenar}>
        <ListaProiecte className={styles.grila}>
          {proiecte.map((p, k) => (
            <Proiect
              key={p.id}
              p={p}
              descriere={descriere(p.id)}
              sizes={LATIME}
              inPlus={k >= PE_TELEFON}
              filaNoua={t.filaNoua}
            />
          ))}
        </ListaProiecte>
      </div>

      {/* butonul spre pagina de portofoliu, doar unde pagina exista in limba data */}
      {existaIn(lang, '/portofoliu') && (
        <div className={styles.actiuni}>
          <Link href={cale(lang, '/portofoliu')} className={styles.primar}>
            {d.servicii.veziPortofoliul}
            <ArrowRight aria-hidden />
          </Link>
        </div>
      )}
    </section>
  );
}
