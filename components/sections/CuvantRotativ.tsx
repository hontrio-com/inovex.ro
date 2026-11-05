'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './CuvantRotativ.module.css';

/* Pastila neagra din titlul hero-ului. Cuvintele vin pe rand: cel vechi urca si se estompeaza,
   cel nou urca de jos, iar pastila se lungeste sau se scurteaza lin pana la latimea lui. E doar
   pentru ochi (in Hero sta sub aria-hidden); titlul intreg e scris o data pentru cititoarele de
   ecran si motoarele de cautare. */

const PAUZA = 3000; // ms intre doua cuvinte
const LUNG = 20; // de la atatea litere, cuvantul se micsoreaza putin pe telefon (vezi CSS-ul)

type Stare = 'activ' | 'iese' | 'asteapta';

export function CuvantRotativ({ cuvinte }: { cuvinte: string[] }) {
  const [activ, setActiv] = useState(0);
  const [latimi, setLatimi] = useState<number[]>([]);
  const pastila = useRef<HTMLSpanElement>(null);
  const cuvant = useRef<(HTMLSpanElement | null)[]>([]);

  // Latimea fiecarui cuvant, in em-ul pastilei, ca pastila sa creasca odata cu titlul (alt ecran,
  // telefon rotit). Se masoara din nou cand se incarca fontul. Spatierea negativa dintre litere
  // se pune si dupa ultima litera, care iese din cutie cu atat: o adaugam inapoi, ca loc liber din
  // stanga si din dreapta sa fie egal (CSS-ul muta cuvantul cu jumatate din ea).
  useEffect(() => {
    const p = pastila.current;
    if (!p) return;
    const masoara = () => {
      const em = parseFloat(getComputedStyle(p).fontSize);
      setLatimi(
        cuvant.current.map((e) =>
          e ? (e.offsetWidth - (parseFloat(getComputedStyle(e).letterSpacing) || 0)) / em : 0,
        ),
      );
    };
    const ro = new ResizeObserver(masoara);
    cuvant.current.forEach((e) => e && ro.observe(e));
    return () => ro.disconnect();
  }, [cuvinte]);

  // Cuvintele se schimba doar cat titlul se vede si tabul e deschis. Cine are animatiile oprite
  // in sistem vede doar primul cuvant (toate serviciile sunt oricum scrise in paragraful de sub).
  useEffect(() => {
    const el = pastila.current;
    if (!el || cuvinte.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    let peEcran = false;
    const actualizeaza = () => {
      const merge = peEcran && !document.hidden;
      if (merge && !timer) timer = setInterval(() => setActiv((i) => (i + 1) % cuvinte.length), PAUZA);
      if (!merge && timer) {
        clearInterval(timer);
        timer = undefined;
      }
    };
    const io = new IntersectionObserver((intrari) => {
      peEcran = intrari[intrari.length - 1].isIntersecting;
      actualizeaza();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', actualizeaza);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', actualizeaza);
      clearInterval(timer);
    };
  }, [cuvinte.length]);

  const n = cuvinte.length;
  const i = activ % n;
  const anterior = (i + n - 1) % n;
  const stare = (k: number): Stare => (k === i ? 'activ' : k === anterior ? 'iese' : 'asteapta');

  return (
    <span ref={pastila} className={styles.pastila} style={latimi[i] ? { width: `${latimi[i]}em` } : undefined}>
      {/* tine inaltimea si linia de baza; cuvintele vizibile trec prin fereastra de deasupra */}
      <span className={styles.masura}>{cuvinte[i]}</span>
      <span className={styles.fereastra}>
        {cuvinte.map((text, k) => (
          <Fragment key={text}>
            {' '}
            <span
              ref={(e) => {
                cuvant.current[k] = e;
              }}
              className={styles.cuvant}
              data-stare={stare(k)}
              data-lung={text.length >= LUNG ? '' : undefined}
            >
              {text}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
