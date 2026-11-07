import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, MapPin } from 'lucide-react';
import { cale, linkPagina, type Limba } from '@/lib/i18n/config';
import { dictionar } from '@/lib/i18n/dictionare';
import { textAcasa } from '@/lib/i18n/pagini/acasa';
import { Aprindere } from './Aprindere';
import { Glob } from './Glob';
import HARTA from './harta.json';
import { Numar } from './Numar';
import styles from './Prezenta.module.css';

/* Prezenta nationala, pe prima pagina, in stilul serviciilor (2026-10-19): Inovex a lucrat cu clienti
   din toate judetele. Intr-o parte textul, cu cifrele si butoanele, in cealalta harta Romaniei din
   puncte, pe fundalul gri al serviciilor: fiecare judet e o insula de puncte, intre linii fine de
   granita. Cand sectiunea ajunge pe ecran, judetele se aprind pe rand, intr-o ordine amestecata, pana
   se umple toata tara (Aprindere). Pe ecranele mari, totul sta intr-un chenar ca al hero-ului; pe
   telefon si tableta, intr-un card. Harta e generata cu scripts/harta-prezenta.mjs din public/ro.svg
   (harta.json).
   In engleza, germana si franceza (2026-11-05, cerut de proprietar): in locul hartii, un glob (Glob.tsx) si
   textul „lucram cu afaceri din toata lumea”, in acelasi chenar. */

// numele judetelor, cu diacritice, pentru eticheta de la trecerea cu mouse-ul
const NUME: Record<string, string> = {
  ROAB: 'Alba',
  ROAG: 'Argeș',
  ROAR: 'Arad',
  ROB: 'București',
  ROBC: 'Bacău',
  ROBH: 'Bihor',
  ROBN: 'Bistrița-Năsăud',
  ROBR: 'Brăila',
  ROBT: 'Botoșani',
  ROBV: 'Brașov',
  ROBZ: 'Buzău',
  ROCJ: 'Cluj',
  ROCL: 'Călărași',
  ROCS: 'Caraș-Severin',
  ROCT: 'Constanța',
  ROCV: 'Covasna',
  RODB: 'Dâmbovița',
  RODJ: 'Dolj',
  ROGJ: 'Gorj',
  ROGL: 'Galați',
  ROGR: 'Giurgiu',
  ROHD: 'Hunedoara',
  ROHR: 'Harghita',
  ROIF: 'Ilfov',
  ROIL: 'Ialomița',
  ROIS: 'Iași',
  ROMH: 'Mehedinți',
  ROMM: 'Maramureș',
  ROMS: 'Mureș',
  RONT: 'Neamț',
  ROOT: 'Olt',
  ROPH: 'Prahova',
  ROSB: 'Sibiu',
  ROSJ: 'Sălaj',
  ROSM: 'Satu Mare',
  ROSV: 'Suceava',
  ROTL: 'Tulcea',
  ROTM: 'Timiș',
  ROTR: 'Teleorman',
  ROVL: 'Vâlcea',
  ROVN: 'Vrancea',
  ROVS: 'Vaslui',
};

// „+ București” ramane impreuna cand eticheta trece pe doua randuri (spatiu care nu se rupe)
const CIFRE = [
  { n: 41, dupa: '', text: 'județe + București' },
  { n: 200, dupa: '+', text: 'proiecte livrate' },
  { n: 100, dupa: '%', text: 'colaborare online' },
];

export function Prezenta({ lang = 'ro' }: { lang?: Limba }) {
  if (lang !== 'ro') return <PrezentaGlob lang={lang} />;
  return (
    <section className={styles.prezenta} aria-labelledby="prezenta-titlu">
      <Aprindere className={styles.chenar}>
        <div className={styles.card}>
          <div className={styles.text}>
            <span className={styles.icon}>
              <MapPin strokeWidth={1.6} aria-hidden />
            </span>
            <h2 id="prezenta-titlu" className={styles.titlu}>
              Am lucrat cu clienți din toate județele
            </h2>
            <p className={styles.descriere}>
              Nu contează unde ești. Toată colaborarea se face online, de la prima discuție până la lansare.
            </p>
            <ul className={styles.cifre}>
              {CIFRE.map((c) => (
                <li key={c.text}>
                  <span aria-hidden>
                    <span className={styles.valoare}>
                      <Numar n={c.n} />
                      {c.dupa}
                    </span>
                    <span className={styles.ce}>{c.text}</span>
                  </span>
                  <span className={styles.ascuns}>
                    {c.n}
                    {c.dupa} {c.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.actiuni}>
              <Link href="/oferta" className={styles.primar}>
                Solicită ofertă
                <ArrowRight aria-hidden />
              </Link>
              <Link href="/portofoliu" className={styles.secundar}>
                Vezi portofoliul
              </Link>
            </div>
          </div>

          <div className={styles.vizual}>
            <div className={styles.harta}>
              <svg
                viewBox={`0 0 ${HARTA.latime} ${HARTA.inaltime}`}
                role="img"
                aria-label="Harta României din puncte, cu granițele județelor și toate județele aprinse: clienți în toate cele 41 de județe și în București."
              >
                {/* granitele dintre judete si conturul tarii, sub puncte */}
                <path className={styles.granite} d={HARTA.granite} />
                <path className={styles.contur} d={HARTA.contur} />
                {/* fiecare judet: punctele lui si, peste ele, o zona transparenta din aceleasi puncte, mai
                    mari, plus cele scoase de langa granite, ca mouse-ul sa ramana pe judet pana la granita */}
                {HARTA.judete.map((j) => (
                  <g key={j.id} style={{ '--t': j.t } as CSSProperties}>
                    <title>{NUME[j.id]}</title>
                    <path id={`judet-${j.id}`} d={j.d} />
                    <use href={`#judet-${j.id}`} className={styles.zona} />
                    {j.culoar && <path d={j.culoar} className={styles.zona} />}
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </Aprindere>
    </section>
  );
}

// limbile straine: acelasi chenar si acelasi text, cu globul in locul hartii
function PrezentaGlob({ lang }: { lang: Limba }) {
  const t = textAcasa(lang).glob;
  const d = dictionar(lang);
  return (
    <section className={styles.prezenta} aria-labelledby="prezenta-titlu">
      <div className={styles.chenar}>
        <div className={styles.card}>
          <div className={styles.text}>
            <span className={styles.icon}>
              <Globe strokeWidth={1.6} aria-hidden />
            </span>
            <h2 id="prezenta-titlu" className={styles.titlu}>
              {t.titlu}
            </h2>
            <p className={styles.descriere}>{t.descriere}</p>
            <ul className={styles.cifre}>
              {t.cifre.map((c) => (
                <li key={c.text}>
                  <span aria-hidden>
                    <span className={styles.valoare}>
                      <Numar n={c.n} />
                      {c.dupa}
                    </span>
                    <span className={styles.ce}>{c.text}</span>
                  </span>
                  <span className={styles.ascuns}>
                    {c.n}
                    {c.dupa} {c.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.actiuni}>
              <Link href={cale(lang, '/oferta')} className={styles.primar}>
                {d.antet.oferta}
                <ArrowRight aria-hidden />
              </Link>
              <Link href={linkPagina(lang, '/portofoliu') ?? cale(lang, '/')} className={styles.secundar}>
                {d.servicii.veziPortofoliul}
              </Link>
            </div>
          </div>

          <div className={styles.vizual}>
            <Glob aria={t.aria} />
          </div>
        </div>
      </div>
    </section>
  );
}
