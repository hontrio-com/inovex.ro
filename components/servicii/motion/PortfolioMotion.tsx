import ExempluVideo from './ExempluVideo';
import type { Limba } from '@/lib/i18n/config';
import { textMotion } from '@/lib/i18n/pagini/motion';
import { MOTION_PORTFOLIO } from '@/lib/motion-design';
import styles from './Motion.module.css';

/* Exemplele: clipurile verticale, fiecare intr-un card alb, cu clientul dedesubt. Titlurile clipurilor,
   in fiecare limba, sunt in lib/i18n/pagini/motion.ts (exemple.titluri, in ordinea din MOTION_PORTFOLIO). */
export default function PortfolioMotion({ lang }: { lang: Limba }) {
  const t = textMotion(lang).exemple;

  return (
    <section id="exemple" className={styles.sectiune} aria-labelledby="exemple-titlu">
      <h2 id="exemple-titlu" className={styles.titlu}>
        {t.titlu}
      </h2>
      <p className={styles.lead}>{t.lead}</p>

      <div className={styles.exemple}>
        {MOTION_PORTFOLIO.map((item, i) => (
          <figure key={item.src} className={styles.exemplu}>
            <ExempluVideo
              src={item.src}
              poster={item.poster}
              title={`${item.client} - ${t.titluri[i] ?? item.title}`}
              etichete={t.video}
            />
            <figcaption>
              <span className={styles.exempluClient}>{item.client}</span>
              <span className={styles.exempluTip}>{t.titluri[i] ?? item.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
