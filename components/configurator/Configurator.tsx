'use client';

import { Fragment, type CSSProperties, type ElementType, type ReactNode } from 'react';
import Link from 'next/link';
import { AlertCircle, AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, Lightbulb } from 'lucide-react';
import { TELEFON } from '@/components/layout/meniu-servicii/date';
import f from '@/components/forms/Formular.module.css';
import styles from './Configurator.module.css';

/* Piesele comune ale configuratoarelor (magazin online, website de prezentare, aplicatie web,
   automatizari AI), in stilul redesign-ului (2026-10-29): un chenar alb cu contur, cu pasii sus si
   intrebarea pasului dedesubt; optiunile sunt carduri albe care, alese, primesc contur negru si o bifa;
   campurile si butoanele sunt cele din Formular.module.css. Starea, validarea si trimiterea raman in
   fiecare configurator. */

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
  return (
    <nav className={styles.pasi} aria-label="Pașii configuratorului">
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
  return (
    <div className={styles.stiai}>
      <span className={styles.stiaiIcon}>
        <Lightbulb aria-hidden />
      </span>
      <p>
        <strong>Știai că?</strong> {children}
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
  return (
    <div className={f.camp}>
      <label htmlFor={id} className={f.eticheta}>
        {eticheta}{' '}
        {optional ? <span className={f.optional}>(opțional)</span> : <span className={f.obligatoriu}>*</span>}
      </label>
      {children}
      {eroare && <p className={f.eroare}>{eroare}</p>}
    </div>
  );
}

// acordul pentru prelucrarea datelor
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
          Sunt de acord cu{' '}
          <Link href="/politica-de-confidentialitate" target="_blank">
            Politica de confidențialitate
          </Link>
          {children}
        </label>
      </div>
      {eroare && <p className={f.eroare}>{eroare}</p>}
    </div>
  );
}

// eroarea de la trimitere
export function EroareTrimitere() {
  return (
    <div className={f.esec} role="alert">
      <AlertCircle aria-hidden />
      A apărut o eroare. Te rugăm să încerci din nou sau să ne suni la {TELEFON.text}.
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
}: {
  onInapoi?: () => void;
  onInainte: () => void;
  dezactivat: boolean;
  seTrimite: boolean;
  ultimul: boolean;
}) {
  return (
    <div className={styles.navigare}>
      {onInapoi ? (
        <button type="button" onClick={onInapoi} className={styles.inapoi}>
          <ArrowLeft aria-hidden />
          Înapoi
        </button>
      ) : (
        <span />
      )}
      <button type="button" onClick={onInainte} disabled={dezactivat || seTrimite} className={styles.inainte}>
        {seTrimite ? 'Se trimite...' : ultimul ? 'Trimite cererea' : 'Continuă'}
        {!seTrimite && <ArrowRight aria-hidden />}
      </button>
    </div>
  );
}

// dupa trimitere
export function Succes({ text }: { text: string }) {
  return (
    <section className={styles.pagina}>
      <div className={styles.card}>
        <div className={styles.succes} role="status">
          <span className={styles.succesIcon}>
            <CheckCircle2 aria-hidden />
          </span>
          <h1 className={styles.titlu}>Cererea ta a fost trimisă</h1>
          <p className={styles.subtitlu}>
            {text} Verifică telefonul și emailul în următoarele ore.
          </p>
          <Link href="/" className={styles.inainte}>
            Înapoi la prima pagină
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
