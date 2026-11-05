'use client';

import { useEffect, useRef } from 'react';

/* O cifra care creste de la zero cand ajunge pe ecran. E doar pentru ochi (aria-hidden): valoarea
   finala, pentru cititoarele de ecran, o scrie sectiunea langa ea. Cu animatiile oprite din sistem,
   fara script sau cu cifra deja pe ecran la incarcare, se vede direct valoarea finala. */
export function Numar({ n }: { n: number }) {
  const cifra = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = cifra.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    el.textContent = '0';
    let raf = 0;
    const io = new IntersectionObserver(
      ([i]) => {
        if (!i.isIntersecting) return;
        io.disconnect();
        // inceputul e momentul primului cadru, ca prima valoare sa fie 0
        let t0 = -1;
        const pas = (t: number) => {
          if (t0 < 0) t0 = t;
          const p = Math.min(1, (t - t0) / 1400);
          el.textContent = String(Math.round(n * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(pas);
        };
        raf = requestAnimationFrame(pas);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [n]);

  return (
    <span ref={cifra} aria-hidden>
      {n}
    </span>
  );
}
