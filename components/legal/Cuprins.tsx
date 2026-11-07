'use client';

import { useEffect, useState } from 'react';
import styles from './DocumentLegal.module.css';

/* Cuprinsul paginilor legale: pe telefon si tableta o lista pliabila (<details>), de la 1024px o
   coloana lipita in stanga, cu sectiunea citita acum marcata (ultima al carei titlu a trecut de
   primul sfert al ecranului). Fara JavaScript, cuprinsul merge la fel, doar fara marcaj. */

type Element = { id: string; text: string };

function Lista({ elemente, activ }: { elemente: Element[]; activ: string }) {
  return (
    <ol className={styles.cuprinsLista}>
      {elemente.map((e, i) => (
        <li key={e.id}>
          <a href={`#${e.id}`} aria-current={e.id === activ ? 'location' : undefined}>
            <span className={styles.cuprinsNr}>{i + 1}</span>
            <span>{e.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export function Cuprins({ titlu, numar, elemente }: { titlu: string; numar: string; elemente: Element[] }) {
  const [activ, setActiv] = useState(elemente[0]?.id ?? '');

  useEffect(() => {
    const sectiuni = elemente.map((e) => document.getElementById(e.id));
    let cadru = 0;

    const actualizeaza = () => {
      cadru = 0;
      const prag = Math.min(window.innerHeight * 0.3, 240);
      let curent = elemente[0]?.id ?? '';
      sectiuni.forEach((s, i) => {
        if (s && s.getBoundingClientRect().top <= prag) curent = elemente[i].id;
      });
      setActiv(curent);
    };
    const programeaza = () => {
      if (!cadru) cadru = requestAnimationFrame(actualizeaza);
    };

    actualizeaza();
    window.addEventListener('scroll', programeaza, { passive: true });
    window.addEventListener('resize', programeaza);
    return () => {
      cancelAnimationFrame(cadru);
      window.removeEventListener('scroll', programeaza);
      window.removeEventListener('resize', programeaza);
    };
  }, [elemente]);

  return (
    <>
      <details className={styles.cuprinsMobil}>
        <summary>
          <span className={styles.cuprinsTitlu}>{titlu}</span>
          <span className={styles.cuprinsNumar}>{numar}</span>
        </summary>
        <Lista elemente={elemente} activ={activ} />
      </details>

      <nav className={styles.cuprins} aria-label={titlu}>
        <p className={styles.cuprinsTitlu}>{titlu}</p>
        <Lista elemente={elemente} activ={activ} />
      </nav>
    </>
  );
}
