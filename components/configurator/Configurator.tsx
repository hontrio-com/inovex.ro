'use client';

import { createContext, Fragment, useContext, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import Link from 'next/link';
import {
  AlertCircle, AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, File as FileIcon, Lightbulb, UploadCloud, X,
} from 'lucide-react';
import {
  ATASAMENTE_EXT, ATASAMENTE_MAX, ATASAMENTE_MAX_BYTES, ATASAMENTE_MAX_MB, extensie, marime,
} from '@/lib/configurator-atasamente';
import { completeaza } from '@/lib/i18n/completeaza';
import { cale, type Limba } from '@/lib/i18n/config';
import type { TextConfiguratoare } from '@/lib/i18n/pagini/configuratoare';
import f from '@/components/forms/Formular.module.css';
import styles from './Configurator.module.css';

/* Piesele comune ale configuratoarelor (magazin online, website de prezentare, aplicatie web,
   automatizari AI), in stilul redesign-ului (2026-10-29): un chenar alb cu contur, cu pasii sus si
   intrebarea pasului dedesubt; optiunile sunt carduri albe care, alese, primesc contur negru si o bifa;
   campurile si butoanele sunt cele din Formular.module.css. Starea, validarea si trimiterea raman in
   fiecare configurator. Din 2026-11-07, in limba paginii: textele comune vin din layout prin context. */

type TextComun = TextConfiguratoare['comun'];

const Context = createContext<{ lang: Limba; t: TextComun; telefon: string } | null>(null);

// pus de app/[lang]/(configuratoare)/layout.tsx in jurul paginilor
export function ConfiguratorProvider({
  lang,
  t,
  telefon,
  children,
}: {
  lang: Limba;
  t: TextComun;
  telefon: string;
  children: ReactNode;
}) {
  return <Context.Provider value={{ lang, t, telefon }}>{children}</Context.Provider>;
}

/** Limba paginii si textele comune, in orice configurator. */
export function useConfigurator() {
  const c = useContext(Context);
  if (!c) throw new Error('useConfigurator: lipseste ConfiguratorProvider (layout-ul configuratoarelor)');
  return c;
}

// pagina: chenarul cu mesajul de sus, pasii si continutul pasului
export function Cadru({
  anunt,
  pasi,
  pas,
  children,
}: {
  anunt: string;
  pasi: string[];
  pas: number;
  children: ReactNode;
}) {
  return (
    <section className={styles.pagina}>
      <div className={styles.card}>
        <div className={styles.sus}>
          <p className={styles.anunt}>{anunt}</p>
          <Pasi pasi={pasi} pas={pas} />
        </div>
        <div className={styles.continut}>{children}</div>
      </div>
    </section>
  );
}

// pasii configuratorului: facut = bifa neagra, curent = negru, urmator = contur gri
function Pasi({ pasi, pas }: { pasi: string[]; pas: number }) {
  const { t } = useConfigurator();
  return (
    <nav className={styles.pasi} aria-label={t.ariaPasi}>
      <ol>
        {pasi.map((eticheta, k) => {
          const nr = k + 1;
          const stare = pas > nr ? 'facut' : pas === nr ? 'curent' : 'urmeaza';
          return (
            <Fragment key={eticheta}>
              <li className={styles.pas} data-stare={stare} aria-current={stare === 'curent' ? 'step' : undefined}>
                <span className={styles.pasCerc}>{stare === 'facut' ? <Check aria-hidden /> : nr}</span>
                <span className={styles.pasNume}>{eticheta}</span>
              </li>
              {k < pasi.length - 1 && <li className={styles.linie} data-facut={pas > nr} aria-hidden />}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export function Titlu({ children }: { children: ReactNode }) {
  return <h1 className={styles.titlu}>{children}</h1>;
}

export function Subtitlu({ children }: { children: ReactNode }) {
  return <p className={styles.subtitlu}>{children}</p>;
}

// eticheta unui grup de optiuni din pas (ex. „Câte produse vrei să vinzi?”)
export function Intrebare({ children }: { children: ReactNode }) {
  return <p className={styles.intrebare}>{children}</p>;
}

// grila de optiuni: atatea coloane pe telefon (`telefon`) si de la 640px (`mare`)
export function Grila({ telefon = 2, mare = 2, children }: { telefon?: number; mare?: number; children: ReactNode }) {
  return (
    <div className={styles.grila} style={{ '--col-telefon': telefon, '--col-mare': mare } as CSSProperties}>
      {children}
    </div>
  );
}

// optiune cu iconita, nume si o descriere scurta; `multipla` arata bifa in colt cand e aleasa
export function CardOptiune({
  icon: Icon,
  label,
  sublabel,
  selected,
  onClick,
  multipla = false,
}: {
  icon: ElementType;
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
  multipla?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.optiune}
      data-ales={selected}
      aria-pressed={selected}
    >
      {multipla && selected && (
        <span className={styles.bifaColt} aria-hidden>
          <Check />
        </span>
      )}
      <span className={styles.optiuneIcon}>
        <Icon strokeWidth={1.6} aria-hidden />
      </span>
      <span className={styles.optiuneNume}>{label}</span>
      {sublabel && <span className={styles.optiuneDesc}>{sublabel}</span>}
    </button>
  );
}

// optiune doar text, pe un rand (ex. buget, industrie)
export function CardSimplu({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={styles.simplu} data-ales={selected} aria-pressed={selected}>
      {label}
    </button>
  );
}

// optiune cu un numar mare (ex. numarul de produse sau de pagini)
export function CardNumar({
  value,
  sublabel,
  selected,
  onClick,
}: {
  value: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className={styles.numar} data-ales={selected} aria-pressed={selected}>
      {/* textele lungi (ex. „Personalizat”) mai mici, ca sa incapa in casuta */}
      <span className={styles.numarValoare} data-lung={value.length > 8}>
        {value}
      </span>
      {sublabel && <span className={styles.optiuneDesc}>{sublabel}</span>}
    </button>
  );
}

// „Știai că?”: o informatie scurta sub optiuni
export function StiaiCa({ children }: { children: ReactNode }) {
  const { t } = useConfigurator();
  return (
    <div className={styles.stiai}>
      <span className={styles.stiaiIcon}>
        <Lightbulb aria-hidden />
      </span>
      <p>
        <strong>{t.stiaiCa}</strong> {children}
      </p>
    </div>
  );
}

// atentionare (ex. doar persoane juridice)
export function Avertisment({ children }: { children: ReactNode }) {
  return (
    <div className={styles.avertisment} role="status">
      <AlertTriangle aria-hidden />
      <p>{children}</p>
    </div>
  );
}

// un camp de formular cu eticheta si eroarea lui; campul vine ca `children` (cu clasele din `f`)
export function Camp({
  id,
  eticheta,
  optional = false,
  eroare,
  children,
}: {
  id: string;
  eticheta: string;
  optional?: boolean;
  eroare?: string;
  children: ReactNode;
}) {
  const { t } = useConfigurator();
  return (
    <div className={f.camp}>
      <label htmlFor={id} className={f.eticheta}>
        {eticheta}{' '}
        {optional ? <span className={f.optional}>{t.optional}</span> : <span className={f.obligatoriu}>*</span>}
      </label>
      {children}
      {eroare && <p className={f.eroare}>{eroare}</p>}
    </div>
  );
}

// acordul pentru prelucrarea datelor; `children` = textul de dupa link (ex. „ și prelucrarea datelor mele...”)
export function Acord({
  id,
  checked,
  onChange,
  eroare,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (bifat: boolean) => void;
  eroare?: string;
  children?: ReactNode;
}) {
  const { lang, t } = useConfigurator();
  const [inainte, link, dupa] = t.acord;
  return (
    <div className={f.camp}>
      <div className={f.acord}>
        <input
          id={id}
          type="checkbox"
          className={f.bifa}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!eroare}
        />
        <label htmlFor={id} className={f.acordText}>
          {inainte}
          <Link href={cale(lang, '/politica-de-confidentialitate')} target="_blank">
            {link}
          </Link>
          {children}
          {dupa}
        </label>
      </div>
      {eroare && <p className={f.eroare}>{eroare}</p>}
    </div>
  );
}

// eroarea de la trimitere (sau, cu `text`, alta eroare in acelasi stil, ex. la incarcarea atasamentelor)
export function EroareTrimitere({ text }: { text?: string }) {
  const { t, telefon } = useConfigurator();
  return (
    <div className={f.esec} role="alert">
      <AlertCircle aria-hidden />
      {text ?? completeaza(t.eroare, { telefon })}
    </div>
  );
}

type TextAtasamente = TextConfiguratoare['aplicatie']['atasamente'];

// atasamentele (2026-11-07: un plan, o schita, o structura): alese sau trase in caseta si verificate pe loc
// (tip, marime, numar, lib/configurator-atasamente.ts); le urca parintele, abia la trimiterea cererii
export function CampAtasamente({
  id,
  t,
  fisiere,
  onSchimba,
  eroare,
  onEroare,
  dezactivat = false,
}: {
  id: string;
  t: TextAtasamente;
  fisiere: File[];
  onSchimba: (fisiere: File[]) => void;
  eroare: string | null;
  onEroare: (eroare: string | null) => void;
  dezactivat?: boolean;
}) {
  const { lang, t: c } = useConfigurator();
  const [trage, setTrage] = useState(false);

  const adauga = (lista: FileList | null) => {
    if (!lista?.length) return;
    const noi = [...fisiere];
    let problema: string | null = null;
    for (const fisier of Array.from(lista)) {
      if (!ATASAMENTE_EXT.includes(extensie(fisier.name))) {
        problema = completeaza(t.tip, { nume: fisier.name });
        continue;
      }
      if (fisier.size > ATASAMENTE_MAX_BYTES) {
        problema = completeaza(t.mare, { nume: fisier.name, mb: ATASAMENTE_MAX_MB });
        continue;
      }
      if (noi.some((x) => x.name === fisier.name && x.size === fisier.size)) continue;
      if (noi.length >= ATASAMENTE_MAX) {
        problema = completeaza(t.maxim, { n: ATASAMENTE_MAX });
        break;
      }
      noi.push(fisier);
    }
    onSchimba(noi);
    onEroare(problema);
  };

  return (
    <div className={f.camp}>
      <p className={f.eticheta}>
        {t.eticheta} <span className={f.optional}>{c.optional}</span>
      </p>
      <p className={styles.atasamenteDescriere}>{t.descriere}</p>
      <label
        htmlFor={id}
        className={styles.incarcare}
        data-trage={trage}
        onDragOver={(e) => {
          e.preventDefault();
          setTrage(true);
        }}
        onDragLeave={() => setTrage(false)}
        onDrop={(e) => {
          e.preventDefault();
          setTrage(false);
          if (!dezactivat) adauga(e.dataTransfer.files);
        }}
      >
        <span className={styles.incarcareIcon}>
          <UploadCloud aria-hidden />
        </span>
        <span className={styles.incarcareText}>
          <strong>{t.alege}</strong>
          {t.trage}
        </span>
        <span className={styles.incarcareNota}>{completeaza(t.limite, { n: ATASAMENTE_MAX, mb: ATASAMENTE_MAX_MB })}</span>
        <input
          id={id}
          type="file"
          multiple
          accept={ATASAMENTE_EXT.join(',')}
          className="sr-only"
          disabled={dezactivat}
          onChange={(e) => {
            adauga(e.target.files);
            e.target.value = '';
          }}
        />
      </label>
      {eroare && (
        <p role="alert" className={f.eroare}>
          {eroare}
        </p>
      )}
      {fisiere.length > 0 && (
        <ul className={styles.fisiere}>
          {fisiere.map((fisier) => (
            <li key={`${fisier.name}-${fisier.size}`}>
              <FileIcon aria-hidden />
              <span className={styles.fisierNume}>{fisier.name}</span>
              <span className={styles.fisierMarime}>{marime(fisier.size, lang)}</span>
              <button
                type="button"
                disabled={dezactivat}
                aria-label={completeaza(t.elimina, { nume: fisier.name })}
                onClick={() => {
                  onSchimba(fisiere.filter((x) => x !== fisier));
                  onEroare(null);
                }}
              >
                <X aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// butoanele de jos: „Înapoi” (gri, de la pasul 2) si „Continuă” / „Trimite cererea” (negru)
export function Navigare({
  onInapoi,
  onInainte,
  dezactivat,
  seTrimite,
  ultimul,
  textInCurs,
}: {
  onInapoi?: () => void;
  onInainte: () => void;
  dezactivat: boolean;
  seTrimite: boolean;
  ultimul: boolean;
  /** textul butonului cat se trimite, in loc de „Se trimite...” (ex. „Se încarcă fișierele...”) */
  textInCurs?: string;
}) {
  const { t } = useConfigurator();
  return (
    <div className={styles.navigare}>
      {onInapoi ? (
        <button type="button" onClick={onInapoi} className={styles.inapoi}>
          <ArrowLeft aria-hidden />
          {t.inapoi}
        </button>
      ) : (
        <span />
      )}
      <button type="button" onClick={onInainte} disabled={dezactivat || seTrimite} className={styles.inainte}>
        {seTrimite ? (textInCurs ?? t.seTrimite) : ultimul ? t.trimite : t.continua}
        {!seTrimite && <ArrowRight aria-hidden />}
      </button>
    </div>
  );
}

// dupa trimitere
export function Succes({ text }: { text: string }) {
  const { lang, t } = useConfigurator();
  return (
    <section className={styles.pagina}>
      <div className={styles.card}>
        <div className={styles.succes} role="status">
          <span className={styles.succesIcon}>
            <CheckCircle2 aria-hidden />
          </span>
          <h1 className={styles.titlu}>{t.succesTitlu}</h1>
          <p className={styles.subtitlu}>
            {text} {t.succesVerifica}
          </p>
          <Link href={cale(lang, '/')} className={styles.inainte}>
            {t.acasa}
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
