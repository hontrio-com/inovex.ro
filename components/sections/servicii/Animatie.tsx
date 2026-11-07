'use client';

import { useEffect, useRef } from 'react';
import type { Limba } from '@/lib/i18n/config';
import styles from './Animatie.module.css';

type Film = { porneste: (cutie: HTMLElement, scena: HTMLElement, lang?: Limba) => () => void };

/* O animatie din casutele de servicii, pe fundalul gri. Codul ei (`incarca`) se descarca si se
   porneste abia cand casuta se apropie de ecran (atunci se incarca si imaginile), ruleaza cat se vede
   si se opreste cand iese. `className` aduce stilurile interfetei din animatia respectiva. `lang`: limba
   textelor din animatie (in limbile straine, filmul isi traduce scenele si foloseste euro). */
export function Animatie({
  incarca,
  eticheta,
  className,
  lang = 'ro',
}: {
  incarca: () => Promise<Film>;
  eticheta: string;
  className: string;
  lang?: Limba;
}) {
  const cutie = useRef<HTMLDivElement>(null);
  const scena = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = cutie.current;
    const s = scena.current;
    if (!c || !s) return;
    let anulat = false;
    let opreste: (() => void) | undefined;
    const io = new IntersectionObserver(
      (intrari) => {
        if (!intrari.some((x) => x.isIntersecting)) return;
        io.disconnect();
        incarca().then(({ porneste }) => {
          if (!anulat) opreste = porneste(c, s, lang);
        });
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(c);
    return () => {
      anulat = true;
      io.disconnect();
      opreste?.();
    };
  }, [incarca, lang]);

  return (
    <div ref={cutie} className={styles.animatie} role="img" aria-label={eticheta}>
      <div ref={scena} className={`${styles.scena} ${className}`} aria-hidden />
    </div>
  );
}
