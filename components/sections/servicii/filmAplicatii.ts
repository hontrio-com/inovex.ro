/* Animatia din casuta „Aplicații web și SaaS”, facuta de proprietar cu Claude
   (inovex-aplicatii-web-saas.html, 2026-10-19) si mutata aici aproape neschimbata. Casuta e mai
   ingusta decat ecranul de 16:9 pentru care a fost facuta, asa ca panourile vin peste coltul de jos
   al ferestrei, nu langa ea, iar camera se departeaza mai putin. Imaginile sunt fisiere separate,
   nu incluse in cod.

   Hontrio, platforma facuta de Inovex: autentificarea si dashboard-ul, apoi o cerere care trece prin
   arhitectura aplicatiei, abonamentele cu plati recurente si scalarea automata la un varf de trafic.
   Redarea si uneltele comune sunt in film.ts. */

import {
  eio,
  eo,
  eob,
  fly,
  gaseste,
  group,
  h,
  lerp,
  off,
  on,
  out,
  pop,
  pornesteFilmul,
  ring,
  seg,
  stiluri,
  toate,
  typist,
} from './film';

const DIR = '/imagini/servicii/acasa/animatie-aplicatii';

// unde stau panourile (in original la 1286 x 176, langa fereastra): peste coltul de jos al
// ferestrei (200-1260 x 150-1010), iesind din ea spre dreapta si in jos. Asa raman la vedere
// butonul „Optimizează produse” si notificarea care apare peste el.
const PANOU = { x: 770, y: 470 };

// camera: apropiata pe fereastra, ca in original, apoi se departeaza putin si coboara spre dreapta,
// cat sa intre si panourile (in original se departa pana la 0.95, cu centrul la 1000 x 540)
const CAMERA = { z0: 1.12, x0: 730, z1: 0.98, x1: 787, y1: 599 };

// ce parte din scena se vede in casuta: fereastra asa cum o arata camera la inceput, cu loc pe
// margini pentru apropierea lenta a camerei
const VEDERE = { x: 282, y: 23, w: 1356, h: 1126 };

const ADRESA = 'app.hontrio.com';
const EMAIL = 'contact@magazinul-tau.ro';

/* ─── Interfata ─── */

const ic = (d: string, w: number, st = '') =>
  '<svg viewBox="0 0 24 24" width="' + w + '" height="' + w + '" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="' + st + '">' + d + '</svg>';

const I: Record<string, string> = {
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  server: '<rect x="4" y="3.5" width="16" height="7" rx="1.5"/><rect x="4" y="13.5" width="16" height="7" rx="1.5"/><path d="M8 7h.01M8 17h.01"/>',
  db: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
  bolt: '<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>',
  queue: '<rect x="3" y="5" width="18" height="4" rx="1"/><rect x="3" y="10.5" width="18" height="4" rx="1"/><rect x="3" y="16" width="12" height="4" rx="1"/>',
  card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
};
const nic = (k: string) => '<span class="nic">' + ic(I[k], 20) + '</span>';

const MU = 'color:color-mix(in srgb, var(--second) 58%, var(--ground))';
const LN = 'color-mix(in srgb, var(--second) 8%, transparent)';
// culorile Hontrio
const BK = '#18181B';
const GN = '#10B981';
const SOFT = 'color-mix(in srgb, var(--second) 4%, var(--ground))';

function login() {
  const lab = (t: string, extra = '') =>
    '<div style="display:flex;justify-content:space-between;font-size:10.5px;font-weight:700;letter-spacing:.06em;margin:16px 0 7px;' + MU + '"><span>' + t + '</span>' + extra + '</div>';
  const camp = (icon: string, cls: string, right = '') =>
    '<div class="' + cls + '" style="height:46px;border-radius:11px;background:#E8F0FE;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--second) 8%, transparent);display:flex;align-items:center;gap:12px;padding:0 15px;font-size:13.5px;font-weight:500">' + ic(icon, 16, 'color:color-mix(in srgb, var(--second) 40%, var(--ground));flex:none') + '<span class="' + cls + '-t" style="flex:1;white-space:nowrap"></span>' + right + '</div>';
  return '<div class="pc l-card" style="left:0;top:54px;width:1060px;height:806px;overflow:hidden;background:var(--ground)">' +
    '<i style="position:absolute;left:-120px;top:20px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle, color-mix(in srgb, var(--second) 5%, transparent), transparent 70%)"></i>' +
    '<i style="position:absolute;right:-60px;top:120px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle, color-mix(in srgb, var(--second) 4%, transparent), transparent 70%)"></i>' +
    '<i style="position:absolute;right:-160px;bottom:-200px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle, color-mix(in srgb, var(--second) 5%, transparent), transparent 70%)"></i>' +
    '<div class="pc" style="left:340px;top:96px;width:380px;display:flex;flex-direction:column;align-items:stretch">' +
    '<img alt="" src="' + DIR + '/logo-hontrio.webp" style="width:210px;height:29px;align-self:center;object-fit:contain">' +
    '<div class="disp" style="margin-top:34px;text-align:center;font-size:25px;font-weight:800">Bine ai revenit</div>' +
    '<div style="margin-top:8px;text-align:center;font-size:13px;font-weight:500;' + MU + '">Conectează-te pentru a continua</div>' +
    '<div style="margin-top:26px;height:46px;border-radius:11px;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--second) 13%, transparent);display:flex;align-items:center;justify-content:center;gap:10px;font-size:13.5px;font-weight:600"><img alt="" src="' + DIR + '/google.webp" style="width:17px;height:17px">Continuă cu Google</div>' +
    '<div style="margin-top:20px;display:flex;align-items:center;gap:16px;font-size:10px;font-weight:700;letter-spacing:.14em;color:color-mix(in srgb, var(--second) 30%, var(--ground))"><i style="flex:1;height:1px;background:' + LN + '"></i>SAU<i style="flex:1;height:1px;background:' + LN + '"></i></div>' +
    lab('EMAIL') + camp('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>', 'l-em') +
    lab('PAROLĂ', '<span style="letter-spacing:0;font-weight:600">Ai uitat parola?</span>') + camp(I.lock, 'l-pw', ic('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', 16, 'color:color-mix(in srgb, var(--second) 40%, var(--ground))')) +
    '<span class="l-btn" style="margin-top:18px;height:46px;border-radius:11px;background:' + BK + ';color:var(--ground);display:flex;align-items:center;justify-content:center;gap:8px;font-size:13.5px;font-weight:700">Conectează-te' + ic('<path d="M5 12h14M13 6l6 6-6 6"/>', 15) + '</span>' +
    '<div style="margin-top:22px;text-align:center;font-size:13px;font-weight:500;' + MU + '">Nu ai cont? <span style="color:var(--second);font-weight:700">Creează cont gratuit</span></div></div></div>';
}

// meniul din stanga: iconita (nume din I sau desen), nume, pagina curenta, cu submeniu; '-' e o linie
const NAV: ([string, string, number?, number?] | '-')[] = [
  ['grid', 'Dashboard', 1],
  ['<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>', 'Produse'],
  '-',
  ['<rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 3v4M9 13h.01M15 13h.01"/>', 'AI Agent', 0, 1],
  ['<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M20 16l-5-5-8 8"/>', 'Imagini AI'],
  ['search', 'SEO', 0, 1],
  ['<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/>', 'Risk Shield'],
  '-',
  ['card', 'Abonament'],
  ['gear', 'Setări'],
  ['<path d="M4 5h16v11H9l-5 4z"/>', 'Suport'],
];

// pasii din „Configurare cont” si daca sunt facuti
const PASI: [string, number][] = [['Cont creat', 1], ['Magazin conectat', 1], ['Produse sincronizate', 1], ['Prima optimizare', 0], ['AI Agent activat', 1]];

// cifrele de sub „AI Insight”: iconita si nume
const CIFRE = [
  ['<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>', 'Total produse'],
  ['<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M20 16l-5-5-8 8"/>', 'Imagini generate'],
  [I.search, 'Scor SEO mediu'],
  [I.card, 'Credite rămase'],
];

// graficul scorului SEO, din 16 puncte
function grafic() {
  const PCT = [52, 55, 54, 58, 61, 60, 64, 68, 67, 72, 75, 74, 79, 82, 84, 86];
  let line = '';
  PCT.forEach((v, k) => {
    line += (k ? 'L' : 'M') + (k * 470 / 15).toFixed(1) + ' ' + (190 - (v - 45) * 4.2).toFixed(1);
  });
  return { line, area: line + 'L470 190L0 190Z' };
}

function dashboard() {
  let w = '<div class="pc d-side" style="left:0;top:54px;width:210px;height:806px;background:var(--ground);border-right:1px solid ' + LN + '">' +
    '<img alt="" src="' + DIR + '/logo-hontrio.webp" style="position:absolute;left:20px;top:22px;width:130px;height:18px;object-fit:contain;object-position:0 50%">' +
    '<div class="pc" style="left:10px;right:10px;top:66px;display:flex;flex-direction:column;gap:2px">' + NAV.map((n) => n === '-' ? '<i style="height:1px;margin:6px 10px;background:' + LN + '"></i>' : '<div style="height:38px;border-radius:10px;display:flex;align-items:center;gap:11px;padding:0 12px;font-size:13px;font-weight:600;' + (n[2] ? 'background:' + SOFT + ';color:var(--second)' : 'color:color-mix(in srgb, var(--second) 72%, var(--ground))') + '">' + ic(I[n[0]] || n[0], 17) + '<span style="flex:1">' + n[1] + '</span>' + (n[2] ? '<i style="width:5px;height:5px;border-radius:50%;background:var(--second)"></i>' : '') + (n[3] ? ic('<path d="M9 6l6 6-6 6"/>', 12, 'opacity:.5') : '') + '</div>').join('') + '</div>' +
    '<div class="pc" style="left:10px;right:10px;bottom:76px;height:138px;border-radius:14px;background:' + BK + ';color:var(--ground);padding:14px 16px">' +
    '<div style="display:flex;justify-content:space-between;font-size:11px;font-weight:600;opacity:.75"><span>Credite</span><span style="font-size:10px;letter-spacing:.06em">PRO</span></div>' +
    '<div class="disp" style="margin-top:6px;font-size:26px;font-weight:800">4.177</div>' +
    '<div style="margin-top:8px;height:5px;border-radius:3px;background:color-mix(in srgb, var(--ground) 18%, transparent)"><i style="display:block;width:84%;height:5px;border-radius:3px;background:' + GN + '"></i></div>' +
    '<div style="margin-top:12px;height:32px;border-radius:9px;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--ground) 22%, transparent);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700">Upgrade plan</div></div>' +
    '<div class="pc" style="left:12px;right:12px;bottom:18px;height:46px;display:flex;align-items:center;gap:10px;border-top:1px solid ' + LN + ';padding-top:10px"><span style="width:34px;height:34px;border-radius:50%;background:' + BK + ';color:var(--ground);display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:800">RI</span><span style="display:flex;flex-direction:column;line-height:1.3"><span style="font-size:12.5px;font-weight:700">Robert Iordăchescu</span><span style="font-size:11px;font-weight:500;' + MU + '">Plan Pro</span></span></div></div>';
  w += '<div class="pc d-top" style="left:210px;top:54px;width:850px;height:56px;border-bottom:1px solid ' + LN + ';display:flex;align-items:center;padding:0 22px;gap:12px;background:var(--ground)">' +
    ic('<path d="M4 7h16M4 12h16M4 17h16"/>', 18, 'color:color-mix(in srgb, var(--second) 50%, var(--ground))') +
    '<div style="margin-left:60px;width:330px;height:36px;border-radius:10px;background:' + SOFT + ';display:flex;align-items:center;gap:9px;padding:0 12px;font-size:12.5px;font-weight:500;' + MU + '">' + ic(I.search, 15) + '<span style="flex:1">Caută produse, setări…</span><span style="font-size:11px;opacity:.7">⌘K</span></div>' +
    '<span style="margin-left:auto;height:34px;padding:0 12px;border-radius:10px;box-shadow:inset 0 0 0 1px ' + LN + ';display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600">' + ic(I.bolt, 14, 'color:#F59E0B') + 'Credite</span>' +
    '<span style="height:34px;padding:0 14px;border-radius:10px;background:' + BK + ';color:var(--ground);display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700">' + ic('<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>', 14) + 'Upgrade</span>' +
    ic(I.bell, 18, 'color:color-mix(in srgb, var(--second) 55%, var(--ground))') + '</div>';
  w += '<div class="pc d-bg" style="left:210px;top:110px;width:850px;height:750px;background:color-mix(in srgb, var(--second) 1.5%, var(--ground))"></div>';
  w += '<div class="pc d-hello" style="left:234px;top:130px;width:802px;height:48px"><div style="display:flex;align-items:center;gap:10px"><span class="disp" style="font-size:21px;font-weight:800">Bună ziua, Robert</span><span style="height:20px;padding:0 8px;border-radius:6px;background:' + SOFT + ';font-size:10px;font-weight:800;letter-spacing:.06em;display:flex;align-items:center;' + MU + '">PRO</span></div><div style="margin-top:4px;font-size:13px;font-weight:500;' + MU + '">Bine ai revenit</div>' +
    '<span class="d-new" style="position:absolute;right:0;top:2px;height:40px;padding:0 16px;border-radius:11px;background:' + BK + ';color:var(--ground);display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700">' + ic('<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>', 16) + 'Optimizează produse</span></div>';
  w += '<div class="pc d-k0" style="left:234px;top:194px;width:802px;height:112px;border-radius:16px;background:' + BK + ';color:var(--ground);padding:18px 20px;overflow:hidden">' +
    '<div style="font-size:14px;font-weight:800">Configurare cont</div><div style="margin-top:3px;font-size:12px;font-weight:600;opacity:.6">4 / 5</div>' +
    '<div class="pc" style="right:20px;top:14px;width:46px;height:46px"><svg viewBox="0 0 46 46" width="46" height="46" style="transform:rotate(-90deg)"><circle cx="23" cy="23" r="19" fill="none" stroke-width="4" style="stroke:color-mix(in srgb, var(--ground) 15%, transparent)"/><circle cx="23" cy="23" r="19" fill="none" stroke-width="4" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="20" style="stroke:' + GN + '"/></svg><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800">80%</span></div>' +
    '<div class="pc" style="left:20px;right:20px;bottom:16px;display:flex;gap:8px">' + PASI.map((st) => '<span style="flex:1;height:30px;border-radius:8px;background:color-mix(in srgb, var(--ground) 10%, transparent);display:flex;align-items:center;gap:7px;padding:0 10px;font-size:11px;font-weight:600;white-space:nowrap;' + (st[1] ? '' : 'opacity:.6') + '">' + (st[1] ? ic('<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>', 13, 'color:' + GN) : '<i style="width:11px;height:11px;border-radius:50%;box-shadow:inset 0 0 0 1.5px currentColor"></i>') + st[0] + '</span>').join('') + '</div></div>';
  w += '<div class="pc card d-k1" style="left:234px;top:320px;width:802px;height:64px;border-radius:14px;display:flex;align-items:center;gap:14px;padding:0 14px">' +
    '<span style="width:38px;height:38px;border-radius:10px;background:' + BK + ';color:var(--ground);display:flex;align-items:center;justify-content:center">' + ic('<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>', 17) + '</span>' +
    '<span style="display:flex;flex-direction:column;gap:3px"><span style="display:flex;align-items:center;gap:8px;font-size:10.5px;font-weight:800;letter-spacing:.06em;' + MU + '">AI INSIGHT<span style="height:18px;padding:0 7px;border-radius:5px;background:' + SOFT + ';font-size:10px;letter-spacing:0;font-weight:600;display:flex;align-items:center">1.248 produse</span></span><span style="font-size:12.5px;font-weight:500">312 produse au descrieri scurte. Optimizează-le pentru un scor SEO mai bun.</span></span>' +
    '<span style="margin-left:auto;height:34px;padding:0 14px;border-radius:10px;background:' + BK + ';color:var(--ground);display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;white-space:nowrap">Vezi produsele' + ic('<path d="M5 12h14M13 6l6 6-6 6"/>', 13) + '</span></div>';
  w += '<div class="pc d-k2" style="left:234px;top:398px;width:802px;height:112px;display:flex;gap:12px">' + CIFRE.map((st, k) => '<div class="card" style="flex:1;border-radius:14px;padding:14px 16px;position:relative"><span style="width:32px;height:32px;border-radius:9px;background:' + SOFT + ';display:flex;align-items:center;justify-content:center">' + ic(st[0], 15) + '</span>' + ic('<path d="M7 17L17 7M9 7h8v8"/>', 12, 'position:absolute;right:14px;top:14px;opacity:.4') +
    '<div class="disp d-kv" style="margin-top:10px;font-size:22px;font-weight:800;font-variant-numeric:tabular-nums">0</div><div style="margin-top:2px;font-size:11.5px;font-weight:500;' + MU + '">' + st[1] + '</div>' + (k === 3 ? '<i style="position:absolute;left:16px;right:16px;bottom:10px;height:4px;border-radius:2px;background:' + GN + '"></i>' : '') + '</div>').join('') + '</div>';
  const { line, area } = grafic();
  w += '<div class="pc card d-chart" style="left:234px;top:524px;width:514px;height:316px;border-radius:14px;padding:18px 20px">' +
    '<div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:14px;font-weight:800">Scor SEO mediu</span><span style="font-size:11.5px;font-weight:600;' + MU + '">Vezi toate →</span></div>' +
    '<div style="margin-top:4px;font-size:12px;font-weight:500;' + MU + '">Evoluție după optimizările AI · ultimele 30 de zile</div>' +
    '<svg class="pc" viewBox="0 0 470 190" width="470" height="200" style="left:22px;top:84px;overflow:visible" preserveAspectRatio="none">' + [0, 1, 2, 3].map((k) => '<path d="M0 ' + (k * 63) + 'H470" style="stroke:' + LN + ';stroke-width:1"/>').join('') +
    '<path class="d-area" d="' + area + '" style="fill:color-mix(in srgb, ' + GN + ' 12%, transparent)"/><path class="d-line" d="' + line + '" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" style="fill:none;stroke:' + BK + ';stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round"/></svg></div>';
  w += '<div class="pc card d-list" style="left:760px;top:524px;width:276px;height:316px;border-radius:14px;padding:18px 18px">' +
    '<div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:14px;font-weight:800">Distribuție SEO</span><span style="font-size:11.5px;font-weight:600;' + MU + '">Vezi ›</span></div>' +
    '<div style="margin-top:20px;display:flex;justify-content:center"><div style="position:relative;width:118px;height:118px"><svg viewBox="0 0 42 42" width="118" height="118" style="transform:rotate(-90deg)"><circle cx="21" cy="21" r="16" fill="none" stroke-width="5" style="stroke:' + SOFT + '"/>' +
    '<circle cx="21" cy="21" r="16" fill="none" stroke-width="5" pathLength="100" stroke-dasharray="72 100" style="stroke:' + GN + '"/><circle cx="21" cy="21" r="16" fill="none" stroke-width="5" pathLength="100" stroke-dasharray="0 72 21 100" style="stroke:#F59E0B"/><circle cx="21" cy="21" r="16" fill="none" stroke-width="5" pathLength="100" stroke-dasharray="0 93 7 100" style="stroke:#EF4444"/></svg>' +
    '<span class="disp" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800">86</span></div></div>' +
    [['Bun (80+)', GN, '899'], ['Mediu (50–79)', '#F59E0B', '262'], ['Slab (sub 50)', '#EF4444', '87']].map((r) => '<div style="margin-top:12px;display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600"><i style="width:8px;height:8px;border-radius:50%;background:' + r[1] + '"></i><span style="flex:1;' + MU + '">' + r[0] + '</span><span style="font-weight:800">' + r[2] + '</span></div>').join('') + '</div>';
  w += '<div class="pc card d-toast" style="left:716px;top:120px;width:320px;height:62px;display:flex;align-items:center;gap:12px;padding:0 16px;opacity:0;z-index:5"><span style="width:34px;height:34px;border-radius:50%;background:' + GN + ';color:var(--ground);display:flex;align-items:center;justify-content:center">' + ic(I.check, 18) + '</span><span style="display:flex;flex-direction:column;line-height:1.3"><span style="font-size:13.5px;font-weight:800">Optimizare finalizată</span><span style="font-size:12px;font-weight:500;' + MU + '">312 produse actualizate · SEO 86 → 94</span></span></div>';
  return w;
}

// locul fiecarui panou
const POZ = 'left:' + PANOU.x + 'px;top:' + PANOU.y + 'px;width:604px;height:672px';

// partile arhitecturii: cheie, iconita, nume, tehnologie, stanga, sus, latime
const AN: [string, string, string, string, number, number, number][] = [
  ['br', 'monitor', 'Browser', 'Next.js · React', 182, 74, 240],
  ['api', 'server', 'API', 'Laravel · PHP', 182, 204, 240],
  ['db', 'db', 'Bază de date', 'PostgreSQL', 24, 344, 176],
  ['ca', 'bolt', 'Cache', 'Redis', 214, 344, 176],
  ['q', 'queue', 'Coadă', 'Jobs în fundal', 404, 344, 176],
  ['no', 'bolt', 'Model AI', 'Generare texte', 404, 474, 176],
];

function arhitectura() {
  return '<div class="pc card r-arch" style="' + POZ + ';opacity:0;overflow:hidden">' +
    '<div class="pc" style="left:24px;right:24px;top:20px;display:flex;align-items:center;justify-content:space-between"><span class="disp" style="font-size:18px;font-weight:800">Arhitectură</span><span class="chip" style="font-family:var(--sans, system-ui, sans-serif)">POST /api/produse/optimizare</span></div>' +
    '<svg class="pc" viewBox="0 0 604 672" width="604" height="672" style="left:0;top:0">' + ['M302 138V204', 'M302 268C302 310 112 300 112 344', 'M302 268V344', 'M302 268C302 310 492 300 492 344', 'M492 408V474'].map((d) => '<path d="' + d + '" style="fill:none;stroke:color-mix(in srgb, var(--second) 18%, transparent);stroke-width:2;stroke-dasharray:5 5"/>').join('') +
    '<circle class="r-dot" cx="0" cy="0" r="8" style="fill:var(--main)"/><circle class="r-dot2" cx="0" cy="0" r="16" style="fill:color-mix(in srgb, var(--main) 25%, transparent)"/></svg>' +
    AN.map((a) => '<div class="node r-' + a[0] + '" style="left:' + a[4] + 'px;top:' + a[5] + 'px;width:' + a[6] + 'px;height:64px">' + nic(a[1]) + '<span style="display:flex;flex-direction:column;line-height:1.25"><span style="font-size:14px;font-weight:800">' + a[2] + '</span><span style="font-size:11.5px;font-weight:600;' + MU + '">' + a[3] + '</span></span></div>').join('') +
    '<div class="pc r-resp" style="left:152px;top:590px;width:300px;height:48px;border-radius:24px;background:var(--main);color:var(--ground);display:flex;align-items:center;justify-content:center;gap:10px;font-size:14px;font-weight:800">' + ic(I.check, 18) + '201 Creat · 84 ms</div></div>';
}

// venitul pe ultimele 12 luni si planurile: nume, pret, cate magazine, eticheta
const BARE = [38, 41, 44, 47, 52, 55, 58, 62, 66, 71, 76, 84];
const PLANURI = [
  ['Starter', '99 lei / lună · 500 credite', '142 de magazine', ''],
  ['Pro', '249 lei / lună · 2.000 credite', '198 de magazine', 'Cel mai ales'],
  ['Enterprise', '499 lei / lună · 5.000 credite', '56 de magazine', ''],
];

function abonamente() {
  return '<div class="pc card b-bill" style="' + POZ + ';opacity:0;overflow:hidden">' +
    '<div class="pc" style="left:24px;right:24px;top:20px;display:flex;align-items:center;justify-content:space-between"><span class="disp" style="font-size:18px;font-weight:800">Abonamente</span><span class="chip">Plăți recurente active</span></div>' +
    '<div class="pc" style="left:24px;top:64px;width:556px;height:250px;border-radius:14px;background:color-mix(in srgb, var(--ground) 96%, var(--second));padding:20px">' +
    '<div style="font-size:12.5px;font-weight:600;' + MU + '">Venit lunar recurent (MRR)</div>' +
    '<div style="margin-top:6px;display:flex;align-items:center;gap:12px"><span class="disp b-mrr" style="font-size:34px;font-weight:800;font-variant-numeric:tabular-nums">0 lei</span><span class="chip">+18% față de luna trecută</span></div>' +
    '<div class="pc" style="left:20px;right:20px;bottom:18px;height:120px;display:flex;align-items:flex-end;gap:10px">' + BARE.map((v, k) => '<i class="b-bar" style="flex:1;height:' + (v * 1.35).toFixed(0) + 'px;border-radius:5px 5px 2px 2px;transform-origin:50% 100%;background:' + (k === 11 ? 'var(--main)' : 'color-mix(in srgb, var(--main) 35%, var(--ground))') + '"></i>').join('') + '</div></div>' +
    PLANURI.map((p, k) => '<div class="pc b-plan" style="left:24px;top:' + (330 + k * 76) + 'px;width:556px;height:64px;border-radius:12px;box-shadow:inset 0 0 0 ' + (p[3] ? '2px var(--main)' : '1px ' + LN) + ';display:flex;align-items:center;padding:0 18px;gap:12px"><span style="display:flex;flex-direction:column;line-height:1.3"><span style="font-size:15px;font-weight:800">' + p[0] + '</span><span style="font-size:12px;font-weight:600;' + MU + '">' + p[1] + '</span></span>' + (p[3] ? '<span class="chip">' + p[3] + '</span>' : '') + '<span style="margin-left:auto;font-size:13px;font-weight:700">' + p[2] + '</span></div>').join('') +
    '<div class="pc b-pay" style="left:24px;top:570px;width:556px;height:76px;border-radius:12px;background:var(--accent);display:flex;align-items:center;gap:14px;padding:0 18px">' + nic('card') + '<span style="display:flex;flex-direction:column;line-height:1.35"><span style="font-size:14px;font-weight:800">Card •••• 4821 · plată recurentă</span><span style="font-size:12px;font-weight:600;' + MU + '">Următoarea plată: 1 noiembrie · factură emisă automat</span></span><span class="b-ok" style="margin-left:auto;width:32px;height:32px;border-radius:50%;background:var(--main);color:var(--ground);display:flex;align-items:center;justify-content:center">' + ic(I.check, 17) + '</span></div></div>';
}

// traficul pe ultima ora, cu varful de la final
function trafic() {
  const TR = [10, 11, 10, 12, 11, 13, 12, 14, 13, 18, 26, 38, 46, 48, 47, 45, 44, 46];
  let line = '';
  TR.forEach((v, k) => {
    line += (k ? 'L' : 'M') + (k * 508 / 17).toFixed(1) + ' ' + (130 - v * 2.4).toFixed(1);
  });
  return { line, area: line + 'L508 130L0 130Z' };
}

function scalare() {
  const TILES = [['Uptime', 'c-v0'], ['Timp de răspuns', 'c-v1'], ['Utilizatori activi', 'c-v2']];
  const { line, area } = trafic();
  return '<div class="pc card c-scale" style="' + POZ + ';opacity:0;overflow:hidden">' +
    '<div class="pc" style="left:24px;right:24px;top:20px;display:flex;align-items:center;justify-content:space-between"><span class="disp" style="font-size:18px;font-weight:800">Performanță și scalare</span><span class="chip">Toate sistemele funcționează</span></div>' +
    TILES.map((tt, k) => '<div class="pc c-t" style="left:' + (24 + k * 190) + 'px;top:64px;width:176px;height:108px;border-radius:14px;background:color-mix(in srgb, var(--ground) 96%, var(--second));padding:16px 18px"><div style="font-size:12px;font-weight:600;' + MU + '">' + tt[0] + '</div><div class="disp ' + tt[1] + '" style="margin-top:10px;font-size:28px;font-weight:800;font-variant-numeric:tabular-nums">0</div></div>').join('') +
    '<div class="pc" style="left:24px;top:190px;width:556px;height:220px;border-radius:14px;box-shadow:inset 0 0 0 1px ' + LN + ';padding:18px 20px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;font-weight:800">Trafic · ultimele 60 de minute</span><span class="chip c-peak">Vârf de trafic ×4</span></div>' +
    '<svg class="pc" viewBox="0 0 508 130" width="508" height="140" style="left:24px;top:62px;overflow:visible" preserveAspectRatio="none"><path d="' + area + '" class="c-area" style="fill:color-mix(in srgb, var(--main) 14%, transparent)"/><path class="c-line" d="' + line + '" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" style="fill:none;stroke:var(--main);stroke-width:3;stroke-linejoin:round"/></svg></div>' +
    '<div class="pc" style="left:24px;top:428px;width:556px;height:220px;border-radius:14px;box-shadow:inset 0 0 0 1px ' + LN + ';padding:18px 20px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:14px;font-weight:800">Instanțe server</span><span class="chip">Scalare automată</span></div>' +
    '<div class="pc" style="left:20px;right:20px;top:64px;display:flex;gap:12px">' + [0, 1, 2, 3, 4, 5].map((k) => '<div class="c-sv" style="flex:1;height:86px;border-radius:12px;background:' + (k < 2 ? 'var(--accent)' : 'color-mix(in srgb, var(--main) 18%, var(--ground))') + ';color:var(--main);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:11px;font-weight:800">' + ic(I.server, 26) + 'Nod ' + (k + 1) + '</div>').join('') + '</div>' +
    '<div class="pc c-cnt" style="left:20px;bottom:18px;font-size:13px;font-weight:700"></div></div></div>';
}

const CURSOR =
  '<div class="pc u-cur" style="left:0;top:0;width:30px;height:30px;opacity:0"><i class="u-click" style="position:absolute;left:-14px;top:-14px;width:28px;height:28px;border-radius:50%;border:2px solid var(--main);opacity:0"></i><svg viewBox="0 0 24 24" width="30" height="30" style="position:absolute;left:0;top:0;filter:drop-shadow(0 2px 3px rgba(0,0,0,.3))"><path d="M4 2l15 11-6.5 1.2L16 21l-3 1.4-3.6-6.8L4 20z" style="fill:var(--second);stroke:var(--ground);stroke-width:1.5;stroke-linejoin:round"/></svg></div>';

// partile dashboard-ului, care apar dupa conectare
const DASH = ['side', 'top', 'bg', 'hello', 'k0', 'k1', 'k2', 'chart', 'list'] as const;

function construieste(box: HTMLElement) {
  const root = h(
    '<div class="cam">' +
      '<div class="win u-win">' +
        '<div class="bar"><i class="dot"></i><i class="dot"></i><i class="dot"></i><div class="url"><span class="u-url"></span><span class="u-caret" style="color:var(--main)">|</span></div></div>' +
        login() +
        dashboard() +
      '</div>' +
      arhitectura() +
      abonamente() +
      scalare() +
      CURSOR +
    '</div>',
  );
  box.append(root);
  const urlEl = gaseste(root, 'u-url');
  urlEl.textContent = ADRESA;
  return {
    cam: root.style,
    urlEl,
    u: stiluri(root, 'u-', ['win', 'caret', 'cur', 'click'] as const),
    l: stiluri(root, 'l-', ['card', 'btn'] as const),
    d: stiluri(root, 'd-', [...DASH, 'new', 'area', 'line', 'toast'] as const),
    r: stiluri(root, 'r-', ['arch', 'br', 'api', 'db', 'ca', 'q', 'no', 'resp'] as const),
    b: stiluri(root, 'b-', ['bill', 'pay', 'ok'] as const),
    c: stiluri(root, 'c-', ['scale', 'area', 'line', 'peak'] as const),
    emEl: gaseste(root, 'l-em-t'),
    pwEl: gaseste(root, 'l-pw-t'),
    kv: Array.from(root.querySelectorAll('.d-kv')),
    dots: [gaseste(root, 'r-dot'), gaseste(root, 'r-dot2')],
    mrr: gaseste(root, 'b-mrr'),
    bars: toate(root, 'b-bar'),
    plans: toate(root, 'b-plan'),
    cv: [0, 1, 2].map((i) => gaseste(root, 'c-v' + i)),
    svs: toate(root, 'c-sv'),
    cnt: gaseste(root, 'c-cnt'),
  };
}

type Interfata = ReturnType<typeof construieste>;

/* ─── Miscari ─── */

// ft: timpul de la inceputul animatiei; k: 0 pe fereastra, 1 cu panourile
function camera(q: Interfata, ft: number, k: number) {
  const z = lerp(CAMERA.z0, CAMERA.z1, k) * (1 + 0.004 * ft);
  const cx = lerp(CAMERA.x0, CAMERA.x1, k);
  const cy = lerp(540, CAMERA.y1, k);
  q.cam.transform = 'translate(' + (-z * (cx - 960)).toFixed(1) + 'px,' + (-z * (cy - 540)).toFixed(1) + 'px) scale(' + z.toFixed(4) + ')';
}

// numerele cu punct la mii
const fmt = (v: number) => Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const KV = [1248, 3560, 86, 4177];

// cifrele din dashboard cresc de la zero si se deseneaza graficul
function dash(q: Interfata, t: number, t0: number) {
  q.kv.forEach((e, i) => {
    const p = eo(seg(t, t0 + i * 0.1, t0 + 0.8 + i * 0.1));
    e.textContent = fmt(KV[i] * p) + (i === 2 ? '/100' : '');
  });
  const lp = eio(seg(t, t0 + 0.1, t0 + 1.0));
  q.d.line.strokeDashoffset = (1 - lp).toFixed(4);
  q.d.area.opacity = String(lp);
}

// dashboard-ul gata, dupa conectare
function dashGata(q: Interfata) {
  off(q.l.card);
  group(q.d, DASH, true);
  dash(q, 99, 0);
}

/* ─── Scenele ─── */

// fereastra apare, se scriu adresa, emailul si parola, iar dupa conectare se aseaza dashboard-ul
function sceneApp(box: HTMLElement, start: number) {
  const q = construieste(box);
  const adresa = typist(ADRESA, 0.2, 26);
  const email = typist(EMAIL, 0.6, 24);
  return (t: number) => {
    camera(q, start + t, 0);
    const p = seg(t, -0.45, 0.4);
    q.u.win.opacity = String(Math.min(1, p * 3));
    q.u.win.transform = 'translateY(' + (40 * (1 - eo(p))).toFixed(1) + 'px) scale(' + (0.9 + 0.1 * eob(p, 1.6)).toFixed(4) + ')';
    q.urlEl.textContent = adresa(t);
    q.u.caret.opacity = String(t < 0.85 ? (Math.floor(t / 0.53) % 2 ? 0.15 : 1) : 1 - seg(t, 0.85, 1.0));
    q.emEl.textContent = email(t);
    q.pwEl.textContent = '•'.repeat(Math.max(0, Math.min(12, Math.floor((t - 1.65) * 30))));
    const lo = eio(seg(t, 2.3, 2.6));
    q.l.card.opacity = String(1 - lo);
    q.l.card.transform = 'scale(' + (1 - 0.04 * lo).toFixed(4) + ')';
    q.l.btn.transform = 'scale(' + (1 - 0.04 * Math.sin(Math.PI * seg(t, 2.08, 2.28))).toFixed(4) + ')';
    q.d.bg.opacity = String(eo(seg(t, 2.35, 2.7)));
    q.d.bg.transform = 'none';
    fly(q.d.side, t, 2.35, 0.5, -80, 0);
    fly(q.d.top, t, 2.45, 0.45, 0, -30);
    fly(q.d.hello, t, 2.55, 0.42, -40, 0);
    fly(q.d.k0, t, 2.65, 0.45, 0, 40);
    ring(q.d.k0, t, 3.1);
    fly(q.d.k1, t, 2.75, 0.45, 0, 40);
    fly(q.d.k2, t, 2.85, 0.45, 0, 40);
    fly(q.d.chart, t, 2.95, 0.5, 0, 50);
    fly(q.d.list, t, 3.05, 0.48, 60, 0);
    dash(q, t, 3.0);
  };
}

// drumul cererii prin arhitectura: de cand pana cand, de unde si pana unde (in panou)
const DRUM: [number, number, number, number, number, number][] = [
  [1.0, 1.25, 302, 138, 302, 204],
  [1.3, 1.55, 302, 268, 112, 344],
  [1.58, 1.8, 112, 344, 302, 268],
  [1.85, 2.1, 302, 268, 492, 344],
  [2.12, 2.32, 492, 408, 492, 474],
  [2.35, 2.6, 302, 204, 302, 138],
];

// cand ajunge cererea la fiecare parte a arhitecturii
const OPRIRI = { br: [1.0, 2.6], api: [1.25, 1.8, 2.35], db: [1.55], ca: [1.38], q: [2.1], no: [2.32] };
const UMBRA = '0 0 0 1.5px color-mix(in srgb, var(--second) 12%, transparent), 0 10px 24px -14px rgba(0,0,0,.2)';

// un clic pe „Optimizează produse”: cererea trece prin arhitectura aplicatiei si vine raspunsul
function sceneArhitectura(box: HTMLElement, start: number) {
  const q = construieste(box);
  return (t: number) => {
    camera(q, start + t, eio(seg(t, 0, 0.8)));
    on(q.u.win);
    q.u.caret.opacity = '0';
    dashGata(q);
    fly(q.r.arch, t, 0.35, 0.5, 420, 0);
    const cp = eio(seg(t, 0.3, 0.85));
    q.u.cur.opacity = String(Math.min(1, seg(t, 0.15, 0.35) * 3) * (1 - seg(t, 1.6, 1.9)));
    const cx = lerp(1000, 1141, cp);
    const cy = lerp(660, 302, cp) - 60 * Math.sin(Math.PI * cp);
    const apasa = Math.sin(Math.PI * seg(t, 0.88, 1.05));
    q.u.cur.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px) scale(' + (1 - 0.12 * apasa).toFixed(3) + ')';
    const rp = seg(t, 0.9, 1.25);
    q.u.click.opacity = String(rp > 0 && rp < 1 ? 1 - rp : 0);
    q.u.click.transform = 'scale(' + (0.6 + 1.4 * eo(rp)).toFixed(3) + ')';
    q.d.new.transform = 'scale(' + (1 - 0.05 * apasa).toFixed(4) + ')';
    let peDrum = false;
    for (const s of DRUM) {
      if (t >= s[0] && t <= s[1]) {
        const p = eio(seg(t, s[0], s[1]));
        const x = lerp(s[2], s[4], p).toFixed(1);
        const y = lerp(s[3], s[5], p).toFixed(1);
        for (const d of q.dots) {
          d.setAttribute('cx', x);
          d.setAttribute('cy', y);
        }
        peDrum = true;
      }
    }
    for (const d of q.dots) d.style.opacity = peDrum ? '1' : '0';
    for (const k of Object.keys(OPRIRI) as (keyof typeof OPRIRI)[]) {
      let a = 0;
      for (const t0 of OPRIRI[k]) {
        const p = seg(t, t0, t0 + 0.45);
        if (p > 0 && p < 1) a = Math.max(a, 1 - p);
      }
      q.r[k].boxShadow = a > 0 ? 'inset 0 0 0 2px var(--main), 0 0 0 ' + (6 * a).toFixed(1) + 'px color-mix(in srgb, var(--main) ' + Math.round(30 * a) + '%, transparent)' : UMBRA;
    }
    pop(q.r.resp, t, 2.6);
    fly(q.d.toast, t, 2.7, 0.45, 60, 0);
    ring(q.d.toast, t, 3.0);
  };
}

// arhitectura pleaca si vin abonamentele: venitul lunar creste, apar planurile si plata recurenta
function sceneAbonamente(box: HTMLElement, start: number) {
  const q = construieste(box);
  return (t: number) => {
    camera(q, start + t, 1);
    on(q.u.win);
    q.u.caret.opacity = '0';
    off(q.u.cur);
    dashGata(q);
    on(q.r.resp);
    out(q.r.arch, t, 0, 0.4, 360);
    const tp = seg(t, 0.9, 1.3);
    q.d.toast.opacity = String(1 - tp);
    q.d.toast.transform = 'translateY(' + (-12 * tp).toFixed(1) + 'px)';
    fly(q.b.bill, t, 0.3, 0.5, 420, 0);
    ring(q.b.bill, t, 0.8);
    q.mrr.textContent = fmt(lerp(71200, 84300, eo(seg(t, 0.7, 1.9)))) + ' lei';
    q.bars.forEach((s, k) => {
      const p = seg(t, 0.6 + k * 0.05, 1.05 + k * 0.05);
      s.transform = 'scaleY(' + Math.max(0.001, eob(p, 1.5)).toFixed(4) + ')';
    });
    q.plans.forEach((s, k) => fly(s, t, 1.2 + k * 0.12, 0.42, 0, 30));
    fly(q.b.pay, t, 1.7, 0.45, 0, 30);
    pop(q.b.ok, t, 2.15);
    ring(q.b.pay, t, 2.3);
  };
}

// cand porneste fiecare server in plus
const SERVERE = [0, 1, 2, 3].map((i) => 1.55 + i * 0.13);

// abonamentele pleaca si vine scalarea: la un varf de trafic pornesc singure inca patru servere
function sceneScalare(box: HTMLElement, start: number) {
  const q = construieste(box);
  // abonamentele pleaca asa cum au ramas; in original venitul sarea aici inapoi la „0 lei”
  q.mrr.textContent = fmt(84300) + ' lei';
  return (t: number) => {
    camera(q, start + t, 1);
    on(q.u.win);
    q.u.caret.opacity = '0';
    off(q.u.cur);
    off(q.d.toast);
    dashGata(q);
    on(q.b.ok);
    out(q.b.bill, t, 0, 0.4, 360);
    fly(q.c.scale, t, 0.3, 0.5, 420, 0);
    const p = eo(seg(t, 0.7, 1.6));
    q.cv[0].textContent = (99 + 0.98 * p).toFixed(2).replace('.', ',') + '%';
    q.cv[1].textContent = Math.round(120 * p) + ' ms';
    q.cv[2].textContent = fmt(12480 * p);
    const lp = eio(seg(t, 0.8, 1.9));
    q.c.line.strokeDashoffset = (1 - lp).toFixed(4);
    q.c.area.opacity = String(lp);
    pop(q.c.peak, t, 1.75);
    q.svs.forEach((s, k) => {
      if (k < 2) on(s);
      else pop(s, t, SERVERE[k - 2]);
    });
    const n = 2 + SERVERE.filter((t0) => t >= t0).length;
    q.cnt.textContent = n + ' instanțe active' + (n === 6 ? ' · trafic distribuit automat' : '');
  };
}

const SCENE = [
  { dur: 4, creeaza: sceneApp },
  { dur: 3.5, creeaza: sceneArhitectura },
  { dur: 3, creeaza: sceneAbonamente },
  { dur: 3, creeaza: sceneScalare },
];

// porneste animatia in casuta (vezi pornesteFilmul)
export const porneste = (cutie: HTMLElement, scena: HTMLElement) => pornesteFilmul(cutie, scena, { scene: SCENE, vedere: VEDERE });
