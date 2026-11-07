import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cale, type Limba } from '@/lib/i18n/config';
import { dictionar } from '@/lib/i18n/dictionare';
import { textAcasa } from '@/lib/i18n/pagini/acasa';
import styles from './Recenzii.module.css';

/* Recenziile de pe prima pagina, in stilul portofoliului (2026-10-29): titlu in doua tonuri, centrat,
   cu stelele si „G”-ul Google dedesubt, apoi recenziile. Pe ecranele mari, intr-un chenar ca al
   hero-ului, despartite de linii fine; pe telefon si tableta, fiecare e un card. Recenziile sunt cele
   de pe Google, copiate in pagina; textele lor (traduse in celelalte limbi, cu mentiunea „tradus din
   romana”) sunt in lib/i18n/pagini/acasa.ts, in aceeasi ordine. */

const RECENZII = [
  { nume: 'Cosmin Danila', site: 'stupinamaria.ro' },
  { nume: 'Export Trans Ultimate', site: 'exporttrans.ro' },
  { nume: 'Craus Armand', site: 'fumgreuiasi.ro' },
  { nume: 'AVI MOB', site: 'avimob.ro' },
  { nume: 'Romina Somicescu', site: 'romagcooking.ro' },
  { nume: 'IRETRO', site: 'profesoruldeai.ro' },
];

// pe telefon se vad doar primele atatea
const PE_TELEFON = 4;

// initialele din nume: primele litere ale primelor doua cuvinte (la un singur cuvant, primele doua litere)
function initiale(nume: string) {
  const cuvinte = nume.split(/\s+/);
  return (cuvinte.length > 1 ? cuvinte[0][0] + cuvinte[1][0] : nume.slice(0, 2)).toUpperCase();
}

export function Recenzii({ lang = 'ro' }: { lang?: Limba }) {
  const t = textAcasa(lang).recenzii;
  const d = dictionar(lang);
  return (
    <section className={styles.recenzii} aria-labelledby="recenzii-titlu">
      <div className={styles.cap}>
        <h2 id="recenzii-titlu" className={styles.titlu}>
          {t.titlu}
        </h2>
        <div className={styles.evaluare}>
          <span className={styles.stele} role="img" aria-label={t.stele}>
            {[0, 1, 2, 3, 4].map((k) => (
              <Stea key={k} />
            ))}
          </span>
          <span className={styles.evaluareText}>
            <LogoGoogle /> {t.verificate}
            {t.tradus && ` · ${t.tradus}`}
          </span>
        </div>
      </div>

      <div className={styles.chenar}>
        <ul className={styles.grila}>
          {RECENZII.map((r, k) => (
            <li key={r.nume} className={styles.celula} data-in-plus={k >= PE_TELEFON ? '' : undefined}>
              <figure className={styles.recenzie}>
                <div className={styles.sus}>
                  <span className={styles.stele} role="img" aria-label={t.cinciStele}>
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Stea key={s} />
                    ))}
                  </span>
                  <LogoGoogle />
                </div>
                <blockquote className={styles.text}>
                  <p>{t.texte[k]}</p>
                </blockquote>
                <figcaption className={styles.autor}>
                  <span className={styles.initiale} aria-hidden>
                    {initiale(r.nume)}
                  </span>
                  <span className={styles.cine}>
                    <span className={styles.nume}>
                      {r.nume}
                      <Image
                        src="/imagini/servicii/acasa/verificat.webp"
                        alt={t.verificata}
                        width={16}
                        height={16}
                        className={styles.verificat}
                      />
                    </span>
                    <span className={styles.site}>{r.site}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.actiuni}>
        <Link href={cale(lang, '/oferta')} className={styles.primar}>
          {d.antet.oferta}
          <ArrowRight aria-hidden />
        </Link>
      </div>
    </section>
  );
}

function Stea() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

// „G”-ul Google in cele patru culori ale lui, ca in hero
function LogoGoogle() {
  return (
    <svg className={styles.google} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
