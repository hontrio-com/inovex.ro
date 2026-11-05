/* Animatia din casuta „Website-uri de prezentare”, facuta de proprietar cu Claude
   (inovex-website-prezentare.html, 2026-10-18) si mutata aici aproape neschimbata. Casuta e mai
   ingusta decat ecranul de 16:9 pentru care a fost facuta, asa ca editorul, scorurile, cautarea si
   asistentul AI vin peste partea dreapta a ferestrei, nu langa ea, iar camera se departeaza mai
   putin. Imaginile sunt fisiere separate, nu incluse in cod.

   Site-ul unui birou de arhitectura (Arcadia, cu date de exemplu) se construieste de la zero:
   schita, designul si codul, apoi scorurile PageSpeed si locul intai in Google, iar la final un
   asistent AI il recomanda. Redarea si uneltele comune sunt in film.ts. */

import {
  ei,
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
  type Stil,
} from './film';

const DIR = '/imagini/servicii/acasa/animatie-prezentare';

// unde incep panourile din dreapta (in original la 1286, langa fereastra): peste jumatatea din dreapta
// a ferestrei (200-1260), iesind putin din ea; asa textul de deasupra siglelor AI ramane pe alb, in
// fereastra, nu taiat de marginea ei
const PANOU = 770;

// camera: apropiata pe fereastra pana la cod, ca in original, apoi se departeaza putin si se muta la
// dreapta, cat sa intre si panourile (in original se departa pana la 0.95, cu centrul la 1000)
const CAMERA = { z0: 1.12, x0: 730, z1: 0.98, x1: 787 };

// ce parte din scena se vede in casuta: fereastra asa cum o arata camera la inceput, cu loc pe
// margini pentru apropierea lenta a camerei
const VEDERE = { x: 282, y: 23, w: 1356, h: 1126 };

const ADRESA = 'arcadia-studio.ro';
const RASPUNS =
  'Îți recomand Arcadia Studio, un birou de arhitectură din Cluj-Napoca. Fac proiecte rezidențiale și comerciale, design interior și consultanță, totul gândit de la zero, și au recenzii foarte bune de la clienți.';

/* ─── Interfata ─── */

const ic = (d: string, w: number, st = '') =>
  '<svg viewBox="0 0 24 24" width="' + w + '" height="' + w + '" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="' + st + '">' + d + '</svg>';
const DISPLAY = 'font-family:var(--display, var(--sans, system-ui, sans-serif))';

// proiectele de sub site: stanga, latime, nume, an si imaginea
const TH: [number, number, string, string, number][] = [
  [40, 300, 'Casa Feleac', '2024 · Cluj', 1],
  [352, 157, 'Casa din pădure', '2023', 0],
  [521, 157, 'Casa Lumina', '2023', 2],
  [690, 157, 'Refugiul Beliș', '2022', 3],
  [859, 161, 'Casa Sălicea', '2021', 4],
];

function site() {
  const ARCH = '<path d="M5 21V11a7 7 0 0 1 14 0v10"/><path d="M9.5 21v-6a2.5 2.5 0 0 1 5 0v6"/><path d="M3 21h18"/>';
  const W = 'color:var(--ground)';
  const sl = '<span style="opacity:.45">/</span>';
  const arrowC = (d: string) =>
    '<span style="width:26px;height:26px;border-radius:50%;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--ground) 60%, transparent);display:flex;align-items:center;justify-content:center">' + ic(d, 13) + '</span>';
  const glass = 'background:color-mix(in srgb, var(--ground) 14%, transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--ground) 28%, transparent)';
  const STEPS = [
    ['Analizăm terenul', 'Vizităm locul, studiem orientarea și reglementările, ca să știi exact ce poți construi.'],
    ['Proiectăm de la zero', 'Schițe, randări și planuri tehnice, ajustate împreună cu tine până la ultimul detaliu.'],
    ['Construim împreună', 'Coordonăm autorizațiile și echipele, iar tu primești cheile unei case gata de locuit.'],
  ];

  let s = '<div class="pc s-hero" style="left:0;top:54px;width:1060px;height:390px;overflow:hidden;background:color-mix(in srgb, var(--second) 60%, var(--ground))"><img class="s-heroimg" alt="" src="' + DIR + '/hero.webp" style="position:absolute;left:0;top:0;width:1060px;height:390px;object-fit:cover;object-position:50% 60%"><div style="position:absolute;inset:0;background:linear-gradient(90deg, rgba(0,0,0,.55), rgba(0,0,0,.15) 62%, rgba(0,0,0,.3))"></div><div style="position:absolute;left:0;right:0;top:0;height:110px;background:linear-gradient(180deg, rgba(0,0,0,.35), transparent)"></div></div>';
  s += '<div class="pc s-nav" style="left:40px;top:72px;width:980px;height:44px;' + W + '">' +
    '<div class="pc" style="left:0;top:9px;display:flex;align-items:center;gap:10px">' + ic(ARCH, 24) + '<span style="font-size:15px;font-weight:800;letter-spacing:.16em">ARCADIA</span></div>' +
    '<div class="pc" style="left:50%;top:0;transform:translateX(-50%);height:44px;padding:0 6px;border-radius:22px;display:flex;align-items:center;gap:2px;font-size:13px;font-weight:600;' + glass + '">' +
    '<span style="height:32px;padding:0 16px;border-radius:16px;background:var(--ground);color:var(--second);display:flex;align-items:center">Acasă</span>' +
    ['Proiecte', 'Servicii', 'Despre', 'Contact'].map((w) => '<span style="height:32px;padding:0 15px;display:flex;align-items:center">' + w + '</span>').join('') + '</div>' +
    '<div class="pc" style="right:0;top:0;height:44px;display:flex;align-items:center;gap:16px">' +
    '<span style="height:44px;padding:0 20px;border-radius:22px;background:var(--ground);color:var(--second);display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700">Programează o vizită' + ic('<path d="M7 17L17 7M9 7h8v8"/>', 14) + '</span></div></div>';
  s += '<div class="pc s-h1" style="left:40px;top:166px;width:480px;' + DISPLAY + ';font-size:60px;font-weight:400;line-height:1.02;letter-spacing:-0.035em;' + W + '">Spații gândite pentru tine</div>';
  s += '<div class="pc s-p" style="left:40px;top:312px;width:380px;font-size:13.5px;font-weight:500;line-height:1.55;opacity:.88;' + W + '">Case și birouri proiectate de la zero, cu materiale alese atent și grijă pentru fiecare detaliu.</div>';
  s += '<div class="pc s-btn" style="left:40px;top:380px;height:38px;padding:0 20px;border-radius:19px;background:var(--ground);color:var(--second);font-size:13px;font-weight:700;display:flex;align-items:center;gap:8px">Află mai multe' + ic('<path d="M7 17L17 7M9 7h8v8"/>', 13) + '</div>';
  s += '<div class="pc s-slide" style="left:660px;top:330px;width:360px;' + W + '">' +
    '<div style="text-align:right;font-size:11.5px;font-weight:500;line-height:1.5;opacity:.85">Te ghidăm de la primul teren vizitat până la cheile casei, cu un singur partener.</div>' +
    '<div style="margin-top:20px;display:flex;align-items:center;gap:12px">' + arrowC('<path d="M15 5l-7 7 7 7"/>') + '<span style="flex:1;height:1px;background:color-mix(in srgb, var(--ground) 40%, transparent);position:relative"><i class="s-prog" style="position:absolute;left:0;top:-1px;height:3px;width:45%;border-radius:2px;background:var(--ground)"></i></span>' + arrowC('<path d="M9 5l7 7-7 7"/>') + '</div></div>';
  s += '<div class="pc s-sbar" style="left:40px;top:466px;width:980px;height:46px;border-radius:23px;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--second) 14%, transparent);display:flex;align-items:center;gap:10px;padding:0 7px 0 18px">' + ic('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>', 16) +
    '<span class="mut" style="flex:1;font-size:13px;font-weight:500">Caută un proiect sau o locație</span><span class="mut" style="font-size:15px;padding:0 10px">×</span>' +
    '<span style="height:32px;padding:0 14px;border-radius:16px;background:var(--second);color:var(--ground);display:flex;align-items:center;gap:7px;font-size:12px;font-weight:700">' + ic('<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>', 14) + 'Filtrează</span></div>';
  s += '<div class="pc s-div" style="left:0;top:532px;width:1060px;height:104px;border-top:1px solid color-mix(in srgb, var(--second) 9%, transparent);border-bottom:1px solid color-mix(in srgb, var(--second) 9%, transparent)"></div>';
  STEPS.forEach((st, i) => {
    s += '<div class="pc s-c' + i + '" style="left:' + (40 + i * 340) + 'px;top:548px;width:300px">' +
      '<div class="mut" style="font-size:11px;font-weight:600">Nr.' + (i + 1) + '</div>' +
      '<div style="margin-top:7px;font-size:15px;font-weight:700">' + st[0] + '</div>' +
      '<div class="mut" style="margin-top:5px;font-size:12px;font-weight:500;line-height:1.5">' + st[1] + '</div></div>';
  });
  s += '<div class="pc s-proj" style="left:40px;top:654px;width:980px;height:60px">' +
    '<div class="pc" style="left:0;top:0;' + DISPLAY + ';font-size:54px;font-weight:400;letter-spacing:-0.035em;line-height:1">' + sl + 'Proiecte</div>' +
    '<div class="pc" style="left:532px;top:4px;width:448px">' +
    '<div style="display:flex;align-items:center;gap:10px"><span style="flex:1;height:1px;background:color-mix(in srgb, var(--second) 18%, transparent)"></span><span style="width:24px;height:24px;border-radius:50%;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--second) 20%, transparent);display:flex;align-items:center;justify-content:center">' + ic('<path d="M5 12h14M13 6l6 6-6 6"/>', 12) + '</span></div>' +
    '<div class="mut" style="margin-top:8px;font-size:12px;font-weight:500;line-height:1.5">Case moderne, birouri și renovări care pun lumina, materialele și oamenii pe primul loc.</div></div></div>';
  TH.forEach((th, i) => {
    s += '<div class="pc s-th' + i + '" style="left:' + th[0] + 'px;top:728px;width:' + th[1] + 'px">' +
      '<img alt="" src="' + DIR + '/proiect-' + th[4] + '.webp" style="display:block;width:' + th[1] + 'px;height:96px;object-fit:cover;border-radius:6px">' +
      '<div style="margin-top:8px;display:flex;justify-content:space-between;font-size:12px;font-weight:700;white-space:nowrap"><span>' + th[2] + '</span><span class="mut" style="font-weight:500">' + th[3] + '</span></div></div>';
  });
  return s;
}

// schita paginii: coloanele grilei si casete punctate in locul fiecarei parti
function schita() {
  let wf = '<div class="pc w-grid" style="left:40px;top:54px;width:980px;bottom:0">';
  for (let c = 0; c < 12; c++) wf += '<i class="w-col" style="position:absolute;top:0;bottom:0;left:' + (c * 83.33).toFixed(1) + 'px;width:63.3px;background:color-mix(in srgb, var(--main) 7%, transparent)"></i>';
  wf += '</div>';
  wf += '<div class="wf w-hero" style="left:14px;top:64px;width:1032px;height:372px"><svg viewBox="0 0 1032 372" width="1028" height="368" style="position:absolute;inset:0" preserveAspectRatio="none"><path d="M0 0L1032 372M1032 0L0 372" style="stroke:color-mix(in srgb, var(--main) 35%, var(--ground));stroke-width:2;stroke-dasharray:8 8"/></svg></div>';
  wf += '<div class="wf w-nav" style="left:30px;top:68px;width:1000px;height:52px;background:color-mix(in srgb, var(--ground) 80%, transparent)"><i class="wl" style="left:10px;top:18px;width:120px;height:14px"></i><i class="wl" style="left:340px;top:8px;width:320px;height:34px;border-radius:17px"></i><i class="wl" style="right:8px;top:8px;width:160px;height:34px;border-radius:17px"></i></div>';
  wf += '<div class="wf w-text" style="left:30px;top:158px;width:500px;height:272px;background:color-mix(in srgb, var(--ground) 80%, transparent)"><i class="wl" style="left:10px;top:12px;width:420px;height:50px"></i><i class="wl" style="left:10px;top:72px;width:300px;height:50px"></i><i class="wl" style="left:10px;top:158px;width:370px;height:10px"></i><i class="wl" style="left:10px;top:176px;width:300px;height:10px"></i><i class="wl" style="left:10px;top:224px;width:150px;height:36px;border-radius:18px"></i></div>';
  wf += '<div class="wf w-search" style="left:40px;top:466px;width:980px;height:46px;border-radius:23px"><i class="wl" style="right:7px;top:5px;width:100px;height:32px;border-radius:16px"></i></div>';
  [0, 1, 2].forEach((i) => {
    wf += '<div class="wf w-c' + i + '" style="left:' + (34 + i * 340) + 'px;top:542px;width:312px;height:86px"><i class="wl" style="left:8px;top:8px;width:36px;height:8px"></i><i class="wl" style="left:8px;top:26px;width:160px;height:13px"></i><i class="wl" style="left:8px;top:50px;width:280px;height:8px"></i><i class="wl" style="left:8px;top:66px;width:220px;height:8px"></i></div>';
  });
  wf += '<div class="wf w-proj" style="left:34px;top:648px;width:992px;height:70px"><i class="wl" style="left:8px;top:8px;width:290px;height:52px"></i><i class="wl" style="left:538px;top:16px;width:440px;height:3px"></i><i class="wl" style="left:538px;top:34px;width:380px;height:8px"></i><i class="wl" style="left:538px;top:50px;width:300px;height:8px"></i></div>';
  wf += '<div class="pc w-th" style="left:0;top:0;width:0;height:0">' + TH.map((th) => '<div class="wf" style="left:' + th[0] + 'px;top:728px;width:' + th[1] + 'px;height:96px"><svg viewBox="0 0 10 10" width="' + (th[1] - 4) + '" height="92" style="position:absolute;inset:0" preserveAspectRatio="none"><path d="M0 0L10 10M10 0L0 10" vector-effect="non-scaling-stroke" style="stroke:color-mix(in srgb, var(--main) 35%, var(--ground));stroke-width:2;stroke-dasharray:6 6"/></svg></div>').join('') + '</div>';
  return wf;
}

// culorile editorului, inchis la culoare
const D0 = 'var(--second)';
const D1 = 'color-mix(in srgb, var(--second) 93%, var(--ground))';
const TX = 'color-mix(in srgb, var(--ground) 84%, var(--second))';
const MU = 'color-mix(in srgb, var(--ground) 42%, var(--second))';
const BD = 'color-mix(in srgb, var(--ground) 9%, var(--second))';

// fisierele deschise in editor, cu liniile lor
const FILES: [string, string[]][] = [
  ['page.tsx', ["import Hero from '@/components/Hero'", "import Servicii from '@/components/Servicii'", '', 'export const metadata = {', "  title: 'Arcadia Studio – Cluj',", '}', '', 'export default function Page() {', '  return <><Hero /><Servicii /></>', '}']],
  ['Hero.jsx', ['export default function Hero() {', '  return (', '    <section className="hero">', '      <h1>Spații gândite pentru tine.</h1>', '      <a href="/proiecte">Vezi proiectele</a>', '    </section>', '  )', '}']],
  ['web.php', ['<?php', '', 'use App\\Http\\Controllers\\Proiecte;', '', "Route::get('/', fn () => view('acasa'));", "Route::resource('proiecte', Proiecte::class);", "Route::post('/contact', Contact::class);"]],
];

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const KW = /\b(import|from|export|default|function|return|const|use|class|title)\b/g;

// colorarea codului: cuvinte cheie, texte si etichete
function hl(line: string) {
  let out = '';
  const re = /('[^']*'|"[^"]*")|(<\/?[A-Za-z]+|\/?>)/g;
  let m: RegExpExecArray | null;
  let last = 0;
  while ((m = re.exec(line))) {
    out += esc(line.slice(last, m.index)).replace(KW, '<span class="kw">$1</span>');
    out += m[1] ? '<span class="st">' + esc(m[1]) + '</span>' : '<span class="tg">' + esc(m[2]) + '</span>';
    last = m.index + m[0].length;
  }
  return out + esc(line.slice(last)).replace(KW, '<span class="kw">$1</span>');
}

function editor() {
  const fic = (n: string) => {
    const ext = n.split('.').pop();
    const c = ext === 'php' ? 'color-mix(in srgb, var(--main) 45%, var(--ground))' : ext === 'tsx' ? 'var(--main)' : 'color-mix(in srgb, var(--main) 70%, var(--ground))';
    return '<span style="width:12px;height:12px;border-radius:3px;flex:none;background:' + c + ';display:inline-flex;align-items:center;justify-content:center;font-size:7px;font-weight:900;color:var(--second)">' + (ext === 'php' ? 'P' : ext === 'tsx' ? 'T' : 'J') + '</span>';
  };
  const fold = (o: boolean) =>
    '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><path d="' + (o ? 'M6 9l6 6 6-6' : 'M9 6l6 6-6 6') + '"/></svg>';
  const ACT = [
    '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M4 7v14h11"/>',
    '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/>',
    '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 8v8M18 10c0 4-6 3-11 7"/>',
    '<path d="M8 5l11 7-11 7z"/>',
    '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
  ];
  // nume, nivel, al catelea fisier deschis (-1: nu e deschis), dosar deschis sau inchis
  const TREE: [string, number, number, string?][] = [
    ['arcadia-studio', 0, -1, 'root'], ['app', 1, -1, 'open'], ['layout.tsx', 2, -1], ['page.tsx', 2, 0], ['components', 1, -1, 'open'], ['Hero.jsx', 2, 1], ['Servicii.jsx', 2, -1],
    ['routes', 1, -1, 'open'], ['web.php', 2, 2], ['database', 1, -1, 'closed'], ['public', 1, -1, 'closed'], ['package.json', 1, -1], ['composer.json', 1, -1],
  ];
  const TERM = ['$ npm run build', '✓ Compilat cu succes în 0,8 s', '$ php artisan migrate', '✓ Baza de date e pregătită'];

  let ed = '<div class="pc e-ed" style="left:' + PANOU + 'px;top:186px;width:604px;height:664px;overflow:hidden;opacity:0;border-radius:14px;background:' + D1 + ';box-shadow:0 30px 70px -20px rgba(0,0,0,.5), 0 0 0 1px ' + BD + ';color:' + TX + ';font-size:12px">' +
    '<div class="pc" style="left:0;top:0;right:0;height:34px;background:' + D0 + ';display:flex;align-items:center;padding:0 14px;gap:7px;border-bottom:1px solid ' + BD + '">' + [0, 1, 2].map(() => '<i style="width:11px;height:11px;border-radius:50%;background:' + MU + ';opacity:.6"></i>').join('') +
    '<span style="position:absolute;left:0;right:0;text-align:center;font-size:12px;font-weight:600;color:' + MU + '">arcadia-studio</span></div>' +
    '<div class="pc" style="left:0;top:34px;width:46px;bottom:24px;background:' + D0 + ';display:flex;flex-direction:column;align-items:center;gap:18px;padding-top:14px;border-right:1px solid ' + BD + '">' +
    ACT.map((d, k) => '<span style="position:relative;width:46px;display:flex;justify-content:center;color:' + (k ? MU : TX) + '">' + (k ? '' : '<i style="position:absolute;left:0;top:-4px;bottom:-4px;width:2px;background:var(--main)"></i>') + ic(d, 21) + '</span>').join('') + '</div>';
  ed += '<div class="pc" style="left:46px;top:34px;width:170px;bottom:24px;background:' + D0 + ';border-right:1px solid ' + BD + '">' +
    '<div style="height:32px;line-height:32px;padding-left:14px;font-size:10.5px;font-weight:700;letter-spacing:.08em;color:' + MU + '">FIȘIERE</div>' +
    TREE.map((r) => '<div class="' + (r[2] >= 0 ? 'e-tr' + r[2] : '') + '" style="height:23px;display:flex;align-items:center;gap:6px;padding-left:' + (8 + r[1] * 12) + 'px;font-size:12px;font-weight:' + (r[3] === 'root' ? 800 : 500) + ';white-space:nowrap">' + (r[3] ? fold(r[3] !== 'closed') : '<span style="width:12px"></span>' + fic(r[0])) + r[0] + '</div>').join('') + '</div>';
  ed += '<div class="pc" style="left:216px;top:34px;right:0;height:34px;background:' + D0 + ';display:flex">' +
    FILES.map((f, i) => '<span class="e-tab' + i + '" style="position:relative;height:34px;display:flex;align-items:center;gap:7px;padding:0 14px;border-right:1px solid ' + BD + ';font-size:12px;font-weight:600;white-space:nowrap"><i class="e-tl" style="position:absolute;left:0;right:0;top:0;height:2px;background:var(--main)"></i>' + fic(f[0]) + f[0] + '<span style="opacity:.5;margin-left:4px">×</span></span>').join('') + '</div>';
  ed += '<div class="pc e-crumb" style="left:216px;top:68px;right:0;height:24px;display:flex;align-items:center;padding-left:16px;font-size:11px;color:' + MU + '"></div>';
  ed += '<div class="pc e-hl" style="left:216px;right:44px;top:96px;height:22px;background:color-mix(in srgb, var(--ground) 6%, transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--ground) 8%, transparent)"></div>';
  FILES.forEach((f, i) => {
    ed += '<div class="pc code e-code' + i + '" style="left:216px;top:96px;right:44px;overflow:hidden;color:' + TX + '">' +
      f[1].map((l, n) => '<div style="display:flex;height:22px"><span style="width:40px;text-align:right;padding-right:16px;flex:none;color:' + MU + '">' + (n + 1) + '</span><span class="e-l" style="display:inline-block">' + (l ? hl(l) : ' ') + '</span></div>').join('') + '</div>';
    ed += '<div class="pc e-mini' + i + '" style="right:6px;top:96px;width:32px">' + f[1].map((l) => '<i style="display:block;height:2px;margin-bottom:2px;width:' + Math.min(30, l.length * 0.6).toFixed(1) + 'px;margin-left:' + Math.min(10, (l.length - l.trimStart().length) * 0.6).toFixed(1) + 'px;background:' + MU + ';opacity:.7"></i>').join('') + '</div>';
  });
  ed += '<div class="pc e-term" style="left:216px;right:0;bottom:24px;height:156px;background:' + D0 + ';border-top:1px solid ' + BD + ';padding:0 18px">' +
    '<div style="display:flex;gap:18px;height:32px;align-items:center;font-size:10.5px;font-weight:700;letter-spacing:.06em;color:' + MU + '"><span style="color:' + TX + ';box-shadow:inset 0 -1.5px 0 var(--main);height:32px;display:flex;align-items:center">TERMINAL</span><span>PROBLEME</span><span>IEȘIRE</span></div>' +
    TERM.map((l, i) => '<div class="code e-t" style="' + (i % 2 ? 'color:color-mix(in srgb, var(--main) 70%, var(--ground));font-weight:700' : 'color:' + TX) + '">' + esc(l) + '</div>').join('') + '</div>';
  ed += '<div class="pc" style="left:0;right:0;bottom:0;height:24px;background:var(--main);color:var(--ground);display:flex;align-items:center;gap:16px;padding:0 12px;font-size:11px;font-weight:600">' +
    '<span style="display:flex;align-items:center;gap:5px">' + ic('<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 8v8M18 10c0 4-6 3-11 7"/>', 12) + 'main</span><span>✓ 0 erori</span><span style="margin-left:auto" class="e-pos">Ln 1, Col 1</span><span>UTF-8</span><span class="e-lang">TypeScript JSX</span></div></div>';
  return ed;
}

// scorurile PageSpeed ale site-ului
const RINGS: [string, number][] = [['Performanță', 100], ['Accesibilitate', 98], ['Cele mai bune practici', 100], ['SEO', 100]];

function scor() {
  const GR = '#0C9F5E';
  const GRB = 'color-mix(in srgb, #0C9F5E 12%, var(--ground))';
  const MET = [['First Contentful Paint', '0,6 s'], ['Largest Contentful Paint', '0,9 s'], ['Total Blocking Time', '0 ms'], ['Cumulative Layout Shift', '0']];
  return '<div class="pc card s-score" style="left:' + PANOU + 'px;top:176px;width:604px;height:306px;opacity:0;overflow:hidden">' +
    '<div class="pc" style="left:0;right:0;top:0;height:40px;display:flex;align-items:center;padding:0 20px;gap:10px;border-bottom:1px solid color-mix(in srgb, var(--second) 8%, transparent)">' + ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>', 14, 'color:color-mix(in srgb, var(--second) 50%, var(--ground))') +
    '<span class="mut" style="font-size:12px;font-weight:600">https://arcadia-studio.ro/</span>' +
    '<span style="margin-left:auto;display:flex;border-radius:7px;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--second) 14%, transparent);font-size:11px;font-weight:700;overflow:hidden"><span class="mut" style="padding:4px 10px">Mobil</span><span style="padding:4px 10px;background:color-mix(in srgb, var(--second) 7%, var(--ground))">Desktop</span></span></div>' +
    RINGS.map((r, i) => '<div class="pc" style="left:' + (20 + i * 141) + 'px;top:54px;width:141px;display:flex;flex-direction:column;align-items:center;gap:10px">' +
      '<div style="position:relative;width:78px;height:78px"><svg viewBox="0 0 78 78" width="78" height="78" style="position:absolute;inset:0;transform:rotate(-90deg)"><circle cx="39" cy="39" r="35" style="fill:' + GRB + '"/><circle class="s-ring" cx="39" cy="39" r="35" fill="none" stroke-width="6" stroke-linecap="butt" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" style="stroke:' + GR + '"/></svg>' +
      '<div class="s-num" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:600;color:' + GR + ';font-variant-numeric:tabular-nums">0</div></div>' +
      '<div style="font-size:12.5px;font-weight:600;text-align:center;line-height:1.25;width:110px">' + r[0] + '</div></div>').join('') +
    '<div class="pc" style="left:20px;right:20px;top:190px;height:26px;display:flex;justify-content:center;gap:22px;align-items:center;font-size:11px;font-weight:600;border-top:1px solid color-mix(in srgb, var(--second) 8%, transparent);padding-top:6px">' +
    '<span style="display:flex;align-items:center;gap:6px"><i style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:9px solid #E5484D"></i>0–49</span>' +
    '<span style="display:flex;align-items:center;gap:6px"><i style="width:9px;height:9px;background:#E8920C"></i>50–89</span>' +
    '<span style="display:flex;align-items:center;gap:6px"><i style="width:9px;height:9px;border-radius:50%;background:' + GR + '"></i>90–100</span></div>' +
    MET.map((m, i) =>
      '<div class="pc s-met" style="left:' + (20 + (i % 2) * 282) + 'px;top:' + (226 + Math.floor(i / 2) * 38) + 'px;width:262px;height:34px;border-top:1px solid color-mix(in srgb, var(--second) 8%, transparent);display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600"><i style="width:8px;height:8px;border-radius:50%;background:' + GR + ';flex:none"></i><span class="mut" style="flex:1">' + m[0] + '</span><span style="font-size:16px;font-weight:700;color:' + GR + '">' + m[1] + '</span></div>').join('') + '</div>';
}

// cautarea in Google, cu date de exemplu
function cautare() {
  const LINK = 'color-mix(in srgb, var(--main) 75%, var(--second))';
  const RES = [
    ['A', 'Atelier Demo Arhitecți', 'https://atelier-demo.ro › proiectare', 'Atelier Demo – Birou de arhitectură', 'Proiectare clădiri rezidențiale și industriale în toată țara.', ''],
    ['B', 'Birou Exemplu', 'https://birou-exemplu.ro', 'Birou Exemplu – Proiectare și execuție', 'Servicii complete de proiectare și execuție în Transilvania.', ''],
    ['A', 'Arcadia Studio', 'https://arcadia-studio.ro › proiecte', 'Arcadia Studio – Arhitectură și design interior în Cluj', 'Case și birouri gândite de la zero, în Cluj-Napoca.', '1'],
  ];
  return '<div class="pc card s-search" style="left:' + PANOU + 'px;top:496px;width:604px;height:366px;opacity:0;overflow:hidden">' +
    '<div class="pc" style="left:20px;right:20px;top:16px;height:42px;border-radius:21px;box-shadow:0 1px 6px rgba(0,0,0,.14);display:flex;align-items:center;gap:12px;padding:0 16px 0 20px;font-size:14px;font-weight:500"><span style="flex:1">arhitect cluj</span>' +
    '<span class="mut" style="font-size:16px">×</span><i style="width:1px;height:22px;background:color-mix(in srgb, var(--second) 14%, transparent)"></i>' + ic('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>', 17, 'color:var(--main)') + ic('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>', 17, 'color:var(--main)') + '</div>' +
    '<div class="pc" style="left:24px;right:20px;top:66px;height:30px;display:flex;gap:20px;font-size:12.5px;font-weight:600;border-bottom:1px solid color-mix(in srgb, var(--second) 9%, transparent)">' +
    ['Toate', 'Imagini', 'Hărți', 'Știri', 'Videoclipuri', 'Mai mult'].map((w, k) => '<span style="height:30px;display:flex;align-items:center;' + (k ? 'color:color-mix(in srgb, var(--second) 58%, var(--ground))' : 'box-shadow:inset 0 -3px 0 ' + LINK + ';color:' + LINK) + '">' + w + '</span>').join('') + '</div>' +
    '<div class="pc mut" style="left:24px;top:104px;font-size:11px;font-weight:500">Aproximativ 1.240.000 de rezultate (0,38 secunde)</div>' +
    RES.map((r, i) => '<div class="pc s-r' + i + '" style="left:12px;top:' + (124 + i * 76) + 'px;width:580px;height:74px;padding:6px 12px;border-radius:12px">' +
      '<div style="display:flex;align-items:center;gap:10px"><span style="width:26px;height:26px;border-radius:50%;box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--second) 12%, transparent);background:' + (r[5] ? 'var(--second)' : 'color-mix(in srgb, var(--ground) 94%, var(--second))') + ';color:' + (r[5] ? 'var(--ground)' : 'var(--second)') + ';display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800">' + r[0] + '</span>' +
      '<span style="display:flex;flex-direction:column;line-height:1.25"><span style="font-size:12.5px;font-weight:600">' + r[1] + '</span><span class="mut" style="font-size:11px;font-weight:500">' + r[2] + '</span></span></div>' +
      '<div style="margin-top:4px;font-size:16.5px;font-weight:500;color:' + LINK + ';white-space:nowrap">' + r[3] + '</div>' +
      (r[5] ? '<div class="s-top" style="margin-top:2px;display:flex;align-items:center;gap:6px;font-size:11.5px;font-weight:500;white-space:nowrap"><span style="color:#E8920C;letter-spacing:1px">★★★★★</span><span class="mut">Evaluare: 4,9 · 128 de recenzii</span></div>' : '<div class="mut" style="margin-top:2px;font-size:12px;font-weight:500;white-space:nowrap">' + r[4] + '</div>') + '</div>').join('') + '</div>';
}

// siglele asistentilor AI
const LOGOS: [string, string][] = [
  [
    'ChatGPT',
    '<svg width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" viewBox="-0.17090198558635983 0.482230148717937 41.14235318283891 40.0339509076386"><path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z" fill="#202125"/></svg>',
  ],
  [
    'Gemini',
    '<svg width="34" height="34" viewBox="0 0 28.01 28" xmlns="http://www.w3.org/2000/svg"><radialGradient id="gemA" cx="-576.08" cy="491.7" gradientTransform="matrix(28.2302 9.54441 76.4642 -226.16369 -21336.18 116711.38)" gradientUnits="userSpaceOnUse" r="1"><stop offset=".07" stop-color="#9168c0"/><stop offset=".34" stop-color="#5684d1"/><stop offset=".67" stop-color="#1ba1e3"/></radialGradient><path d="M14 28c0-1.94-.37-3.76-1.12-5.46-.72-1.7-1.72-3.19-2.98-4.45s-2.74-2.25-4.44-2.97C3.76 14.37 1.94 14 0 14c1.94 0 3.76-.36 5.46-1.09 1.7-.75 3.19-1.75 4.44-3.01 1.26-1.26 2.25-2.74 2.98-4.44C13.63 3.76 14 1.94 14 0c0 1.94.36 3.76 1.09 5.46.75 1.7 1.75 3.19 3.01 4.44 1.26 1.26 2.74 2.26 4.45 3.01 1.7.72 3.52 1.09 5.46 1.09-1.94 0-3.76.37-5.46 1.12-1.7.72-3.19 1.71-4.45 2.97s-2.26 2.74-3.01 4.45A13.86 13.86 0 0 0 14 28z" fill="url(#gemA)"/></svg>',
  ],
  [
    'Perplexity',
    '<svg width="34" height="34" fill="#202125" fill-rule="evenodd" viewBox="1.5 0 21 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z"/></svg>',
  ],
  [
    'Claude',
    '<svg width="34" height="34" fill="none" viewBox="0 -.01 39.5 39.53" xmlns="http://www.w3.org/2000/svg"><path d="m7.75 26.27 7.77-4.36.13-.38-.13-.21h-.38l-1.3-.08-4.44-.12-3.85-.16-3.73-.2-.94-.2-.88-1.16.09-.58.79-.53 1.13.1 2.5.17 3.75.26 2.72.16 4.03.42h.64l.09-.26-.22-.16-.17-.16-3.88-2.63-4.2-2.78-2.2-1.6-1.19-.81-.6-.76-.26-1.66 1.08-1.19 1.45.1.37.1 1.47 1.13 3.14 2.43 4.1 3.02.6.5.24-.17.03-.12-.27-.45-2.23-4.03-2.38-4.1-1.06-1.7-.28-1.02c-.1-.42-.17-.77-.17-1.2l1.23-1.67.68-.22 1.64.22.69.6 1.02 2.33 1.65 3.67 2.56 4.99.75 1.48.4 1.37.15.42h.26v-.24l.21-2.81.39-3.45.38-4.44.13-1.25.62-1.5 1.23-.81.96.46.79 1.13-.11.73-.47 3.05-.92 4.78-.6 3.2h.35l.4-.4 1.62-2.15 2.72-3.4 1.2-1.35 1.4-1.49.9-.71h1.7l1.25 1.86-.56 1.92-1.75 2.22-1.45 1.88-2.08 2.8-1.3 2.24.12.18.31-.03 4.7-1 2.54-.46 3.03-.52 1.37.64.15.65-.54 1.33-3.24.8-3.8.76-5.66 1.34-.07.05.08.1 2.55.24 1.09.06h2.67l4.97.37 1.3.86.78 1.05-.13.8-2 1.02-2.7-.64-6.3-1.5-2.16-.54h-.3v.18l1.8 1.76 3.3 2.98 4.13 3.84.21.95-.53.75-.56-.08-3.63-2.73-1.4-1.23-3.17-2.67h-.21v.28l.73 1.07 3.86 5.8.2 1.78-.28.58-1 .35-1.1-.2-2.26-3.17-2.33-3.57-1.88-3.2-.23.13-1.11 11.95-.52.61-1.2.46-1-.76-.53-1.23.53-2.43.64-3.17.52-2.52.47-3.13.28-1.04-.02-.07-.23.03-2.36 3.24-3.59 4.85-2.84 3.04-.68.27-1.18-.61.11-1.09.66-.97 3.93-5 2.37-3.1 1.53-1.79-.01-.26h-.09l-10.44 6.78-1.86.24-.8-.75.1-1.23.38-.4 3.14-2.16z" fill="#d97757"/></svg>',
  ],
];

// discutia cu asistentul AI si siglele asistentilor; `gem` e id-ul gradientului din sigla Gemini,
// altul in fiecare copie a interfetei
function asistent(gem: string) {
  const MU2 = 'color-mix(in srgb, var(--second) 55%, var(--ground))';
  const ib = (d: string, w = 17) =>
    '<span style="width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:' + MU2 + '">' + ic(d, w) + '</span>';
  let ai = '<div class="pc card a-chat" style="left:' + PANOU + 'px;top:176px;width:604px;height:470px;opacity:0;overflow:hidden">' +
    '<div class="pc" style="left:0;top:0;right:0;height:52px;display:flex;align-items:center;gap:8px;padding:0 14px">' + ib('<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M9 4.5v15"/>') +
    '<span style="display:flex;align-items:center;gap:6px;font-size:15.5px;font-weight:600;padding:6px 10px;border-radius:10px">Asistent AI' + ic('<path d="M6 9l6 6 6-6"/>', 14, 'color:' + MU2) + '</span>' +
    '<span style="margin-left:auto">' + ib('<path d="M12 4v11M7 9l5-5 5 5M5 14v5h14v-5"/>') + '</span><span style="width:30px;height:30px;border-radius:50%;background:var(--main);color:var(--ground);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800">AI</span></div>' +
    '<div class="pc a-q" style="right:28px;top:72px;max-width:380px;padding:11px 18px;border-radius:22px;background:color-mix(in srgb, var(--second) 6%, var(--ground));font-size:15px;font-weight:500;line-height:1.45">Ce birou de arhitectură îmi recomanzi în Cluj?</div>' +
    '<div class="pc a-av" style="left:52px;top:142px;display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:' + MU2 + '">' + ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>', 14) + 'Am căutat pe web · 4 surse' + ic('<path d="M9 6l6 6-6 6"/>', 13) + '</div>' +
    '<div class="pc a-ans" style="left:52px;top:172px;width:500px;font-size:15.5px;font-weight:500;line-height:1.62"></div>' +
    '<div class="pc a-src" style="left:52px;top:292px;display:flex;align-items:center;gap:7px;padding:4px 11px 4px 5px;border-radius:14px;background:color-mix(in srgb, var(--second) 6%, var(--ground));font-size:12px;font-weight:600"><span style="width:18px;height:18px;border-radius:50%;background:var(--second);color:var(--ground);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800">A</span>arcadia-studio.ro</div>' +
    '<div class="pc a-act" style="left:44px;top:328px;display:flex;gap:2px">' +
    ib('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>', 16) + ib('<path d="M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 3 2l-1 4h6a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7"/>', 16) +
    ib('<path d="M7 13V4H4v9zM7 13l4 7a2 2 0 0 0 3-2l-1-4h6a2 2 0 0 0 2-2.3l-1.2-6A2 2 0 0 0 17.8 4H7"/>', 16) + ib('<path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/>', 16) + '</div>' +
    '<div class="pc" style="left:24px;right:24px;bottom:18px;height:56px;border-radius:28px;background:var(--ground);box-shadow:0 0 0 1px color-mix(in srgb, var(--second) 10%, transparent), 0 6px 18px -8px rgba(0,0,0,.18);display:flex;align-items:center;gap:6px;padding:0 10px 0 10px;font-size:15px;font-weight:500">' +
    ib('<path d="M12 5v14M5 12h14"/>', 19) + '<span style="flex:1;color:' + MU2 + '">Întreabă orice</span>' + ib('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>', 18) +
    '<span style="width:38px;height:38px;border-radius:50%;background:var(--second);color:var(--ground);display:flex;align-items:center;justify-content:center">' + ic('<path d="M6 10v4M10 7v10M14 9v6M18 11v2"/>', 18) + '</span></div></div>';
  ai += '<div class="pc a-logos" style="left:' + PANOU + 'px;top:664px;width:604px;opacity:0">' +
    '<div class="mut" style="text-align:center;font-size:13px;font-weight:600;margin-bottom:14px">Site-ul tău, recomandat de asistenții AI</div>' +
    '<div style="display:flex;gap:14px">' + LOGOS.map((l) => '<div class="card a-lg" style="flex:1;height:104px;border-radius:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px">' + l[1].replace(/gemA/g, gem) + '<span style="font-size:13px;font-weight:700">' + l[0] + '</span></div>').join('') + '</div></div>';
  return ai;
}

const SITE = ['hero', 'nav', 'h1', 'p', 'btn', 'slide', 'sbar', 'div', 'c0', 'c1', 'c2', 'proj', 'th0', 'th1', 'th2', 'th3', 'th4'] as const;
const SCHITA = ['grid', 'hero', 'nav', 'text', 'search', 'c0', 'c1', 'c2', 'proj', 'th'] as const;

// cate copii ale interfetei s-au construit, pentru id-urile unice
let copii = 0;

function construieste(box: HTMLElement) {
  copii += 1;
  const root = h(
    '<div class="cam">' +
      '<div class="win u-win">' +
        '<div class="bar"><i class="dot"></i><i class="dot"></i><i class="dot"></i><div class="url"><span class="u-url"></span><span class="u-caret" style="color:var(--main)">|</span></div></div>' +
        schita() +
        site() +
      '</div>' +
      editor() +
      scor() +
      cautare() +
      asistent('gemini-' + copii) +
    '</div>',
  );
  box.append(root);
  const urlEl = gaseste(root, 'u-url');
  urlEl.textContent = ADRESA;
  return {
    cam: root.style,
    win: gaseste(root, 'u-win').style,
    caret: gaseste(root, 'u-caret').style,
    urlEl,
    s: stiluri(root, 's-', [...SITE, 'heroimg', 'prog', 'score', 'search', 'r0', 'r1', 'r2', 'top'] as const),
    w: stiluri(root, 'w-', SCHITA),
    e: stiluri(root, 'e-', ['ed', 'hl'] as const),
    a: stiluri(root, 'a-', ['chat', 'q', 'av', 'src', 'act', 'logos'] as const),
    cols: toate(root, 'w-col'),
    tabs: [0, 1, 2].map((i) => gaseste(root, 'e-tab' + i).style),
    tls: [0, 1, 2].map((i) => gaseste(root, 'e-tab' + i + ' .e-tl').style),
    trs: [0, 1, 2].map((i) => gaseste(root, 'e-tr' + i).style),
    codes: [0, 1, 2].map((i) => {
      const e = gaseste(root, 'e-code' + i);
      return { s: e.style, mini: gaseste(root, 'e-mini' + i).style, lines: toate(e, 'e-l') };
    }),
    crumb: gaseste(root, 'e-crumb'),
    pos: gaseste(root, 'e-pos'),
    lang: gaseste(root, 'e-lang'),
    terms: toate(root, 'e-t'),
    rings: toate(root, 's-ring'),
    nums: Array.from(root.querySelectorAll('.s-num')),
    mets: toate(root, 's-met'),
    ansEl: gaseste(root, 'a-ans'),
    lgs: toate(root, 'a-lg'),
  };
}

type Interfata = ReturnType<typeof construieste>;

/* ─── Miscari ─── */

// ft: timpul de la inceputul animatiei; k: 0 pe fereastra, 1 cu panourile
function camera(q: Interfata, ft: number, k: number) {
  const z = lerp(CAMERA.z0, CAMERA.z1, k) * (1 + 0.004 * ft);
  const cx = lerp(CAMERA.x0, CAMERA.x1, k);
  q.cam.transform = 'translate(' + (-z * (cx - 960)).toFixed(1) + 'px,0px) scale(' + z.toFixed(4) + ')';
}

// imaginea mare se apropie incet, iar bara de sub text inainteaza
function kb(q: Interfata, ft: number) {
  q.s.heroimg.transform = 'scale(' + (1.08 - 0.004 * ft).toFixed(4) + ')';
  q.s.prog.width = (20 + 4 * ft).toFixed(1) + '%';
}

// fisierul deschis in editor
function edTab(q: Interfata, act: number) {
  q.tabs.forEach((s, i) => {
    s.background = i === act ? D1 : 'transparent';
    s.color = i === act ? TX : MU;
  });
  q.tls.forEach((s, i) => {
    s.opacity = i === act ? '1' : '0';
  });
  q.trs.forEach((s, i) => {
    s.background = i === act ? 'color-mix(in srgb, var(--main) 28%, var(--second))' : 'transparent';
    s.color = i === act ? TX : '';
  });
  q.codes.forEach((c, i) => {
    c.s.opacity = i === act ? '1' : '0';
    c.mini.opacity = i === act ? '1' : '0';
  });
  q.crumb.textContent = ['app  ›  page.tsx  ›  Page', 'components  ›  Hero.jsx  ›  Hero', 'routes  ›  web.php'][act];
  q.lang.textContent = ['TypeScript JSX', 'JavaScript JSX', 'PHP'][act];
}

// raspunsul asistentului, cuvant cu cuvant
function stream(text: string, t: number, t0: number, cps: number) {
  const n = Math.max(0, Math.floor((t - t0) * cps));
  if (n >= text.length) return text;
  const cut = text.lastIndexOf(' ', n);
  return text.slice(0, cut > 0 ? cut : 0);
}

function scores(q: Interfata, t: number, t0: number) {
  RINGS.forEach((r, i) => {
    const p = eo(seg(t, t0 + i * 0.12, t0 + i * 0.12 + 0.9));
    q.rings[i].strokeDashoffset = (100 - r[1] * p).toFixed(2);
    q.nums[i].textContent = String(Math.round(r[1] * p));
  });
  q.mets.forEach((m, i) => {
    const p = eo(seg(t, t0 + 0.7 + i * 0.08, t0 + 1.05 + i * 0.08));
    m.opacity = String(p);
    m.transform = 'translateY(' + (8 * (1 - p)).toFixed(1) + 'px)';
  });
}

// site-ul urca de pe locul trei pe primul
function rank(q: Interfata, t: number, t0: number) {
  const p = eio(seg(t, t0, t0 + 0.7));
  q.s.r2.transform = 'translateY(' + (-152 * p).toFixed(1) + 'px)';
  q.s.r0.transform = 'translateY(' + (76 * p).toFixed(1) + 'px)';
  q.s.r1.transform = 'translateY(' + (76 * p).toFixed(1) + 'px)';
  q.s.r2.background = 'color-mix(in srgb, var(--accent) ' + Math.round(100 * p * (1 - seg(t, t0 + 1.0, t0 + 1.6))) + '%, transparent)';
}

/* ─── Scenele ─── */

// fereastra goala: se scrie adresa, cresc coloanele grilei si apare schita paginii
function sceneSchita(box: HTMLElement, start: number) {
  const q = construieste(box);
  const adresa = typist(ADRESA, 0.35, 24);
  return (t: number) => {
    camera(q, start + t, 0);
    const p = seg(t, -0.45, 0.4);
    q.win.opacity = String(Math.min(1, p * 3));
    q.win.transform = 'translateY(' + (40 * (1 - eo(p))).toFixed(1) + 'px) scale(' + (0.9 + 0.1 * eob(p, 1.6)).toFixed(4) + ')';
    q.urlEl.textContent = adresa(t);
    q.caret.opacity = Math.floor(t / 0.53) % 2 ? '0.15' : '1';
    group(q.s, SITE, false);
    on(q.w.grid);
    q.cols.forEach((s, i) => {
      const c = eo(seg(t, 0.45 + i * 0.045, 0.85 + i * 0.045));
      s.transformOrigin = '50% 0';
      s.transform = 'scaleY(' + c.toFixed(4) + ')';
    });
    fly(q.w.hero, t, 0.8, 0.45, 0, -30);
    fly(q.w.nav, t, 0.95, 0.4, 0, -20);
    fly(q.w.text, t, 1.07, 0.42, -40, 0);
    fly(q.w.search, t, 1.25, 0.4, 0, 30);
    fly(q.w.c0, t, 1.4, 0.4, 0, 30);
    fly(q.w.c1, t, 1.5, 0.4, 0, 30);
    fly(q.w.c2, t, 1.6, 0.4, 0, 30);
    fly(q.w.proj, t, 1.75, 0.4, 0, 30);
    fly(q.w.th, t, 1.9, 0.4, 0, 40);
  };
}

// schita se inlocuieste, parte cu parte, cu designul site-ului
function sceneDesign(box: HTMLElement, start: number) {
  const q = construieste(box);
  // o parte din schita dispare, cu o usoara marire
  const wfOut = (s: Stil, t: number, t0: number) => {
    const p = seg(t, t0, t0 + 0.3);
    s.opacity = String(1 - p);
    s.transform = 'scale(' + (1 + 0.03 * ei(p)).toFixed(4) + ')';
  };
  return (t: number) => {
    camera(q, start + t, 0);
    kb(q, start + t);
    on(q.win);
    q.caret.opacity = String(1 - seg(t, 0, 0.3));
    q.cols.forEach((s) => {
      s.transform = 'none';
    });
    q.w.grid.opacity = String(1 - eo(seg(t, 1.8, 2.3)));
    wfOut(q.w.hero, t, 0.15);
    const hp = eio(seg(t, 0.15, 0.8));
    q.s.hero.opacity = String(Math.min(1, hp * 4));
    q.s.hero.transform = 'none';
    q.s.hero.clipPath = 'inset(0 ' + (100 * (1 - hp)).toFixed(2) + '% 0 0)';
    wfOut(q.w.nav, t, 0.4);
    fly(q.s.nav, t, 0.45, 0.4, 0, -24);
    wfOut(q.w.text, t, 0.55);
    fly(q.s.h1, t, 0.58, 0.5, -70, 0);
    fly(q.s.p, t, 0.78, 0.42, -50, 0);
    pop(q.s.btn, t, 0.9);
    fly(q.s.slide, t, 0.95, 0.45, 60, 0);
    wfOut(q.w.search, t, 1.1);
    fly(q.s.sbar, t, 1.1, 0.45, 0, 34);
    ring(q.s.sbar, t, 1.55);
    q.s.div.opacity = String(eo(seg(t, 1.2, 1.5)));
    q.s.div.transform = 'none';
    (['c0', 'c1', 'c2'] as const).forEach((n, i) => {
      wfOut(q.w[n], t, 1.28 + i * 0.12);
      fly(q.s[n], t, 1.28 + i * 0.12, 0.42, 0, 34);
    });
    wfOut(q.w.proj, t, 1.7);
    fly(q.s.proj, t, 1.7, 0.45, -50, 0);
    wfOut(q.w.th, t, 1.85);
    (['th0', 'th1', 'th2', 'th3', 'th4'] as const).forEach((n, i) => fly(q.s[n], t, 1.88 + i * 0.08, 0.45, 0, 50));
    ring(q.s.th0, t, 2.4);
  };
}

// cand incepe scrierea fiecarui fisier din editor
const STARTS = [0.75, 1.3, 1.95];

// camera se departeaza si vine editorul, unde se scrie codul paginii, al componentei si al rutelor
function sceneCod(box: HTMLElement, start: number) {
  const q = construieste(box);
  return (t: number) => {
    camera(q, start + t, eio(seg(t, 0, 0.8)));
    on(q.win);
    q.caret.opacity = '0';
    kb(q, start + t);
    q.s.hero.clipPath = 'none';
    group(q.w, SCHITA, false);
    group(q.s, SITE, true);
    fly(q.e.ed, t, 0.35, 0.5, 420, 0);
    ring(q.e.ed, t, 0.85);
    const act = t < STARTS[1] ? 0 : t < STARTS[2] ? 1 : 2;
    edTab(q, act);
    q.codes.forEach((c, i) => {
      c.lines.forEach((l, n) => {
        const p = eo(seg(t, STARTS[i] + n * 0.06, STARTS[i] + n * 0.06 + 0.2));
        l.clipPath = 'inset(0 ' + (100 * (1 - p)).toFixed(1) + '% 0 0)';
      });
    });
    const c = q.codes[act];
    const ln = Math.max(0, Math.min(c.lines.length - 1, Math.floor((t - STARTS[act]) / 0.06)));
    q.e.hl.transform = 'translateY(' + 22 * ln + 'px)';
    q.pos.textContent = 'Ln ' + (ln + 1) + ', Col ' + (1 + ((ln * 7 + 3) % 40));
    q.terms.forEach((s, i) => {
      const p = seg(t, 2.25 + i * 0.15, 2.45 + i * 0.15);
      s.opacity = String(eo(p));
      s.transform = 'translateY(' + (8 * (1 - eo(p))).toFixed(1) + 'px)';
    });
  };
}

// editorul pleaca; vin scorurile PageSpeed si cautarea in Google, unde site-ul urca pe primul loc
function sceneSeo(box: HTMLElement, start: number) {
  const q = construieste(box);
  edTab(q, 2);
  q.e.hl.transform = 'translateY(' + 22 * 6 + 'px)';
  q.pos.textContent = 'Ln 7, Col 41';
  return (t: number) => {
    camera(q, start + t, 1);
    on(q.win);
    q.caret.opacity = '0';
    group(q.w, SCHITA, false);
    group(q.s, SITE, true);
    kb(q, start + t);
    q.s.hero.clipPath = 'none';
    out(q.e.ed, t, 0, 0.4, 360);
    fly(q.s.score, t, 0.3, 0.5, 420, 0);
    ring(q.s.score, t, 0.8);
    scores(q, t, 0.6);
    fly(q.s.search, t, 0.7, 0.5, 420, 0);
    rank(q, t, 1.7);
    pop(q.s.top, t, 2.35);
  };
}

// un asistent AI e intrebat ce birou de arhitectura recomanda si raspunde cu site-ul
function sceneAi(box: HTMLElement, start: number) {
  const q = construieste(box);
  return (t: number) => {
    camera(q, start + t, 1);
    on(q.win);
    q.caret.opacity = '0';
    group(q.w, SCHITA, false);
    group(q.s, SITE, true);
    kb(q, start + t);
    q.s.hero.clipPath = 'none';
    off(q.e.ed);
    scores(q, 9, 0);
    rank(q, 9, 0);
    on(q.s.top);
    out(q.s.score, t, 0, 0.4, 360);
    out(q.s.search, t, 0.08, 0.4, 360);
    fly(q.a.chat, t, 0.3, 0.5, 420, 0);
    fly(q.a.q, t, 0.6, 0.4, 40, 0);
    const sp = seg(t, 0.85, 1.1);
    q.a.av.opacity = String(eo(sp));
    q.a.av.transform = 'translateY(' + (6 * (1 - eo(sp))).toFixed(1) + 'px)';
    q.ansEl.textContent = stream(RASPUNS, t, 1.0, 150);
    fly(q.a.src, t, 2.25, 0.4, 0, 16);
    const ap = seg(t, 2.35, 2.6);
    q.a.act.opacity = String(eo(ap));
    q.a.act.transform = 'none';
    q.a.logos.opacity = '1';
    q.a.logos.transform = 'none';
    q.lgs.forEach((s, i) => fly(s, t, 2.0 + i * 0.12, 0.45, 0, 40));
    ring(q.a.src, t, 2.4);
  };
}

const SCENE = [
  { dur: 2.5, creeaza: sceneSchita },
  { dur: 3.5, creeaza: sceneDesign },
  { dur: 3, creeaza: sceneCod },
  { dur: 3, creeaza: sceneSeo },
  { dur: 3, creeaza: sceneAi },
];

// porneste animatia in casuta (vezi pornesteFilmul)
export const porneste = (cutie: HTMLElement, scena: HTMLElement) => pornesteFilmul(cutie, scena, { scene: SCENE, vedere: VEDERE });
