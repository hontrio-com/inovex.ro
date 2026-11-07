/* Animatia din casuta „CRM și ERP personalizat”, facuta de proprietar cu Claude
   (inovex-cms-crm-erp.html, 2026-10-19) si mutata aici aproape neschimbata. Casuta e mai ingusta
   decat ecranul de 16:9 pentru care a fost facuta, asa ca la inceput fisierele din dreapta stau
   peste marginea ferestrei, ca cele din stanga, iar camera ramane centrata pe fereastra. Imaginile
   sunt fisiere separate, nu incluse in cod.

   Nexo, o platforma de firma (cu date de exemplu): fisierele si aplicatiile imprastiate (Excel,
   Gmail, Word, facturi PDF, calendar) intra in meniul ei, apoi un tur prin site (CMS), vanzari (CRM)
   si comenzi, stocuri si facturi (ERP), iar la final rapoartele. Redarea si uneltele comune sunt in
   film.ts. */

import {
  traducator,
  clamp01,
  eio,
  eo,
  eob,
  fly,
  gaseste,
  h,
  lerp,
  off,
  on,
  pornesteFilmul,
  ring,
  seg,
  stiluri,
  toate,
  typist,
  type Stil,
} from './film';
import type { Limba } from '@/lib/i18n/config';
import { bani, harta } from './texte';
import { intreg } from './texte/aplicatii';
import { DINAMIC, STATIC } from './texte/crm';
import { panouBanner } from './texte/magazin';

const DIR = '/imagini/servicii/acasa/animatie-crm';
// sigla, bannerele si produsele magazinului de mobila sunt aceleasi ca in animatia magazinului
const MAGAZIN = '/imagini/servicii/acasa/animatie-magazin';

// fisierele de la inceput: iconita, nume, detaliu, stanga, sus si inclinarea. In original, cele din
// dreapta stateau langa fereastra (1330-1400); aici stau peste marginea ei, ca si cele din stanga,
// mutate putin spre dreapta (de la 60, 40 si 80), ca toate sa incapa in casuta.
const HAOS: [string, string, string, number, number, number][] = [
  ['excel', 'Oferte_final_v3.xlsx', 'Modificat ieri', 100, 120, -6],
  ['gmail', 'Inbox comenzi', '248 necitite', 1011, 150, 5],
  ['word', 'Notițe clienți.docx', '14 pagini', 80, 520, 4],
  ['excel', 'Stoc depozit.xlsx', 'Actualizat acum 9 zile', 1041, 470, -4],
  ['pdf', 'Facturi 2026', '1.204 fișiere PDF', 1081, 780, 6],
  ['calendar', 'Calendar livrări', '3 suprapuneri', 120, 860, -5],
];

// camera: apropiata pe fereastra (0), ca in original, sau departata, cu fisierele in jur (1); in
// original se departa pana la 0.95, cu centrul la 1000, aici ramane pe mijlocul ferestrei
const CAMERA = { z0: 1.12, x0: 730, z1: 0.92, x1: 730 };

// ce parte din scena se vede in casuta: fereastra asa cum o arata camera apropiata, cu loc pe
// margini pentru apropierea lenta a camerei
const VEDERE = { x: 282, y: 23, w: 1356, h: 1126 };

// limba animatiei si textele ei schimbate in timpul animatiei (adresa, titlul paginii, starea, sumele)
let L: Limba = 'ro';
let D = DINAMIC.ro;

/* ─── Interfata ─── */

const ic = (d: string, w: number, st = '') =>
  '<svg viewBox="0 0 24 24" width="' + w + '" height="' + w + '" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="' + st + '">' + d + '</svg>';

const I: Record<string, string> = {
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21 20a6 6 0 0 0-4-5.6"/>',
  funnel: '<path d="M4 5h16l-6 7.5V19l-4 1.5v-8z"/>',
  box: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
  stack: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  img: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M20 16l-5-5-8 8"/>',
  text: '<path d="M5 6h14M5 11h14M5 16h9"/>',
  title: '<path d="M6 5v14M18 5v14M6 12h12"/>',
  form: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h4"/>',
  gal: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>',
  btn: '<rect x="3" y="8" width="18" height="8" rx="4"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
};
const COS = '<path d="M3 4h2.5l2.2 11h10.6L21 7H7"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>';
const CAMION = '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>';

const MU = 'color:color-mix(in srgb, var(--second) 58%, var(--ground))';
const LN = 'color-mix(in srgb, var(--second) 8%, transparent)';
const SOFT = 'color-mix(in srgb, var(--ground) 96%, var(--second))';

// cercul cu initialele unui om
const av = (txt: string, s: number) =>
  '<span class="av" style="width:' + s + 'px;height:' + s + 'px;font-size:' + Math.round(s * 0.36) + 'px">' + txt + '</span>';

// numerele cu punct la mii
const fmt = (v: number) => intreg(L, v);

// meniul din stanga: iconita si nume, apoi cat de jos sta fiecare
const NAV = [['grid', 'Dashboard'], ['globe', 'Site (CMS)'], ['users', 'Clienți'], ['funnel', 'Vânzări'], ['box', 'Comenzi'], ['stack', 'Stocuri'], ['doc', 'Facturi'], ['chart', 'Rapoarte'], ['gear', 'Setări']];
const NAVY = [0, 36, 106, 142, 178, 214, 250, 304, 340];

// fundalul paginilor, meniul si bara de sus
function cadruAplicatie() {
  let w = '<div class="pc v-bg" style="left:210px;top:110px;width:850px;height:750px;background:color-mix(in srgb, var(--second) 1.5%, var(--ground))"></div>';
  w += '<div class="pc d-side" style="left:0;top:54px;width:210px;height:806px;background:var(--ground);border-right:1px solid ' + LN + '">' +
    '<img alt="" src="' + DIR + '/logo-nexo.webp" style="position:absolute;left:18px;top:22px;width:118px;height:21px;object-fit:contain;object-position:0 50%">' +
    '<span class="pc" style="right:14px;top:21px;width:24px;height:24px;border-radius:7px;box-shadow:inset 0 0 0 1px ' + LN + ';display:flex;align-items:center;justify-content:center;' + MU + '">' + ic('<path d="M15 6l-6 6 6 6"/>', 13) + '</span>' +
    '<div class="pc" style="left:10px;right:10px;top:76px;height:420px">' +
    '<div class="pc" style="left:12px;top:84px;font-size:10.5px;font-weight:700;letter-spacing:.06em;' + MU + '">BAZĂ DE DATE</div>' +
    '<i class="pc" style="left:8px;right:8px;top:290px;height:1px;background:' + LN + '"></i>' +
    NAV.map((n, k) => '<div class="d-nav" style="position:absolute;left:0;right:0;top:' + NAVY[k] + 'px;height:34px;border-radius:9px;display:flex;align-items:center;gap:11px;padding:0 12px;font-size:13px;font-weight:600"><i class="d-slot" style="position:absolute;inset:0;border-radius:9px;border:1.5px dashed color-mix(in srgb, var(--second) 30%, transparent);opacity:0"></i>' + ic(I[n[0]], 16) + '<span>' + n[1] + '</span></div>').join('') + '</div>' +
    '<div class="pc" style="left:12px;right:12px;bottom:16px;height:46px;border-radius:12px;box-shadow:inset 0 0 0 1px ' + LN + ';display:flex;align-items:center;gap:10px;padding:0 12px"><span style="width:26px;height:26px;border-radius:7px;background:' + SOFT + ';display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800">N</span><span style="flex:1;font-size:12px;font-weight:700;white-space:nowrap">Echipa Vânzări</span>' + ic('<path d="M8 9l4-4 4 4M8 15l4 4 4-4"/>', 14, MU) + '</div></div>';
  w += '<div class="pc d-top" style="left:210px;top:54px;width:850px;height:56px;border-bottom:1px solid ' + LN + ';display:flex;align-items:center;padding:0 22px;gap:12px;background:var(--ground)">' +
    '<div style="width:300px;height:36px;border-radius:10px;box-shadow:inset 0 0 0 1px ' + LN + ';display:flex;align-items:center;gap:9px;padding:0 6px 0 12px;font-size:12.5px;font-weight:500;' + MU + '">' + ic(I.search, 15) + '<span style="flex:1">Caută</span><span style="display:flex;gap:3px"><span style="width:20px;height:20px;border-radius:5px;background:' + SOFT + ';display:flex;align-items:center;justify-content:center;font-size:10.5px">⌘</span><span style="width:20px;height:20px;border-radius:5px;background:' + SOFT + ';display:flex;align-items:center;justify-content:center;font-size:10.5px">F</span></span></div>' +
    '<span style="margin-left:auto;display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:600">' + ic('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/>', 16) + 'Centru de ajutor</span>' +
    '<span style="display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:700">' + av('IM', 30) + 'Ioana M.' + ic('<path d="M6 9l6 6 6-6"/>', 13, MU) + '</span></div>';
  return w;
}

// butoanele „Sortează” si „Filtru” din capul paginilor
const SF =
  '<span class="btnb" style="height:34px;padding:0 12px;font-size:12px;background:var(--ground);color:var(--second);box-shadow:inset 0 0 0 1px ' + LN + '">' + ic('<path d="M4 7h16M7 12h10M10 17h4"/>', 14) + 'Sortează</span>' +
  '<span class="btnb" style="height:34px;padding:0 12px;font-size:12px;background:var(--ground);color:var(--second);box-shadow:inset 0 0 0 1px ' + LN + '">' + ic('<path d="M4 5h16l-6 7.5V19l-4 1.5v-8z"/>', 14) + 'Filtru</span>';

// capul unei pagini: titlul, o eticheta si butoanele din dreapta
const cap = (cls: string, titlu: string, chip: string, dreapta: string) =>
  '<div class="pc ' + cls + '" style="left:234px;top:128px;width:802px;height:40px;display:flex;align-items:center;gap:10px"><span class="disp" style="font-size:21px;font-weight:800">' + titlu + '</span>' + chip + '<span style="margin-left:auto;display:flex;gap:8px">' + SF + dreapta + '</span></div>';

// site-ul (CMS): pagina „Acasă” a magazinului de mobila, in editor
function paginaCms() {
  const BL = [['title', 'Titlu'], ['text', 'Text'], ['img', 'Imagine'], ['form', 'Formular'], ['gal', 'Galerie'], ['btn', 'Buton']];
  const OR = '#E44004';
  const WARM = 'color-mix(in srgb, var(--ground) 94%, #B08A5E)';
  const sageata = (d: string) => '<span style="position:absolute;' + d + ':10px;top:50%;margin-top:-13px;width:26px;height:26px;border-radius:50%;background:color-mix(in srgb, var(--ground) 85%, transparent);display:flex;align-items:center;justify-content:center">' + ic(d === 'left' ? '<path d="M15 5l-7 7 7 7"/>' : '<path d="M9 5l7 7-7 7"/>', 13) + '</span>';
  const punct = '<i class="c-dot" style="height:6px;border-radius:3px;background:var(--ground)"></i>';
  let v = '<div class="pc v-cms" style="left:0;top:0;width:1060px;height:860px">';
  v += cap('c-head', 'Pagina „Acasă”', '<span class="chip c-state">Ciornă</span>', '<span class="btnb" style="background:var(--ground);color:var(--second);box-shadow:inset 0 0 0 1px ' + LN + '">' + ic(I.eye, 15) + 'Previzualizare</span><span class="btnb c-pub">Publică</span>');
  v += '<div class="pc card c-pal" style="left:234px;top:182px;width:170px;height:640px;padding:16px 12px"><div style="font-size:12px;font-weight:800;letter-spacing:.04em;' + MU + ';margin:0 4px 10px">BLOCURI</div>' + BL.map((b) => '<div style="height:42px;border-radius:10px;display:flex;align-items:center;gap:10px;padding:0 10px;margin-bottom:6px;box-shadow:inset 0 0 0 1px ' + LN + ';font-size:13px;font-weight:600">' + ic(I[b[0]], 16, 'color:var(--main)') + b[1] + '</div>').join('') + '</div>';
  v += '<div class="pc card c-can" style="left:418px;top:182px;width:618px;height:640px;background:' + SOFT + ';overflow:hidden">' +
    '<div class="pc" style="left:18px;top:14px;width:582px;height:42px;border-radius:10px;background:var(--ground);display:flex;align-items:center;gap:16px;padding:0 14px;font-size:11.5px;font-weight:700;box-shadow:0 0 0 1px ' + LN + '"><img alt="" src="' + MAGAZIN + '/logo-mobila.webp" style="height:17px;width:70px;object-fit:contain;object-position:0 50%"><span style="margin-left:30px">Living</span><span>Dormitor</span><span>Bucătărie</span><span>Birou</span><span style="margin-left:auto;display:flex;gap:12px;align-items:center">' + ic(I.search, 15) + '<span style="position:relative">' + ic(COS, 16) + '<i style="position:absolute;right:-5px;top:-5px;width:13px;height:13px;border-radius:50%;background:' + OR + ';color:var(--ground);font-size:8px;font-style:normal;font-weight:800;display:flex;align-items:center;justify-content:center">2</i></span></span></div>' +
    '<div class="pc c-hero" style="left:18px;top:66px;width:582px;height:212px;border-radius:12px;background:var(--ground)">' +
    '<div style="position:absolute;inset:0;border-radius:12px;overflow:hidden">' + bannereCms() + '' +
    sageata('left') + sageata('right') +
    '<span style="position:absolute;left:0;right:0;bottom:10px;display:flex;justify-content:center;gap:5px">' + punct + punct + punct + '</span></div>' +
    '<i class="c-sel" style="position:absolute;inset:-4px;border-radius:14px;border:2px solid var(--main)"><span style="position:absolute;left:10px;top:-11px;height:20px;padding:0 8px;border-radius:6px;background:var(--main);color:var(--ground);font-size:10.5px;font-weight:700;display:flex;align-items:center;font-style:normal">Slider · editare</span></i></div>' +
    '<div class="pc" style="left:18px;top:292px;width:582px;display:flex;align-items:center"><span class="disp c-title" style="font-size:17px;font-weight:800;min-height:22px"></span><span style="margin-left:auto;font-size:11.5px;font-weight:700;' + MU + '">Vezi toate →</span></div>' +
    [['Set living Alb + Stejar', '1.729 lei', 1], ['Set living Maro', '3.222 lei', 2], ['Set living Bej', '3.223 lei', 4]].map((p, k) => '<div class="pc" style="left:' + (18 + k * 200) + 'px;top:326px;width:182px;height:222px;border-radius:12px;background:var(--ground);box-shadow:0 0 0 1px ' + LN + ';padding:8px">' +
      '<div style="height:112px;border-radius:9px;background:' + WARM + ';overflow:hidden"><img alt="" src="' + MAGAZIN + '/produs-' + p[2] + '.webp" style="width:166px;height:112px;object-fit:contain;mix-blend-mode:multiply"></div>' +
      '<div style="margin:10px 4px 0;font-size:12.5px;font-weight:700;white-space:nowrap">' + p[0] + '</div>' +
      '<div style="margin:8px 4px 0;display:flex;align-items:center;justify-content:space-between"><span class="disp" style="font-size:15px;font-weight:800;color:' + OR + '">' + p[1] + '</span><span style="width:30px;height:30px;border-radius:9px;background:var(--second);color:var(--ground);display:flex;align-items:center;justify-content:center">' + ic(COS, 14) + '</span></div></div>').join('') +
    '<div class="pc" style="left:18px;top:562px;width:582px;height:62px;border-radius:12px;background:var(--ground);box-shadow:0 0 0 1px ' + LN + ';display:flex;align-items:center;justify-content:space-around;font-size:12px;font-weight:700">' +
    [[CAMION, 'Livrare gratuită'], ['<path d="M14.5 5.5l4 4L9 19H5v-4z"/>', 'Montaj inclus'], ['<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18"/>', 'Plată în rate']].map((b) => '<span style="display:flex;align-items:center;gap:8px">' + ic(b[0], 17, 'color:' + OR) + b[1] + '</span>').join('') + '</div></div>';
  return v + '</div>';
}

// un deal: client, valoare, initiale, eticheta (text si culoare), termen si, la cel nou, „Nou”
type Deal = [string, string, string, [string, string], string, string?];

// coloanele pipeline-ului de vanzari, cu deal-urile lor
const COLOANE: [string, Deal[]][] = [
  ['Lead nou', [['Brutăria Dulce', '8.200 lei', 'BD', ['Retail', 'tg-o'], '24 oct.'], ['Cafe Nord', '4.900 lei', 'CN', ['HoReCa', 'tg-p'], '26 oct.']]],
  ['Ofertă trimisă', [['Hotel Arin', '32.000 lei', 'HA', ['HoReCa', 'tg-p'], '22 oct.'], ['Studio Forma', '12.300 lei', 'SF', ['Corporate', 'tg-b'], '28 oct.']]],
  ['Negociere', [['Clinica Vita', '18.700 lei', 'CV', ['Urgent', 'tg-r'], '21 oct.']]],
  ['Câștigat', [['Restaurant Olt', '27.300 lei', 'RO', ['Recurent', 'tg-g'], '15 oct.'], ['Pensiunea Brad', '15.600 lei', 'PB', ['HoReCa', 'tg-p'], '11 oct.']]],
];

function cardDeal(c: Deal, cls: string, x: number, y: number) {
  return '<div class="kc ' + cls + '" style="left:' + x + 'px;top:' + y + 'px;width:176px;height:112px;padding:12px 12px">' +
    '<div style="display:flex;gap:5px"><span class="tag ' + c[3][1] + '">' + c[3][0] + '</span>' + (c[5] ? '<span class="tag tg-g">' + c[5] + '</span>' : '') + '<span style="margin-left:auto;' + MU + ';font-weight:800;letter-spacing:1px">···</span></div>' +
    '<div style="margin-top:9px;font-size:13px;font-weight:800;white-space:nowrap">' + c[0] + '</div>' +
    '<div style="margin-top:5px;display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;white-space:nowrap;' + MU + '">' + ic(I.cal, 12) + 'Termen ' + c[4] + '</div>' +
    '<div style="margin-top:9px;display:flex;align-items:center"><span style="display:flex">' + av(c[2], 22) + '<span style="margin-left:-6px;display:inline-flex">' + av('IM', 22) + '</span></span><span style="margin-left:auto;font-size:12.5px;font-weight:800;white-space:nowrap">' + c[1] + '</span></div></div>';
}

// vanzarile (CRM): pipeline-ul, cu deal-ul nou care trece din coloana in coloana
function paginaCrm() {
  const PLUS = '<path d="M12 5v14M5 12h14"/>';
  let v = '<div class="pc v-crm" style="left:0;top:0;width:1060px;height:860px">' + cap('r-head', 'Vânzări', '<span class="chip">Pipeline · 186.400 lei</span>', '<span class="btnb" style="height:34px;font-size:12px">' + ic(PLUS, 14) + 'Adaugă deal</span>');
  COLOANE.forEach((c, i) => {
    const x = 234 + i * 202;
    v += '<div class="col r-col" style="left:' + x + 'px;top:182px;width:196px;height:640px;background:var(--ground);box-shadow:inset 0 0 0 1px ' + LN + '"><div style="display:flex;align-items:center;gap:7px;margin:2px 4px 0"><i style="width:7px;height:7px;border-radius:50%;background:' + ['#F59E0B', '#3B82F6', '#8B5CF6', '#10B981'][i] + '"></i><span style="font-size:13.5px;font-weight:800">' + c[0] + '</span></div><div style="margin:3px 4px 0 18px;font-size:11px;font-weight:600;' + MU + '">' + c[1].length + ' deal-uri</div>' +
      '<div style="margin-top:10px;height:32px;border-radius:9px;background:' + SOFT + ';display:flex;align-items:center;justify-content:center;gap:6px;font-size:12px;font-weight:700">' + ic(PLUS, 13) + 'Adaugă</div></div>';
    c[1].forEach((k, n) => {
      v += cardDeal(k, 'r-k', x + 10, 270 + n * 122);
    });
  });
  v += cardDeal(['Atelier Lemnaria', '24.500 lei', 'AL', ['Retail', 'tg-o'], '30 oct.', 'Nou'], 'r-deal', 244, 514);
  return v + '</div>';
}

// comenzile de dinainte: numar, client, valoare, stare, livrare si AWB (gol: inca negenerat)
const COMENZI = [
  ['CMD-1041', 'Hotel Arin', '32.000 lei', 'În producție', '02 nov.', ''],
  ['CMD-1040', 'Restaurant Olt', '27.300 lei', 'Livrată', '15 oct.', '5824 1093 0488'],
  ['CMD-1039', 'Pensiunea Brad', '15.600 lei', 'Livrată', '11 oct.', '5824 1093 0412'],
];
const STARI: Record<string, string> = { Livrată: 'tg-n', 'În producție': 'tg-o', Confirmată: 'tg-g' };

const awbButon = (cls: string) =>
  '<span class="' + cls + '" style="height:28px;padding:0 10px;border-radius:8px;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--second) 16%, transparent);display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:700;background:var(--ground)">' + ic(CAMION, 14) + 'Generează AWB</span>';
const awbGata = (num: string, cls = '') =>
  '<span class="' + cls + '" style="height:28px;padding:0 10px;border-radius:8px;background:#E9F8EF;color:#15803D;display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:700;white-space:nowrap">' + ic(I.check, 13) + 'AWB ' + num + '</span>';

// un rand din comenzi; `awb` inlocuieste butonul sau AWB-ul obisnuit
function randComanda(o: string[], cls: string, y: number, evidentiat = false, awb = '') {
  return '<div class="pc ' + cls + '" style="left:20px;right:20px;top:' + y + 'px;height:46px;border-bottom:1px solid ' + LN + ';display:flex;align-items:center;font-size:12.5px;font-weight:600;border-radius:8px;' + (evidentiat ? 'background:' + SOFT : '') + '"><span style="width:96px;padding-left:8px;font-weight:800">' + o[0] + '</span><span style="width:150px">' + o[1] + '</span><span style="width:100px">' + o[2] + '</span><span style="width:118px"><span class="tag ' + STARI[o[3]] + '" style="height:22px;font-size:11px">' + o[3] + '</span></span><span style="width:72px;' + MU + '">' + o[4] + '</span><span style="position:relative">' + (awb || (o[5] ? awbGata(o[5]) : awbButon(''))) + '</span></div>';
}

// stocurile: produs, cat era (%), cat ramane dupa comanda (%), unitate si cantitatea de la inceput
const STOC: [string, number, number, string, number][] = [
  ['Plăci MDF 18 mm', 72, 58, 'buc.', 360],
  ['Feronerie Blum', 64, 55, 'set.', 128],
  ['Lac mat poliuretanic', 80, 74, 'l', 96],
  ['Blaturi stejar', 45, 37, 'buc.', 42],
];

// factura, ca una din SmartBill: o pagina A4 de 320x452, micsorata
function factura() {
  const SL = '#3C6882';
  const tx = (l: number, t: number, txt: string, st = '') => '<div class="pc" style="left:' + l + 'px;top:' + t + 'px;white-space:nowrap;' + st + '">' + txt + '</div>';
  const parte = (l: number, lab: string, nume: string, randuri: string[]) =>
    tx(l, 96, lab, 'font-size:6.5px;font-weight:700;' + MU) + '<i class="pc" style="left:' + l + 'px;top:106px;width:76px;height:1px;background:color-mix(in srgb, var(--second) 30%, transparent)"></i>' + '<div class="pc" style="left:' + l + 'px;top:111px;width:140px;font-size:8.5px;font-weight:800;line-height:1.15">' + nume + '</div>' + randuri.map((t, k) => '<div class="pc" style="left:' + l + 'px;top:' + (126 + k * 9.5) + 'px;width:142px;font-size:6.2px;line-height:1.2">' + t + '</div>').join('');
  const COL: [number, string][] = [[18, 'Nr.'], [34, 'Denumirea produselor sau a serviciilor'], [184, 'U.M.'], [208, 'Cant.'], [234, 'Preț unitar'], [276, 'Valoarea']];
  let f = '<div style="position:absolute;left:0;top:0;width:320px;height:452px;transform:scale(0.95);transform-origin:0 0;font-family:var(--display, var(--sans, system-ui, sans-serif));color:color-mix(in srgb, var(--second) 88%, var(--ground))">';
  f += '<img alt="" src="' + MAGAZIN + '/logo-mobila.webp" style="position:absolute;left:18px;top:22px;width:100px;height:22px;object-fit:contain;object-position:0 50%">';
  f += tx(170, 12, 'FACTURA', 'font-size:20px;font-weight:800') + tx(274, 20, 'MOB0318', 'font-size:8px;font-weight:800') + tx(170, 40, 'Data emiterii: 19/10/2026', 'font-size:7px');
  f += '<div class="pc" style="left:166px;top:60px;width:140px;height:22px;background:' + SL + ';color:var(--ground)">' + tx(8, 7, 'TOTAL PLATA', 'font-size:7.5px;font-weight:800') + tx(66, 4, '24500.00 Lei', 'font-size:11px;font-weight:800') + '</div>';
  f += parte(18, 'Furnizor', 'MOBILA DESIGN S.R.L.', ['CIF: RO12345678', 'Reg. com.: J40/1234/2020', 'Adresa: Str. Exemplului nr. 10, București', 'IBAN: RO00 BANK 0000 0000 0000 0000']);
  f += parte(166, 'Client', 'ATELIER LEMNARIA S.R.L.', ['CIF: RO87654321', 'Reg. com.: J12/5678/2019', 'Adresa: Str. Fabricii nr. 5, Cluj-Napoca']);
  f += '<div class="pc" style="left:14px;top:178px;width:292px;height:20px;border-top:1.2px solid ' + SL + ';border-bottom:1.2px solid ' + SL + '">' + COL.map((c) => tx(c[0] - 14, 6, c[1], 'font-size:5.6px;font-weight:800')).join('') + '</div>';
  [['1', 'Mobilier birou la comandă', 'buc', '1', '22500.00', '22500.00'], ['2', 'Transport și montaj', 'serv', '1', '2000.00', '2000.00']].forEach((r, k) => {
    f += '<div class="pc" style="left:14px;top:' + (198 + k * 18) + 'px;width:292px;height:18px;border-bottom:1px solid color-mix(in srgb, var(--second) 14%, transparent)">' + r.map((v, n) => tx(COL[n][0] - 14 + (n ? 0 : 2), 5, v, 'font-size:6.3px')).join('') + '</div>';
  });
  f += tx(18, 246, 'Întocmit de: Nexo CRM', 'font-size:6.3px') + tx(166, 245, 'TOTAL PLATA', 'font-size:7px;font-weight:800') + tx(244, 241, '24500.00 Lei', 'font-size:11px;font-weight:800');
  f += '<div class="pc e-stamp" style="left:150px;top:286px;padding:5px 10px;border:2.5px solid #15803D;border-radius:8px;color:#15803D;font-size:12px;font-weight:800;white-space:nowrap;transform:rotate(-6deg)">Emisă automat</div>';
  f += '<div class="pc" style="left:10px;top:372px;width:300px;height:34px;background:' + SOFT + '">' + tx(8, 5, 'MOBILA DESIGN S.R.L.', 'font-size:6.5px;font-weight:800') + tx(8, 15, 'Capital social: 200 Lei', 'font-size:6px') + tx(8, 24, 'Adresa web: magazinul-tau.ro; Tel.: 0750 456 096', 'font-size:6px') + '</div>';
  f += tx(18, 414, 'Factura este valabilă fără semnătură și ștampilă, conform art. 319 alin. 29 din Legea 227/2015.', 'font-size:4.7px;' + MU) + tx(170, 425, 'Facturez cu SmartBill.ro   Cod document: NXKZA', 'font-size:4.7px;' + MU);
  return f + '</div>';
}

// comenzile si stocurile (ERP): comanda noua primeste AWB, stocul se rezerva si factura se emite
function paginaErp() {
  let v = '<div class="pc v-erp" style="left:0;top:0;width:1060px;height:860px">' + cap('e-head', 'Comenzi și stocuri', '<span class="chip">Octombrie</span>', '<span class="btnb" style="height:34px;font-size:12px">' + ic(CAMION, 14) + 'Curieri</span>');
  v += '<div class="pc card e-ord" style="left:234px;top:182px;width:802px;height:262px;overflow:hidden"><div style="padding:16px 20px 0;display:flex;align-items:center;gap:10px"><span style="font-size:14px;font-weight:800">Comenzi recente</span><span class="tag tg-n" style="height:22px">Curier: FAN Courier</span></div>' +
    '<div class="pc" style="left:20px;right:20px;top:48px;height:30px;display:flex;align-items:center;font-size:11px;font-weight:700;border-bottom:1px solid ' + LN + ';' + MU + '"><span style="width:96px;padding-left:8px">Comandă</span><span style="width:150px">Client</span><span style="width:100px">Valoare</span><span style="width:118px">Status</span><span style="width:72px">Livrare</span><span>AWB</span></div>' +
    randComanda(['CMD-1042', 'Atelier Lemnaria', '24.500 lei', 'Confirmată', '28 oct.'], 'e-new', 80, true, awbButon('e-awbb') + '<span style="position:absolute;left:0;top:0">' + awbGata('5824 1093 0517', 'e-awbd') + '</span>') +
    COMENZI.map((o, k) => randComanda(o, 'e-row', 80 + k * 46)).join('') + '</div>';
  v += '<div class="pc card e-stk" style="left:234px;top:458px;width:450px;height:364px;padding:18px 20px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;font-weight:800">Stocuri</span><span class="chip e-res">Rezervat pentru CMD-1042</span></div>' +
    STOC.map((s, k) => '<div style="margin-top:' + (k ? 22 : 24) + 'px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700"><span>' + s[0] + '</span><span class="e-q" style="' + MU + '"></span></div><div style="margin-top:8px;height:10px;border-radius:5px;background:' + SOFT + '"><i class="e-bar" style="display:block;height:10px;border-radius:5px;background:var(--main)"></i></div></div>').join('') + '</div>';
  v += '<div class="pc card e-inv" style="left:698px;top:458px;width:338px;height:364px;overflow:hidden"><div class="pc" style="left:14px;top:14px;right:14px;display:flex;align-items:center;gap:8px"><span style="font-size:14px;font-weight:800">Factură</span><span class="tag tg-g" style="height:22px">Trimisă pe email</span></div><div class="pc" style="left:12px;top:46px;width:314px;height:310px;border-radius:6px;box-shadow:0 0 0 1px ' + LN + ', 0 8px 20px -12px rgba(0,0,0,.3);overflow:hidden;background:var(--ground)">' + factura() + '</div></div>';
  return v + '</div>';
}

// cifrele de sus din rapoarte: nume, valoare, unitate, crestere si iconita
const KP: [string, number, string, string, string][] = [
  ['Vânzări', 412800, ' lei', '+18%', I.chart],
  ['Comenzi', 38, '', '+9%', I.box],
  ['Clienți noi', 64, '', '+24%', I.users],
  ['Conversie', 32, '%', '+4%', I.funnel],
];

// rapoartele: cifrele lunii, venitul pe 12 luni, clientii de top, categoriile si tinta saptamanii
function paginaRapoarte() {
  const GN = '#15803D';
  const GNB = '#E9F8EF';
  const GR = 'color-mix(in srgb, var(--second) 9%, var(--ground))';
  const JOS = '<path d="M6 9l6 6 6-6"/>';
  const alb = 'height:34px;padding:0 12px;font-size:12px;background:var(--ground);color:var(--second);box-shadow:inset 0 0 0 1px ' + LN;
  const crestere = (txt: string, st: string) => '<span class="tag" style="background:' + GNB + ';color:' + GN + ';' + st + '">↑ ' + txt + '</span>';
  const MB = [210, 238, 226, 262, 248, 281, 274, 305, 296, 331, 352, 413];
  const MN = ['Nov', 'Dec', 'Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct'];
  const TOP = [['AL', 'Atelier Lemnaria', '24.500 lei', '+3'], ['HA', 'Hotel Arin', '32.000 lei', '+2'], ['RO', 'Restaurant Olt', '27.300 lei', '+5'], ['PB', 'Pensiunea Brad', '15.600 lei', '+1'], ['CV', 'Clinica Vita', '18.700 lei', '+2']];
  const CAT: [string, number, number][] = [['Living', 128400, 82], ['Dormitor', 96200, 64], ['Bucătărie', 87300, 58], ['Birou', 64100, 43], ['Hol și baie', 36800, 26]];
  const TG = [62, 78, 55, 90, 84, 40, 28];
  let v = '<div class="pc v-rep" style="left:0;top:0;width:1060px;height:860px">';
  v += '<div class="pc p-head" style="left:234px;top:124px;width:802px;height:78px">' +
    '<div style="display:flex;align-items:center;gap:10px"><span class="disp" style="font-size:21px;font-weight:800">Rapoarte</span><span style="margin-left:auto;display:flex;gap:8px">' +
    '<span class="btnb" style="' + alb + '">' + ic(I.cal, 14) + '1 – 31 octombrie 2026' + ic(JOS, 12) + '</span>' +
    '<span class="btnb" style="' + alb + '">Lună' + ic(JOS, 12) + '</span>' +
    '<span class="btnb" style="height:34px;padding:0 12px;font-size:12px">' + ic('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>', 14) + 'Exportă</span></span></div>' +
    '<div style="margin-top:12px;display:flex;gap:22px;font-size:13px;font-weight:700;border-bottom:1px solid ' + LN + '"><span style="padding-bottom:9px;box-shadow:inset 0 -2px 0 var(--second);display:flex;align-items:center;gap:6px">' + ic(I.chart, 14) + 'Vânzări</span><span style="padding-bottom:9px;display:flex;align-items:center;gap:6px;' + MU + '">' + ic('<path d="M3 12h4l3-8 4 16 3-8h4"/>', 14) + 'Activitate</span><span style="padding-bottom:9px;display:flex;align-items:center;gap:6px;' + MU + '">' + ic(I.stack, 14) + 'Stocuri</span></div></div>';
  v += '<div class="pc p-kpi" style="left:234px;top:214px;width:802px;height:104px;display:flex;gap:10px">' + KP.map((k, n) => {
    // graficul mic de langa fiecare cifra
    const sp = [3, 5, 4, 7, 6, 9, 8, 11].map((y, i) => (i ? 'L' : 'M') + i * 11 + ' ' + (16 - y * (1 + n * 0.1))).join('');
    return '<div class="card" style="flex:1;padding:14px 16px;position:relative"><div style="display:flex;align-items:center;gap:8px"><span style="width:28px;height:28px;border-radius:8px;background:' + SOFT + ';display:flex;align-items:center;justify-content:center">' + ic(k[4], 14) + '</span><span style="font-size:11.5px;font-weight:600;' + MU + '">' + k[0] + '</span></div>' +
      '<div style="margin-top:12px;display:flex;align-items:flex-end;gap:8px"><span class="disp p-v" style="font-size:21px;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap">0</span>' + crestere(k[3], 'height:19px;font-size:10.5px;margin-bottom:3px') + '</div>' +
      '<svg viewBox="0 0 77 18" width="44" height="16" style="position:absolute;right:14px;top:22px;overflow:visible"><path class="p-sp" d="' + sp + '" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" style="fill:none;stroke:var(--second);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round"/></svg></div>';
  }).join('') + '</div>';
  v += '<div class="pc card p-bars" style="left:234px;top:332px;width:520px;height:292px;padding:16px 20px">' +
    '<div style="display:flex;align-items:flex-start;justify-content:space-between"><span style="display:flex;flex-direction:column;gap:2px"><span style="font-size:12px;font-weight:600;' + MU + '">Venituri · ultimele 12 luni</span><span style="display:flex;align-items:center;gap:8px"><span class="disp" style="font-size:22px;font-weight:800">3.436.000 lei</span>' + crestere('31%', 'height:19px;font-size:10.5px') + '</span></span><span class="tag tg-n" style="height:24px">Anual</span></div>' +
    '<div class="pc" style="left:20px;top:92px;width:30px;height:160px;display:flex;flex-direction:column;justify-content:space-between;font-size:10px;font-weight:600;text-align:right;' + MU + '"><span>400k</span><span>300k</span><span>200k</span><span>100k</span><span>0</span></div>' +
    '<div class="pc" style="left:60px;right:20px;top:98px;height:150px">' + [0, 1, 2, 3, 4].map((k) => '<i style="position:absolute;left:0;right:0;top:' + k * 37.5 + 'px;height:1px;background:' + LN + '"></i>').join('') +
    '<div style="position:absolute;inset:0;display:flex;align-items:flex-end;gap:9px">' + MB.map((b, k) => '<i class="p-b" style="flex:1;height:' + ((b / 420) * 150).toFixed(0) + 'px;border-radius:5px 5px 2px 2px;transform-origin:50% 100%;background:' + (k === 11 ? 'var(--second)' : GR) + '"></i>').join('') + '</div>' +
    '<i class="p-vl" style="position:absolute;right:16px;top:-6px;bottom:0;width:0;border-left:1.5px dashed color-mix(in srgb, var(--second) 40%, transparent)"></i>' +
    '<div class="p-tip" style="position:absolute;right:-6px;top:-40px;padding:6px 10px;border-radius:9px;background:var(--second);color:var(--ground);font-size:10.5px;font-weight:600;line-height:1.35;white-space:nowrap"><div style="opacity:.7">Octombrie 2026</div><div style="font-size:12.5px;font-weight:800">412.800 lei</div></div></div>' +
    '<div class="pc" style="left:60px;right:20px;bottom:14px;display:flex;justify-content:space-between;font-size:10px;font-weight:600;' + MU + '">' + MN.map((m) => '<span style="flex:1;text-align:center">' + m + '</span>').join('') + '</div></div>';
  v += '<div class="pc card p-team" style="left:766px;top:332px;width:270px;height:292px;padding:16px 16px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;font-weight:800">Top clienți</span><span class="btnb" style="height:26px;padding:0 9px;font-size:11px;background:var(--ground);color:var(--second);box-shadow:inset 0 0 0 1px ' + LN + '">Vezi tot</span></div>' +
    TOP.map((c, k) => '<div class="p-row" style="margin-top:' + (k ? 8 : 14) + 'px;height:40px;display:flex;align-items:center;gap:10px;font-size:12.5px;font-weight:700"><span style="width:16px;font-size:11px;' + MU + '">' + (k + 1) + '.</span>' + av(c[0], 28) + '<span style="display:flex;flex-direction:column;line-height:1.25;flex:1"><span>' + c[1] + '</span><span style="font-size:11px;font-weight:600;' + MU + '">' + c[2] + '</span></span>' + crestere(c[3], 'height:19px;font-size:10px') + '</div>').join('') + '</div>';
  v += '<div class="pc card p-cf" style="left:234px;top:638px;width:520px;height:194px;padding:16px 20px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;font-weight:800">Vânzări pe categorii</span><span style="font-size:11.5px;font-weight:600;' + MU + '">Octombrie</span></div>' +
    '<div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;column-gap:26px;row-gap:12px">' + CAT.map((c) => '<div><div style="display:flex;justify-content:space-between;font-size:11.5px;font-weight:700"><span>' + c[0] + '</span><span style="' + MU + '">' + fmt(c[1]) + ' lei</span></div><div style="margin-top:6px;height:7px;border-radius:4px;background:' + GR + '"><i class="p-t" style="display:block;height:7px;border-radius:4px;width:' + c[2] + '%;transform-origin:0 50%;background:var(--second)"></i></div></div>').join('') + '</div></div>';
  v += '<div class="pc card p-tgt" style="left:766px;top:638px;width:270px;height:194px;padding:16px 16px"><div style="font-size:14px;font-weight:800">Ținta săptămânii</div><div style="margin-top:2px;font-size:11px;font-weight:600;' + MU + '">Comenzi livrate față de plan</div>' +
    '<div class="pc" style="left:18px;right:18px;top:62px;height:96px;display:flex;align-items:flex-end;gap:12px">' + TG.map((g) => '<div style="flex:1;height:96px;border-radius:5px;background:' + GR + ';position:relative;overflow:hidden"><i class="p-g" style="position:absolute;left:0;right:0;bottom:0;height:' + g + '%;transform-origin:50% 100%;background:var(--second);border-radius:5px"></i></div>').join('') + '</div>' +
    '<div class="pc" style="left:18px;right:18px;bottom:12px;display:flex;gap:12px;font-size:10px;font-weight:700;text-align:center;' + MU + '">' + ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D'].map((d) => '<span style="flex:1">' + d + '</span>').join('') + '</div></div>';
  return v + '</div>';
}

// fisierele imprastiate de la inceput
const FISIERE = HAOS.map((c) => '<div class="pc card x-ch" style="left:' + c[3] + 'px;top:' + c[4] + 'px;width:300px;height:76px;display:flex;align-items:center;gap:14px;padding:0 16px;opacity:0"><span class="nic" style="width:44px;height:44px;background:var(--ground);box-shadow:inset 0 0 0 1px ' + LN + '"><img alt="" src="' + DIR + '/' + c[0] + '.svg" style="width:28px;height:28px;object-fit:contain"></span><span style="display:flex;flex-direction:column;line-height:1.35"><span style="font-size:14.5px;font-weight:800">' + c[1] + '</span><span style="font-size:12px;font-weight:600;color:#D9480F">' + c[2] + '</span></span></div>').join('');

const CURSOR =
  '<div class="pc u-cur" style="left:0;top:0;width:30px;height:30px;opacity:0;z-index:20"><i class="u-click" style="position:absolute;left:-14px;top:-14px;width:28px;height:28px;border-radius:50%;border:2px solid var(--main);opacity:0"></i><svg viewBox="0 0 24 24" width="30" height="30" style="position:absolute;left:0;top:0;filter:drop-shadow(0 2px 3px rgba(0,0,0,.3))"><path d="M4 2l15 11-6.5 1.2L16 21l-3 1.4-3.6-6.8L4 20z" style="fill:var(--second);stroke:var(--ground);stroke-width:1.5;stroke-linejoin:round"/></svg></div>';

// paginile aplicatiei, in ordinea din film
const PAGINI = ['cms', 'crm', 'erp', 'rep'] as const;
type Pagina = (typeof PAGINI)[number];

function construieste(box: HTMLElement) {
  const root = h(
    '<div class="cam">' +
      '<div class="win u-win">' +
        '<div class="bar"><i class="dot"></i><i class="dot"></i><i class="dot"></i><div class="url"><span class="u-url"></span><span class="u-caret" style="color:var(--main)">|</span></div></div>' +
        cadruAplicatie() +
        paginaCms() +
        paginaCrm() +
        paginaErp() +
        paginaRapoarte() +
      '</div>' +
      FISIERE +
      CURSOR +
    '</div>',
  );
  box.append(root);
  const urlEl = gaseste(root, 'u-url');
  urlEl.textContent = D.adresa;
  return {
    cam: root.style,
    urlEl,
    u: stiluri(root, 'u-', ['win', 'caret', 'cur', 'click'] as const),
    d: stiluri(root, 'd-', ['side', 'top'] as const),
    v: stiluri(root, 'v-', ['bg', ...PAGINI] as const),
    c: stiluri(root, 'c-', ['head', 'pal', 'can', 'sel', 'b2', 'pub'] as const),
    r: stiluri(root, 'r-', ['head', 'deal'] as const),
    e: stiluri(root, 'e-', ['head', 'ord', 'new', 'stk', 'inv', 'res', 'stamp', 'awbb', 'awbd'] as const),
    p: stiluri(root, 'p-', ['head', 'kpi', 'bars', 'team', 'cf', 'tgt', 'tip', 'vl'] as const),
    navs: toate(root, 'd-nav'),
    slots: toate(root, 'd-slot'),
    cdots: toate(root, 'c-dot'),
    cstate: gaseste(root, 'c-state'),
    ctitle: gaseste(root, 'c-title'),
    rcols: toate(root, 'r-col'),
    rks: toate(root, 'r-k'),
    erows: toate(root, 'e-row'),
    eq: Array.from(root.querySelectorAll('.e-q')),
    ebars: toate(root, 'e-bar'),
    pv: Array.from(root.querySelectorAll('.p-v')),
    pb: toate(root, 'p-b'),
    pt: toate(root, 'p-t'),
    psp: toate(root, 'p-sp'),
    prow: toate(root, 'p-row'),
    pg: toate(root, 'p-g'),
    xch: toate(root, 'x-ch'),
  };
}

type Interfata = ReturnType<typeof construieste>;

/* ─── Miscari ─── */

// ft: timpul de la inceputul animatiei; k: 0 apropiata pe fereastra, 1 departata
function camera(q: Interfata, ft: number, k: number) {
  const z = lerp(CAMERA.z0, CAMERA.z1, k) * (1 + 0.004 * ft);
  const cx = lerp(CAMERA.x0, CAMERA.x1, k);
  q.cam.transform = 'translate(' + (-z * (cx - 960)).toFixed(1) + 'px,0px) scale(' + z.toFixed(4) + ')';
}

// un buton apasat la t0
function apasa(s: Stil, t: number, t0: number) {
  s.transform = 'scale(' + (1 - 0.05 * Math.sin(Math.PI * seg(t, t0, t0 + 0.2))).toFixed(4) + ')';
}

// fereastra si meniul pe loc, fara cursor si fara fisierele de la inceput
function cadru(q: Interfata) {
  on(q.u.win);
  on(q.d.side);
  on(q.d.top);
  on(q.v.bg);
  q.u.caret.opacity = '0';
  off(q.u.cur);
  q.xch.forEach(off);
}

// pagina deschisa din meniu (-1: niciuna)
function meniu(q: Interfata, deschisa: number) {
  q.navs.forEach((s, k) => {
    const a = k === deschisa;
    s.background = a ? 'var(--accent)' : 'transparent';
    s.color = a ? 'var(--main)' : 'color-mix(in srgb, var(--second) 72%, var(--ground))';
    s.fontWeight = a ? '700' : '600';
    s.opacity = '1';
    s.transform = 'none';
  });
}

function pagina(q: Interfata, p: Pagina) {
  for (const v of PAGINI) {
    q.v[v].opacity = v === p ? '1' : '0';
    q.v[v].transform = 'none';
  }
}

// trecerea de la o pagina la alta
function treci(q: Interfata, din: Pagina, spre: Pagina, p: number) {
  const e = eio(p);
  for (const v of PAGINI) {
    if (v === din) {
      q.v[v].opacity = String(1 - e);
      q.v[v].transform = 'translateY(' + (-14 * e).toFixed(1) + 'px)';
    } else if (v === spre) {
      q.v[v].opacity = String(e);
      q.v[v].transform = 'translateY(' + (18 * (1 - e)).toFixed(1) + 'px)';
    } else q.v[v].opacity = '0';
  }
}

// cursorul merge in arc de la (x0, y0) la (x1, y1), intre t0 si t1, si da clic la tc
function cursor(q: Interfata, t: number, t0: number, t1: number, x0: number, y0: number, x1: number, y1: number, tc: number) {
  const cp = eio(seg(t, t0, t1));
  const press = Math.sin(Math.PI * seg(t, tc, tc + 0.17));
  q.u.cur.transform = 'translate(' + lerp(x0, x1, cp).toFixed(1) + 'px,' + (lerp(y0, y1, cp) - 50 * Math.sin(Math.PI * cp)).toFixed(1) + 'px) scale(' + (1 - 0.12 * press).toFixed(3) + ')';
  const rp = seg(t, tc, tc + 0.35);
  q.u.click.opacity = String(rp > 0 && rp < 1 ? 1 - rp : 0);
  q.u.click.transform = 'scale(' + (0.6 + 1.4 * eo(rp)).toFixed(3) + ')';
}

// in CMS: titlul colectiei se scrie, bannerul se schimba, apoi pagina se publica
const CMS = { titlu: 0.45, publica: 1.2 };

function stareCms(q: Interfata, t: number) {
  q.ctitle.textContent = D.titlu.slice(0, Math.max(0, Math.min(D.titlu.length, Math.floor((t - CMS.titlu) * 34))));
  q.c.sel.opacity = (1 - seg(t, CMS.publica, CMS.publica + 0.2)).toFixed(3);
  const bp = eio(seg(t, CMS.titlu - 0.1, CMS.titlu + 0.3));
  q.c.b2.opacity = String(bp);
  q.cdots.forEach((d, k) => {
    const a = k === 0 ? 1 - bp : k === 1 ? bp : 0;
    d.width = (6 + 12 * a).toFixed(1) + 'px';
    d.opacity = (0.55 + 0.45 * a).toFixed(2);
  });
  q.cstate.textContent = t >= CMS.publica + 0.1 ? D.publicata : D.ciorna;
  apasa(q.c.pub, t, CMS.publica);
}

// locurile deal-ului nou, coloana cu coloana
const LOCURI = [[244, 514], [446, 514], [648, 392], [850, 514]];

// deal-ul nou apare la t0 si e tras in coloana urmatoare la fiecare moment din `mutari`
function deal(q: Interfata, t: number, t0: number, mutari: number[]) {
  let x = LOCURI[0][0];
  let y = LOCURI[0][1] - 40 * (1 - eo(seg(t, t0, t0 + 0.4)));
  for (let k = 1; k < 4; k++) {
    const p = eio(seg(t, mutari[k - 1], mutari[k - 1] + 0.42));
    x = lerp(x, LOCURI[k][0], p);
    y = lerp(y, LOCURI[k][1], p);
  }
  const tras = mutari.some((m) => t > m && t < m + 0.42) ? 1 : 0;
  q.r.deal.opacity = String(clamp01(seg(t, t0, t0 + 0.3) * 3));
  q.r.deal.transform = 'translate(' + (x - 244).toFixed(1) + 'px,' + (y - 514).toFixed(1) + 'px) rotate(' + tras * 3 + 'deg) scale(' + (1 + 0.04 * tras) + ')';
  q.r.deal.boxShadow = tras ? '0 22px 40px -16px rgba(0,0,0,.4), 0 0 0 2px var(--main)' : t > mutari[2] + 0.42 ? '0 0 0 2px var(--main)' : '';
}

// comanda noua intra in lista, stocul scade si se rezerva, AWB-ul se genereaza si factura se emite
function stareErp(q: Interfata, t: number, t0: number) {
  const p = eio(seg(t, t0, t0 + 0.5));
  q.e.new.opacity = String(p);
  q.e.new.transform = 'translateY(' + (-20 * (1 - p)).toFixed(1) + 'px)';
  q.erows.forEach((s) => {
    s.transform = 'translateY(' + (44 * p).toFixed(1) + 'px)';
  });
  STOC.forEach((s, k) => {
    const b = eio(seg(t, t0 + 0.5 + k * 0.1, t0 + 1.3 + k * 0.1));
    const v = lerp(s[1], s[2], b);
    q.ebars[k].width = v.toFixed(1) + '%';
    q.eq[k].textContent = Math.round((s[4] * v) / s[1]) + ' ' + (D.unitati[s[3]] ?? s[3]);
  });
  q.e.res.opacity = String(eo(seg(t, t0 + 1.0, t0 + 1.3)));
  const sp = seg(t, t0 + 1.45, t0 + 1.75);
  q.e.stamp.opacity = String(clamp01(sp * 4));
  q.e.stamp.transform = 'rotate(-6deg) scale(' + (1.6 - 0.6 * eob(sp, 1.5)).toFixed(4) + ')';
  const ap = seg(t, t0 + 1.15, t0 + 1.35);
  q.e.awbb.opacity = String(1 - ap);
  q.e.awbd.opacity = String(ap);
  q.e.awbd.transform = 'scale(' + (0.9 + 0.1 * eob(ap, 2)).toFixed(4) + ')';
}

// cifrele cresc, graficele se deseneaza si barele urca
function stareRapoarte(q: Interfata, t: number, t0: number) {
  q.pv.forEach((e, k) => {
    const p = eo(seg(t, t0 + k * 0.08, t0 + 0.9 + k * 0.08));
    e.textContent = KP[k][2] === ' lei' ? bani(L, (KP[k][1] / D.curs) * p, 0) : fmt(KP[k][1] * p) + KP[k][2];
  });
  q.psp.forEach((s, k) => {
    s.strokeDashoffset = (1 - eio(seg(t, t0 + 0.2 + k * 0.08, t0 + 0.9 + k * 0.08))).toFixed(4);
  });
  q.pb.forEach((s, k) => {
    s.transform = 'scaleY(' + Math.max(0.001, eob(seg(t, t0 + 0.1 + k * 0.04, t0 + 0.55 + k * 0.04), 1.4)).toFixed(4) + ')';
  });
  const tp = seg(t, t0 + 0.75, t0 + 1.05);
  q.p.tip.opacity = String(clamp01(tp * 4));
  q.p.tip.transform = 'translateY(' + (8 * (1 - eob(tp, 2))).toFixed(1) + 'px)';
  q.p.vl.opacity = String(tp);
  q.prow.forEach((s, k) => {
    const p = eo(seg(t, t0 + 0.3 + k * 0.07, t0 + 0.6 + k * 0.07));
    s.opacity = String(p);
    s.transform = 'translateX(' + (14 * (1 - p)).toFixed(1) + 'px)';
  });
  q.pt.forEach((s, k) => {
    s.transform = 'scaleX(' + eo(seg(t, t0 + 0.4 + k * 0.07, t0 + 1.0 + k * 0.07)).toFixed(4) + ')';
  });
  q.pg.forEach((s, k) => {
    s.transform = 'scaleY(' + Math.max(0.001, eob(seg(t, t0 + 0.5 + k * 0.06, t0 + 0.95 + k * 0.06), 1.3)).toFixed(4) + ')';
  });
}

/* ─── Scenele ─── */

// unde intra fiecare fisier in meniu: ofertele la Vanzari, inbox-ul la Comenzi, notitele la Clienti,
// stocul la Stocuri, facturile la Facturi si calendarul la Dashboard
const MAP = [3, 4, 2, 5, 6, 0];

// fisierele si aplicatiile imprastiate apar in jurul ferestrei goale, apoi intra fiecare in meniu
function sceneHaos(box: HTMLElement, start: number) {
  const q = construieste(box);
  const adresa = typist(D.adresa, 0.2, 26);
  return (t: number) => {
    camera(q, start + t, 1);
    cadru(q);
    const w = seg(t, -0.45, 0.4);
    q.u.win.opacity = String(Math.min(1, w * 3));
    q.u.win.transform = 'translateY(' + (40 * (1 - eo(w))).toFixed(1) + 'px) scale(' + (0.9 + 0.1 * eob(w, 1.6)).toFixed(4) + ')';
    q.urlEl.textContent = adresa(t);
    q.u.caret.opacity = String(t < 0.75 ? (Math.floor(t / 0.53) % 2 ? 0.15 : 1) : 0);
    meniu(q, -1);
    for (const v of PAGINI) off(q.v[v]);
    q.navs.forEach((s, k) => {
      const i = MAP.indexOf(k);
      const tl = i >= 0 ? 1.75 + i * 0.16 + 0.55 : 2.9 + (k % 3) * 0.08;
      const p = seg(t, tl, tl + 0.3);
      s.opacity = String(p);
      s.transform = 'scale(' + (0.9 + 0.1 * eob(p, 2)).toFixed(3) + ')';
      q.slots[k].opacity = String((1 - p) * seg(t, 0.5, 0.9));
    });
    q.xch.forEach((s, k) => {
      const [, , , x, y, inclinare] = HAOS[k];
      // mijlocul locului din meniu
      const tx = 210 + 95;
      const ty = 280 + NAVY[MAP[k]] + 17;
      const a = seg(t, 0.3 + k * 0.12, 0.65 + k * 0.12);
      const f = eio(seg(t, 1.75 + k * 0.16, 2.3 + k * 0.16));
      const bob = 8 * Math.sin((start + t) * 2.2 + k * 1.7);
      const rot = inclinare * (1 - f);
      s.opacity = (Math.min(1, a * 3) * (1 - seg(t, 2.15 + k * 0.16, 2.3 + k * 0.16))).toFixed(3);
      s.transform = 'translate(' + ((tx - x - 150) * f).toFixed(1) + 'px,' + ((ty - y - 38) * f + bob * (1 - f)).toFixed(1) + 'px) rotate(' + rot.toFixed(2) + 'deg) scale(' + ((1.0 + 0.2 * eob(a, 2)) * (1 - 0.8 * f)).toFixed(3) + ')';
    });
  };
}

// camera se apropie pe fereastra: pagina site-ului se publica (CMS), deal-ul nou trece prin
// pipeline (CRM), apoi comanda lui primeste AWB, stocul se rezerva si factura se emite (ERP)
function sceneTur(box: HTMLElement, start: number) {
  const q = construieste(box);
  return (t: number) => {
    camera(q, start + t, 1 - eio(seg(t, 0, 0.8)));
    cadru(q);
    for (const s of q.slots) s.opacity = '0';
    meniu(q, t < 1.4 ? 1 : t < 2.7 ? 3 : 4);
    if (t < 1.4) {
      pagina(q, 'cms');
      q.v.cms.opacity = String(eo(seg(t, 0.15, 0.45)));
    } else if (t < 2.7) treci(q, 'cms', 'crm', seg(t, 1.4, 1.75));
    else treci(q, 'crm', 'erp', seg(t, 2.7, 3.05));
    fly(q.c.head, t, 0.2, 0.4, 0, -20);
    fly(q.c.pal, t, 0.25, 0.45, -50, 0);
    fly(q.c.can, t, 0.3, 0.45, 0, 50);
    stareCms(q, t);
    on(q.r.head);
    q.rcols.forEach((s, k) => fly(s, t, 1.5 + k * 0.06, 0.4, 0, 30));
    q.rks.forEach((s, k) => fly(s, t, 1.55 + k * 0.04, 0.4, 0, 30));
    deal(q, t, 1.65, [2.0, 2.2, 2.4]);
    on(q.e.head);
    fly(q.e.ord, t, 2.8, 0.42, 0, 30);
    fly(q.e.stk, t, 2.88, 0.42, 0, 30);
    fly(q.e.inv, t, 2.96, 0.42, 40, 0);
    stareErp(q, t, 3.0);
    // clic pe „Generează AWB”
    cursor(q, t, 3.55, 4.05, 1010, 720, 1050, 435, 4.1);
    q.u.cur.opacity = String(Math.min(1, seg(t, 3.4, 3.6) * 3) * (1 - seg(t, 4.6, 4.9)));
    ring(q.e.inv, t, 4.55);
  };
}

// de la comenzi la rapoarte: cifrele lunii, venitul pe un an, clientii de top si tinta saptamanii
function sceneRapoarte(box: HTMLElement, start: number) {
  const q = construieste(box);
  return (t: number) => {
    camera(q, start + t, 0);
    cadru(q);
    for (const s of q.slots) s.opacity = '0';
    meniu(q, t < 0.25 ? 4 : 7);
    for (const s of [q.e.head, q.e.ord, q.e.stk, q.e.inv]) on(s);
    stareErp(q, 9, 0);
    treci(q, 'erp', 'rep', seg(t, 0.1, 0.5));
    on(q.p.head);
    fly(q.p.kpi, t, 0.25, 0.45, 0, 30);
    fly(q.p.bars, t, 0.35, 0.45, 0, 30);
    fly(q.p.team, t, 0.45, 0.45, 40, 0);
    fly(q.p.cf, t, 0.55, 0.45, 0, 40);
    fly(q.p.tgt, t, 0.62, 0.45, 40, 0);
    stareRapoarte(q, t, 0.6);
    ring(q.p.bars, t, 1.9);
  };
}

const SCENE = [
  { dur: 3.8, creeaza: sceneHaos },
  { dur: 5.2, creeaza: sceneTur },
  { dur: 3.2, creeaza: sceneRapoarte },
];

// porneste animatia in casuta (vezi pornesteFilmul)
export const porneste = (cutie: HTMLElement, scena: HTMLElement, lang: Limba = 'ro') => {
  L = lang;
  D = DINAMIC[lang];
  return pornesteFilmul(cutie, scena, { scene: SCENE, vedere: VEDERE, traduce: traducator(harta(STATIC, lang)) });
};

// cele doua bannere din editorul CMS; in limbile straine, cu panoul tradus peste textul romanesc din poza
function bannereCms() {
  const img = (i: number) => '<img alt="" src="' + MAGAZIN + '/banner-' + i + '.webp" style="position:absolute;inset:0;width:582px;height:212px;object-fit:cover">';
  if (L === 'ro') return img(1) + '<img class="c-b2" alt="" src="' + MAGAZIN + '/banner-2.webp" style="position:absolute;inset:0;width:582px;height:212px;object-fit:cover;opacity:0">';
  return (
    '<div style="position:absolute;inset:0">' + img(1) + panouBanner(L, 0, 582) + '</div>' +
    '<div class="c-b2" style="position:absolute;inset:0;opacity:0">' + img(2) + panouBanner(L, 1, 582) + '</div>'
  );
}
