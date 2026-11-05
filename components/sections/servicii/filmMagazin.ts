/* Animatia din casuta „Magazine online”, facuta de proprietar cu Claude (inovex-magazin-online.html,
   2026-10-18) si mutata aici aproape neschimbata. Casuta e mai ingusta decat ecranul de 16:9 pentru
   care a fost facuta, asa ca factura si AWB-ul stau peste colturile de jos ale ferestrei, nu departe
   in laterale, camera se apropie mai putin de antet si coboara putin in ultima scena, cand vin
   documentele. Imaginile sunt fisiere separate, nu incluse in cod.

   Un magazin se construieste pas cu pas: fereastra si adresa, antetul, banner-ul si produsele, cosul
   cu cupon, plata, apoi factura si AWB-ul. Redarea si uneltele comune sunt in film.ts. */

import {
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
  pop,
  pornesteFilmul,
  ring,
  rng,
  seg,
  stiluri,
  toate,
  typist,
} from './film';

const DIR = '/imagini/servicii/acasa/animatie-magazin';

// colturile de sus ale facturii si AWB-ului (in original: 90,314 si 1510,314); AWB-ul sta sub butonul
// de plata si sub sigla Netopia, ca sa nu le acopere
const FACTURA = { left: 310, top: 580 };
const AWB = { left: 1290, top: 662 };

// ce parte din scena se vede in casuta: fereastra (430-1490 x 140-940) la mijloc, cu loc pe margini
// pentru documente si pentru apropierea lenta a camerei
const VEDERE = { x: 240, y: -10, w: 1440, h: 1100 };

// cat se apropie camera de antet (in original 2.1): asa incape tot antetul, de la logo la cos
const ZOOM_ANTET = 1.38;

// cat coboara camera in ultima scena, ca sa intre in cadru si documentele
const COBORARE = 81;

const ADRESA = 'magazinul-tau.ro';
const CUPON = 'reducere20';
const PLATA_A = 'Plătește 1.383,20 lei';
const PLATA_B = 'Plată confirmată';

/* ─── Interfata ─── */

const MUTED = 'color:color-mix(in srgb, var(--second) 55%, var(--ground))';
const DISPLAY = 'font-family:var(--display, var(--sans, system-ui, sans-serif))';
const HEART =
  '<path d="M12 20s-7.5-4.6-9-9.3C2 7.4 4.3 4.5 7.4 4.5c2 0 3.6 1.1 4.6 2.8 1-1.7 2.6-2.8 4.6-2.8 3.1 0 5.4 2.9 4.4 6.2-1.5 4.7-9 9.3-9 9.3z"/>';
const PR = [
  ['Set living Alb + Stejar', '1.729 lei'],
  ['Set living Maro', '3.222 lei'],
  ['Set living Alb + Marmură', '6.523 lei'],
  ['Set living Bej', '3.223 lei'],
];

function produs(i: number) {
  return (
    '<div class="pc u-c' + i + '" style="left:' + (32 + i * 255) + 'px;top:551px;width:231px;height:230px;background:var(--ground);border-radius:18px;box-shadow:0 1px 0 color-mix(in srgb, var(--second) 6%, transparent), 0 18px 40px -18px rgba(0,0,0,.22);outline-offset:0">' +
    '<div class="pc" style="left:10px;top:10px;width:211px;height:134px;border-radius:13px;background:color-mix(in srgb, var(--ground) 94%, #B08A5E);overflow:hidden">' +
    '<img class="u-pimg" alt="" src="' + DIR + '/produs-' + (i + 1) + '.webp" style="position:absolute;left:8px;top:6px;width:195px;height:122px;object-fit:contain;mix-blend-mode:multiply">' +
    '<div class="pc" style="right:9px;top:9px;width:28px;height:28px;border-radius:50%;background:var(--ground);color:var(--second);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.08)"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + HEART + '</svg></div></div>' +
    '<div class="pc" style="left:16px;top:156px;width:200px;' + DISPLAY + ';font-size:14.5px;font-weight:600;letter-spacing:-0.01em;white-space:nowrap">' + PR[i][0] + '</div>' +
    '<div class="pc" style="left:16px;top:184px;' + DISPLAY + ';font-size:19px;font-weight:800;letter-spacing:-0.02em;color:var(--main);white-space:nowrap">' + PR[i][1] + '</div>' +
    '<div class="pc" style="left:177px;top:176px;width:40px;height:40px;border-radius:12px;background:var(--second);color:var(--ground);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 16px -8px rgba(0,0,0,.45)"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2.5l2.2 11h10.6L21 7H7"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/><path d="M14 2v5M11.5 4.5h5" stroke="var(--main)"/></svg></div></div>'
  );
}

// cod de bare: linii de 1-3px cu spatii de 1-3px, mereu aceleasi pentru acelasi seed
function coduriBare(W: number, H: number, seed: number) {
  const r = rng(seed);
  let o = '';
  for (let x = 0; x < W; ) {
    const w = 1 + Math.floor(r() * 3);
    o += '<i style="position:absolute;left:' + x + 'px;top:0;width:' + w + 'px;height:' + H + 'px;background:var(--second)"></i>';
    x += w + 1 + Math.floor(r() * 3);
  }
  return o;
}

function antet() {
  const ic = (d: string, w: number) =>
    '<svg viewBox="0 0 24 24" width="' + w + '" height="' + w + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
  const bub = (d: string) =>
    '<span style="width:34px;height:34px;flex:none;border-radius:50%;background:color-mix(in srgb, var(--ground) 94%, var(--second));display:flex;align-items:center;justify-content:center">' + ic(d, 17) + '</span>';
  const two = (a: string, b: string) =>
    '<span style="display:flex;flex-direction:column;gap:2px;line-height:1.15"><span style="font-size:13px;font-weight:700;white-space:nowrap">' + a + '</span><span style="font-size:11px;font-weight:500;white-space:nowrap;' + MUTED + '">' + b + '</span></span>';
  const PHONE = '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>';
  const USER = '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>';
  const CART = '<path d="M3 4h2.5l2.2 11h10.6L21 7H7"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>';
  const SEARCH = '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>';
  const MENU = ['Promoții', 'Produse', 'Living', 'Dormitor', 'Bucătărie', 'Birou', 'Hol', 'Baie', 'Copii & Tineret', 'Grădină & Terasă'];
  const INFO = '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.1"/>';
  const BLOG = '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>';
  const side = (d: string, a: string, first: boolean) =>
    '<span class="u-mi" style="display:flex;align-items:center;gap:7px;font-size:13px;font-weight:700;white-space:nowrap;' + (first ? 'margin-left:auto' : '') + '">' + ic(d, 18) + '<span>' + a + '</span></span>';

  let m = '<div class="pc u-head" style="left:0;top:54px;width:1060px;height:106px;background:var(--ground)">';
  m += '<div class="pc u-h-logo" style="left:32px;top:14px;width:145px;height:36px;background-image:url(' + DIR + '/logo-mobila.webp);background-repeat:no-repeat;background-size:contain;background-position:0 50%"></div>';
  m += '<div class="pc u-h-search" style="left:208px;top:12px;width:410px;height:40px;border-radius:20px;background:color-mix(in srgb, var(--ground) 94%, var(--second));display:flex;align-items:center;padding:0 4px 0 18px"><span style="flex:1;font-size:13px;font-weight:500;' + MUTED + '">Caută produse, camere sau stiluri</span><span style="width:32px;height:32px;border-radius:50%;background:var(--second);color:var(--ground);display:flex;align-items:center;justify-content:center">' + ic(SEARCH, 16) + '</span></div>';
  m += '<div class="pc u-h-contact" style="left:650px;top:15px;display:flex;align-items:center;gap:10px">' + bub(PHONE) + two('0750 456 096', 'Relații clienți') + '</div>';
  m += '<div class="pc u-h-acct" style="left:810px;top:15px;display:flex;align-items:center;gap:10px">' + bub(USER) + two('Contul meu', 'Intră în cont') + '</div>';
  m += '<div class="pc u-h-heart" style="left:958px;top:19px;width:26px;height:26px">' + ic(HEART, 26) + '</div>';
  m += '<div class="pc u-h-cart" style="left:1000px;top:19px;width:26px;height:26px">' + ic(CART, 26) + '<div class="pc u-badge" style="left:15px;top:-7px;width:18px;height:18px;border-radius:50%;background:var(--second);color:var(--ground);font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center">1</div></div>';
  m += '<div class="pc u-h-menu" style="left:0;top:64px;width:1060px;height:42px;border-top:1px solid color-mix(in srgb, var(--second) 8%, transparent);border-bottom:1px solid color-mix(in srgb, var(--second) 8%, transparent);display:flex;align-items:center;gap:19px;padding:0 32px">';
  for (const w of MENU) m += '<span class="u-mi" style="font-size:13px;font-weight:600;white-space:nowrap;display:inline-block">' + w + '</span>';
  m += side(INFO, 'Info utile', true) + side(BLOG, 'Blog', false);
  m += '</div></div>';
  return m;
}

function banner() {
  const sageata = (pozitie: string, d: string) =>
    '<div class="pc" style="' + pozitie + ':18px;top:160px;width:44px;height:44px;border-radius:50%;background:color-mix(in srgb, var(--ground) 88%, transparent);color:var(--second);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.12)"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg></div>';
  let m = '<div class="pc u-hero" style="left:32px;top:172px;width:996px;height:363px;border-radius:16px;overflow:hidden;background:var(--accent)">';
  m += '<div class="pc u-track" style="left:0;top:0;width:2988px;height:363px">';
  for (let i = 0; i < 3; i++) m += '<img class="u-sl" alt="" src="' + DIR + '/banner-' + (i + 1) + '.webp" style="position:absolute;left:' + i * 996 + 'px;top:0;width:996px;height:363px">';
  m += '</div>';
  m += sageata('left', 'M15 5l-7 7 7 7') + sageata('right', 'M9 5l7 7-7 7');
  m += '<div class="pc" style="left:0;right:0;bottom:16px;display:flex;justify-content:center;gap:8px">';
  for (let i = 0; i < 3; i++) m += '<i class="u-dot" style="height:8px;border-radius:4px;background:var(--ground)"></i>';
  m += '</div></div>';
  return m;
}

function cos() {
  const line = 'color-mix(in srgb, var(--second) 10%, transparent)';
  const dash = 'border:2px dashed color-mix(in srgb, var(--second) 28%, transparent);border-radius:12px;background:color-mix(in srgb, var(--ground) 97%, var(--second));padding:14px 18px;width:628px;display:flex;flex-direction:column';
  const chev = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
  const sel = (w: string) =>
    '<span style="width:150px;height:32px;border-radius:8px;border:1px solid ' + line + ';background:var(--ground);display:flex;align-items:center;justify-content:space-between;padding:0 10px;font-size:12.5px;font-weight:500;' + MUTED + '"><span>' + w + '</span>' + chev + '</span>';
  const row = (a: string, b: string) =>
    '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid ' + line + ';font-size:13px"><span style="font-weight:700">' + a + '</span>' + b + '</div>';

  let m = '';
  m += '<div class="pc u-k-title" style="left:32px;top:176px;' + DISPLAY + ';font-size:26px;font-weight:800;opacity:0">Coșul tău</div>';
  m += '<div class="pc u-k-mont" style="left:32px;top:224px;' + dash + ';opacity:0"><span style="font-size:14px;font-weight:700">Doriți montaj? Avem o propunere!</span><span style="margin-top:6px;align-self:flex-start;background:var(--second);color:var(--ground);font-size:15px;font-weight:800;padding:2px 9px;border-radius:6px">250,00 lei</span><span style="margin-top:9px;display:flex;gap:10px">' + sel('Alege județ') + sel('Alege localitatea') + '<span style="height:32px;padding:0 14px;border-radius:8px;border:1.5px solid var(--main);color:var(--main);font-size:12.5px;font-weight:700;display:flex;align-items:center">Adaugă montajul</span></span></div>';
  m += '<div class="pc u-k-prog" style="left:32px;top:358px;' + dash + ';opacity:0"><span style="font-size:14px;font-weight:700;display:flex;align-items:center;gap:8px"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8c-2-4-6-4-6-1.5S10 8 12 8c2 0 6 1 6-1.5S14 4 12 8"/></svg><span>Comanzi mult, plătești mai puțin</span></span><span style="margin-top:6px;font-size:12.5px;font-weight:500">Adaugă produse de încă 1.271,00 lei și primești automat o reducere de 450 lei.</span><span style="margin-top:12px;height:8px;border-radius:4px;background:color-mix(in srgb, var(--ground) 88%, var(--second));position:relative;overflow:hidden"><span class="u-k-bar" style="position:absolute;left:0;top:0;bottom:0;width:0;border-radius:4px;background:repeating-linear-gradient(-45deg, var(--main) 0 8px, color-mix(in srgb, var(--main) 75%, var(--ground)) 8px 16px)"></span></span></div>';
  m += '<div class="pc u-k-thead" style="left:32px;top:462px;width:628px;height:30px;border-bottom:1px solid ' + line + ';font-size:11.5px;font-weight:800;letter-spacing:.07em;opacity:0"><span class="pc" style="left:120px;top:4px">PRODUS</span><span class="pc" style="left:300px;top:4px">PREȚ</span><span class="pc" style="left:410px;top:4px">CANTITATE</span><span class="pc" style="right:4px;top:4px">SUB-TOTAL</span></div>';
  m += '<div class="pc u-k-row" style="left:32px;top:492px;width:628px;height:80px;border-bottom:1px solid ' + line + ';opacity:0">' +
    '<svg class="pc" style="left:6px;top:32px;' + MUTED + '" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
    '<div class="pc" style="left:36px;top:12px;width:72px;height:56px;border-radius:9px;background:color-mix(in srgb, var(--ground) 94%, #B08A5E);overflow:hidden"><img class="u-cimg" alt="" src="' + DIR + '/produs-1.webp" style="position:absolute;left:3px;top:3px;width:66px;height:50px;object-fit:contain;mix-blend-mode:multiply"></div>' +
    '<div class="pc" style="left:122px;top:30px;font-size:14px;font-weight:700;white-space:nowrap">Set living Alb + Stejar</div>' +
    '<div class="pc" style="left:300px;top:31px;font-size:13px;font-weight:500;white-space:nowrap;' + MUTED + '">1.729,00 lei</div>' +
    '<div class="pc" style="left:410px;top:23px;width:90px;height:34px;border-radius:8px;border:1px solid ' + line + ';display:flex;align-items:center;justify-content:space-between;padding:0 10px;font-size:14px;font-weight:700"><span>−</span><span>1</span><span>+</span></div>' +
    '<div class="pc" style="right:4px;top:20px;display:flex;flex-direction:column;align-items:flex-end;gap:2px"><span style="font-size:15px;font-weight:800;color:var(--main);white-space:nowrap">1.729,00 lei</span><span style="font-size:11px;font-weight:500;' + MUTED + '">(inclusiv TVA)</span></div></div>';
  m += '<div class="pc u-k-coupon" style="left:32px;top:592px;display:flex;gap:10px;opacity:0"><span style="width:220px;height:42px;border-radius:8px;border:1.5px solid ' + line + ';display:flex;align-items:center;padding:0 14px;font-size:13px;font-weight:600"><span class="u-k-ctext"></span></span><span class="blue u-k-apply" style="position:relative;width:150px;height:42px;border-radius:8px;font-size:13px">Aplică cuponul</span></div>';
  m += '<div class="pc card u-k-sum" style="left:684px;top:176px;width:344px;padding:22px 24px;display:flex;flex-direction:column;opacity:0">' +
    '<span style="' + DISPLAY + ';font-size:20px;font-weight:800;margin-bottom:6px">Total coș</span>' +
    row('Sub-total', '<span style="' + MUTED + '">1.729,00 lei</span>') +
    '<div class="u-k-srow" style="overflow:hidden;height:0">' + row('Cupon: reducere20', '<span style="color:var(--main);font-weight:700">−345,80 lei</span>') + '</div>' +
    row('Livrare', '<span style="' + MUTED + '">Livrare gratuită</span>') +
    '<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:16px 0 4px"><span style="font-size:18px;font-weight:800">Total</span><span style="display:flex;flex-direction:column;align-items:flex-end;gap:2px"><span class="u-k-total" style="font-size:26px;font-weight:800;color:var(--main);white-space:nowrap">1.729,00 lei</span><span style="font-size:11px;font-weight:500;' + MUTED + '">(include TVA)</span></span></div>' +
    '<span class="blue u-k-cta" style="position:relative;margin-top:14px;height:48px;font-size:14px">Continuă cu finalizarea comenzii</span></div>';
  return m;
}

function plata() {
  return (
    '<div class="pc card u-pay" style="left:662px;top:196px;width:380px;height:340px">' +
    '<div class="t-ui" style="left:28px;top:24px">Plată cu cardul</div>' +
    '<div class="pc soft" style="left:28px;top:74px;width:324px;height:56px;border-radius:12px;font-size:20px;font-weight:600;line-height:56px;padding-left:20px;letter-spacing:.06em">•••• •••• •••• 4821</div>' +
    '<div class="pc soft" style="left:28px;top:146px;width:154px;height:50px;border-radius:12px;font-size:18px;font-weight:600;line-height:50px;padding-left:20px">12 / 28</div>' +
    '<div class="pc soft" style="left:198px;top:146px;width:154px;height:50px;border-radius:12px;font-size:18px;font-weight:600;line-height:50px;padding-left:20px">•••</div>' +
    '<div class="blue u-paybtn" style="left:28px;top:226px;width:324px;height:60px;border-radius:14px;font-size:21px">' + PLATA_A + '</div>' +
    '<div class="pc" style="left:0;right:0;top:298px;display:flex;align-items:center;justify-content:center;gap:9px;font-size:12px;font-weight:600;color:color-mix(in srgb, var(--second) 55%, var(--ground))"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><span>Plăți securizate prin</span><span style="background:var(--second);border-radius:7px;padding:5px 9px;display:flex"><img alt="" src="' + DIR + '/netopia.svg" style="height:20px;width:53px"></span></div>' +
    '</div>'
  );
}

// factura si AWB-ul, cu date de exemplu
function documente() {
  const SL = '#3C6882';
  const g = 'color:color-mix(in srgb, var(--second) 62%, var(--ground))';
  const bx = (l: number, t: number, w: number, hh: number, inner: string, st = '') =>
    '<div class="pc" style="left:' + l + 'px;top:' + t + 'px;width:' + w + 'px;height:' + hh + 'px;' + st + '">' + inner + '</div>';
  const tx = (l: number, t: number, txt: string, st = '') =>
    '<div class="pc" style="left:' + l + 'px;top:' + t + 'px;white-space:nowrap;' + st + '">' + txt + '</div>';
  const doc = DISPLAY + ';color:color-mix(in srgb, var(--second) 88%, var(--ground));border-radius:4px;overflow:hidden';
  const logo = (st: string) => '<img alt="" src="' + DIR + '/logo-mobila.webp" style="position:absolute;' + st + '">';

  let inv = '<div class="pc card u-inv" style="left:' + FACTURA.left + 'px;top:' + FACTURA.top + 'px;width:320px;height:452px;' + doc + '">';
  inv += logo('left:18px;top:24px;width:104px;height:26px;object-fit:contain;object-position:0 50%');
  inv += tx(170, 14, 'FACTURA', 'font-size:21px;font-weight:800;letter-spacing:.01em') + tx(262, 21, 'MOB0124', 'font-size:9.5px;font-weight:800');
  inv += tx(170, 42, 'Data emiterii: 18/10/2026', 'font-size:7px');
  inv += bx(166, 64, 140, 22, tx(8, 7, 'TOTAL PLATA', 'font-size:7.5px;font-weight:800;color:var(--ground)') + tx(70, 4, '1383.20 Lei', 'font-size:11px;font-weight:800;color:var(--ground)'), 'background:' + SL);
  const party = (l: number, lab: string, name: string, lines: string[]) => {
    let o = tx(l, 100, lab, 'font-size:6.5px;font-weight:700;' + g) + bx(l, 110, 76, 0, '', 'border-top:1px solid color-mix(in srgb, var(--second) 30%, transparent)') + '<div class="pc" style="left:' + l + 'px;top:116px;width:136px;font-size:8.5px;font-weight:800;line-height:1.15">' + name + '</div>';
    lines.forEach((t, k) => {
      o += '<div class="pc" style="left:' + l + 'px;top:' + (134 + k * 9.5) + 'px;width:140px;font-size:6.3px;line-height:1.2">' + t + '</div>';
    });
    return o;
  };
  inv += party(18, 'Furnizor', 'MOBILA DESIGN S.R.L.', ['CIF: RO12345678', 'Reg. com.: J40/1234/2020', 'Adresa: Str. Exemplului nr. 10, București', 'Banca: Banca Exemplu']);
  inv += party(166, 'Client', 'Andrei Ionescu', ['Adresa: Str. Florilor nr. 7,', 'Cluj-Napoca, Jud. Cluj', 'Tel.: 0740 000 000']);
  const cols: [number, string][] = [[18, 'Nr. crt'], [44, 'Denumirea produselor sau a serviciilor'], [190, 'U.M.'], [214, 'Cant.'], [240, 'Preț unitar'], [278, 'Valoarea']];
  inv += bx(14, 184, 292, 20, cols.map((c) => tx(c[0] - 14, 6, c[1], 'font-size:5.8px;font-weight:800')).join(''), 'border-top:1.2px solid ' + SL + ';border-bottom:1.2px solid ' + SL);
  const rows = [['1', 'Set living Alb + Stejar', 'buc', '1', '1729.00', '1729.00'], ['2', 'Discount cupon reducere20', 'buc', '1', '-345.80', '-345.80']];
  rows.forEach((r, k) => {
    inv += bx(14, 204 + k * 18, 292, 18, r.map((v, n) => tx(cols[n][0] - 14 + (n === 0 ? 4 : 0), 5, v, 'font-size:6.5px')).join(''), 'border-bottom:1px solid color-mix(in srgb, var(--second) 14%, transparent)');
  });
  inv += tx(18, 252, 'Întocmit de: Magazin online', 'font-size:6.5px') + tx(166, 251, 'TOTAL PLATA', 'font-size:7px;font-weight:800') + tx(250, 247, '1383.20 Lei', 'font-size:11px;font-weight:800');
  inv += '<div class="pc u-stamp" style="left:150px;top:300px;padding:6px 12px;border:2.5px solid var(--main);border-radius:8px;color:var(--main);font-size:13px;font-weight:800;white-space:nowrap">Emisă automat</div>';
  inv += bx(10, 384, 300, 36, tx(8, 6, 'MOBILA DESIGN S.R.L.', 'font-size:6.5px;font-weight:800') + tx(8, 16, 'Capital social: 200 Lei', 'font-size:6px') + tx(8, 25, 'Adresa web: magazinul-tau.ro; Tel.: 0750 456 096', 'font-size:6px'), 'background:color-mix(in srgb, var(--ground) 95%, var(--second))');
  inv += tx(18, 426, 'Factura este valabilă fără semnătură și ștampilă, conform art. 319 alin. 29 din Legea 227/2015.', 'font-size:4.8px;' + g) + tx(170, 437, 'Facturez cu SmartBill.ro   Cod document: MBKZA', 'font-size:4.8px;' + g);
  inv += '</div>';

  const ln = '1px solid color-mix(in srgb, var(--second) 75%, transparent)';
  const lab = (l: number, t: number, txt: string) => tx(l, t, txt, 'font-size:4.8px;letter-spacing:.08em;font-weight:600');
  let awb = '<div class="pc card u-awb" style="left:' + AWB.left + 'px;top:' + AWB.top + 'px;width:320px;height:452px;' + doc + '">';
  awb += logo('left:110px;top:10px;width:100px;height:22px;object-fit:contain');
  awb += bx(10, 38, 300, 250, '', 'border:1.2px solid var(--second)');
  awb += bx(10, 38, 130, 42, tx(6, 5, 'CURIER EXPRES', 'font-size:8px;font-weight:800') + tx(6, 16, 'Transport rapid colete și documente', 'font-size:4.8px') + tx(6, 23, 'Livrare în toată țara, 24–48 ore', 'font-size:4.8px'), 'border-right:' + ln + ';border-bottom:' + ln);
  awb += bx(140, 38, 90, 42, tx(5, 5, 'Banca:', 'font-size:6px') + bx(5, 14, 80, 8, '', 'border:' + ln) + tx(5, 25, 'IBAN:', 'font-size:6px') + bx(5, 32, 80, 7, '', 'border:' + ln), 'border-right:' + ln + ';border-bottom:' + ln);
  awb += bx(230, 38, 80, 42, tx(5, 4, 'Valoare declarată', 'font-size:5.5px') + tx(5, 13, 'Ramburs: 0 LEI', 'font-size:5.5px;font-weight:800') + tx(56, 6, '1', 'font-size:20px;font-weight:800') + tx(55, 30, 'din 1', 'font-size:5.5px'), 'border-bottom:' + ln);
  awb += bx(10, 80, 300, 34, tx(5, 3, 'Data', 'font-size:5px') + tx(5, 14, '18.10.2026', 'font-size:6px') + tx(52, 3, 'Ora', 'font-size:5px') + tx(52, 14, '10:24', 'font-size:6px') + tx(90, 3, 'AWB Air Way Bill', 'font-size:5px') + tx(90, 13, '5824109305179', 'font-size:10px;font-weight:800;letter-spacing:.03em') + '<div class="pc u-code" style="left:176px;top:5px;width:118px;height:24px;overflow:hidden">' + coduriBare(118, 24, 11) + '</div>', 'border-bottom:' + ln);
  const ap = (l: number, w: number, head: string, name: string, addr: string, tel: string, city: string) =>
    bx(l, 114, w, 110, tx(5, 3, head, 'font-size:7.5px;font-weight:800') + tx(5, 15, name, 'font-size:7px;font-weight:600') + lab(5, 30, 'ADRESĂ') + tx(5, 37, addr, 'font-size:6.3px') + lab(5, 60, 'TEL / FAX') + tx(28, 58, tel, 'font-size:6.3px') + bx(0, 72, w, 0, '', 'border-top:' + ln) + tx(5, 76, city + ' – 0 km', 'font-size:5.5px') + tx(5, 88, city, 'font-size:11px;font-weight:800'), 'border-right:' + ln);
  awb += ap(10, 98, 'EXPEDITOR', 'MOBILA DESIGN S.R.L.', 'Str. Exemplului nr. 10', '0750 456 096', 'București');
  awb += ap(108, 98, 'DESTINATAR', 'Andrei Ionescu', 'Str. Florilor nr. 7', '0740 000 000', 'Cluj-Napoca');
  const kv = ['PLIC', 'COLET', 'KG', 'GVOL'];
  const vv = ['0', '1', '48.00', '0'];
  let rc = kv.map((k, n) => tx(4 + n * 25, 3, k, 'font-size:5.2px;font-weight:700') + tx(6 + n * 25, 12, vv[n], 'font-size:5.8px')).join('');
  rc += bx(0, 21, 104, 0, '', 'border-top:' + ln) + lab(4, 25, 'SERVICIU') + tx(40, 25, 'Standard', 'font-size:6.5px;font-weight:800') + lab(4, 40, 'OPȚIUNI') + tx(4, 47, 'Deschidere la livrare', 'font-size:6.3px;font-weight:800') + lab(4, 62, 'PLATA LA') + tx(4, 69, 'expeditor', 'font-size:6.3px;font-weight:800') + lab(4, 84, 'DOCUMENT DE PLATĂ') + tx(4, 91, 'FACTURA', 'font-size:6.3px;font-weight:800');
  awb += bx(206, 114, 104, 110, rc);
  awb += bx(10, 224, 300, 32, lab(5, 4, 'CONFIRMARE') + tx(5, 12, 'Nume în clar:', 'font-size:6px') + tx(150, 12, 'Data      Ora', 'font-size:6px') + tx(240, 4, 'Ștampila', 'font-size:6px'), 'border-top:' + ln + ';border-bottom:' + ln);
  awb += bx(10, 256, 300, 16, lab(5, 5, 'CONȚINUT') + tx(48, 3, 'Set living Alb + Stejar', 'font-size:6.5px'), 'border-bottom:' + ln);
  awb += bx(10, 272, 300, 16, lab(5, 5, 'OBSERVAȚII') + tx(52, 3, 'Fragil – mobilier, a se manipula cu grijă', 'font-size:6.5px'));
  awb += tx(116, 300, 'Specificație de conținut', 'font-size:8.5px') + tx(140, 312, '- Packing list -', 'font-size:6px;letter-spacing:.1em');
  awb += tx(218, 296, 'Număr: PL5824109305179', 'font-size:6px;font-weight:800') + bx(218, 305, 88, 14, coduriBare(88, 14, 23), 'overflow:hidden');
  const pc: [number, string][] = [[0, 'NrCrt'], [24, 'Produs'], [120, 'Descriere'], [210, 'Cod/serie'], [252, 'Buc'], [270, 'Val.']];
  awb += bx(10, 330, 300, 12, pc.map((c) => tx(c[0] + 3, 2, c[1], 'font-size:5.5px;font-weight:700')).join(''), 'border:' + ln);
  for (let k = 0; k < 4; k++) {
    awb += bx(10, 342 + k * 11, 300, 11, k === 0 ? tx(9, 2, '1', 'font-size:5.8px') + tx(27, 2, 'Set living Alb + Stejar', 'font-size:5.8px') + tx(123, 2, 'Mobilier living, 3 colete', 'font-size:5.8px') + tx(255, 2, '1', 'font-size:5.8px') + tx(273, 2, '1729', 'font-size:5.8px') : tx(9, 2, String(k + 1), 'font-size:5.8px'), 'border-left:' + ln + ';border-right:' + ln + ';border-bottom:' + ln);
  }
  awb += '<div class="pc u-ship" style="left:16px;top:400px;padding:7px 13px;border-radius:9px;background:var(--accent);color:var(--main);font-size:14px;font-weight:800;white-space:nowrap">Predat curierului</div>';
  awb += '</div>';
  return inv + awb;
}

const ANTET = ['logo', 'search', 'contact', 'acct', 'heart', 'cart', 'menu'] as const;
const COS = ['title', 'mont', 'prog', 'thead', 'row', 'coupon', 'sum', 'bar', 'srow', 'apply', 'cta'] as const;
const PARTI = ['win', 'url', 'caret', 'head', 'badge', 'hero', 'c0', 'c1', 'c2', 'c3', 'pay', 'paybtn', 'inv', 'stamp', 'awb', 'code', 'ship'] as const;

function construieste(box: HTMLElement) {
  const root = h(
    '<div class="cam">' +
      '<div class="win u-win">' +
        '<div class="bar"><i class="dot"></i><i class="dot"></i><i class="dot"></i><div class="url"><span class="u-url"></span><span class="u-caret" style="color:var(--main)">|</span></div></div>' +
        antet() +
        banner() +
        produs(0) + produs(1) + produs(2) + produs(3) +
        cos() +
        plata() +
      '</div>' +
      documente() +
    '</div>',
  );
  box.append(root);
  return {
    ...stiluri(root, 'u-', PARTI),
    cam: root.style,
    h: stiluri(root, 'u-h-', ANTET),
    mi: toate(root, 'u-mi'),
    sl: toate(root, 'u-sl'),
    dots: toate(root, 'u-dot'),
    track: gaseste(root, 'u-track').style,
    k: stiluri(root, 'u-k-', COS),
    totalEl: gaseste(root, 'u-k-total'),
    ctextEl: gaseste(root, 'u-k-ctext'),
    urlEl: gaseste(root, 'u-url'),
    paybtnEl: gaseste(root, 'u-paybtn'),
  };
}

type Interfata = ReturnType<typeof construieste>;

/* ─── Miscari ─── */

function lei(v: number) {
  const [a, b] = v.toFixed(2).split('.');
  return a.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + b + ' lei';
}

// ft: timpul de la inceputul animatiei
function slider(q: Interfata, ft: number) {
  const p = eio(seg(ft, 5.9, 6.5)) + eio(seg(ft, 8.3, 8.9));
  q.track.transform = 'translateX(' + (-996 * p).toFixed(1) + 'px)';
  q.sl.forEach((s) => {
    s.transform = 'scale(' + (1 + 0.004 * ft).toFixed(4) + ')';
  });
  q.dots.forEach((s, i) => {
    const a = Math.max(0, 1 - Math.abs(p - i));
    s.width = (8 + 18 * a).toFixed(1) + 'px';
    s.opacity = (0.55 + 0.45 * a).toFixed(3);
  });
}

function camera(q: Interfata, ft: number) {
  q.cam.transform = 'scale(' + (1 + 0.004 * ft) + ')';
  slider(q, ft);
}

function cosGata(q: Interfata) {
  for (const k of ['title', 'mont', 'prog', 'thead', 'row', 'coupon', 'sum'] as const) on(q.k[k]);
  q.k.bar.width = '58%';
  q.k.srow.height = '44px';
  q.totalEl.textContent = '1.383,20 lei';
  q.ctextEl.textContent = CUPON;
  off(q.hero);
  for (const c of ['c0', 'c1', 'c2', 'c3'] as const) off(q[c]);
}

/* ─── Scenele ─── */

// fereastra goala, adresa se scrie in bara
function sceneGol(box: HTMLElement, start: number) {
  const q = construieste(box);
  const adresa = typist(ADRESA, 0.4, 24);
  return (t: number) => {
    camera(q, start + t);
    const p = seg(t, -0.45, 0.4);
    q.win.opacity = String(Math.min(1, p * 3));
    q.win.transform = 'translateY(' + (40 * (1 - eo(p))).toFixed(1) + 'px) scale(' + (0.9 + 0.1 * eob(p, 1.6)).toFixed(4) + ')';
    q.urlEl.textContent = adresa(t);
    q.caret.opacity = Math.floor(t / 0.53) % 2 ? '0.15' : '1';
    for (const k of ['head', 'badge', 'hero', 'c0', 'c1', 'c2', 'c3', 'pay', 'inv', 'awb'] as const) off(q[k]);
  };
}

// camera se apropie de antet cat se construieste, apoi se departeaza si vin banner-ul si produsele
function sceneDesign(box: HTMLElement, start: number) {
  const q = construieste(box);
  q.urlEl.textContent = ADRESA;
  const HDR = [['logo', 0.45, -60], ['search', 0.7, -60], ['contact', 0.95, -60], ['acct', 1.15, -60], ['heart', 1.35, -60], ['cart', 1.5, -60]] as const;
  return (t: number) => {
    const base = 1 + 0.004 * (start + t);
    const k = eio(seg(t, 0, 0.9)) * (1 - eio(seg(t, 2.55, 3.35)));
    const z = Math.exp(lerp(Math.log(base), Math.log(ZOOM_ANTET), k));
    const cy = lerp(540, 247, k);
    q.cam.transform = 'translateY(' + (-z * (cy - 540)).toFixed(1) + 'px) scale(' + z.toFixed(4) + ')';
    slider(q, start + t);
    on(q.win);
    on(q.head);
    q.caret.opacity = String(1 - seg(t, 0, 0.3));
    for (const [n, t0, dy] of HDR) fly(q.h[n], t, t0, 0.45, 0, dy);
    ring(q.h.logo, t, 0.9);
    ring(q.h.search, t, 1.15);
    ring(q.h.cart, t, 1.95);
    q.h.menu.opacity = String(eo(seg(t, 1.75, 2.1)));
    q.mi.forEach((s, i) => fly(s, t, 1.8 + i * 0.06, 0.4, 0, 30));
    fly(q.hero, t, 3.0, 0.55, -320, 0);
    ring(q.hero, t, 3.55);
    (['c0', 'c1', 'c2', 'c3'] as const).forEach((c, i) => fly(q[c], t, 3.35 + i * 0.15, 0.5, 0, 260));
    off(q.badge);
    off(q.pay);
    off(q.inv);
    off(q.awb);
  };
}

// produsul ajunge in cos, se aplica cuponul, apoi plata cu cardul
function scenePlati(box: HTMLElement, start: number) {
  const q = construieste(box);
  q.urlEl.textContent = ADRESA;
  q.caret.opacity = '0';
  const cupon = typist(CUPON, 1.5, 22);
  return (t: number) => {
    const base = 1 + 0.004 * (start + t);
    const k = eio(seg(t, 0.55, 1.25)) * (1 - eio(seg(t, 3.35, 3.95)));
    const z = Math.exp(lerp(Math.log(base), Math.log(1.3), k));
    const cy = lerp(540, 520, k);
    q.cam.transform = 'translateY(' + (-z * (cy - 540)).toFixed(1) + 'px) scale(' + z.toFixed(4) + ')';
    slider(q, start + t);
    on(q.win);
    on(q.head);
    off(q.inv);
    off(q.awb);
    pop(q.badge, t, 0.15);
    const o = eio(seg(t, 0.45, 0.8));
    for (const n of ['hero', 'c0', 'c1', 'c2', 'c3'] as const) {
      q[n].opacity = String(1 - o);
      q[n].transform = 'translateY(' + (-50 * o).toFixed(1) + 'px)';
    }
    fly(q.k.title, t, 0.75, 0.45, 0, 30);
    fly(q.k.mont, t, 0.85, 0.45, 0, 40);
    fly(q.k.prog, t, 0.95, 0.45, 0, 40);
    fly(q.k.thead, t, 1.05, 0.4, 0, 30);
    fly(q.k.row, t, 1.15, 0.45, -160, 0);
    ring(q.k.row, t, 1.6);
    fly(q.k.coupon, t, 1.25, 0.4, 0, 30);
    fly(q.k.sum, t, 0.9, 0.5, 200, 0);
    ring(q.k.sum, t, 1.4);
    q.k.bar.width = (58 * eo(seg(t, 1.3, 1.9))).toFixed(1) + '%';
    const scris = cupon(t);
    q.ctextEl.textContent = scris || 'Cod cupon';
    q.ctextEl.style.opacity = scris ? '1' : '0.45';
    q.k.apply.transform = 'scale(' + (1 - 0.05 * Math.sin(Math.PI * seg(t, 2.0, 2.15))).toFixed(4) + ')';
    const c = eo(seg(t, 2.1, 2.4));
    q.k.srow.height = (44 * c).toFixed(1) + 'px';
    q.k.srow.opacity = String(c);
    q.totalEl.textContent = lei(lerp(1729, 1383.2, eio(seg(t, 2.15, 2.55))));
    q.k.cta.transform = 'scale(' + (1 - 0.04 * Math.sin(Math.PI * seg(t, 2.65, 2.85))).toFixed(4) + ')';
    fly(q.pay, t, 2.85, 0.5, 420, 0);
    ring(q.pay, t, 3.35);
    const f = seg(t, 3.45, 3.75);
    q.paybtnEl.textContent = f < 0.5 ? PLATA_A : PLATA_B;
    q.paybtn.opacity = String(Math.abs(f - 0.5) * 2);
    q.paybtn.transform = 'scale(' + (1 - 0.03 * Math.sin(Math.PI * seg(t, 3.3, 3.5))).toFixed(4) + ')';
  };
}

// factura se emite singura, AWB-ul se genereaza si coletul pleaca la curier
function sceneComanda(box: HTMLElement, start: number) {
  const q = construieste(box);
  q.urlEl.textContent = ADRESA;
  q.caret.opacity = '0';
  q.paybtnEl.textContent = PLATA_B;
  return (t: number) => {
    q.cam.transform = 'translateY(' + (-COBORARE * eio(seg(t, 0.1, 0.8))).toFixed(1) + 'px) scale(' + (1 + 0.004 * (start + t)) + ')';
    slider(q, start + t);
    for (const k of ['win', 'head', 'badge', 'pay', 'paybtn'] as const) on(q[k]);
    cosGata(q);
    fly(q.inv, t, 0.15, 0.55, -380, 0);
    ring(q.inv, t, 0.72);
    const sp = seg(t, 0.85, 1.15);
    q.stamp.opacity = String(clamp01(sp * 4));
    q.stamp.transform = 'rotate(-6deg) scale(' + (1.7 - 0.7 * eob(sp, 1.5)).toFixed(4) + ')';
    fly(q.awb, t, 0.95, 0.55, 380, 0);
    ring(q.awb, t, 1.52);
    q.code.clipPath = 'inset(0 ' + (100 * (1 - eio(seg(t, 1.35, 1.75)))).toFixed(1) + '% 0 0)';
    pop(q.ship, t, 1.75);
  };
}

const SCENE = [
  { dur: 1.5, creeaza: sceneGol },
  { dur: 4.5, creeaza: sceneDesign },
  { dur: 4, creeaza: scenePlati },
  { dur: 3, creeaza: sceneComanda },
];

// porneste animatia in casuta (vezi pornesteFilmul)
export const porneste = (cutie: HTMLElement, scena: HTMLElement) => pornesteFilmul(cutie, scena, { scene: SCENE, vedere: VEDERE });
