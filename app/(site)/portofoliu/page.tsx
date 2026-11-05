import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import { Final } from '@/components/sections/final/Final';
import { FisaProiect } from '@/components/sections/portofoliu/FisaProiect';
import fisa from '@/components/sections/portofoliu/FisaProiect.module.css';
import { ListaProiecte } from '@/components/sections/portofoliu/ListaProiecte';
import styles from '@/components/sections/portofoliu/Portofoliu.module.css';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';

/* Pagina de portofoliu, in stilul primei pagini (2026-10-29): titlu negru centrat si toate proiectele,
   fiecare cu fisa lui (FisaProiect, modelul A ales de proprietar pe 2026-11-05: captura care coboara la
   trecerea mouse-ului, tipul, domeniul, ce include, integrarile si limbile), apoi sectiunea finala de pe
   prima pagina. */

// latimea la care se deseneaza captura (vezi .grila si .card in FisaProiect.module.css)
const LATIME = '(min-width: 1024px) calc(28vw - 40px), (min-width: 640px) calc(42vw - 34px), calc(84vw - 34px)';

export const metadata: Metadata = {
  title: 'Portofoliu - 200+ Proiecte Web Livrate',
  description:
    'Descoperă proiectele realizate de echipa Inovex: magazine online, website-uri de prezentare, platforme SaaS și aplicații web pentru clienți din toată România. 200+ proiecte livrate cu succes.',
  keywords: ['portofoliu web', 'proiecte magazine online', 'website realizat Romania', 'exemple website'],
  alternates: { canonical: 'https://inovex.ro/portofoliu' },
  openGraph: {
    title: 'Portofoliu - 200+ Proiecte Web Livrate',
    description: '200+ proiecte livrate: magazine online, website-uri, platforme SaaS pentru clienti din toata Romania.',
    url: 'https://inovex.ro/portofoliu',
    images: [{ url: '/images/og/inovex-og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portofoliu Inovex - 200+ Proiecte',
    description: '200+ proiecte web livrate in Romania.',
    images: ['/images/og/inovex-og.jpg'],
  },
};

export default function PortofoliuPage(): React.ReactElement {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Portofoliu', url: 'https://inovex.ro/portofoliu' },
        ]}
      />

      {/* JSON-LD ItemList for first 10 projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Portofoliu Inovex',
            numberOfItems: PORTFOLIO_PROJECTS.length,
            itemListElement: PORTFOLIO_PROJECTS.slice(0, 10).map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.title,
              url: p.url,
            })),
          }),
        }}
      />

      <section className={`${styles.portofoliu} ${styles.pagina}`} aria-labelledby="portofoliu-titlu">
        <div className={styles.cap}>
          <nav aria-label="Navigare secundară" className={styles.cale}>
            <Link href="/">Acasă</Link>
            <span aria-hidden>/</span>
            <span aria-current="page">Portofoliu</span>
          </nav>
          <h1 id="portofoliu-titlu" className={styles.titlu}>
            Peste 200 de proiecte realizate cu succes
          </h1>
          <p className={styles.lead}>
            Am ajutat companii din România și din afara țării să își dezvolte prezența online și să transforme
            vizitatorii în clienți, prin platforme gândite strategic pentru creștere.
          </p>
          <p className={styles.nota}>
            Mai jos sunt câteva proiecte reprezentative din domenii diferite. Pentru exemple din industria ta,{' '}
            <Link href="/contact">scrie-ne</Link>.
          </p>
        </div>

        <ListaProiecte className={fisa.grila}>
          {PORTFOLIO_PROJECTS.map((p, k) => (
            <FisaProiect key={p.id} p={p} sizes={LATIME} priority={k < 3} />
          ))}
        </ListaProiecte>
      </section>

      <Final />
    </>
  );
}
