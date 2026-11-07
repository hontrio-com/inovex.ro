import Link from 'next/link';
import type { ReactNode } from 'react';
import { TELEFON } from '@/components/layout/meniu-servicii/date';
import { LinkTelefon } from '@/components/ui/LinkTelefon';
import { cale, type Limba } from '@/lib/i18n/config';

/* Textul paginilor legale, cu singurele doua formatari din date: **ingrosat** si [text](adresa).
   Adresele: /cale-interna -> pagina in limba curenta (cale()); ro:/cale -> pagina romaneasca; tel: al
   Inovex -> LinkTelefon (trimite conversia „telefon”); mailto: ca atare; restul, in fila noua. */

const MODEL = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

function legatura(text: string, href: string, lang: Limba, cheie: number): ReactNode {
  if (href === TELEFON.href) return <LinkTelefon key={cheie}>{text}</LinkTelefon>;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a key={cheie} href={href}>
        {text}
      </a>
    );
  }
  if (href.startsWith('ro:')) {
    return (
      <Link key={cheie} href={cale('ro', href.slice(3))} hrefLang="ro">
        {text}
      </Link>
    );
  }
  if (href.startsWith('/')) {
    return (
      <Link key={cheie} href={cale(lang, href)}>
        {text}
      </Link>
    );
  }
  return (
    <a key={cheie} href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
}

function parcurge(text: string, lang: Limba): ReactNode[] {
  const bucati: ReactNode[] = [];
  let ultim = 0;
  for (const m of text.matchAll(MODEL)) {
    const i = m.index ?? 0;
    if (i > ultim) bucati.push(text.slice(ultim, i));
    if (m[1] !== undefined) bucati.push(<strong key={i}>{parcurge(m[1], lang)}</strong>);
    else bucati.push(legatura(m[2], m[3], lang, i));
    ultim = i + m[0].length;
  }
  if (ultim < text.length) bucati.push(text.slice(ultim));
  return bucati;
}

export function TextLegal({ text, lang }: { text: string; lang: Limba }) {
  return <>{parcurge(text, lang)}</>;
}
