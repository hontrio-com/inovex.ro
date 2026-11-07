/* Ce au in comun animatiile din casutele de servicii (filmMagazin.ts, filmPrezentare.ts,
   filmAplicatii.ts, filmCrm.ts), facute de proprietar cu Claude: uneltele de timp, cateva miscari
   si redarea.

   O animatie e o lista de scene. Totul se deseneaza pe o scena de 1920x1080, din care se vede in
   casuta partea din `vedere`, cat de mare incape. Fiecare scena isi construieste propria copie a
   interfetei si isi seteaza stilurile dupa timp (t, in secunde de la inceputul ei); intre scene se
   comuta cu visibility, ca in originale. */

/* ─── Unelte de timp ─── */

export const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
export const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export const eo = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);

export function ei(x: number) {
  x = clamp01(x);
  return x * x * x;
}

export function eio(x: number) {
  x = clamp01(x);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function eob(x: number, s = 1.4) {
  x = clamp01(x);
  return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
}

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// textul scris litera cu litera, cu un ritm usor neregulat: cat s-a scris pana la t
export function typist(text: string, t0: number, cps: number, seed = 7) {
  const r = rng(seed);
  const times: number[] = [];
  let t = t0;
  for (let i = 0; i < text.length; i++) {
    times.push(t);
    t += (1 / cps) * (0.75 + r() * 0.5);
  }
  return (tt: number) => {
    let n = 0;
    while (n < times.length && times[n] <= tt) n++;
    return text.slice(0, n);
  };
}

/* ─── Interfata ─── */

export function h(html: string) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  return tpl.content.firstElementChild as HTMLElement;
}

export type Stil = CSSStyleDeclaration;

export const gaseste = (root: HTMLElement, cls: string) => root.querySelector('.' + cls) as HTMLElement;
export const toate = (root: HTMLElement, cls: string) =>
  Array.from(root.querySelectorAll<HTMLElement | SVGElement>('.' + cls), (e) => e.style);

export function stiluri<K extends string>(root: HTMLElement, prefix: string, chei: readonly K[]) {
  return Object.fromEntries(chei.map((k) => [k, gaseste(root, prefix + k).style])) as Record<K, Stil>;
}

/* ─── Miscari ─── */

export function on(s: Stil) {
  s.opacity = '1';
  s.transform = 'none';
  s.outline = 'none';
}

export function off(s: Stil) {
  s.opacity = '0';
}

// intra din lateral sau de jos, cu un mic arc la final
export function fly(s: Stil, t: number, t0: number, d: number, dx: number, dy: number) {
  const p = seg(t, t0, t0 + d);
  const e = eob(p, 1.7);
  const sq = 1 - 0.06 * Math.sin(Math.PI * seg(t, t0 + d * 0.6, t0 + d + 0.14));
  s.opacity = String(clamp01(p * 5));
  s.transform = 'translate(' + (dx * (1 - e)).toFixed(1) + 'px,' + (dy * (1 - e)).toFixed(1) + 'px) scale(' + (dy ? 1 / sq : sq).toFixed(4) + ',' + (dy ? sq : 1 / sq).toFixed(4) + ')';
}

export function pop(s: Stil, t: number, t0: number) {
  const p = seg(t, t0, t0 + 0.4);
  s.opacity = String(clamp01(p * 6));
  s.transform = 'scale(' + eob(p, 2.2).toFixed(4) + ')';
}

// un contur care se departeaza si se stinge, dupa ce un element a ajuns la locul lui
export function ring(s: Stil, t: number, t1: number) {
  const p = seg(t, t1, t1 + 0.5);
  if (p <= 0 || p >= 1) {
    s.outline = 'none';
    return;
  }
  s.outline = '3px solid color-mix(in srgb, var(--main) ' + Math.round((1 - p) * 70) + '%, transparent)';
  s.outlineOffset = (4 + eo(p) * 20).toFixed(1) + 'px';
}

// pleaca spre dreapta si se stinge
export function out(s: Stil, t: number, t0: number, d: number, dx: number) {
  const p = ei(seg(t, t0, t0 + d));
  s.opacity = String(1 - p);
  s.transform = 'translateX(' + (dx * p).toFixed(1) + 'px)';
}

export function group<K extends string>(parti: Record<K, Stil>, chei: readonly K[], v: boolean) {
  for (const k of chei) {
    if (v) on(parti[k]);
    else off(parti[k]);
  }
}

/* ─── Redarea ─── */

export type Film = {
  // fiecare scena primeste cutia ei si momentul in care incepe, si intoarce functia care o deseneaza
  scene: { dur: number; creeaza: (box: HTMLElement, start: number) => (t: number) => void }[];
  vedere: { x: number; y: number; w: number; h: number };
  // in limbile straine: traduce textele scenei, dupa ce s-a construit (vezi traducator)
  traduce?: (root: HTMLElement) => void;
};

/* Traducerea animatiilor (2026-11-05): fiecare nod de text al unei scene construite care, fara spatiile de
   la margini, e exact o cheie din `texte` primeste traducerea (spatiile raman). Doar noduri de text intregi,
   deci nu atinge stilurile, atributele sau bucati din alte cuvinte. Textele schimbate in timpul animatiei
   (adresa scrisa, totalul, raspunsul AI) le traduce fiecare film la sursa. */
export function traducator(texte: Record<string, string> | null) {
  if (!texte) return undefined;
  return (root: HTMLElement) => {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode() as Text | null; n; n = w.nextNode() as Text | null) {
      const t = n.data.trim();
      const tr = t ? texte[t] : undefined;
      if (tr === undefined || tr === t) continue;
      const i = n.data.indexOf(t);
      n.data = n.data.slice(0, i) + tr + n.data.slice(i + t.length);
    }
  };
}

// dupa ultima scena: cat sta pe loc, apoi cat dureaza stingerea
const HOLD = 2.0;
const FADE = 0.45;

/* Construieste animatia in `scena` (1920x1080, asezata de aici in `cutie`) si o porneste. Merge doar
   cat cutia se vede si tabul e deschis; cu „reduce motion” ramane pe ultimul cadru. Intoarce functia
   care o opreste si goleste scena. */
export function pornesteFilmul(cutie: HTMLElement, scena: HTMLElement, film: Film) {
  type Scena = Film['scene'][number] & { start: number; box: HTMLElement; render?: (t: number) => void };
  const lista: Scena[] = [];
  let start = 0;
  for (const s of film.scene) {
    const box = document.createElement('div');
    box.className = 'inx-scene';
    box.style.visibility = 'hidden';
    scena.append(box);
    lista.push({ ...s, start, box });
    start += s.dur;
  }
  const TOTAL = start;
  const LOOP = TOTAL + HOLD + FADE;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let oprit = false;

  /* Fiecare scena isi construieste interfata o singura data, cand e nevoie de ea sau mai devreme, in
     pauzele paginii, cate una pe rand: toate odata ar bloca pagina o clipa (cateva sute de ms pe un
     telefon mai slab). Cu „reduce motion” e nevoie doar de ultima. */
  const pregateste = (sc: Scena) =>
    (sc.render ??= (() => {
      const render = sc.creeaza(sc.box, sc.start);
      film.traduce?.(sc.box);
      return render;
    })());
  const idle = typeof window.requestIdleCallback === 'function';
  const amana = (f: () => void) => (idle ? requestIdleCallback(f, { timeout: 500 }) : window.setTimeout(f, 50));
  let asteapta = 0;
  const urmatoarea = () => {
    const sc = lista.find((x) => !x.render);
    if (oprit || !sc) return;
    pregateste(sc);
    asteapta = amana(urmatoarea);
  };
  if (!reduce) asteapta = amana(urmatoarea);

  let curenta: Scena | null = null;
  function renderAt(ft: number) {
    const t = Math.min(ft, TOTAL - 1e-4);
    let sc = lista[lista.length - 1];
    for (const x of lista) {
      if (t < x.start + x.dur) {
        sc = x;
        break;
      }
    }
    const render = pregateste(sc);
    if (curenta !== sc) {
      if (curenta) curenta.box.style.visibility = 'hidden';
      sc.box.style.visibility = 'visible';
      curenta = sc;
    }
    render(Math.min(ft - sc.start, sc.dur));
  }

  const { vedere } = film;
  function potriveste() {
    const w = cutie.clientWidth;
    const hh = cutie.clientHeight;
    const s = Math.min(w / vedere.w, hh / vedere.h);
    const x = w / 2 - s * (vedere.x + vedere.w / 2);
    const y = hh / 2 - s * (vedere.y + vedere.h / 2);
    scena.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px) scale(' + s.toFixed(5) + ')';
  }
  potriveste();
  const ro = new ResizeObserver(potriveste);
  ro.observe(cutie);

  let inView = false;
  let raf = 0;
  let last: number | null = null;
  let clock = 0;
  const ruleaza = () => inView && !document.hidden;

  function frame(now: number) {
    raf = 0;
    if (last != null) clock += Math.min(0.1, (now - last) / 1000);
    last = now;
    const lt = clock % LOOP;
    renderAt(Math.min(lt, TOTAL));
    // la sfarsit se stinge, iar la reluare apare din nou
    let f = 0;
    if (lt > TOTAL + HOLD) f = eio((lt - TOTAL - HOLD) / FADE);
    else if (lt < 0.3 && clock > LOOP) f = 1 - eo(lt / 0.3);
    scena.style.opacity = String(1 - f);
    if (ruleaza()) raf = requestAnimationFrame(frame);
  }

  function play() {
    if (!raf && !reduce) {
      last = null;
      raf = requestAnimationFrame(frame);
    }
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  const actualizeaza = () => (ruleaza() ? play() : stop());
  let io: IntersectionObserver | null = null;

  document.fonts.ready.then(() => {
    if (oprit) return;
    if (reduce) {
      renderAt(TOTAL);
      return;
    }
    renderAt(0);
    io = new IntersectionObserver(
      (intrari) => {
        inView = intrari[intrari.length - 1].isIntersecting;
        actualizeaza();
      },
      { threshold: 0.15 },
    );
    io.observe(cutie);
    document.addEventListener('visibilitychange', actualizeaza);
  });

  return () => {
    oprit = true;
    if (idle) cancelIdleCallback(asteapta);
    else clearTimeout(asteapta);
    stop();
    io?.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', actualizeaza);
    scena.replaceChildren();
    scena.removeAttribute('style');
  };
}
