import { Clock, Mail, Phone } from 'lucide-react';
import { TELEFON } from '@/components/layout/meniu-servicii/date';
import styles from '@/components/layout/PaginaFormular.module.css';
import { PhoneLink } from '@/components/ui/PhoneLink';

// ce se intampla dupa trimitere, pe pasi, si contactul direct; in coloana cu textul a paginii de oferta
const PASI = [
  'Primești un email de confirmare pe loc',
  'Te contactăm în 24 de ore pentru detalii',
  'Primești o propunere tehnică în 48 de ore',
];

export function OfertaSidebar() {
  return (
    <>
      <h2 className={styles.subtitlu}>Ce se întâmplă după?</h2>
      <ol className={styles.pasi}>
        {PASI.map((text, k) => (
          <li key={text}>
            <span className={styles.pasNr} aria-hidden>
              {k + 1}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ol>

      <h2 className={styles.subtitlu}>Preferi să vorbești direct?</h2>
      <ul className={styles.date}>
        <li>
          <span className={styles.dateIcon}>
            <Phone aria-hidden />
          </span>
          <span className={styles.dateText}>
            <span className={styles.ce}>Telefon</span>
            {/* PhoneLink: conversia „telefon” la Google si TikTok, ca inainte pe aceasta pagina */}
            <PhoneLink className={styles.valoare}>{TELEFON.text}</PhoneLink>
          </span>
        </li>
        <li>
          <span className={styles.dateIcon}>
            <Mail aria-hidden />
          </span>
          <span className={styles.dateText}>
            <span className={styles.ce}>Email</span>
            <a href="mailto:contact@inovex.ro" className={styles.valoare}>
              contact@inovex.ro
            </a>
          </span>
        </li>
        <li>
          <span className={styles.dateIcon}>
            <Clock aria-hidden />
          </span>
          <span className={styles.dateText}>
            <span className={styles.ce}>Program</span>
            <span className={styles.valoare}>Luni – Vineri, 09:00 – 18:00</span>
          </span>
        </li>
      </ul>
    </>
  );
}
