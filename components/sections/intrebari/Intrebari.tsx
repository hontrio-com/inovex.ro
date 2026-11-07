import Link from 'next/link';
import { ArrowRight, MessageCircleQuestion, Phone, Plus } from 'lucide-react';
import { LinkTelefon } from '@/components/ui/LinkTelefon';
import type { FaqItem } from '@/lib/site-data';
import { cale, type Limba } from '@/lib/i18n/config';
import { dictionar } from '@/lib/i18n/dictionare';
import { textAcasa } from '@/lib/i18n/pagini/acasa';
import styles from './Intrebari.module.css';

/* Intrebarile frecvente de pe prima pagina, in stilul prezentei nationale (2026-10-29): intr-o parte
   textul, cu butoanele de contact, in cealalta intrebarile, despartite de linii fine. Pe ecranele
   mari, totul sta intr-un chenar ca al hero-ului; pe telefon si tableta, intr-un card. Intrebarile se
   deschid fara JavaScript (<details> cu acelasi `name`: se deschide una singura odata); prima e
   deschisa. In romana, intrebarile vin din admin (datele 'faq'); daca acolo nu e nimic, raman cele din
   lib/i18n/pagini/acasa.ts. In celelalte limbi, traducerile lor, tot de acolo. */

export function Intrebari({ items, lang = 'ro' }: { items?: FaqItem[]; lang?: Limba } = {}) {
  const t = textAcasa(lang).intrebari;
  const d = dictionar(lang);
  const traduse: FaqItem[] = t.lista.map((x, k) => ({ id: String(k + 1), ...x }));
  // intrebarile date de pagina (prima pagina: doar in romana, din admin; Motion Design: in fiecare limba)
  const lista = items && items.length > 0 ? items : traduse;

  return (
    <section className={styles.intrebari} aria-labelledby="intrebari-titlu">
      <div className={styles.chenar}>
        <div className={styles.card}>
          <div className={styles.text}>
            <span className={styles.icon}>
              <MessageCircleQuestion strokeWidth={1.6} aria-hidden />
            </span>
            <h2 id="intrebari-titlu" className={styles.titlu}>
              {t.titlu}
            </h2>
            <p className={styles.descriere}>{t.descriere}</p>
            <div className={styles.actiuni}>
              <Link href={cale(lang, '/oferta')} className={styles.primar}>
                {d.antet.oferta}
                <ArrowRight aria-hidden />
              </Link>
              <LinkTelefon className={styles.secundar}>
                <Phone aria-hidden />
                {d.telefon}
              </LinkTelefon>
            </div>
          </div>

          <div className={styles.lista}>
            {lista.map((item, k) => (
              <details key={item.id} name="intrebari-frecvente" className={styles.intrebare} open={k === 0}>
                <summary className={styles.rand}>
                  <h3 className={styles.q}>{item.q}</h3>
                  <span className={styles.plus} aria-hidden>
                    <Plus />
                  </span>
                </summary>
                <p className={styles.a}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
