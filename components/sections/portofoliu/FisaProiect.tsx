import { ArrowUpRight } from 'lucide-react';
import { completeaza } from '@/lib/i18n/completeaza';
import type { Limba } from '@/lib/i18n/config';
import { textPortofoliu } from '@/lib/i18n/pagini/portofoliu';
import type { PortfolioProject } from '@/lib/portfolio-data';
import { Fereastra } from './Fereastra';
import { Sigle, Steaguri } from './Sigle';
import p from './Portofoliu.module.css';
import styles from './FisaProiect.module.css';

/* Un proiect pe pagina /portofoliu (modelul A „Fișă de proiect”, ales de proprietar pe 2026-11-05): captura
   site-ului, tipul si domeniul, numele, descrierea si o fisa cu ce include, integrarile si tehnologia (cu
   siglele reale), limbile si, cand sunt completate in date, anul si durata; fiecare rand apare doar cand
   are ce arata (limbile, ca steaguri). Numele e linkul spre site, intr-o fila noua; stratul lui acopera tot cardul, deci clicul
   merge oriunde, iar fisa ramane text obisnuit, in afara linkului. Elementul e un <li> pentru
   ListaProiecte (captura care coboara pe pagina). Din 2026-11-07 etichetele sunt in limba paginii. */
export function FisaProiect({
  p: x,
  sizes,
  priority = false,
  lang = 'ro',
}: {
  p: PortfolioProject;
  sizes: string;
  priority?: boolean;
  lang?: Limba;
}) {
  const t = textPortofoliu(lang).fisa;
  // „Platformă SaaS · SaaS” ar spune acelasi lucru de doua ori
  const eticheta = x.tip.toLowerCase().includes(x.categoryLabel.toLowerCase())
    ? x.tip
    : `${x.tip} · ${x.categoryLabel}`;
  const include = x.include ?? x.features;

  return (
    <li className={`${p.celula} ${styles.card}`}>
      <Fereastra src={x.image} adresa={x.urlDisplay} sizes={sizes} priority={priority} />
      <div className={styles.corp}>
        <div className={styles.cap}>
          <div>
            <p className={styles.eticheta}>{eticheta}</p>
            <h3 className={styles.nume}>
              <a href={x.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {x.title}
                <span className={p.ascuns}>{t.filaNoua}</span>
              </a>
            </h3>
          </div>
          <span className={styles.sageata} aria-hidden>
            <ArrowUpRight />
          </span>
        </div>
        <p className={styles.descriere}>{x.description}</p>
        <dl className={styles.fisa}>
          {include.length > 0 && (
            <div>
              <dt>{t.include}</dt>
              <dd>
                <ul>
                  {include.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {x.integrari && x.integrari.length > 0 && (
            <div className={styles.randSigle}>
              <dt>{t.integrari}</dt>
              <dd>
                <Sigle nume={x.integrari} />
              </dd>
            </div>
          )}
          {x.tehnologii && x.tehnologii.length > 0 && (
            <div className={styles.randSigle}>
              <dt>{t.tehnologie}</dt>
              <dd>
                <Sigle nume={x.tehnologii} />
              </dd>
            </div>
          )}
          {x.limbi && x.limbi.length > 0 && (
            <div className={styles.randSigle}>
              <dt>{t.limbi}</dt>
              <dd>
                <Steaguri coduri={x.limbi} total={x.limbiTotal} lang={lang} />
              </dd>
            </div>
          )}
          {x.an && (
            <div>
              <dt>{t.lansat}</dt>
              <dd>{x.durata ? completeaza(t.realizat, { an: x.an, durata: x.durata }) : x.an}</dd>
            </div>
          )}
        </dl>
      </div>
    </li>
  );
}
