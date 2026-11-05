import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { TELEFON } from '@/components/layout/meniu-servicii/date';
import { LinkTelefon } from '@/components/ui/LinkTelefon';
import styles from './Final.module.css';

/* Chemarea de la finalul primei pagini, in acelasi stil (2026-10-29): un chenar ca al hero-ului, cu
   fundalul gri, granulat, de sub animatiile serviciilor; in el, centrat, titlul in doua tonuri si
   butoanele. Telefonul trimite conversia „telefon”, ca si inainte. */

export function Final() {
  return (
    <section className={styles.final} aria-labelledby="final-titlu">
      <div className={styles.chenar}>
        <div className={styles.card}>
          <p className={styles.eticheta}>Estimare gratuită, fără angajamente</p>
          <h2 id="final-titlu" className={styles.titlu}>
            Ești gata să îți duci afacerea la nivelul următor?
          </h2>
          <p className={styles.lead}>
            Spune-ne ce vrei să construiești și îți pregătim o ofertă pe măsura proiectului tău.
          </p>
          <div className={styles.actiuni}>
            <Link href="/oferta" className={styles.primar}>
              Solicită ofertă
              <ArrowRight aria-hidden />
            </Link>
            <LinkTelefon className={styles.secundar}>
              <Phone aria-hidden />
              Sună acum: {TELEFON.text}
            </LinkTelefon>
          </div>
          <p className={styles.mesaj}>
            Preferi să scrii? <Link href="/contact">Trimite-ne un mesaj</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
