import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { cale, type Limba } from '@/lib/i18n/config';
import { completeaza, textMotion } from '@/lib/i18n/pagini/motion';
import { motionPrice, formatPret, monedaMotion } from '@/lib/motion-design';
import styles from './Motion.module.css';

/* Hero-ul paginii Video Motion Design, in stilul redesign-ului (2026-10-29): cale mica, titlu negru
   centrat, butoane negru + gri si, dedesubt, doua randuri de pastile gri care curg (ce fel de clipuri
   facem). Butoanele duc la sectiunile de pe pagina (#comanda, #exemple). Textele, in fiecare limba:
   lib/i18n/pagini/motion.ts; pretul, in lei sau in euro, din lib/motion-design.ts. */

export default function HeroMotion({ lang }: { lang: Limba }) {
  const t = textMotion(lang).hero;
  const moneda = monedaMotion(lang);
  const pret = formatPret(motionPrice(1, moneda), moneda, lang);

  return (
    <section className={styles.hero} aria-labelledby="motion-titlu">
      <nav aria-label={t.navigare} className={styles.cale}>
        <Link href={cale(lang, '/')}>{t.acasa}</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{t.pagina}</span>
      </nav>

      <h1 id="motion-titlu" className={styles.heroTitlu}>
        {t.titlu}
      </h1>
      <p className={styles.heroLead}>{completeaza(t.lead, { pret })}</p>

      <div className={styles.heroActiuni}>
        <a href="#comanda" className={styles.primar}>
          {completeaza(t.comanda, { pret })}
          <ArrowRight aria-hidden />
        </a>
        <a href="#exemple" className={styles.secundar}>
          <Play aria-hidden />
          {t.exemple}
        </a>
      </div>

      <div className={styles.banda} aria-label={t.banda}>
        {[t.rand1, t.rand2].map((rand, k) => (
          <div key={k} className={styles.bandaRand} data-invers={k === 1 || undefined}>
            {/* lista apare de doua ori, ca banda sa curga fara gol; a doua copie e ascunsa cititoarelor */}
            {[0, 1].map((copie) => (
              <ul key={copie} aria-hidden={copie === 1 || undefined}>
                {rand.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
