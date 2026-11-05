'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// cat dureaza un drum al capturii, in jos sau in sus (ca in Portofoliu.module.css), si oprirea la capete
const DRUM = 6000;
const PAUZA = 900;

/* Lista de proiecte de pe prima pagina. Cat timp un proiect e sub mouse sau, pe ecranele fara mouse,
   la mijlocul ecranului, captura lui coboara pana la capatul paginii, sta putin, urca inapoi si o ia
   de la capat (`data-derulare` = jos / sus, vezi Portofoliu.module.css); dupa, revine sus. Cu
   animatiile oprite din sistem nu se misca nimic. */
export function ListaProiecte({ className, children }: { className: string; children: ReactNode }) {
  const lista = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = lista.current;
    if (!ul || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timere = new Map<Element, number>();
    const porneste = (li: Element) => {
      if (timere.has(li)) return;
      const pas = (spre: 'jos' | 'sus') => {
        li.setAttribute('data-derulare', spre);
        timere.set(li, window.setTimeout(() => pas(spre === 'jos' ? 'sus' : 'jos'), DRUM + PAUZA));
      };
      pas('jos');
    };
    const opreste = (li: Element) => {
      window.clearTimeout(timere.get(li));
      timere.delete(li);
      li.removeAttribute('data-derulare');
    };

    const curata: (() => void)[] = [];
    if (window.matchMedia('(hover: hover)').matches) {
      for (const li of ul.children) {
        const intra = () => porneste(li);
        const iese = () => opreste(li);
        li.addEventListener('pointerenter', intra);
        li.addEventListener('pointerleave', iese);
        curata.push(() => {
          li.removeEventListener('pointerenter', intra);
          li.removeEventListener('pointerleave', iese);
        });
      }
    } else {
      // o fasie subtire la mijlocul ecranului: se misca proiectul care o atinge
      const io = new IntersectionObserver(
        (intrari) => {
          for (const i of intrari) {
            if (i.isIntersecting) porneste(i.target);
            else opreste(i.target);
          }
        },
        { rootMargin: '-45% 0px -45% 0px' },
      );
      for (const li of ul.children) io.observe(li);
      curata.push(() => io.disconnect());
    }

    return () => {
      for (const f of curata) f();
      for (const li of [...timere.keys()]) opreste(li);
    };
  }, []);

  return (
    <ul ref={lista} className={className}>
      {children}
    </ul>
  );
}
