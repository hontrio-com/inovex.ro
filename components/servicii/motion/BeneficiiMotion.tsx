import { Zap, BadgePercent, Palette, Megaphone, type LucideIcon } from 'lucide-react';
import type { Limba } from '@/lib/i18n/config';
import { completeaza, textMotion } from '@/lib/i18n/pagini/motion';
import { motionPrice, formatPret, monedaMotion } from '@/lib/motion-design';
import styles from './Motion.module.css';

// iconitele, in ordinea motivelor din lib/i18n/pagini/motion.ts (beneficii.lista)
const ICONITE: LucideIcon[] = [Zap, BadgePercent, Palette, Megaphone];

/* Cele patru motive, intr-un chenar cu linii fine intre ele (ca proiectele din portofoliu); pe
   telefon, unul sub altul. */
export default function BeneficiiMotion({ lang }: { lang: Limba }) {
  const t = textMotion(lang).beneficii;
  const moneda = monedaMotion(lang);
  const pret = formatPret(motionPrice(1, moneda), moneda, lang);
  const beneficii = t.lista.map((b, i) => ({ icon: ICONITE[i], title: completeaza(b.titlu, { pret }), text: b.text }));

  return (
    <section className={styles.sectiune} aria-labelledby="beneficii-motion">
      <h2 id="beneficii-motion" className={styles.titlu}>
        {t.titlu}
      </h2>

      <ul className={styles.beneficii}>
        {beneficii.map(({ icon: Icon, title, text }) => (
          <li key={title}>
            <span className={styles.icon}>
              <Icon strokeWidth={1.6} aria-hidden />
            </span>
            <span className={styles.beneficiuTitlu}>{title}</span>
            <span className={styles.beneficiuText}>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
