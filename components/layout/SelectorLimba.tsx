'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Check, ChevronUp, Globe } from 'lucide-react';
import { LIMBI, NUME_LIMBI, alternante, type Limba } from '@/lib/i18n/config';
import { COOKIE_LIMBA } from '@/lib/i18n/detectare';
import type { Dictionar } from '@/lib/i18n/dictionare/ro';
import styles from './SelectorLimba.module.css';

/* Schimbarea limbii (2026-11-05; din 2026-11-07 mutata discret in subsolul site-ului, la cererea
   proprietarului: limba se alege acum automat, dupa tara si browser, in proxy.ts). Un buton mic, gri, cu limba
   de acum; lista se deschide in sus. Fiecare limba duce la aceeasi pagina in limba aleasa, sau la prima pagina
   a limbii daca pagina nu e tradusa (alternante() din lib/i18n/config.ts). Alegerea ramane in cookie-ul limbii,
   deci detectarea automata n-o mai schimba. Linkuri simple <a>: limba e in layout-ul radacina, deci
   schimbarea reincarca oricum pagina (si <html lang> se schimba corect). */

type Props = { lang: Limba; t: Dictionar['limba'] };

// alegerea facuta de mana: aceeasi forma ca in proxy.ts (un an, pe tot site-ul)
const tineAlegerea = (l: Limba) => {
  const sigur = location.protocol === 'https:' ? '; secure' : '';
  document.cookie = `${COOKIE_LIMBA}=${l}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax${sigur}`;
};

export function SelectorLimba({ lang, t }: Props) {
  const pathname = usePathname();
  const [deschis, setDeschis] = useState(false);
  const cutie = useRef<HTMLDivElement>(null);
  const linkuri = alternante(pathname);

  useEffect(() => {
    if (!deschis) return;
    const laClic = (e: PointerEvent) => {
      if (cutie.current && !cutie.current.contains(e.target as Node)) setDeschis(false);
    };
    const laTasta = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDeschis(false);
    };
    document.addEventListener('pointerdown', laClic);
    window.addEventListener('keydown', laTasta);
    return () => {
      document.removeEventListener('pointerdown', laClic);
      window.removeEventListener('keydown', laTasta);
    };
  }, [deschis]);

  return (
    <div
      ref={cutie}
      className={styles.selector}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDeschis(false);
      }}
    >
      <button
        type="button"
        className={styles.buton}
        aria-expanded={deschis}
        aria-controls="lista-limbi"
        aria-label={`${t.schimba}: ${NUME_LIMBI[lang].nume}`}
        onClick={() => setDeschis(!deschis)}
      >
        <Globe aria-hidden className={styles.glob} />
        {NUME_LIMBI[lang].nume}
        <ChevronUp aria-hidden className={styles.chevron} />
      </button>

      {deschis && (
        <ul id="lista-limbi" className={styles.lista} aria-label={t.eticheta}>
          {LIMBI.map((l) => (
            <li key={l}>
              <a
                href={linkuri[l]}
                hrefLang={l}
                lang={l}
                aria-current={l === lang ? 'true' : undefined}
                className={styles.optiune}
                onClick={() => tineAlegerea(l)}
              >
                <span>{NUME_LIMBI[l].nume}</span>
                {l === lang ? <Check aria-hidden className={styles.bifa} /> : <span className={styles.cod}>{NUME_LIMBI[l].cod}</span>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
