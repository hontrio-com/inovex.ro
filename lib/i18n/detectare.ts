import { LIMBI, type Limba } from './config';

/* Limba potrivita pentru un vizitator nou (2026-11-07, cerut de proprietar: limba schimbata automat dupa tara,
   foarte precis; unde nu avem limba tarii, engleza). Doua semnale, venite la fiecare cerere:
   - tara, din adresa IP (antetul x-vercel-ip-country, pus de Vercel; precis la nivel de tara);
   - limbile browserului (antetul Accept-Language), in ordinea preferintei.
   Regula:
   1. Browserul pe romana, germana sau franceza: limba aceea, oriunde ar fi vizitatorul (un roman in Italia,
      un neamt in Spania, un francez in Germania). Engleza nu conteaza aici: multi o au doar ca limba a
      sistemului, deci nu spune nimic despre persoana.
   2. Altfel, tara: in tarile in care una dintre limbile noastre e oficiala (sau limba de afaceri), aceea; unde
      sunt doua (Elvetia, Luxemburg, Belgia, Canada, Camerun), cea pe care o mai accepta browserul. Un roman din
      Romania cu browserul in engleza ramane pe romana.
   3. In rest, engleza (un maghiar in Ungaria, un italian in Italia, un american). */

/** Cookie-ul cu limba vizitatorului (pusa automat la prima pagina sau aleasa de el din subsol), un an. */
export const COOKIE_LIMBA = 'inovex_limba';

type Tara = {
  // limbile noastre oficiale (sau de afaceri) in tara; prima e cea implicita
  limbi: Limba[];
  // pentru vorbitorii unei limbi pe care n-o avem si care e oficiala acolo (olandeza in Belgia): in loc de prima
  altele?: Limba;
};

const FR: Tara = { limbi: ['fr'] };
const DE: Tara = { limbi: ['de'] };

const TARI: Record<string, Tara> = {
  // romana
  RO: { limbi: ['ro'] },
  MD: { limbi: ['ro'] },
  // germana
  DE,
  AT: DE,
  LI: DE,
  CH: { limbi: ['de', 'fr'] }, // italiana si retoromana: germana, limba majoritatii
  LU: { limbi: ['fr', 'de'] },
  BE: { limbi: ['fr', 'de'], altele: 'en' }, // olandeza (Flandra): engleza, nu franceza
  // franceza: Franta, Monaco, teritoriile de peste mari
  FR,
  MC: FR,
  GP: FR, MQ: FR, GF: FR, RE: FR, YT: FR, PM: FR, BL: FR, MF: FR, NC: FR, PF: FR, WF: FR,
  // Canada: engleza sau franceza (Quebec), dupa browser
  CA: { limbi: ['en', 'fr'] },
  // tarile francofone din Africa si Haiti (franceza oficiala), plus Maghrebul (franceza, limba afacerilor)
  SN: FR, CI: FR, ML: FR, BF: FR, NE: FR, TG: FR, BJ: FR, GN: FR, CD: FR, CG: FR, GA: FR, CF: FR, TD: FR,
  DJ: FR, KM: FR, MG: FR, BI: FR, HT: FR, MA: FR, DZ: FR, TN: FR,
  CM: { limbi: ['fr', 'en'] },
};

const esteA = (l: string | undefined): l is Limba => !!l && (LIMBI as readonly string[]).includes(l);

/** Limbile browserului, in ordinea preferintei, doar codul principal („de-CH” -> „de”), fara repetari. */
export function limbiBrowser(acceptLanguage: string | null | undefined): string[] {
  if (!acceptLanguage) return [];
  const limbi = acceptLanguage
    .split(',')
    .map((parte, ordine) => {
      const [tag, ...param] = parte.trim().split(';');
      const q = param.map((p) => p.trim()).find((p) => p.startsWith('q='));
      return { l: tag.trim().toLowerCase().split('-')[0], q: q ? Number(q.slice(2)) : 1, ordine };
    })
    .filter((x) => /^[a-z]{2,3}$/.test(x.l) && x.q > 0)
    .sort((a, b) => b.q - a.q || a.ordine - b.ordine)
    .map((x) => x.l);
  return [...new Set(limbi)];
}

/** Limba site-ului pentru un vizitator din `tara` (cod ISO, ex. „DE”), cu browserul in `acceptLanguage`. */
export function limbaPentru(tara: string | null | undefined, acceptLanguage: string | null | undefined): Limba {
  const browser = limbiBrowser(acceptLanguage);
  const principala = browser[0];
  // 1. browserul pe una dintre limbile noastre, alta decat engleza
  if (esteA(principala) && principala !== 'en') return principala;
  // 2. tara
  const t = tara ? TARI[tara.toUpperCase()] : undefined;
  if (t) {
    const acceptata = browser.find((l) => (t.limbi as string[]).includes(l));
    if (acceptata) return acceptata as Limba;
    if (t.altele && principala && !esteA(principala)) return t.altele;
    return t.limbi[0];
  }
  // 3. engleza
  return 'en';
}
