import type { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, Mail, Phone, Scale, ShieldCheck } from 'lucide-react';
import { SetariCookies } from '@/components/layout/SetariCookies';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { LinkTelefon } from '@/components/ui/LinkTelefon';
import { SITE_URL, alternanteMetadata, cale, esteLimba, LIMBA_IMPLICITA, type Limba } from '@/lib/i18n/config';
import { dictionar, format } from '@/lib/i18n/dictionare';
import { textLegal, type Bloc, type TextLegal } from '@/lib/i18n/pagini/legal';
import { Cuprins } from './Cuprins';
import { TextLegal as Text } from './TextLegal';
import styles from './DocumentLegal.module.css';

/* Paginile legale (2026-11-06), in stilul paginii de contact: un chenar alb cu contur fin; sus calea,
   iconita, titlul, introducerea si data; dedesubt cuprinsul (lipit in stanga de la 1024px) si textul,
   cu linii fine intre sectiuni. Textele, in fiecare limba: lib/i18n/pagini/legal/. In EN/DE/FR, o nota
   spune ca originalul romanesc e cel care se aplica, cu link spre el. */

export type FelLegal = 'confidentialitate' | 'cookies' | 'termeni';

const PAGINI: Record<FelLegal, { intern: string; Icon: typeof ShieldCheck }> = {
  confidentialitate: { intern: '/politica-de-confidentialitate', Icon: ShieldCheck },
  cookies: { intern: '/politica-cookies', Icon: Cookie },
  termeni: { intern: '/termeni-si-conditii', Icon: Scale },
};

type Params = Promise<{ lang: string }>;

const limba = async (params: Params): Promise<Limba> => {
  const { lang } = await params;
  return esteLimba(lang) ? lang : LIMBA_IMPLICITA;
};

const adresa = (lang: Limba, intern: string) => SITE_URL + (cale(lang, intern) === '/' ? '' : cale(lang, intern));

export async function metadataLegal(params: Params, fel: FelLegal): Promise<Metadata> {
  const lang = await limba(params);
  const doc = textLegal(lang)[fel];
  const alternates = alternanteMetadata(lang, PAGINI[fel].intern);
  return {
    title: doc.meta.titlu,
    description: doc.meta.descriere,
    alternates,
    openGraph: { title: doc.meta.titlu, description: doc.meta.descriere, url: alternates.canonical },
  };
}

function Continut({ b, lang, ui, telefon }: { b: Bloc; lang: Limba; ui: TextLegal['ui']; telefon: string }) {
  if ('p' in b) {
    return (
      <p className={styles.p}>
        <Text text={b.p} lang={lang} />
      </p>
    );
  }
  if ('h3' in b) return <h3 className={styles.h3}>{b.h3}</h3>;
  if ('ul' in b || 'ol' in b) {
    const ListaTag = 'ul' in b ? 'ul' : 'ol';
    const elemente = 'ul' in b ? b.ul : b.ol;
    return (
      <ListaTag className={'ul' in b ? styles.ul : styles.ol}>
        {elemente.map((e, i) => (
          <li key={i}>
            <Text text={e} lang={lang} />
          </li>
        ))}
      </ListaTag>
    );
  }
  if ('caseta' in b) {
    return (
      <div className={styles.caseta}>
        {b.caseta.map((r, i) => (
          <p key={i}>
            <Text text={r} lang={lang} />
          </p>
        ))}
      </div>
    );
  }
  if ('cookies' in b) {
    const [cNume, cFurnizor, cScop, cDurata, cTip] = ui.capTabel;
    return (
      <>
        {b.cookies.map((cat) => (
          <div key={cat.nume} className={styles.categorie}>
            <h3 className={styles.h3}>{cat.nume}</h3>
            <p className={styles.p}>{cat.descriere}</p>
            <div className={styles.tabelCutie}>
              <table className={styles.tabel}>
                <thead>
                  <tr>
                    {ui.capTabel.map((h) => (
                      <th key={h} scope="col">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cat.cookies.map(([nume, furnizor, url, scop, durata, tip]) => (
                    <tr key={nume}>
                      <th scope="row" data-eticheta={cNume}>
                        <code>{nume}</code>
                      </th>
                      <td data-eticheta={cFurnizor}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {furnizor}
                        </a>
                      </td>
                      <td data-eticheta={cScop}>{scop}</td>
                      <td data-eticheta={cDurata}>{durata}</td>
                      <td data-eticheta={cTip}>{tip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </>
    );
  }
  if ('setari' in b) {
    return (
      <div className={styles.panou}>
        <div className={styles.panouText}>
          <p className={styles.panouTitlu}>{b.setari.titlu}</p>
          <p>{b.setari.text}</p>
        </div>
        <div className={styles.actiuni}>
          <SetariCookies className={styles.primar} text={b.setari.buton} />
        </div>
      </div>
    );
  }
  const subiect = encodeURIComponent(b.contact.subiect);
  return (
    <div className={styles.panou}>
      <div className={styles.panouText}>
        <p className={styles.panouTitlu}>{b.contact.titlu}</p>
        <p>contact@inovex.ro</p>
      </div>
      <div className={styles.actiuni}>
        <a className={styles.primar} href={`mailto:contact@inovex.ro?subject=${subiect}`}>
          <Mail aria-hidden />
          {b.contact.buton}
        </a>
        <LinkTelefon className={styles.secundar} aria-label={`${ui.telefon}: ${telefon}`}>
          <Phone aria-hidden />
          {telefon}
        </LinkTelefon>
      </div>
    </div>
  );
}

export async function DocumentLegalPagina({ params, fel }: { params: Params; fel: FelLegal }) {
  const lang = await limba(params);
  const t = textLegal(lang);
  const { ui } = t;
  const doc = t[fel];
  const { intern, Icon } = PAGINI[fel];
  const telefon = dictionar(lang).telefon;
  const ancora = (i: number) => `${ui.ancora}-${i + 1}`;

  const paginaWeb = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: doc.titlu,
    url: adresa(lang, intern),
    inLanguage: lang,
    dateModified: doc.data,
    publisher: { '@type': 'Organization', name: 'Inovex', legalName: 'VOID SFT GAMES SRL', url: SITE_URL },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: ui.acasa, url: adresa(lang, '/') },
          { name: doc.titlu, url: adresa(lang, intern) },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(paginaWeb) }} />

      <section className={styles.pagina} aria-labelledby="legal-titlu">
        <article className={styles.card}>
          <header className={styles.antet}>
            <nav aria-label={ui.navigare} className={styles.cale}>
              <Link href={cale(lang, '/')}>{ui.acasa}</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">{doc.titlu}</span>
            </nav>

            <span className={styles.icon}>
              <Icon strokeWidth={1.6} aria-hidden />
            </span>
            <h1 id="legal-titlu" className={styles.titlu}>
              {doc.titlu}
            </h1>
            <p className={styles.intro}>{doc.intro}</p>
            <p className={styles.data}>
              {ui.actualizat}: <time dateTime={doc.data}>{doc.actualizat}</time>
            </p>
            {ui.traducere && (
              <p className={styles.traducere}>
                <Text text={ui.traducere.replace('(@ro)', `(ro:${intern})`)} lang={lang} />
              </p>
            )}
          </header>

          <div className={styles.corp}>
            <aside className={styles.lateral}>
              <Cuprins
                titlu={ui.cuprins}
                numar={format(ui.sectiuni, { n: doc.sectiuni.length })}
                elemente={doc.sectiuni.map((s, i) => ({ id: ancora(i), text: s.scurt }))}
              />
            </aside>

            <div className={styles.text}>
              {doc.rezumat && (
                <div className={styles.rezumat}>
                  <h2 className={styles.rezumatTitlu}>{doc.rezumat.titlu}</h2>
                  <dl className={styles.rezumatLista}>
                    {doc.rezumat.randuri.map(([ce, valoare]) => (
                      <div key={ce}>
                        <dt>{ce}</dt>
                        <dd>
                          <Text text={valoare} lang={lang} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className={styles.rezumatNota}>{doc.rezumat.nota}</p>
                </div>
              )}

              {doc.sectiuni.map((s, i) => (
                <section key={i} id={ancora(i)} className={styles.sectiune} aria-labelledby={`${ancora(i)}-titlu`}>
                  <h2 id={`${ancora(i)}-titlu`} className={styles.h2}>
                    <span className={styles.nr}>{i + 1}.</span> {s.titlu}
                  </h2>
                  {s.continut.map((b, j) => (
                    <Continut key={j} b={b} lang={lang} ui={ui} telefon={telefon} />
                  ))}
                </section>
              ))}
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
