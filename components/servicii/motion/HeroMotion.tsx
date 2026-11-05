import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { motionPrice, formatLei } from '@/lib/motion-design';
import styles from './Motion.module.css';

/* Hero-ul paginii Video Motion Design, in stilul redesign-ului (2026-10-29): cale mica, titlu negru
   centrat, butoane negru + gri si, dedesubt, doua randuri de pastile gri care curg (ce fel de clipuri
   facem). Butoanele duc la sectiunile de pe pagina (#comanda, #exemple). */

const RAND_1 = ['Promo afacere', 'Trailer produs', 'Reclame Meta și TikTok', 'Explainer video', 'Lansare aplicație', 'Logo animat'];
const RAND_2 = ['Reels și Shorts', 'Video pentru website', 'Prezentare servicii', 'Teaser eveniment', 'Video SaaS', 'Oferte și campanii'];

export default function HeroMotion() {
  return (
    <section className={styles.hero} aria-labelledby="motion-titlu">
      <nav aria-label="Navigare secundară" className={styles.cale}>
        <Link href="/">Acasă</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">Video Motion Design</span>
      </nav>

      <h1 id="motion-titlu" className={styles.heroTitlu}>
        Reclamă video animată pentru afacerea ta, gata în 48 de ore
      </h1>
      <p className={styles.heroLead}>
        Ne spui ce vinzi, iar noi îți facem un videoclip animat cu textele, culorile și logo-ul tău. Îl pui direct
        în reclame pe Facebook, Instagram și TikTok sau pe site. Fără filmări, fără actori, de la{' '}
        {formatLei(motionPrice(1))}.
      </p>

      <div className={styles.heroActiuni}>
        <a href="#comanda" className={styles.primar}>
          Comandă de la {formatLei(motionPrice(1))}
          <ArrowRight aria-hidden />
        </a>
        <a href="#exemple" className={styles.secundar}>
          <Play aria-hidden />
          Vezi exemple
        </a>
      </div>

      <div className={styles.banda} aria-label="Ce fel de videoclipuri facem">
        {[RAND_1, RAND_2].map((rand, k) => (
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
