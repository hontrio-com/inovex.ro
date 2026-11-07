import { Clock, Mail, Phone } from 'lucide-react';
import type { TextFormulare } from '@/lib/i18n/pagini/formulare';
import styles from '@/components/layout/PaginaFormular.module.css';
import { PhoneLink } from '@/components/ui/PhoneLink';

// ce se intampla dupa trimitere, pe pasi, si contactul direct; in coloana cu textul a paginii de oferta
export function OfertaSidebar({ t, telefon }: { t: TextFormulare; telefon: string }) {
  const o = t.oferta;
  const c = t.contact;
  return (
    <>
      <h2 className={styles.subtitlu}>{o.pasiTitlu}</h2>
      <ol className={styles.pasi}>
        {o.pasi.map((text, k) => (
          <li key={text}>
            <span className={styles.pasNr} aria-hidden>
              {k + 1}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ol>

      <h2 className={styles.subtitlu}>{o.directTitlu}</h2>
      <ul className={styles.date}>
        <li>
          <span className={styles.dateIcon}>
            <Phone aria-hidden />
          </span>
          <span className={styles.dateText}>
            <span className={styles.ce}>{c.telefon}</span>
            {/* PhoneLink: conversia „telefon” la Google si TikTok, ca inainte pe aceasta pagina */}
            <PhoneLink className={styles.valoare}>{telefon}</PhoneLink>
          </span>
        </li>
        <li>
          <span className={styles.dateIcon}>
            <Mail aria-hidden />
          </span>
          <span className={styles.dateText}>
            <span className={styles.ce}>{c.email}</span>
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
            <span className={styles.ce}>{c.program}</span>
            <span className={styles.valoare}>{c.programValoare}</span>
          </span>
        </li>
      </ul>
    </>
  );
}
