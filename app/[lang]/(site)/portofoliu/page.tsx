import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import { Final } from '@/components/sections/final/Final';
import { FisaProiect } from '@/components/sections/portofoliu/FisaProiect';
import fisa from '@/components/sections/portofoliu/FisaProiect.module.css';
import { ListaProiecte } from '@/components/sections/portofoliu/ListaProiecte';
import styles from '@/components/sections/portofoliu/Portofoliu.module.css';
import { alternanteMetadata, cale, esteLimba, LIMBA_IMPLICITA, NUME_LIMBI, SITE_URL, type Limba } from '@/lib/i18n/config';
import { textPortofoliu } from '@/lib/i18n/pagini/portofoliu';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';
import { portofoliuInternational } from '@/lib/portofoliu-international';

/* Pagina de portofoliu, in stilul primei pagini (2026-10-29): titlu negru centrat si toate proiectele,
   fiecare cu fisa lui (FisaProiect, modelul A ales de proprietar pe 2026-11-05: captura care coboara la
   trecerea mouse-ului, tipul, domeniul, ce include, integrarile si limbile), apoi sectiunea finala de pe
   prima pagina. Din 2026-11-07 in 4 limbi: in romana cele 22 de proiecte de pana acum, in engleza,
   germana si franceza portofoliul international (lib/portofoliu-international.ts). */

// latimea la care se deseneaza captura (vezi .grila si .card in FisaProiect.module.css)
const LATIME = '(min-width: 1024px) calc(28vw - 40px), (min-width: 640px) calc(42vw - 34px), calc(84vw - 34px)';

type Props = { params: Promise<{ lang: string }> };

const limba = async (params: Props['params']): Promise<Limba> => {
  const { lang } = await params;
  return esteLimba(lang) ? lang : LIMBA_IMPLICITA;
};

const adresa = (lang: Limba, intern: string) => SITE_URL + (cale(lang, intern) === '/' ? '' : cale(lang, intern));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await limba(params);
  const t = textPortofoliu(lang).meta;
  return {
    title: t.titlu,
    description: t.descriere,
    keywords: t.cuvinte,
    alternates: alternanteMetadata(lang, '/portofoliu'),
    openGraph: {
      type: 'website',
      siteName: 'Inovex',
      locale: NUME_LIMBI[lang].og,
      title: t.ogTitlu,
      description: t.ogDescriere,
      url: adresa(lang, '/portofoliu'),
      images: [{ url: '/images/og/inovex-og.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.twitterTitlu,
      description: t.twitterDescriere,
      images: ['/images/og/inovex-og.jpg'],
    },
  };
}

export default async function PortofoliuPage({ params }: Props) {
  const lang = await limba(params);
  const t = textPortofoliu(lang);
  const proiecte = lang === 'ro' ? PORTFOLIO_PROJECTS : portofoliuInternational(lang);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.firimituri[0], url: adresa(lang, '/') },
          { name: t.firimituri[1], url: adresa(lang, '/portofoliu') },
        ]}
      />

      {/* JSON-LD ItemList for first 10 projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: t.listaJsonLd,
            numberOfItems: proiecte.length,
            itemListElement: proiecte.slice(0, 10).map((p, i) => ({
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
          <nav aria-label={t.navigare} className={styles.cale}>
            <Link href={cale(lang, '/')}>{t.acasa}</Link>
            <span aria-hidden>/</span>
            <span aria-current="page">{t.cale}</span>
          </nav>
          <h1 id="portofoliu-titlu" className={styles.titlu}>
            {t.titlu}
          </h1>
          <p className={styles.lead}>{t.lead}</p>
          <p className={styles.nota}>
            {t.nota[0]}
            <Link href={cale(lang, '/contact')}>{t.nota[1]}</Link>
            {t.nota[2]}
          </p>
        </div>

        <ListaProiecte className={fisa.grila}>
          {proiecte.map((p, k) => (
            <FisaProiect key={p.id} p={p} sizes={LATIME} priority={k < 3} lang={lang} />
          ))}
        </ListaProiecte>
      </section>

      <Final lang={lang} />
    </>
  );
}
