/* Paginile legale (confidențialitate, cookies, termeni) ca date, in fiecare limba (2026-11-06).

   Textele accepta doar doua feluri de formatare: **ingrosat** si [link](adresa). Adresele interne
   (ex. /politica-cookies) se traduc la afisare cu cale(); cele cu tel: trimit conversia „telefon”
   (LinkTelefon); cele externe se deschid in fila noua. Randerul e in components/legal/TextLegal.tsx. */

export type Bloc =
  | { p: string }
  | { h3: string }
  /** lista cu buline */
  | { ul: string[] }
  /** lista cu a), b), c): literele le pune pagina, nu se scriu in text */
  | { ol: string[] }
  /** caseta gri, cate un rand pe element (ex. adresa ANSPDCP) */
  | { caseta: string[] }
  /** tabelul cu cookie-uri, pe categorii */
  | { cookies: CategorieCookie[] }
  /** butonul care redeschide bannerul de cookie-uri */
  | { setari: { titlu: string; text: string; buton: string } }
  /** caseta de contact: email (cu subiectul dat) + telefon */
  | { contact: { titlu: string; subiect: string; buton: string } };

export type Cookie = [nume: string, furnizor: string, adresa: string, scop: string, durata: string, tip: string];

export type CategorieCookie = { nume: string; descriere: string; cookies: Cookie[] };

export type Sectiune = {
  /** titlul din cuprins */
  scurt: string;
  /** titlul sectiunii (numarul il pune pagina) */
  titlu: string;
  continut: Bloc[];
};

export type DocumentLegal = {
  meta: { titlu: string; descriere: string };
  titlu: string;
  intro: string;
  /** data afisata („5 noiembrie 2026”) si cea pentru datele structurate */
  actualizat: string;
  data: string;
  rezumat?: { titlu: string; randuri: [string, string][]; nota: string };
  sectiuni: Sectiune[];
};

export type TextLegal = {
  ui: {
    acasa: string;
    navigare: string;
    cuprins: string;
    /** „{n} secțiuni” */
    sectiuni: string;
    actualizat: string;
    /** in limbile straine: textul romanesc e cel care se aplica */
    traducere?: string;
    /** inceputul ancorelor: #sectiunea-3, #section-3 */
    ancora: string;
    capTabel: [nume: string, furnizor: string, scop: string, durata: string, tip: string];
    telefon: string;
  };
  confidentialitate: DocumentLegal;
  cookies: DocumentLegal;
  termeni: DocumentLegal;
};
