// ============================================================
// Harta din sectiunea „Prezenta nationala” (prima pagina): Romania din puncte, judet cu judet, cu
// granitele dintre judete, din public/ro.svg (simplemaps, liber pentru uz comercial). Scrie
// components/sections/prezenta/harta.json.
//
// Rulare (din radacina proiectului):
//   node scripts/harta-prezenta.mjs [pas]
//
// - Granitele: fiecare muchie din contururile judetelor e fie comuna pentru doua judete (granita
//   intre judete), fie pe conturul tarii. Muchiile se leaga in linii intre noduri si se simplifica
//   (Douglas-Peucker), in doua cai: `granite` (intre judete) si `contur` (al tarii). Inelul
//   Bucurestiului nu se deseneaza: e prea mic pentru grila de puncte si ar lasa capitala aproape
//   goala; Bucurestiul ramane totusi judet separat la mouse.
// - Punctele: fiecare judet e desenat in culoarea lui, se citeste o grila hexagonala (pas 13) si
//   fiecare judet devine o cale de linii de lungime 0 cu capete rotunde, cate una pe punct, scrise
//   relativ, ca fisierul sa ramana mic. Punctele prea apropiate de o granita sunt scoase (`d` le
//   pastreaza pe celelalte): fiecare judet e o insula de puncte, iar linia de granita trece printr-un
//   culoar gol. Punctele scoase (`culoar`) raman separat, invizibile, ca judetul sa raspunda la mouse
//   pana la granita.
// - `t` (0..1) e randul judetului cand se aprinde harta: o ordine amestecata, mereu aceeasi.
// (Fara sediul din Targu Jiu pe harta, la cererea proprietarului: harta arata clienti in toate
// judetele.)
// ============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp'; // vine cu next (dependinta optionala), nu trebuie adaugat in package.json

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SP = Number(process.argv[2] || 13);
const W = 1000;
const H = 704;
const EPS_GRANITE = 0.6; // toleranta simplificarii, in unitati de harta (1 unitate ~ 0,7px pe desktop)
const EPS_CONTUR = 1; // coasta si Dunarea ceva mai netede
const LIBER_GRANITA = 4.4; // un punct ramane doar la cel putin atat de o granita intre judete (raza lui e 3)
const LIBER_CONTUR = 3.8; // ... si de conturul tarii
const LIBER_MIC = 3.2; // pentru judetele mici (sub 25 de puncte: Ilfov), care altfel aproape ar disparea
const MIC = 25;

const svg = fs.readFileSync(path.join(ROOT, 'public/ro.svg'), 'utf8');
const start = svg.indexOf('<g id="features"');
const feats = svg.slice(start, svg.indexOf('</g>', start));
const judete = [...feats.matchAll(/<path d="([^"]+)" id="(RO[A-Z]+)" name="([^"]+)"/g)].map((m) => ({ d: m[1], id: m[2] }));
if (judete.length !== 42) throw new Error('judete: ' + judete.length);

// ─── Granitele ───

// contururile folosesc doar M/m, l si z
function inele(d) {
  const toks = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g);
  const out = [];
  let ring = null, x = 0, y = 0, cmd = null, i = 0, sx = 0, sy = 0;
  while (i < toks.length) {
    const t = toks[i];
    if (/[a-zA-Z]/.test(t)) {
      cmd = t;
      i++;
      if (cmd === 'z' || cmd === 'Z') {
        if (ring) out.push(ring);
        ring = null;
        x = sx;
        y = sy;
      }
      continue;
    }
    const a = +toks[i], b = +toks[i + 1];
    i += 2;
    if (cmd === 'M') { x = a; y = b; ring = [[x, y]]; sx = x; sy = y; cmd = 'L'; }
    else if (cmd === 'm') { x += a; y += b; ring = [[x, y]]; sx = x; sy = y; cmd = 'l'; }
    else if (cmd === 'l') { x += a; y += b; ring.push([x, y]); }
    else if (cmd === 'L') { x = a; y = b; ring.push([x, y]); }
    else throw new Error('comanda neasteptata in contur: ' + cmd);
  }
  if (ring) out.push(ring);
  return out;
}
const cheie = (p) => p[0].toFixed(1) + ',' + p[1].toFixed(1);
const P = new Map();
for (const j of judete) {
  j.inele = inele(j.d).map((r) => r.map((p) => {
    const k = cheie(p);
    if (!P.has(k)) P.set(k, [+p[0].toFixed(1), +p[1].toFixed(1)]);
    return k;
  }));
}
const muchii = new Map();
for (const j of judete) for (const r of j.inele) for (let i = 0; i < r.length; i++) {
  const a = r[i], b = r[(i + 1) % r.length];
  if (a === b) continue;
  const k = a < b ? a + '|' + b : b + '|' + a;
  const e = muchii.get(k) || { a, b, ids: [] };
  e.ids.push(j.id);
  muchii.set(k, e);
}
const segs = [...muchii.values()];
const dseg = (px, py, p, q) => {
  const vx = q[0] - p[0], vy = q[1] - p[1];
  const L = vx * vx + vy * vy;
  let t = L ? ((px - p[0]) * vx + (py - p[1]) * vy) / L : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - p[0] - t * vx, py - p[1] - t * vy);
};
// o muchie a unui singur judet e tot granita intre judete cand o muchie a altui judet trece chiar
// langa ea (cele doua contururi nu au mereu aceleasi varfuri); muchiile care o ating intr-un nod nu conteaza
const CELL = 4;
const grila = new Map();
segs.forEach((e, idx) => {
  const p = P.get(e.a), q = P.get(e.b);
  for (let x = Math.floor(Math.min(p[0], q[0]) / CELL); x <= Math.floor(Math.max(p[0], q[0]) / CELL); x++)
    for (let y = Math.floor(Math.min(p[1], q[1]) / CELL); y <= Math.floor(Math.max(p[1], q[1]) / CELL); y++) {
      const c = x + ':' + y;
      (grila.get(c) || grila.set(c, []).get(c)).push(idx);
    }
});
for (const e of segs) {
  if (e.ids.length > 1) { e.interior = true; continue; }
  const p = P.get(e.a), q = P.get(e.b);
  const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
  let best = 9;
  const cx = Math.floor(mx / CELL), cy = Math.floor(my / CELL);
  for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (const idx of grila.get(cx + dx + ':' + (cy + dy)) || []) {
    const o = segs[idx];
    if (o.ids.includes(e.ids[0]) || o.a === e.a || o.a === e.b || o.b === e.a || o.b === e.b) continue;
    best = Math.min(best, dseg(mx, my, P.get(o.a), P.get(o.b)));
  }
  e.interior = best < 0.8;
}
// muchiile de un fel, legate in linii intre noduri (fara inelul Bucurestiului, vezi sus)
function lanturi(interior) {
  const es = segs.filter((e) => e.interior === interior && !e.ids.includes('ROB'));
  const vecini = new Map();
  const folosite = new Set();
  es.forEach((e, i) => { for (const v of [e.a, e.b]) (vecini.get(v) || vecini.set(v, []).get(v)).push(i); });
  const out = [];
  const mergi = (v0, i0) => {
    const linie = [v0];
    let v = v0, i = i0;
    for (;;) {
      folosite.add(i);
      const e = es[i];
      v = e.a === v ? e.b : e.a;
      linie.push(v);
      const urm = vecini.get(v).filter((j) => !folosite.has(j));
      if (vecini.get(v).length !== 2 || !urm.length) break;
      i = urm[0];
    }
    return linie;
  };
  for (const [v, l] of vecini) if (l.length !== 2) for (const i of l) if (!folosite.has(i)) out.push(mergi(v, i));
  es.forEach((e, i) => { if (!folosite.has(i)) out.push(mergi(e.a, i)); });
  return out.map((c) => c.map((k) => P.get(k)));
}
function simplifica(pts, eps) {
  if (pts.length < 3) return pts;
  const n = pts.length;
  if (pts[0][0] === pts[n - 1][0] && pts[0][1] === pts[n - 1][1]) {
    // un inel inchis: se taie in punctul cel mai departat, ca ambele capete sa ramana pe loc
    let far = 1, fd = -1;
    for (let i = 1; i < n - 1; i++) {
      const d = Math.hypot(pts[i][0] - pts[0][0], pts[i][1] - pts[0][1]);
      if (d > fd) { fd = d; far = i; }
    }
    return simplifica(pts.slice(0, far + 1), eps).concat(simplifica(pts.slice(far), eps).slice(1));
  }
  const pastreaza = new Uint8Array(n);
  pastreaza[0] = pastreaza[n - 1] = 1;
  const stiva = [[0, n - 1]];
  while (stiva.length) {
    const [s, e] = stiva.pop();
    let md = -1, mi = -1;
    for (let i = s + 1; i < e; i++) {
      const d = dseg(pts[i][0], pts[i][1], pts[s], pts[e]);
      if (d > md) { md = d; mi = i; }
    }
    if (md > eps) {
      pastreaza[mi] = 1;
      stiva.push([s, mi], [mi, e]);
    }
  }
  return pts.filter((_, i) => pastreaza[i]);
}
// numere cu o zecimala si fara zero in fata; minusul tine loc si de despartitor
const nr = (v) => {
  const s = (Math.round(v * 10) / 10).toFixed(1).replace(/\.0$/, '').replace(/^(-?)0\./, '$1.');
  return s === '-0' ? '0' : s;
};
const pereche = (a, b) => {
  const sb = nr(b);
  return nr(a) + (sb.startsWith('-') ? '' : ' ') + sb;
};
// fiecare linie: primul punct absolut, urmatoarele relativ (rotunjite cumulat, fara sa se adune erori)
function cale(linii) {
  let d = '';
  for (const l of linii) {
    let px = Math.round(l[0][0] * 10), py = Math.round(l[0][1] * 10);
    d += 'M' + pereche(px / 10, py / 10) + 'l';
    for (let i = 1; i < l.length; i++) {
      const x = Math.round(l[i][0] * 10), y = Math.round(l[i][1] * 10);
      const s = pereche((x - px) / 10, (y - py) / 10);
      d += (i === 1 || s.startsWith('-') ? '' : ' ') + s;
      px = x;
      py = y;
    }
  }
  return d;
}
const granite = lanturi(true).map((c) => simplifica(c, EPS_GRANITE));
const contur = lanturi(false).map((c) => simplifica(c, EPS_CONTUR));
const segmente = (linii) => linii.flatMap((c) => c.slice(1).map((q, i) => [c[i], q]));
const sGranite = segmente(granite);
const sContur = segmente(contur);
const distanta = (x, y, ss) => {
  let b = 99;
  for (const [p, q] of ss) {
    if (Math.abs(p[0] - x) > 30 && Math.abs(q[0] - x) > 30) continue;
    b = Math.min(b, dseg(x, y, p, q));
  }
  return b;
};

// ─── Punctele ───

const masca =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#000"/>` +
  judete.map((j, i) => `<path d="${j.d}" fill="rgb(${(i + 1) * 5},0,0)" shape-rendering="crispEdges"/>`).join('') +
  '</svg>';
const fmt = (v) => String(+v.toFixed(1));
// o cale de puncte: primul punct de pe un rand absolut, urmatoarele de pe acelasi rand relativ
const puncte = (ds) => {
  let d = '';
  let prev = null;
  for (const [x, y] of ds) {
    d += prev && prev[1] === y ? `m${fmt(x - prev[0])} 0h0` : `M${fmt(x)} ${fmt(y)}h0`;
    prev = [x, y];
  }
  return d;
};

const { data, info } = await sharp(Buffer.from(masca)).raw().toBuffer({ resolveWithObject: true });
const at = (x, y) => data[(Math.round(y) * info.width + Math.round(x)) * info.channels];
const dots = judete.map(() => []);
const dy = (SP * Math.sqrt(3)) / 2;
let row = 0;
for (let y = dy / 2; y < H; y += dy, row++) {
  for (let x = row % 2 ? SP : SP / 2; x < W; x += SP) {
    const r = at(x, y);
    if (r && r % 5 === 0) dots[r / 5 - 1].push({ x, y, g: distanta(x, y, sGranite), c: distanta(x, y, sContur) });
  }
}
const out = judete.map((j, i) => {
  const ds = dots[i];
  // un judet mic isi pastreaza mai multe puncte (mai aproape de granite), si mereu macar unul
  const liber = ds.length < MIC ? LIBER_MIC : LIBER_GRANITA;
  let raman = ds.filter((p) => p.g >= liber && p.c >= LIBER_CONTUR);
  if (!raman.length) raman = [ds.reduce((a, b) => (Math.min(b.g, b.c) > Math.min(a.g, a.c) ? b : a))];
  const culoar = ds.filter((p) => !raman.includes(p));
  return { id: j.id, n: ds.length, k: raman.length, d: puncte(raman.map((p) => [p.x, p.y])), culoar: puncte(culoar.map((p) => [p.x, p.y])) };
});
// ordinea in care se aprind judetele: amestecata, mereu aceeasi (samanta fixa), ca t = 0..1
let seed = 20261019;
const rnd = () => {
  seed = (seed + 0x6d2b79f5) >>> 0;
  let x = Math.imul(seed ^ (seed >>> 15), seed | 1);
  x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
  return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
};
const ordine = out.map((_, i) => i).sort(() => rnd() - 0.5);
ordine.forEach((k, pos) => { out[k].t = +(pos / (out.length - 1)).toFixed(3); });
const json = {
  latime: W,
  inaltime: H,
  pas: SP,
  granite: cale(granite),
  contur: cale(contur),
  judete: out.map(({ id, t, d, culoar }) => ({ id, t, d, culoar })),
};
const fisier = path.join(ROOT, 'components/sections/prezenta/harta.json');
fs.writeFileSync(fisier, JSON.stringify(json));
console.log(
  'puncte', out.reduce((s, j) => s + j.k, 0), 'din', out.reduce((s, j) => s + j.n, 0),
  '| granite', json.granite.length, 'contur', json.contur.length, 'caractere | octeti', fs.statSync(fisier).size,
  '| mici:', out.filter((j) => j.n < MIC).map((j) => `${j.id} ${j.k}/${j.n}`).join(', '),
  '| ordine', ordine.slice(0, 6).map((k) => out[k].id).join(','),
);
