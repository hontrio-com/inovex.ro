'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Glob.module.css';

/* Globul din sectiunea de prezenta, in limbile straine (2026-11-05, dupa „COBE Globe” de shuding pe 21st.dev;
   refacut pe 2026-11-07 la cererea proprietarului: fara eticheta „Inovex · Romania”, sa se vada ca lucram cu
   firme de pe toata planeta). Biblioteca cobe (WebGL, ~5 KB), descarcata abia cand sectiunea se apropie de
   ecran. Orase de pe toate continentele, ca puncte; intre orasele de pe fata vizibila pornesc mereu arce noi:
   arcul tasneste dintr-un oras spre altul, orasul in care aterizeaza pulseaza, apoi coada arcului il urmeaza
   si arcul dispare, in timp ce altele pornesc in alta parte a lumii. Globul se roteste incet si se poate trage
   cu mouse-ul sau cu degetul, cu inertie. Merge doar cat se vede; cu animatiile oprite din sistem sta pe loc,
   cu cateva arce fixe (se poate roti tot de mana). */

type Loc = [number, number];
type V3 = [number, number, number];
type Culoare = [number, number, number];

// orase de pe toate continentele (lat, lng)
const ORASE: Loc[] = [
  // America de Nord
  [40.7128, -74.006], // New York
  [37.7749, -122.4194], // San Francisco
  [34.0522, -118.2437], // Los Angeles
  [41.8781, -87.6298], // Chicago
  [25.7617, -80.1918], // Miami
  [43.6532, -79.3832], // Toronto
  [49.2827, -123.1207], // Vancouver
  [19.4326, -99.1332], // Ciudad de Mexico
  [30.2672, -97.7431], // Austin
  // America de Sud
  [-23.5505, -46.6333], // Sao Paulo
  [-34.6037, -58.3816], // Buenos Aires
  [4.711, -74.0721], // Bogota
  [-33.4489, -70.6693], // Santiago
  [-12.0464, -77.0428], // Lima
  // Europa
  [51.5072, -0.1276], // Londra
  [48.8566, 2.3522], // Paris
  [52.52, 13.405], // Berlin
  [40.4168, -3.7038], // Madrid
  [41.9028, 12.4964], // Roma
  [52.3676, 4.9041], // Amsterdam
  [47.3769, 8.5417], // Zurich
  [59.3293, 18.0686], // Stockholm
  [53.3498, -6.2603], // Dublin
  [38.7223, -9.1393], // Lisabona
  [52.2297, 21.0122], // Varsovia
  [48.2082, 16.3738], // Viena
  [44.4268, 26.1025], // Bucuresti
  [60.1699, 24.9384], // Helsinki
  // Africa si Orientul Mijlociu
  [-33.9249, 18.4241], // Cape Town
  [6.5244, 3.3792], // Lagos
  [-1.2921, 36.8219], // Nairobi
  [30.0444, 31.2357], // Cairo
  [33.5731, -7.5898], // Casablanca
  [25.2048, 55.2708], // Dubai
  [41.0082, 28.9784], // Istanbul
  [32.0853, 34.7818], // Tel Aviv
  [24.7136, 46.6753], // Riad
  // Asia si Oceania
  [19.076, 72.8777], // Mumbai
  [12.9716, 77.5946], // Bangalore
  [1.3521, 103.8198], // Singapore
  [35.6762, 139.6503], // Tokyo
  [37.5665, 126.978], // Seul
  [22.3193, 114.1694], // Hong Kong
  [31.2304, 121.4737], // Shanghai
  [13.7563, 100.5018], // Bangkok
  [-6.2088, 106.8456], // Jakarta
  [-33.8688, 151.2093], // Sydney
  [-37.8136, 144.9631], // Melbourne
  [-36.8485, 174.7633], // Auckland
];

// albastrul din sigla, unul mai inchis si unul mai deschis, ca arcele sa aiba adancime
const ALBASTRU: Culoare = [43 / 255, 143 / 255, 204 / 255];
const ARCE_CULORI: Culoare[] = [ALBASTRU, [22 / 255, 96 / 255, 160 / 255], [96 / 255, 182 / 255, 232 / 255]];
// orasele, puncte discrete; cel din care porneste un arc si cel in care aterizeaza, albastre
const PUNCT: Culoare = [0.56, 0.64, 0.73];

// Pozitia de pornire: centrul globului deasupra Atlanticului (15 V), ca din prima clipa sa se vada America,
// Europa si Africa, cu arce peste ocean; globul se roteste ca Pamantul, deci in timp trec prin fata toate
// continentele. Aplecat spre noi cat sa se vada bine emisfera nordica.
const PHI_START = Math.PI - ((-15 * Math.PI) / 180 - Math.PI / 2);
const THETA = 0.42;
const ROTATIE = 0.0016; // radiani pe cadru, de la sine

// viata unui arc (ms): capul zboara spre destinatie, arcul ramane intreg o clipa, apoi coada il urmeaza
const ZBOR = 1300;
const PAUZA = 650;
const COADA = 1100;
const PULS = 1500; // pulsul orasului in care aterizeaza
const ARCE_MAX = 7;
const INTERVAL = 420; // cat de des porneste un arc nou

// coordonatele 3D ale unui oras, ca in cobe (functia U din biblioteca), si inapoi
const v3 = ([lat, lng]: Loc): V3 => {
  const r = (lat * Math.PI) / 180;
  const a = (lng * Math.PI) / 180 - Math.PI;
  const c = Math.cos(r);
  return [-c * Math.cos(a), Math.sin(r), c * Math.sin(a)];
};
const loc = ([x, y, z]: V3): Loc => {
  const lat = (Math.asin(Math.max(-1, Math.min(1, y))) * 180) / Math.PI;
  let lng = ((Math.atan2(z, -x) + Math.PI) * 180) / Math.PI;
  if (lng > 180) lng -= 360;
  return [lat, lng];
};
const punct = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
// drumul cel mai scurt pe sfera, de la a la b, la fractiunea t
const pe = (a: V3, b: V3, t: number): V3 => {
  const om = Math.acos(Math.max(-1, Math.min(1, punct(a, b))));
  if (om < 1e-4) return a;
  const s = Math.sin(om);
  const k1 = Math.sin((1 - t) * om) / s;
  const k2 = Math.sin(t * om) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
};
// cat de spre noi e un punct (aceeasi formula ca vizibilitatea din cobe): 1 = in centru, 0 = pe margine
const fata = (p: V3, phi: number, theta: number) =>
  -Math.sin(phi) * Math.cos(theta) * p[0] + Math.sin(theta) * p[1] + Math.cos(phi) * Math.cos(theta) * p[2];
const lin = (t: number) => Math.max(0, Math.min(1, t));
const usor = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

const PUNCTE = ORASE.map(v3);

type Arc = { de: number; la: number; t0: number; culoare: Culoare; aterizat: boolean };
type Puls = { oras: number; t0: number };

// cu animatiile oprite: cateva arce intregi, fixe, pe fata de pornire (America, Europa, Africa)
const FIXE: [number, number][] = [
  [0, 14], // New York - Londra
  [4, 17], // Miami - Madrid
  [9, 23], // Sao Paulo - Lisabona
  [5, 15], // Toronto - Paris
  [29, 14], // Lagos - Londra
  [11, 17], // Bogota - Madrid
  [32, 0], // Casablanca - New York
];

type Glob = { update: (s: Record<string, unknown>) => void; destroy: () => void };

export function Glob({ aria }: { aria: string }) {
  const cutie = useRef<HTMLDivElement>(null);
  const panza = useRef<HTMLCanvasElement>(null);
  const [gata, setGata] = useState(false);

  useEffect(() => {
    const el = cutie.current;
    const c = panza.current;
    if (!el || !c) return;

    const redus = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let glob: Glob | null = null;
    let raf = 0;
    let peEcran = false;
    let oprit = false;
    let latime = c.offsetWidth || 1;
    let phi = PHI_START;
    let theta = THETA;
    let viteza = 0; // inertia dupa tragere
    let tras = false;
    let x0 = 0;
    let y0 = 0;
    let arce: Arc[] = [];
    let pulsuri: Puls[] = [];
    let ultimul = 0;
    let timpPauza = 0; // cat a stat oprit (in afara ecranului), ca arcele sa continue de unde au ramas
    let opritLa = 0;

    // un arc nou, intre doua orase de pe fata vizibila, nici prea aproape, nici prea departe unul de altul
    const nasteArc = (acum: number) => {
      const fete = PUNCTE.map((p) => fata(p, phi, theta));
      const ocupate = new Set(arce.flatMap((a) => [a.de, a.la]));
      const de = PUNCTE.map((_, i) => i).filter((i) => fete[i] > 0.32 && !ocupate.has(i));
      if (!de.length) return;
      const i = de[Math.floor(Math.random() * de.length)];
      const la = PUNCTE.map((_, j) => j).filter((j) => {
        if (j === i || ocupate.has(j) || fete[j] < 0.22) return false;
        const d = punct(PUNCTE[i], PUNCTE[j]);
        return d < Math.cos((16 * Math.PI) / 180) && d > Math.cos((100 * Math.PI) / 180);
      });
      if (!la.length) return;
      const j = la[Math.floor(Math.random() * la.length)];
      arce.push({ de: i, la: j, t0: acum, culoare: ARCE_CULORI[Math.floor(Math.random() * ARCE_CULORI.length)], aterizat: false });
    };

    // arcele si punctele pentru cadrul de acum
    const stare = (acum: number) => {
      if (redus) {
        return {
          arcs: FIXE.map(([a, b], k) => ({ from: ORASE[a], to: ORASE[b], color: ARCE_CULORI[k % ARCE_CULORI.length] })),
          markers: ORASE.map((location, k) => ({
            location,
            size: FIXE.some(([a, b]) => a === k || b === k) ? 0.038 : 0.022,
            color: FIXE.some(([a, b]) => a === k || b === k) ? ALBASTRU : PUNCT,
          })),
        };
      }
      if (acum - ultimul > INTERVAL && arce.length < ARCE_MAX) {
        nasteArc(acum);
        ultimul = acum;
      }
      const arcs: { from: Loc; to: Loc; color: Culoare }[] = [];
      const active = new Set<number>();
      arce = arce.filter((a) => {
        const t = acum - a.t0;
        const cap = usor(lin(t / ZBOR));
        const coada = usor(lin((t - ZBOR - PAUZA) / COADA));
        if (coada >= 1) return false;
        if (!a.aterizat && t >= ZBOR) {
          a.aterizat = true;
          pulsuri.push({ oras: a.la, t0: acum });
        }
        const A = PUNCTE[a.de];
        const B = PUNCTE[a.la];
        const pCap = pe(A, B, cap);
        const pCoada = pe(A, B, coada);
        if (punct(pCap, pCoada) < 0.99999) arcs.push({ from: loc(pCoada), to: loc(pCap), color: a.culoare });
        if (coada < 0.05) active.add(a.de);
        return true;
      });
      pulsuri = pulsuri.filter((p) => acum - p.t0 < PULS);

      const markers: { location: Loc; size: number; color: Culoare }[] = ORASE.map((location, k) => ({
        location,
        size: active.has(k) ? 0.036 : 0.022,
        color: active.has(k) ? ALBASTRU : PUNCT,
      }));
      // pulsul: punctul orasului creste si se stinge inapoi
      for (const p of pulsuri) {
        const k = (acum - p.t0) / PULS;
        markers.push({ location: ORASE[p.oras], size: 0.03 + 0.07 * Math.sin(Math.PI * Math.min(1, k * 1.15)) * (1 - k * 0.4), color: ALBASTRU });
      }
      return { arcs, markers };
    };

    const cadru = (ms: number) => {
      raf = 0;
      if (!glob) return;
      const acum = ms - timpPauza;
      if (!tras) {
        phi += viteza + (redus ? 0 : ROTATIE);
        viteza *= 0.94;
        theta += (THETA - theta) * 0.06;
      }
      glob.update({ phi, theta, ...stare(acum) });
      const misca = !redus || tras || Math.abs(viteza) > 1e-4 || Math.abs(THETA - theta) > 1e-3;
      if (peEcran && misca) raf = requestAnimationFrame(cadru);
      else opritLa = ms;
    };
    const porneste = () => {
      if (raf || !glob || !peEcran) return;
      // timpul cat a stat oprit nu se numara: arcele pornite raman la jumatatea drumului, nu sar la capat
      if (opritLa) {
        const acum = performance.now();
        timpPauza += acum - opritLa;
        opritLa = 0;
      }
      raf = requestAnimationFrame(cadru);
    };

    const marime = () => {
      latime = c.offsetWidth || latime;
      c.width = Math.round(latime * dpr);
      c.height = Math.round(latime * dpr);
      glob?.update({ width: c.width, height: c.height });
      porneste();
    };

    const creeaza = async () => {
      const { default: createGlobe } = await import('cobe');
      if (oprit) return;
      marime();
      const inceput = stare(performance.now());
      glob = createGlobe(c, {
        devicePixelRatio: dpr,
        width: c.width,
        height: c.height,
        phi,
        theta,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 20000,
        mapBrightness: 5.5,
        mapBaseBrightness: 0,
        baseColor: [1, 1, 1],
        markerColor: ALBASTRU,
        glowColor: [0.9, 0.93, 0.97],
        markers: inceput.markers,
        arcs: inceput.arcs,
        arcColor: ALBASTRU,
        arcWidth: 0.9,
        arcHeight: 0.28,
        markerElevation: 0.01,
      });
      setGata(true);
      porneste();
    };

    // cobe se descarca doar cand globul ajunge aproape de ecran; deseneaza doar cat se vede
    const io = new IntersectionObserver(
      ([i]) => {
        peEcran = i.isIntersecting;
        if (peEcran && !glob) void creeaza();
        if (peEcran) porneste();
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(el);

    const ro = new ResizeObserver(() => {
      if (c.offsetWidth && Math.abs(c.offsetWidth - latime) > 1) marime();
    });
    ro.observe(c);

    // tragere: orizontal roteste globul (o latime de glob ~ o tura), vertical il apleaca putin
    const jos = (e: PointerEvent) => {
      if (!glob) return;
      tras = true;
      viteza = 0;
      x0 = e.clientX;
      y0 = e.clientY;
      c.setPointerCapture(e.pointerId);
      el.setAttribute('data-tras', '');
      porneste();
    };
    const misca = (e: PointerEvent) => {
      if (!tras) return;
      const k = 4 / latime;
      viteza = (e.clientX - x0) * k;
      phi += viteza;
      theta = Math.max(-0.15, Math.min(0.95, theta + (e.clientY - y0) * k * 0.5));
      x0 = e.clientX;
      y0 = e.clientY;
    };
    const sus = () => {
      if (!tras) return;
      tras = false;
      el.removeAttribute('data-tras');
      porneste();
    };
    c.addEventListener('pointerdown', jos);
    c.addEventListener('pointermove', misca);
    c.addEventListener('pointerup', sus);
    c.addEventListener('pointercancel', sus);

    return () => {
      oprit = true;
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      c.removeEventListener('pointerdown', jos);
      c.removeEventListener('pointermove', misca);
      c.removeEventListener('pointerup', sus);
      c.removeEventListener('pointercancel', sus);
      glob?.destroy();
    };
  }, []);

  return (
    <div ref={cutie} className={styles.glob}>
      <div className={styles.scena}>
        <span className={styles.halou} aria-hidden />
        <canvas ref={panza} className={styles.panza} data-gata={gata} role="img" aria-label={aria} />
      </div>
    </div>
  );
}
