import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, alternanteMetadata, cale, esteLimba, LIMBA_IMPLICITA } from '@/lib/i18n/config';
import { dictionar } from '@/lib/i18n/dictionare';
import { textFormulare } from '@/lib/i18n/pagini/formulare';
import styles from '@/components/layout/PaginaFormular.module.css';
import { OfertaFormWrapper } from './OfertaFormWrapper';
import { OfertaSidebar } from './OfertaSidebar';

type Props = { params: Promise<{ lang: string }> };

const limba = async (params: Props['params']) => {
  const { lang } = await params;
  return esteLimba(lang) ? lang : LIMBA_IMPLICITA;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await limba(params);
  const t = textFormulare(lang).oferta.meta;
  return {
    title: t.titlu,
    description: t.descriere,
    robots: { index: false },
    alternates: alternanteMetadata(lang, '/oferta'),
  };
}

/* Pagina de oferta, in stilul paginii de contact (2026-10-29): acelasi chenar alb, cu textul, pasii de
   dupa trimitere si contactul direct intr-o parte (OfertaSidebar), iar formularul intr-un card alb pe
   fundalul gri granulat in cealalta. Textele, in fiecare limba: lib/i18n/pagini/formulare.ts. */

export default async function OfertaPage({ params }: Props) {
  const lang = await limba(params);
  const t = textFormulare(lang);
  const o = t.oferta;
  const d = dictionar(lang);
  const url = (intern: string) => SITE_URL + (cale(lang, intern) === '/' ? '' : cale(lang, intern));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: o.firimituri[0], url: url('/') },
          { name: o.firimituri[1], url: url('/oferta') },
        ]}
      />

      <section className={styles.contact} aria-labelledby="oferta-titlu">
        <div className={styles.card}>
          <div className={styles.text}>
            <nav aria-label={t.contact.navigare} className={styles.cale}>
              <Link href={cale(lang, '/')}>{t.contact.acasa}</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">{o.cale}</span>
            </nav>

            <span className={styles.icon}>
              <FileText strokeWidth={1.6} aria-hidden />
            </span>
            <h1 id="oferta-titlu" className={styles.titlu}>
              {o.titlu}
            </h1>
            <p className={styles.descriere}>{o.descriere}</p>

            <OfertaSidebar t={t} telefon={d.telefon} />
          </div>

          <div className={styles.vizual}>
            <div className={styles.formular}>
              <h2 className={styles.formularTitlu}>{o.formularTitlu}</h2>
              <Suspense fallback={<div className={styles.asteptare} aria-hidden />}>
                <OfertaFormWrapper lang={lang} t={t.formularOferta} telefon={d.telefon} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
