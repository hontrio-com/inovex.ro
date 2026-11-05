import ExempluVideo from './ExempluVideo';
import { MOTION_PORTFOLIO } from '@/lib/motion-design';
import styles from './Motion.module.css';

/* Exemplele: clipurile verticale, fiecare intr-un card alb, cu clientul dedesubt. */
export default function PortfolioMotion() {
  return (
    <section id="exemple" className={styles.sectiune} aria-labelledby="exemple-titlu">
      <h2 id="exemple-titlu" className={styles.titlu}>
        Exemple de videoclipuri făcute de noi
      </h2>
      <p className={styles.lead}>
        Videoclipuri făcute de echipa Inovex pentru clienții noștri. Al tău va fi construit pe brandul și oferta
        ta. Apasă pe difuzor pentru sunet.
      </p>

      <div className={styles.exemple}>
        {MOTION_PORTFOLIO.map((item) => (
          <figure key={item.src} className={styles.exemplu}>
            <ExempluVideo src={item.src} poster={item.poster} title={`${item.client} - ${item.title}`} />
            <figcaption>
              <span className={styles.exempluClient}>{item.client}</span>
              <span className={styles.exempluTip}>{item.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
