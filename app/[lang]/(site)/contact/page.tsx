import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Mail, MapPin, MessageSquare, Phone, Timer } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { LinkTelefon } from '@/components/ui/LinkTelefon';
import { SITE_URL, alternanteMetadata, cale, esteLimba, LIMBA_IMPLICITA } from '@/lib/i18n/config';
import { dictionar } from '@/lib/i18n/dictionare';
import { textFormulare } from '@/lib/i18n/pagini/formulare';
import styles from '@/components/layout/PaginaFormular.module.css';

type Props = { params: Promise<{ lang: string }> };

const limba = async (params: Props['params']) => {
  const { lang } = await params;
  return esteLimba(lang) ? lang : LIMBA_IMPLICITA;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await limba(params);
  const t = textFormulare(lang).contact.meta;
  const alternates = alternanteMetadata(lang, '/contact');
  return {
    title: t.titlu,
    description: t.descriere,
    alternates,
    openGraph: {
      title: t.titlu,
      description: t.ogDescriere,
      url: alternates.canonical,
      images: [{ url: '/images/og/inovex-og.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.titlu,
      description: t.ogDescriere,
      images: ['/images/og/inovex-og.jpg'],
    },
  };
}

/* Pagina de contact, in stilul primei pagini (2026-10-29): un singur chenar alb cu contur fin, ca
   randurile serviciilor si harta. Intr-o parte textul si datele de contact, despartite de linii fine;
   in cealalta, pe fundalul gri granulat al animatiilor, formularul intr-un card alb. Pe telefon,
   textul sus si formularul dedesubt. Textele, in fiecare limba: lib/i18n/pagini/formulare.ts. */

export default async function ContactPage({ params }: Props) {
  const lang = await limba(params);
  const t = textFormulare(lang);
  const c = t.contact;
  const d = dictionar(lang);
  const url = (intern: string) => SITE_URL + (cale(lang, intern) === '/' ? '' : cale(lang, intern));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: c.firimituri[0], url: url('/') },
          { name: c.firimituri[1], url: url('/contact') },
        ]}
      />

      <section className={styles.contact} aria-labelledby="contact-titlu">
        <div className={styles.card}>
          <div className={styles.text}>
            <nav aria-label={c.navigare} className={styles.cale}>
              <Link href={cale(lang, '/')}>{c.acasa}</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">{c.cale}</span>
            </nav>

            <span className={styles.icon}>
              <MessageSquare strokeWidth={1.6} aria-hidden />
            </span>
            <h1 id="contact-titlu" className={styles.titlu}>
              {c.titlu}
            </h1>
            <p className={styles.descriere}>{c.descriere}</p>

            <ul className={styles.date}>
              <li>
                <span className={styles.dateIcon}>
                  <Phone aria-hidden />
                </span>
                <span className={styles.dateText}>
                  <span className={styles.ce}>{c.telefon}</span>
                  <LinkTelefon className={styles.valoare}>{d.telefon}</LinkTelefon>
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
              <li>
                <span className={styles.dateIcon}>
                  <Timer aria-hidden />
                </span>
                <span className={styles.dateText}>
                  <span className={styles.ce}>{c.raspuns}</span>
                  <span className={styles.valoare}>{c.raspunsValoare}</span>
                </span>
              </li>
              <li>
                <span className={styles.dateIcon}>
                  <MapPin aria-hidden />
                </span>
                <span className={styles.dateText}>
                  <span className={styles.ce}>{c.sedii}</span>
                  <span className={styles.valoare}>{c.sediiValoare}</span>
                </span>
              </li>
            </ul>

            <p className={styles.firma}>{c.firma}</p>
          </div>

          <div className={styles.vizual}>
            <div className={styles.formular}>
              <h2 className={styles.formularTitlu}>{c.formularTitlu}</h2>
              <ContactForm lang={lang} t={t.formularContact} telefon={d.telefon} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
