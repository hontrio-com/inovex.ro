import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import styles from '@/components/layout/PaginaFormular.module.css';
import { OfertaFormWrapper } from './OfertaFormWrapper';
import { OfertaSidebar } from './OfertaSidebar';

export const metadata: Metadata = {
  title: 'Solicită ofertă personalizată',
  description:
    'Completează formularul și un consultant Inovex te contactează în maximum 24 de ore cu o propunere personalizată.',
  robots: { index: false },
  alternates: { canonical: 'https://inovex.ro/oferta' },
};

/* Pagina de oferta, in stilul paginii de contact (2026-10-29): acelasi chenar alb, cu textul, pasii de
   dupa trimitere si contactul direct intr-o parte (OfertaSidebar), iar formularul intr-un card alb pe
   fundalul gri granulat in cealalta. */

export default function OfertaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Solicita Oferta', url: 'https://inovex.ro/oferta' },
        ]}
      />

      <section className={styles.contact} aria-labelledby="oferta-titlu">
        <div className={styles.card}>
          <div className={styles.text}>
            <nav aria-label="Navigare secundară" className={styles.cale}>
              <Link href="/">Acasă</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">Solicită ofertă</span>
            </nav>

            <span className={styles.icon}>
              <FileText strokeWidth={1.6} aria-hidden />
            </span>
            <h1 id="oferta-titlu" className={styles.titlu}>
              Solicită o ofertă personalizată
            </h1>
            <p className={styles.descriere}>
              Completează formularul și un consultant Inovex te contactează în maximum 24 de ore.
            </p>

            <OfertaSidebar />
          </div>

          <div className={styles.vizual}>
            <div className={styles.formular}>
              <h2 className={styles.formularTitlu}>Detalii proiect</h2>
              <Suspense fallback={<div className={styles.asteptare} aria-hidden />}>
                <OfertaFormWrapper />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
