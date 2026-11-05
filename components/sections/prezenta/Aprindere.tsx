'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/* Chenarul sectiunii de prezenta nationala. Cu scriptul pornit, harta asteapta gri (`astept`) si se
   aprinde cand jumatate din ea ajunge pe ecran (`aprins`, vezi Prezenta.module.css); se urmareste
   harta, nu tot chenarul, ca pe telefon (textul deasupra hartii) valul sa nu treaca neobservat. Fara
   script, cu animatiile oprite din sistem sau cu harta deja pe ecran la incarcare, ramane aprinsa.
   Tot aici, `data-mouse`: judetele de langa cel de sub mouse se estompeaza doar cand mouse-ul chiar
   se misca pe harta, nu si cand pagina trece prin derulare pe sub un cursor nemiscat. */
export function Aprindere({ className, children }: { className: string; children: ReactNode }) {
  const chenar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chenar.current;
    const harta = el?.querySelector<SVGSVGElement>('svg[role="img"]');
    if (!el || !harta) return;
    // derularea muta :hover fara pointermove (Chrome) sau cu o miscare de 0 (Safari)
    const misca = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && (e.movementX || e.movementY) && !el.hasAttribute('data-mouse')) {
        el.setAttribute('data-mouse', '');
      }
    };
    const opreste = () => {
      if (el.hasAttribute('data-mouse')) el.removeAttribute('data-mouse');
    };
    harta.addEventListener('pointermove', misca);
    harta.addEventListener('pointerleave', opreste);
    window.addEventListener('scroll', opreste, { passive: true });
    return () => {
      harta.removeEventListener('pointermove', misca);
      harta.removeEventListener('pointerleave', opreste);
      window.removeEventListener('scroll', opreste);
    };
  }, []);

  useEffect(() => {
    const el = chenar.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const harta = el.querySelector('svg[role="img"]') ?? el;
    const r = harta.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    el.setAttribute('data-aprindere', 'astept');
    const io = new IntersectionObserver(
      ([i]) => {
        if (!i.isIntersecting) return;
        el.setAttribute('data-aprindere', 'aprins');
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(harta);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={chenar} className={className}>
      {children}
    </div>
  );
}
