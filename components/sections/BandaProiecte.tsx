'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion';
import styles from './BandaProiecte.module.css';

/* Banda din hero: coloane inclinate cu site-uri facute de Inovex, care curg incet in sus si in
   jos (o coloana se opreste sub mouse). Pozele sunt copii de 520px ale capturilor din
   /imagini/hero, facute anume pentru banda. E decor: cititoarele de ecran o sar. */

const P = '/imagini/hero/banda/';
const SITE = {
  hontrio: `${P}HONTRIO.COM.webp`,
  cutia: `${P}CUTIADEMAGIE.RO.webp`,
  dsmotor: `${P}DSMOTOR.RO.webp`,
  fortas: `${P}FORTASESTATE.RO.webp`,
  atp: `${P}ATPAUTOTEILE.webp`,
  junior: `${P}JUNIORFAMILY.RO.webp`,
  levelup: `${P}MEDITATIILEVELUP.RO.webp`,
  nemescar: `${P}NEMESCAR.RO.webp`,
  profesor: `${P}PROFESORULDEAI.RO.webp`,
  tiglobal: `${P}TIGLOBALIMPORT1010.COM.webp`,
  varlan: `${P}VARLAN-EISENBAU.COM.webp`,
};

type DateColoana = { poze: string[]; sus: boolean; durata: number; start: number };

// Sase coloane; pe ecranele mai inguste CSS-ul le ascunde pe ultimele.
const COLOANE: DateColoana[] = [
  { poze: [SITE.hontrio, SITE.cutia, SITE.dsmotor, SITE.fortas], sus: true, durata: 46, start: 0 },
  { poze: [SITE.atp, SITE.junior, SITE.levelup, SITE.nemescar], sus: false, durata: 38, start: 0.45 },
  { poze: [SITE.profesor, SITE.tiglobal, SITE.varlan, SITE.hontrio], sus: true, durata: 52, start: 0.7 },
  { poze: [SITE.fortas, SITE.nemescar, SITE.cutia, SITE.junior], sus: false, durata: 42, start: 0.2 },
  { poze: [SITE.dsmotor, SITE.varlan, SITE.atp, SITE.profesor], sus: true, durata: 48, start: 0.55 },
  { poze: [SITE.levelup, SITE.tiglobal, SITE.hontrio, SITE.fortas], sus: false, durata: 40, start: 0.3 },
];

export function BandaProiecte() {
  return (
    <div className={styles.banda} aria-hidden>
      <div className={styles.coloane}>
        {COLOANE.map((coloana, k) => (
          <Coloana key={k} {...coloana} />
        ))}
      </div>
    </div>
  );
}

function Coloana({ poze, sus, durata, start }: DateColoana) {
  const y = useMotionValue(0);
  const pista = useRef<HTMLDivElement>(null);
  // inaltimea unui set de poze: lista e pusa de doua ori, ca bucla sa nu se vada
  const inaltimeSet = useRef(0);
  const pauza = useRef(false);
  const [gata, setGata] = useState(false);
  const faraMiscare = useReducedMotion();

  // Se masoara dupa ce se aseaza pozele si la orice schimbare de latime; pana atunci coloana
  // e invizibila, ca sa nu sara din pozitia de start.
  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const h = el.scrollHeight / 2;
      if (!h) return;
      const prima = inaltimeSet.current === 0;
      inaltimeSet.current = h;
      if (prima) y.set(sus ? -h * start : -h + h * start);
      setGata(true);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [sus, start, y]);

  useAnimationFrame((_, delta) => {
    const h = inaltimeSet.current;
    if (faraMiscare || pauza.current || !h) return;
    const pas = (h / (durata * 1000)) * Math.min(delta, 50);
    let cur = y.get();
    if (sus) {
      cur -= pas;
      if (cur < -h) cur += h;
    } else {
      cur += pas;
      if (cur >= 0) cur -= h;
    }
    y.set(cur);
  });

  return (
    <div
      className={styles.coloana}
      onMouseEnter={() => {
        pauza.current = true;
      }}
      onMouseLeave={() => {
        pauza.current = false;
      }}
    >
      <motion.div ref={pista} style={{ y }} className={styles.pista} data-gata={gata}>
        {[0, 1].map((set) => (
          <div key={set} className={styles.set}>
            {poze.map((src, k) => (
              <div key={k} className={styles.card}>
                <Image src={src} alt="" width={520} height={935} unoptimized loading="eager" draggable={false} />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
