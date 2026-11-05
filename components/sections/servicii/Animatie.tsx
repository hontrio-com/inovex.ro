'use client';

import { useEffect, useRef } from 'react';
import styles from './Animatie.module.css';

type Film = { porneste: (cutie: HTMLElement, scena: HTMLElement) => () => void };

/* O animatie din casutele de servicii, pe fundalul gri. Codul ei (`incarca`) se descarca si se
   porneste abia cand casuta se apropie de ecran (atunci se incarca si imaginile), ruleaza cat se vede
   si se opreste cand iese. `className` aduce stilurile interfetei din animatia respectiva. */
export function Animatie({
  incarca,
  eticheta,
  className,
}: {
  incarca: () => Promise<Film>;
  eticheta: string;
  className: string;
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
          if (!anulat) opreste = porneste(c, s);
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
  }, [incarca]);

  return (
    <div ref={cutie} className={styles.animatie} role="img" aria-label={eticheta}>
      <div ref={scena} className={`${styles.scena} ${className}`} aria-hidden />
    </div>
  );
}
