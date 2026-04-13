'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Download, Link2, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TocSection {
  id: string;
  label: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TOC_SECTIONS: TocSection[] = [
  { id: 'sectiunea-1', label: 'Cine suntem si cum ne contactezi' },
  { id: 'sectiunea-2', label: 'Ce date colectam si de unde' },
  { id: 'sectiunea-3', label: 'De ce prelucram datele tale' },
  { id: 'sectiunea-4', label: 'Cu cine impartasim datele tale' },
  { id: 'sectiunea-5', label: 'Cat timp pastram datele tale' },
  { id: 'sectiunea-6', label: 'Drepturile tale conform GDPR' },
  { id: 'sectiunea-7', label: 'Cookie-uri si tehnologii similare' },
  { id: 'sectiunea-8', label: 'Securitatea datelor' },
  { id: 'sectiunea-9', label: 'Date ale minorilor' },
  { id: 'sectiunea-10', label: 'Linkuri spre site-uri terte' },
  { id: 'sectiunea-11', label: 'Modificari ale politicii' },
  { id: 'sectiunea-12', label: 'Contact si exercitarea drepturilor' },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      data-section={id}
      style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 600,
        fontSize: '1.5rem',
        color: '#0D1117',
        borderBottom: '2px solid #2B8FCC',
        paddingBottom: 12,
        marginBottom: 24,
      }}
    >
      {children}
    </h2>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: '1rem',
        lineHeight: 1.85,
        color: '#1A202C',
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: '1.0625rem',
        color: '#0D1117',
        marginTop: 24,
        marginBottom: 8,
        lineHeight: 1.4,
      }}
    >
      {children}
    </h3>
  );
}

function ItemList({ children }: { children: React.ReactNode }) {
  return (
    <ul
      style={{
        paddingLeft: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginBottom: 16,
        listStyleType: 'disc',
      }}
    >
      {children}
    </ul>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        lineHeight: 1.75,
        color: '#1A202C',
        fontSize: '1rem',
      }}
    >
      {children}
    </li>
  );
}

function SectionDivider() {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid #F0F0F0',
        margin: '0',
      }}
    />
  );
}

function TocLinks({ activeSection }: { activeSection: string }) {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      {TOC_SECTIONS.map((s, idx) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            cursor: 'pointer',
            padding: '5px 0',
            background: 'none',
            border: 'none',
            textAlign: 'left',
            width: '100%',
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: '#94A3B8',
              minWidth: 18,
              fontVariantNumeric: 'tabular-nums',
              flexShrink: 0,
            }}
          >
            {idx + 1}
          </span>
          <span
            style={{
              fontSize: 13,
              color: activeSection === s.id ? '#2B8FCC' : '#4A5568',
              fontWeight: activeSection === s.id ? 600 : 400,
              lineHeight: 1.4,
            }}
          >
            {s.label}
          </span>
        </button>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Politica de Confidentialitate Inovex',
    url: 'https://inovex.ro/politica-de-confidentialitate',
    dateModified: '2026-04-01',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Main client component
// ---------------------------------------------------------------------------

export default function PoliticaClient() {
  const [activeSection, setActiveSection] = useState<string>('sectiunea-1');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          const id = (visible.target as HTMLElement).dataset.section;
          if (id) setActiveSection(id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );

    const headings = document.querySelectorAll<HTMLElement>('h2[data-section]');
    headings.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  function handleDownload() {
    window.print();
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <>
      <JsonLd />

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { font-size: 12pt; }
          h2 { page-break-before: always; }
          h2:first-of-type { page-break-before: avoid; }
        }
        li::marker { color: #2B8FCC; }
      `}</style>

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: 'clamp(80px,10vw,100px) clamp(20px,5vw,48px)',
        }}
      >
        {/* Breadcrumb */}
        <nav
          className="no-print"
          style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}
          aria-label="Breadcrumb"
        >
          <Link href="/" style={{ color: '#2B8FCC', textDecoration: 'none' }}>
            Acasa
          </Link>
          <span style={{ margin: '0 6px' }}>&#8250;</span>
          <span>Politica de Confidentialitate</span>
        </nav>

        {/* Badge */}
        <div style={{ marginBottom: 16 }}>
          <Badge variant="outline" className="no-print">
            <ShieldCheck size={13} />
            Document GDPR
          </Badge>
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 600,
            fontSize: 'clamp(2rem,3.5vw,3rem)',
            color: '#0D1117',
            marginBottom: 16,
            lineHeight: 1.15,
          }}
        >
          Politica de Confidentialitate
        </h1>

        {/* Meta row + buttons */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 13, color: '#64748B' }}>
            Ultima actualizare: 1 aprilie 2026
          </span>
          <span style={{ fontSize: 13, color: '#64748B' }}>Versiunea 1.0</span>

          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download size={14} />
            Descarca PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCopyLink}>
            <Link2 size={14} />
            Copiaza link
          </Button>
        </div>

        {/* Alert - blue */}
        <div
          className="no-print"
          style={{
            background: '#EAF5FF',
            border: '1px solid #C8E6F8',
            borderRadius: 8,
            padding: '12px 16px',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            marginBottom: 32,
          }}
        >
          <ShieldCheck size={16} color="#2B8FCC" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#1e40af', margin: 0 }}>
            Confidentialitatea datelor tale este o prioritate pentru Inovex. Acest document explica
            transparent ce date colectam, de ce si cum le protejam, conform Regulamentului European
            GDPR.
          </p>
        </div>

        {/* Summary table */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1rem',
            color: '#0D1117',
            marginBottom: 12,
          }}
        >
          Rezumat - punctele cheie
        </h3>
        <div style={{ overflowX: 'auto', marginBottom: 8 }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #E8ECF0',
              borderRadius: 10,
            }}
          >
            <thead>
              <tr style={{ background: '#EAF5FF' }}>
                <th
                  style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#2B8FCC',
                    borderBottom: '1px solid #C8E6F8',
                  }}
                >
                  Aspect
                </th>
                <th
                  style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#2B8FCC',
                    borderBottom: '1px solid #C8E6F8',
                  }}
                >
                  Detalii
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Operator', 'VOID SFT GAMES SRL (Inovex)'],
                ['Temei juridic principal', 'Contract, Consimtamant, Interes legitim'],
                ['Date colectate', 'Nume, email, telefon, date proiect'],
                ['Scopul principal', 'Prestarea serviciilor contractate'],
                ['Durata retentie', '2 ani (formulare), 5-10 ani (contracte)'],
                ['Transferuri internationale', 'SUA (Google, Vercel) - cu SCC'],
                ['Autoritate supraveghere', 'ANSPDCP - dataprotection.ro'],
                ['Contact GDPR', 'contact@inovex.ro'],
              ].map(([aspect, details], i) => (
                <tr key={aspect} style={{ background: i % 2 === 0 ? '#F8FAFB' : '#ffffff' }}>
                  <td
                    style={{
                      padding: '10px 16px',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#374151',
                      borderBottom: '1px solid #F0F4F8',
                    }}
                  >
                    {aspect}
                  </td>
                  <td
                    style={{
                      padding: '10px 16px',
                      fontSize: 13,
                      color: '#4A5568',
                      borderBottom: '1px solid #F0F4F8',
                    }}
                  >
                    {details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 13, color: '#64748B', marginBottom: 40 }}>
          Detaliile complete sunt in sectiunile de mai jos.
        </p>

        {/* Mobile accordion TOC */}
        <div className="lg:hidden no-print" style={{ marginBottom: 32 }}>
          <Accordion type="single" collapsible>
            <AccordionItem value="toc">
              <AccordionTrigger>Cuprins (12 sectiuni)</AccordionTrigger>
              <AccordionContent>
                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 4 }}>
                  <TocLinks activeSection={activeSection} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>

          {/* Sidebar (desktop) */}
          <aside
            className="hidden lg:block no-print"
            style={{
              width: 260,
              flexShrink: 0,
              position: 'sticky',
              top: 100,
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
            }}
          >
            <Card style={{ padding: 20 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#64748B',
                  marginBottom: 12,
                }}
              >
                Cuprins
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TocLinks activeSection={activeSection} />
              </div>
            </Card>
          </aside>

          {/* Main content */}
          <main style={{ flex: 1, minWidth: 0 }}>

            {/* Sectiunea 1 */}
            <section id="sectiunea-1" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-1">
                1. Identitatea si datele de contact ale operatorului
              </SectionHeading>
              <Para>Operatorul de date cu caracter personal pentru site-ul inovex.ro si serviciile asociate este:</Para>
              <ItemList>
                <Item>Denumire: VOID SFT GAMES SRL</Item>
                <Item>Denumire comerciala: Inovex</Item>
                <Item>CUI: RO43474393</Item>
                <Item>Sediu social: Targu Jiu, judetul Gorj, Romania</Item>
                <Item>
                  Email:{' '}
                  <a href="mailto:contact@inovex.ro" style={{ color: '#2B8FCC' }}>
                    contact@inovex.ro
                  </a>
                </Item>
                <Item>Telefon: 0750 456 096</Item>
                <Item>
                  Site:{' '}
                  <a href="https://inovex.ro" style={{ color: '#2B8FCC' }}>
                    https://inovex.ro
                  </a>
                </Item>
              </ItemList>
              <Para>
                Responsabilul cu protectia datelor (DPO) poate fi contactat la adresa de email:
                contact@inovex.ro, cu subiectul &quot;GDPR - [solicitarea ta]&quot;.
              </Para>
              <Para>
                Vom raspunde oricarei solicitari legate de datele tale personale in maximum 30
                (treizeci) de zile calendaristice de la primire, conform art. 12 din GDPR.
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 2 */}
            <section id="sectiunea-2" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-2">
                2. Categoriile de date cu caracter personal colectate
              </SectionHeading>
              <Para>Inovex colecteaza date cu caracter personal in urmatoarele contexte:</Para>

              <SubHeading>2.1. Date colectate prin formularele de pe site</SubHeading>
              <Para>
                Prin completarea formularelor de contact, configurare oferta sau solicitare
                servicii, colectam:
              </Para>
              <ItemList>
                <Item>Numele si prenumele (sau denumirea firmei)</Item>
                <Item>Adresa de email</Item>
                <Item>Numarul de telefon</Item>
                <Item>Informatii despre proiectul sau serviciul dorit</Item>
                <Item>
                  Datele completate in configuratoarele de servicii (industrie, tip entitate,
                  specificatii proiect)
                </Item>
              </ItemList>
              <Para>
                Aceste date sunt furnizate voluntar de tine si sunt necesare pentru a-ti putea
                raspunde si oferi serviciile solicitate.
              </Para>

              <SubHeading>2.2. Date colectate prin Marketplace</SubHeading>
              <Para>
                La achizitionarea unui produs din Marketplace-ul Inovex, colectam:
              </Para>
              <ItemList>
                <Item>Numele si prenumele sau denumirea firmei</Item>
                <Item>Adresa de email pentru trimiterea confirmarii</Item>
                <Item>Date de facturare (conform obligatiilor fiscale)</Item>
              </ItemList>

              <SubHeading>2.3. Date colectate prin sectiunea Invata Gratuit</SubHeading>
              <Para>La descarcarea resurselor gratuite (PDF-uri, template-uri), colectam:</Para>
              <ItemList>
                <Item>Prenumele</Item>
                <Item>Adresa de email</Item>
                <Item>Consimtamantul GDPR bifat de tine</Item>
              </ItemList>

              <SubHeading>2.4. Date colectate automat prin utilizarea site-ului</SubHeading>
              <Para>
                Prin simpla accesare a site-ului inovex.ro, sistemele noastre colecteaza automat
                anumite date tehnice:
              </Para>
              <ItemList>
                <Item>Adresa IP (anonimizata prin Google Analytics 4)</Item>
                <Item>Tipul si versiunea browserului</Item>
                <Item>Sistemul de operare</Item>
                <Item>Paginile vizitate si durata vizitei</Item>
                <Item>Sursa de provenienta (cum ai ajuns pe site)</Item>
                <Item>Dispozitivul folosit (desktop, mobil, tableta)</Item>
              </ItemList>
              <Para>
                Aceste date sunt colectate prin cookie-uri si instrumente de analiza web (Google
                Analytics 4, Google Tag Manager), descrise in detaliu in Politica de Cookies
                disponibila la https://inovex.ro/politica-cookies.
              </Para>

              <SubHeading>2.5. Date colectate in cadrul relatiei contractuale</SubHeading>
              <Para>Pentru clientii care contracteaza servicii Inovex, colectam si:</Para>
              <ItemList>
                <Item>Date de identificare ale persoanei fizice sau juridice</Item>
                <Item>Date de facturare si plata</Item>
                <Item>
                  Date de acces la sistemele clientului (hosting, domeniu etc.), necesare pentru
                  prestarea serviciilor contractate
                </Item>
                <Item>Corespondenta email pe durata proiectului</Item>
              </ItemList>

              <SubHeading>2.6. Date pe care nu le colectam</SubHeading>
              <Para>
                Inovex nu colecteaza si nu prelucreaza categorii speciale de date cu caracter
                personal, conform art. 9 din GDPR (date privind originea rasiala sau etnica,
                convingeri politice, religioase, date genetice, biometrice, privind sanatatea,
                viata sexuala sau orientarea sexuala).
              </Para>
              <Para>
                Nu colectam date despre minori sub 16 ani. Daca esti minor, te rugam sa nu
                completezi formularele de pe site fara acordul parintilor.
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 3 */}
            <section id="sectiunea-3" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-3">
                3. Scopurile si temeiurile juridice ale prelucrarii
              </SectionHeading>
              <Para>
                Prelucram datele tale cu caracter personal in baza urmatoarelor temeiuri juridice,
                conform art. 6 din GDPR:
              </Para>

              <SubHeading>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    background: '#EAF5FF',
                    color: '#2B8FCC',
                    border: '1px solid #C8E6F8',
                    marginRight: 8,
                    verticalAlign: 'middle',
                  }}
                >
                  Contract
                </span>
                3.1. Executarea unui contract sau masuri precontractuale (art. 6 alin. 1 lit. b
                GDPR)
              </SubHeading>
              <Para>Prelucram datele tale pentru:</Para>
              <ItemList>
                <Item>Raspunderea la solicitarile de oferta si consultatie</Item>
                <Item>Semnarea si executarea contractelor de servicii</Item>
                <Item>Facturarea serviciilor prestate</Item>
                <Item>Comunicarea pe durata proiectului</Item>
                <Item>Livrarea si predarea proiectelor finalizate</Item>
              </ItemList>

              <SubHeading>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    background: '#ECFDF5',
                    color: '#059669',
                    border: '1px solid #A7F3D0',
                    marginRight: 8,
                    verticalAlign: 'middle',
                  }}
                >
                  Consimtamant
                </span>
                3.2. Consimtamantul tau (art. 6 alin. 1 lit. a GDPR)
              </SubHeading>
              <Para>
                Cu consimtamantul tau explicit, colectat prin bifarea casetei GDPR de pe formulare,
                prelucram datele tale pentru:
              </Para>
              <ItemList>
                <Item>Descarcarea resurselor gratuite din sectiunea Invata Gratuit</Item>
                <Item>Primirea de informatii despre serviciile Inovex</Item>
              </ItemList>
              <Para>
                Consimtamantul poate fi retras oricand, fara costuri, prin trimiterea unui email la
                contact@inovex.ro cu subiectul &quot;Retragere consimtamant&quot;. Retragerea
                consimtamantului nu afecteaza legalitatea prelucrarilor efectuate anterior
                retragerii.
              </Para>

              <SubHeading>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    background: '#FFFBEB',
                    color: '#B45309',
                    border: '1px solid #FDE68A',
                    marginRight: 8,
                    verticalAlign: 'middle',
                  }}
                >
                  Interes legitim
                </span>
                3.3. Interesul legitim al operatorului (art. 6 alin. 1 lit. f GDPR)
              </SubHeading>
              <Para>In baza interesului nostru legitim, prelucram date pentru:</Para>
              <ItemList>
                <Item>
                  Imbunatatirea serviciilor si a experientei pe site (analiza web anonimizata prin
                  Google Analytics 4)
                </Item>
                <Item>Securitatea site-ului si prevenirea fraudei</Item>
                <Item>Apararea drepturilor noastre in cazuri de litigiu</Item>
              </ItemList>

              <SubHeading>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    background: '#F5F3FF',
                    color: '#7C3AED',
                    border: '1px solid #DDD6FE',
                    marginRight: 8,
                    verticalAlign: 'middle',
                  }}
                >
                  Obligatie legala
                </span>
                3.4. Obligatie legala (art. 6 alin. 1 lit. c GDPR)
              </SubHeading>
              <Para>Prelucram datele pentru indeplinirea obligatiilor legale, incluzand:</Para>
              <ItemList>
                <Item>Emiterea si arhivarea facturilor conform Codului fiscal</Item>
                <Item>
                  Respectarea obligatiilor din Legea contabilitatii nr. 82/1991
                </Item>
                <Item>Raspunsul la solicitarile autoritatilor competente</Item>
              </ItemList>
            </section>

            <SectionDivider />

            {/* Sectiunea 4 */}
            <section id="sectiunea-4" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-4">
                4. Destinatarii datelor cu caracter personal
              </SectionHeading>
              <Para>
                Nu vindem si nu comercializam datele tale cu caracter personal niciunui tert.
                Datele pot fi accesate sau prelucrate de:
              </Para>

              <SubHeading>4.1. Furnizori de servicii tehnice (operatori imputerniciti)</SubHeading>
              <ItemList>
                <Item>
                  Vercel Inc. (SUA) - infrastructura de hosting a site-ului inovex.ro, acoperit de
                  mecanismul de transfer Standard Contractual Clauses (SCC) conform GDPR
                </Item>
                <Item>
                  Google LLC (SUA) - servicii Google Analytics 4 (date anonimizate), Google Tag
                  Manager, Google Ads; acoperit de SCC
                </Item>
                <Item>
                  Resend Inc. (SUA) - serviciu de trimitere emailuri tranzactionale; acoperit de
                  SCC
                </Item>
                <Item>
                  Furnizorul de hosting cPanel pentru emailul contact@inovex.ro (server localizat
                  in Europa)
                </Item>
                <Item>
                  Payload CMS - sistem de gestionare a continutului si bazei de date, gazduit pe
                  servere Vercel
                </Item>
              </ItemList>

              <SubHeading>4.2. Autoritati publice</SubHeading>
              <Para>
                Datele pot fi divulgate autoritatilor publice (ANAF, instante judecatoresti, organe
                de urmarire penala) exclusiv in baza unor obligatii legale sau a unor hotarari
                judecatoresti.
              </Para>

              <SubHeading>4.3. Parteneri de afaceri</SubHeading>
              <Para>
                Nu impartasim datele tale cu parteneri de afaceri sau terti in scopuri de marketing
                fara consimtamantul tau explicit.
              </Para>

              <SubHeading>4.4. Transferuri internationale de date</SubHeading>
              <Para>
                Unii furnizori de servicii sunt localizati in Statele Unite ale Americii.
                Transferurile de date sunt realizate cu garantii adecvate, in conformitate cu
                Capitolul V din GDPR (Standard Contractual Clauses adoptate de Comisia Europeana).
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 5 */}
            <section id="sectiunea-5" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-5">
                5. Durata prelucrarii si criteriile de stabilire a perioadei de retentie
              </SectionHeading>

              <SubHeading>5.1. Date din formulare (oferta, contact, configuratoare)</SubHeading>
              <Para>
                Datele din formularele de pe site sunt pastrate timp de 2 (doi) ani de la data
                colectarii sau pana la retragerea consimtamantului, in cazul in care nu s-a
                perfectat un contract.
              </Para>

              <SubHeading>5.2. Date din relatia contractuala</SubHeading>
              <Para>
                Datele clientilor care au contractat servicii sunt pastrate timp de 5 (cinci) ani
                de la finalizarea contractului, conform termenelor de prescriptie din dreptul civil
                roman, si timp de 10 (zece) ani pentru documentele contabile, conform Legii
                contabilitatii nr. 82/1991.
              </Para>

              <SubHeading>5.3. Date din sectiunea Invata Gratuit (lead-uri)</SubHeading>
              <Para>
                Adresele de email colectate la descarcarea resurselor gratuite sunt pastrate timp
                de 2 (doi) ani sau pana la retragerea consimtamantului.
              </Para>

              <SubHeading>5.4. Date tehnice (log-uri, IP-uri)</SubHeading>
              <Para>
                Datele tehnice colectate automat sunt anonimizate sau sterse in maximum 14
                (paisprezece) luni, conform setarilor Google Analytics 4.
              </Para>

              <SubHeading>5.5. Date de acces la sisteme</SubHeading>
              <Para>
                Datele de acces la sistemele clientilor (parole, credentiale) sunt sterse imediat
                dupa predarea proiectului, conform practicii descrise in Termenii si Conditiile
                noastre.
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 6 */}
            <section id="sectiunea-6" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-6">
                6. Drepturile persoanei vizate
              </SectionHeading>
              <Para>
                In calitate de persoana vizata, ai urmatoarele drepturi garantate de Regulamentul
                (UE) 2016/679:
              </Para>

              <SubHeading>6.1. Dreptul de acces (art. 15 GDPR)</SubHeading>
              <Para>
                Ai dreptul de a obtine confirmarea ca prelucram sau nu date cu caracter personal
                care te privesc si, in caz afirmativ, acces la acele date si la informatii despre
                prelucrarea lor.
              </Para>

              <SubHeading>6.2. Dreptul la rectificare (art. 16 GDPR)</SubHeading>
              <Para>
                Ai dreptul de a obtine rectificarea datelor inexacte care te privesc sau
                completarea datelor incomplete.
              </Para>

              <SubHeading>
                6.3. Dreptul la stergere (&quot;dreptul de a fi uitat&quot;) (art. 17 GDPR)
              </SubHeading>
              <Para>
                Ai dreptul de a obtine stergerea datelor care te privesc, atunci cand: nu mai sunt
                necesare scopului pentru care au fost colectate, ti-ai retras consimtamantul, sau
                datele au fost prelucrate ilegal. Acest drept nu se aplica atunci cand prelucrarea
                este necesara pentru respectarea unei obligatii legale sau pentru apararea unui
                drept in instanta.
              </Para>

              <SubHeading>6.4. Dreptul la restrictionarea prelucrarii (art. 18 GDPR)</SubHeading>
              <Para>
                Ai dreptul de a obtine restrictionarea prelucrarii datelor tale in anumite
                circumstante prevazute de GDPR (contestarea exactitatii datelor, prelucrare ilegala
                etc.).
              </Para>

              <SubHeading>6.5. Dreptul la portabilitatea datelor (art. 20 GDPR)</SubHeading>
              <Para>
                Ai dreptul de a primi datele care te privesc, pe care ni le-ai furnizat, intr-un
                format structurat, utilizat in mod curent si care poate fi citit automat (JSON, CSV
                etc.) si de a transmite aceste date altui operator.
              </Para>

              <SubHeading>6.6. Dreptul la opozitie (art. 21 GDPR)</SubHeading>
              <Para>
                Ai dreptul de a te opune prelucrarii datelor tale in baza interesului legitim al
                operatorului. Inovex va inceta prelucrarea, cu exceptia cazului in care demonstreaza
                ca are motive legitime si imperioase care justifica prelucrarea.
              </Para>

              <SubHeading>
                6.7. Dreptul de a nu face obiectul unei decizii automate (art. 22 GDPR)
              </SubHeading>
              <Para>
                Inovex nu utilizeaza sisteme de decizie automatizata sau profilare care sa produca
                efecte juridice sau care sa te afecteze semnificativ.
              </Para>

              <SubHeading>6.8. Cum iti exerciti drepturile</SubHeading>
              <Para>
                Pentru exercitarea oricaruia dintre drepturile de mai sus, trimiti o solicitare
                scrisa la: contact@inovex.ro, cu subiectul &quot;Drepturi GDPR - [tipul
                solicitarii]&quot;.
              </Para>
              <Para>
                Vom raspunde in maximum 30 de zile calendaristice. Daca solicitarea este complexa
                sau avem un numar mare de solicitari, putem extinde termenul cu inca 60 de zile,
                cu notificarea ta in primele 30 de zile.
              </Para>
              <Para>
                Exercitarea drepturilor este gratuita. Daca solicitarile sunt vadit nefondate sau
                excesive, putem percepe o taxa administrativa rezonabila sau refuza sa actionam.
              </Para>

              <SubHeading>6.9. Dreptul de a depune plangere la autoritatea de supraveghere</SubHeading>
              <Para>
                Ai dreptul de a depune plangere la Autoritatea Nationala de Supraveghere a
                Prelucrarii Datelor cu Caracter Personal (ANSPDCP):
              </Para>
              <div
                style={{
                  background: '#F8FAFB',
                  border: '1px solid #E8ECF0',
                  borderLeft: '3px solid #2B8FCC',
                  borderRadius: 8,
                  padding: '16px 20px',
                  marginBottom: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0D1117', margin: 0 }}>
                  ANSPDCP
                </p>
                <p style={{ fontSize: '0.875rem', color: '#4A5568', margin: 0 }}>
                  Bd. G-ral. Gheorghe Magheru 28-30, sector 1, Bucuresti
                </p>
                <p style={{ fontSize: '0.875rem', color: '#4A5568', margin: 0 }}>
                  Email:{' '}
                  <a
                    href="mailto:anspdcp@dataprotection.ro"
                    style={{ color: '#2B8FCC' }}
                  >
                    anspdcp@dataprotection.ro
                  </a>
                </p>
                <p style={{ fontSize: '0.875rem', color: '#4A5568', margin: 0 }}>
                  Telefon: +40 31 805 9211
                </p>
                <p style={{ fontSize: '0.875rem', color: '#4A5568', margin: 0 }}>
                  Site:{' '}
                  <a
                    href="https://www.dataprotection.ro"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#2B8FCC' }}
                  >
                    www.dataprotection.ro
                  </a>
                </p>
              </div>
            </section>

            <SectionDivider />

            {/* Sectiunea 7 */}
            <section id="sectiunea-7" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-7">
                7. Cookie-uri si tehnologii de tracking
              </SectionHeading>
              <Para>
                Site-ul inovex.ro utilizeaza cookie-uri si tehnologii similare pentru functionarea
                corecta a site-ului si pentru analiza traficului.
              </Para>

              <SubHeading>7.1. Ce sunt cookie-urile</SubHeading>
              <Para>
                Cookie-urile sunt fisiere text mici stocate pe dispozitivul tau de browsing la
                accesarea unui site web. Ele permit site-ului sa memoreze preferintele tale si sa
                analizeze modul in care folosesti site-ul.
              </Para>

              <SubHeading>7.2. Tipurile de cookie-uri folosite</SubHeading>
              <ItemList>
                <Item>
                  a) Cookie-uri strict necesare: necesare pentru functionarea de baza a site-ului
                  (sesiune, securitate CSRF). Nu pot fi dezactivate.
                </Item>
                <Item>
                  b) Cookie-uri analitice: utilizam Google Analytics 4 pentru analiza anonimizata
                  a traficului. Adresele IP sunt anonimizate. Poti dezactiva aceste cookie-uri din
                  bannerul de cookie-uri.
                </Item>
                <Item>
                  c) Cookie-uri de marketing: utilizam Google Ads si TikTok Pixel pentru masurarea
                  eficientei campaniilor publicitare. Poti dezactiva aceste cookie-uri din bannerul
                  de cookie-uri.
                </Item>
              </ItemList>

              <SubHeading>7.3. Gestionarea cookie-urilor</SubHeading>
              <Para>
                La prima accesare a site-ului, esti informat despre utilizarea cookie-urilor prin
                intermediul unui banner de consimtamant. Poti accepta toate cookie-urile, le poti
                configura individual sau le poti refuza pe toate cele non-esentiale.
              </Para>
              <Para>
                Poti, de asemenea, gestiona cookie-urile direct din setarile browserului tau.
                Dezactivarea cookie-urilor poate afecta functionalitatea unor pagini ale site-ului.
              </Para>
              <Para>
                Informatii detaliate despre fiecare cookie utilizat sunt disponibile in Politica de
                Cookies de la https://inovex.ro/politica-cookies.
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 8 */}
            <section id="sectiunea-8" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-8">
                8. Masuri de securitate implementate
              </SectionHeading>
              <Para>
                Inovex implementeaza masuri tehnice si organizatorice adecvate pentru protejarea
                datelor cu caracter personal impotriva accesului neautorizat, modificarii, divulgarii
                sau distrugerii:
              </Para>
              <ItemList>
                <Item>
                  a) Toate comunicatiile intre browser si serverele noastre sunt criptate prin
                  protocol HTTPS cu certificat SSL/TLS valid
                </Item>
                <Item>
                  b) Accesul la baza de date si panoul de administrare este restrictionat si
                  protejat prin autentificare cu parola robusta
                </Item>
                <Item>
                  c) Parolele utilizatorilor sunt stocate exclusiv in format criptat (hash + salt),
                  niciodata in text simplu
                </Item>
                <Item>
                  d) Serverele sunt gazduite la furnizori cu certificari de securitate recunoscute
                  (Vercel, care opereaza pe infrastructura AWS)
                </Item>
                <Item>
                  e) Backup-urile bazei de date sunt realizate automat si stocate in locatii
                  separate
                </Item>
                <Item>
                  f) Accesul intern la datele personale este limitat la personalul care are nevoie
                  de aceste date pentru prestarea serviciilor
                </Item>
              </ItemList>

              <SubHeading>8.1. Notificarea in caz de incident de securitate</SubHeading>
              <Para>
                In cazul unui incident de securitate care implica date cu caracter personal si care
                prezinta un risc pentru drepturile si libertatile persoanelor vizate, Inovex va
                notifica ANSPDCP in maximum 72 de ore de la luarea la cunostinta a incidentului,
                conform art. 33 din GDPR.
              </Para>
              <Para>
                Persoanele vizate vor fi notificate fara intarziere nejustificata, daca incidentul
                prezinta un risc ridicat pentru drepturile si libertatile lor, conform art. 34 din
                GDPR.
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 9 */}
            <section id="sectiunea-9" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-9">
                9. Protectia datelor minorilor
              </SectionHeading>
              <Para>
                Site-ul inovex.ro si serviciile Inovex nu sunt destinate persoanelor cu varsta sub
                16 (saisprezece) ani. Nu colectam in mod intentionat date cu caracter personal ale
                minorilor.
              </Para>
              <Para>
                Daca esti parinte sau tutore legal si ai descoperit ca minorul aflat in grija ta a
                furnizat date personale pe site-ul nostru fara consimtamantul tau, te rugam sa ne
                contactezi la contact@inovex.ro. Vom sterge acele date in cel mai scurt timp
                posibil.
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 10 */}
            <section id="sectiunea-10" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-10">
                10. Site-uri terte si responsabilitate
              </SectionHeading>
              <Para>
                Site-ul inovex.ro poate contine linkuri spre site-uri web operate de terti
                (parteneri, clienti, resurse externe). Inovex nu este responsabila pentru practicile
                de confidentialitate ale acestor site-uri si nu controleaza modul in care acestea
                colecteaza sau utilizeaza datele tale personale.
              </Para>
              <Para>
                Te incurajam sa citesti politica de confidentialitate a oricarui site tert pe care
                il vizitezi prin intermediul link-urilor de pe site-ul nostru.
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 11 */}
            <section id="sectiunea-11" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-11">
                11. Actualizarea prezentului document
              </SectionHeading>
              <Para>
                Inovex poate actualiza periodic aceasta Politica de Confidentialitate pentru a
                reflecta modificari legislative, schimbari in practicile noastre de prelucrare sau
                alte motive operationale.
              </Para>
              <Para>
                Data ultimei modificari este indicata la inceputul documentului. Continuarea
                utilizarii site-ului sau a serviciilor noastre dupa publicarea unei versiuni
                actualizate constituie acceptarea noilor prevederi.
              </Para>
              <Para>
                Pentru modificarile semnificative care afecteaza drepturile tale, vom face eforturi
                rezonabile pentru a te notifica prin email (daca ne-ai furnizat adresa) sau prin
                afisarea unui banner prominent pe site.
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 12 */}
            <section id="sectiunea-12" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-12">
                12. Contact pentru probleme de confidentialitate
              </SectionHeading>
              <Para>
                Pentru orice intrebare, solicitare sau plangere legata de prelucrarea datelor tale
                cu caracter personal, ne poti contacta:
              </Para>

              <div
                style={{
                  background: '#EAF5FF',
                  border: '1px solid #C8E6F8',
                  borderRadius: 12,
                  padding: '24px',
                  marginBottom: 24,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: '#0D1117',
                    marginBottom: 16,
                    marginTop: 0,
                  }}
                >
                  Contacteaza-ne pentru GDPR
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <a
                    href="mailto:contact@inovex.ro?subject=GDPR%20-%20Solicitarea%20mea"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#2B8FCC',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      textDecoration: 'none',
                    }}
                  >
                    <Mail size={15} />
                    contact@inovex.ro
                  </a>
                  <a
                    href="tel:+40750456096"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: '#2B8FCC',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      textDecoration: 'none',
                    }}
                  >
                    <Phone size={15} />
                    0750 456 096
                  </a>
                </div>
                <div style={{ marginTop: 16 }}>
                  <a
                    href="mailto:contact@inovex.ro?subject=GDPR%20-%20Solicitarea%20mea"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: '#2B8FCC',
                      color: '#fff',
                      padding: '10px 20px',
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    Trimite solicitare GDPR
                  </a>
                </div>
              </div>

              <Para>
                Termenul de raspuns: maximum 30 (treizeci) de zile calendaristice de la primirea
                solicitarii tale, conform art. 12 alin. 3 din GDPR.
              </Para>
              <Para>
                Daca nu esti multumit de raspunsul nostru sau considerati ca datele tale sunt
                prelucrate in mod ilegal, ai dreptul de a depune plangere la ANSPDCP
                (https://www.dataprotection.ro) sau de a te adresa instantelor judecatoresti
                competente.
              </Para>
              <Para>
                Prezenta Politica de Confidentialitate a fost redactata in conformitate cu
                Regulamentul (UE) 2016/679 (GDPR) si cu legislatia romana aplicabila in vigoare la
                data: 1 aprilie 2026.
              </Para>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}
