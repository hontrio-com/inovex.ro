import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { LinkTelefon } from '@/components/ui/LinkTelefon';
import { cale, type Limba } from '@/lib/i18n/config';
import { dictionar } from '@/lib/i18n/dictionare';
import { textAcasa } from '@/lib/i18n/pagini/acasa';
import styles from './Final.module.css';

/* Chemarea de la finalul primei pagini, in acelasi stil (2026-10-29): un chenar ca al hero-ului, cu
   fundalul gri, granulat, de sub animatiile serviciilor; in el, centrat, titlul in doua tonuri si
   butoanele. Telefonul trimite conversia „telefon”, ca si inainte. */

export function Final({ lang = 'ro' }: { lang?: Limba }) {
  const t = textAcasa(lang).final;
  const d = dictionar(lang);
  return (
    <section className={styles.final} aria-labelledby="final-titlu">
      <div className={styles.chenar}>
        <div className={styles.card}>
          <p className={styles.eticheta}>{t.eticheta}</p>
          <h2 id="final-titlu" className={styles.titlu}>
            {t.titlu}
          </h2>
          <p className={styles.lead}>{t.lead}</p>
          <div className={styles.actiuni}>
            <Link href={cale(lang, '/oferta')} className={styles.primar}>
              {d.antet.oferta}
              <ArrowRight aria-hidden />
            </Link>
            <LinkTelefon className={styles.secundar}>
              <Phone aria-hidden />
              {t.suna}: {d.telefon}
            </LinkTelefon>
          </div>
          <p className={styles.mesaj}>
            {t.scrie} <Link href={cale(lang, '/contact')}>{t.mesaj}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
