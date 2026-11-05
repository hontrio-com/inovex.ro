import { Zap, BadgePercent, Palette, Megaphone, type LucideIcon } from 'lucide-react';
import { motionPrice, formatLei } from '@/lib/motion-design';
import styles from './Motion.module.css';

const BENEFICII: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Zap,
    title: 'Gata în maximum 48 de ore',
    text: 'Comanzi azi, iar în cel mult două zile ai videoclipul. Nu aștepți săptămâni după o agenție.',
  },
  {
    icon: BadgePercent,
    title: `De la ${formatLei(motionPrice(1))}, preț fix`,
    text: 'Știi exact cât plătești înainte să comanzi. Fără filmări, fără actori, fără costuri ascunse.',
  },
  {
    icon: Palette,
    title: 'Făcut pentru afacerea ta',
    text: 'Logo-ul, culorile și oferta ta, animate de la zero. Nu un șablon în care schimbăm doar numele.',
  },
  {
    icon: Megaphone,
    title: 'Gata de pus în reclame',
    text: 'Îl primești în formatele pentru Facebook, Instagram, TikTok, YouTube și site. Doar îl încarci.',
  },
];

/* Cele patru motive, intr-un chenar cu linii fine intre ele (ca proiectele din portofoliu); pe
   telefon, unul sub altul. */
export default function BeneficiiMotion() {
  return (
    <section className={styles.sectiune} aria-labelledby="beneficii-motion">
      <h2 id="beneficii-motion" className={styles.titlu}>
        De ce să cumperi un videoclip de la noi?
      </h2>

      <ul className={styles.beneficii}>
        {BENEFICII.map(({ icon: Icon, title, text }) => (
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
