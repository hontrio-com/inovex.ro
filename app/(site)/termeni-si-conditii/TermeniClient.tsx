'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Scale, Download, Link2, AlertTriangle } from 'lucide-react';
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
  { id: 'sectiunea-1', label: 'Informatii despre operator' },
  { id: 'sectiunea-2', label: 'Acceptarea termenilor' },
  { id: 'sectiunea-3', label: 'Servicii oferite' },
  { id: 'sectiunea-4', label: 'Preturi si modalitati de plata' },
  { id: 'sectiunea-5', label: 'Livrare si termene' },
  { id: 'sectiunea-6', label: 'Garantie post-lansare' },
  { id: 'sectiunea-7', label: 'Proprietate intelectuala si drepturi de autor' },
  { id: 'sectiunea-8', label: 'Confidentialitate si date de acces' },
  { id: 'sectiunea-9', label: 'Rezilierea contractului' },
  { id: 'sectiunea-10', label: 'Limitarea raspunderii' },
  { id: 'sectiunea-11', label: 'Forta majora' },
  { id: 'sectiunea-12', label: 'Marketplace Inovex' },
  { id: 'sectiunea-13', label: 'Solutionarea litigiilor' },
  { id: 'sectiunea-14', label: 'Dispozitii finale' },
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

function SubArticle({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontWeight: 600,
        color: '#0D1117',
        marginTop: 20,
        marginBottom: 8,
        fontSize: '0.9375rem',
        lineHeight: 1.6,
      }}
    >
      {children}
    </p>
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
    name: 'Termeni si Conditii',
    description:
      'Termenii si conditiile de utilizare a serviciilor si site-ului Inovex, operat de VOID SFT GAMES SRL, CUI RO43474393.',
    url: 'https://inovex.ro/termeni-si-conditii',
    publisher: {
      '@type': 'Organization',
      name: 'Inovex',
      legalName: 'VOID SFT GAMES SRL',
      url: 'https://inovex.ro',
    },
    dateModified: '2026-04-01',
    inLanguage: 'ro',
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

export default function TermeniClient() {
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
          <span>Termeni si Conditii</span>
        </nav>

        {/* Badge */}
        <div style={{ marginBottom: 16 }}>
          <Badge variant="outline" className="no-print">
            <Scale size={13} />
            Document legal
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
          Termeni si Conditii
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

        {/* Alert */}
        <div
          className="no-print"
          style={{
            background: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: 8,
            padding: '12px 16px',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            marginBottom: 40,
          }}
        >
          <AlertTriangle size={16} color="#B45309" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#92400E', margin: 0 }}>
            Te rugam sa citesti cu atentie acest document inainte de a utiliza serviciile sau
            site-ul Inovex. Prin accesarea site-ului sau contractarea oricarui serviciu, esti de
            acord cu acesti termeni.
          </p>
        </div>

        {/* Mobile accordion TOC */}
        <div className="lg:hidden no-print" style={{ marginBottom: 32 }}>
          <Accordion type="single" collapsible>
            <AccordionItem value="toc">
              <AccordionTrigger>Cuprins (14 sectiuni)</AccordionTrigger>
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
              <SectionHeading id="sectiunea-1">1. Informatii despre operator</SectionHeading>
              <Para>
                Site-ul inovex.ro este operat de VOID SFT GAMES SRL, societate cu raspundere
                limitata inregistrata in conformitate cu legislatia din Romania, cu sediul social
                in judetul Gorj, cod unic de inregistrare RO43474393, inregistrata la Registrul
                Comertului.
              </Para>
              <div
                style={{
                  background: '#F8FAFB',
                  border: '1px solid #E8ECF0',
                  borderRadius: 12,
                  padding: '16px 20px',
                  marginTop: 16,
                  marginBottom: 16,
                }}
              >
                <ItemList>
                  <Item><strong>Denumire comerciala:</strong> Inovex</Item>
                  <Item><strong>Persoana juridica:</strong> VOID SFT GAMES SRL</Item>
                  <Item><strong>CUI:</strong> RO43474393</Item>
                  <Item><strong>Sediu:</strong> Targu Jiu, judetul Gorj, Romania</Item>
                  <Item>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:contact@inovex.ro" style={{ color: '#2B8FCC' }}>
                      contact@inovex.ro
                    </a>
                  </Item>
                  <Item><strong>Telefon:</strong> 0750 456 096</Item>
                  <Item>
                    <strong>Site:</strong>{' '}
                    <a href="https://inovex.ro" style={{ color: '#2B8FCC' }}>
                      https://inovex.ro
                    </a>
                  </Item>
                </ItemList>
              </div>
              <Para>
                Inovex ofera servicii de creare si dezvoltare web, incluzand magazine online,
                website-uri de prezentare, aplicatii web si mobile, sisteme CRM/ERP/CMS si
                implementare de automatizari cu inteligenta artificiala, destinate persoanelor
                fizice si juridice.
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 2 */}
            <section id="sectiunea-2" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-2">2. Acceptarea termenilor</SectionHeading>
              <Para>
                Prin accesarea si utilizarea site-ului inovex.ro sau prin contractarea oricarui
                serviciu oferit de VOID SFT GAMES SRL sub marca Inovex, confirmi ca ai citit, ai
                inteles si esti de acord sa respecti acesti Termeni si Conditii in integralitatea
                lor.
              </Para>
              <Para>
                Daca nu esti de acord cu oricare dintre prevederile prezentului document, te
                rugam sa nu utilizezi site-ul si sa nu contractezi serviciile noastre.
              </Para>
              <Para>
                Prezentul document constituie un acord juridic valabil intre tine (persoana fizica
                sau juridica, denumita in continuare &ldquo;Client&rdquo;) si VOID SFT GAMES SRL
                (denumita in continuare &ldquo;Inovex&rdquo; sau &ldquo;Prestatorul&rdquo;).
              </Para>
              <Para>
                Inovex isi rezerva dreptul de a modifica acesti termeni in orice moment, cu
                notificarea utilizatorilor prin publicarea versiunii actualizate pe site.
                Continuarea utilizarii serviciilor dupa publicarea modificarilor constituie
                acceptarea noilor termeni.
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 3 */}
            <section id="sectiunea-3" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-3">3. Servicii oferite</SectionHeading>
              <Para>
                Inovex ofera, fara a se limita la, urmatoarele categorii de servicii:
              </Para>
              <ItemList>
                <Item>
                  a) Creare magazine online la cheie, incluzand design personalizat, integrare
                  procesatori de plata, integrare firme de curierat, integrare softuri de
                  facturare si optimizare SEO;
                </Item>
                <Item>
                  b) Creare website-uri de prezentare, incluzand design personalizat, sistem de
                  administrare a continutului si optimizare pentru motoarele de cautare;
                </Item>
                <Item>
                  c) Dezvoltare aplicatii web si platforme SaaS, incluzand sisteme de autentificare,
                  dashboard-uri, API-uri si infrastructura cloud;
                </Item>
                <Item>
                  d) Implementare sisteme CRM, CMS si ERP personalizate, adaptate proceselor interne
                  ale clientului;
                </Item>
                <Item>e) Dezvoltare aplicatii mobile pentru platformele iOS si Android;</Item>
                <Item>
                  f) Implementare automatizari cu inteligenta artificiala, incluzand chatboti,
                  procesare automata documente si fluxuri de automatizare;
                </Item>
                <Item>
                  g) Produse digitale disponibile in Marketplace-ul Inovex, incluzand template-uri
                  si solutii web preconfigurate.
                </Item>
              </ItemList>
              <Para>
                Toate serviciile sunt prestate in baza unui contract individual semnat cu fiecare
                client, care detaliaza specificatiile tehnice, termenele de livrare si modalitatile
                de plata aplicabile proiectului respectiv. Prezentul document se aplica in
                completarea contractului individual si nu il inlocuieste.
              </Para>
            </section>

            <SectionDivider />

            {/* Sectiunea 4 */}
            <section id="sectiunea-4" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-4">4. Preturi si modalitati de plata</SectionHeading>
              <SubArticle>
                4.1. Preturile serviciilor Inovex sunt stabilite individual pentru fiecare proiect,
                in functie de complexitate, volum de munca si specificatiile tehnice agreate. Niciun
                pret nu este afisat pe site, deoarece fiecare proiect este unic si necesita o
                evaluare individuala.
              </SubArticle>
              <SubArticle>4.2. Modalitati de plata acceptate:</SubArticle>
              <ItemList>
                <Item>a) Plata integrala in avans, inainte de inceperea lucrarilor;</Item>
                <Item>
                  b) Plata in transe: avans de minimum 20% (douazeci la suta) din valoarea totala a
                  contractului, achitat inainte de inceperea lucrarilor, diferenta urmand a fi
                  achitata la livrarea finala a proiectului, inainte de predarea accesurilor.
                </Item>
              </ItemList>
              <SubArticle>
                4.3. Facturile emise de Inovex au termen de plata de 5 (cinci) zile lucratoare de la
                data emiterii, daca nu este prevazut altfel in contractul individual.
              </SubArticle>
              <SubArticle>
                4.4. Neachitarea facturilor la termen atrage aplicarea de penalitati de intarziere in
                cuantum de 0,1% (zero virgula unu la suta) din valoarea facturii neachitate, pentru
                fiecare zi de intarziere, incepand cu prima zi dupa scadenta.
              </SubArticle>
              <SubArticle>
                4.5. Inovex are dreptul de a suspenda lucrarile in cazul neplatii facturilor la
                termen, fara a fi considerata responsabila pentru eventualele prejudicii rezultate
                din aceasta suspendare.
              </SubArticle>
              <SubArticle>
                4.6. Predarea livrabilelor finale, inclusiv accesurile la cont, codul sursa si
                documentatia, se realizeaza exclusiv dupa achitarea integrala a sumelor datorate.
              </SubArticle>
              <SubArticle>
                4.7. Preturile afisate sau comunicate sunt exprimate fara TVA, daca nu este
                specificat altfel. TVA se aplica conform legislatiei fiscale in vigoare.
              </SubArticle>
            </section>

            <SectionDivider />

            {/* Sectiunea 5 */}
            <section id="sectiunea-5" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-5">5. Livrare si termene</SectionHeading>
              <SubArticle>
                5.1. Termenele de livrare sunt stabilite in contractul individual semnat cu fiecare
                client si incep sa curga de la data achitarii avansului si primirea tuturor
                materialelor necesare de la client (texte, imagini, date de acces, specificatii
                tehnice etc.).
              </SubArticle>
              <SubArticle>
                5.2. Inovex depune toate eforturile rezonabile pentru respectarea termenelor de
                livrare agreate. Cu toate acestea, termenele pot fi afectate de:
              </SubArticle>
              <ItemList>
                <Item>
                  a) Intarzierea clientului in furnizarea materialelor sau feedback-ului solicitat;
                </Item>
                <Item>
                  b) Modificari ale specificatiilor tehnice solicitate de client pe parcursul
                  proiectului;
                </Item>
                <Item>
                  c) Factori externi independenti de vointa Inovex (cazuri de forta majora, probleme
                  ale furnizorilor terti etc.).
                </Item>
              </ItemList>
              <SubArticle>
                5.3. Inovex va notifica clientul in timp util cu privire la orice intarziere
                previzibila si va propune un nou termen de livrare rezonabil.
              </SubArticle>
              <SubArticle>
                5.4. Clientul beneficiaza de o perioada de revizuire si aprobare de minimum 5
                (cinci) zile lucratoare pentru fiecare livrabil primit. Lipsa unui raspuns in
                termenul de revizuire agreat constituie acceptare tacita a livrabilului respectiv.
              </SubArticle>
              <SubArticle>
                5.5. Livrarea finala se considera efectuata la data predarii accesurilor si
                documentatiei complete, dupa achitarea integrala a valorii contractului.
              </SubArticle>
            </section>

            <SectionDivider />

            {/* Sectiunea 6 */}
            <section id="sectiunea-6" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-6">6. Garantie post-lansare</SectionHeading>
              <SubArticle>
                6.1. Inovex ofera o perioada de garantie de 30 (treizeci) de zile calendaristice de
                la data livrarii finale a proiectului, in cadrul careia remediaza gratuit orice
                defect sau eroare de functionare constatata, care nu este cauzata de:
              </SubArticle>
              <ItemList>
                <Item>
                  a) Modificari efectuate de client sau de terti asupra codului sursa sau
                  configuratiei sistemului, fara acordul prealabil al Inovex;
                </Item>
                <Item>
                  b) Actualizari ale platformelor terte (WordPress, WooCommerce, sisteme de operare,
                  browsere) efectuate dupa livrarea finala;
                </Item>
                <Item>
                  c) Utilizarea incorecta a sistemului de catre client sau angajatii acestuia;
                </Item>
                <Item>
                  d) Atacuri informatice, malware sau acces neautorizat la sistemele clientului;
                </Item>
                <Item>
                  e) Probleme de infrastructura apartinand furnizorului de hosting ales de client.
                </Item>
              </ItemList>
              <SubArticle>
                6.2. Cererile de garantie se transmit la contact@inovex.ro cu descrierea detaliata a
                problemei constatate. Inovex va raspunde in maximum 2 (doua) zile lucratoare si va
                remedia problema in termenul comunicat.
              </SubArticle>
              <SubArticle>
                6.3. Garantia acopera exclusiv functionalitatile agreate in contractul initial.
                Solicitarile de functionalitati noi sau modificari ale celor existente nu intra in
                sfera garantiei si se trateaza ca proiecte noi.
              </SubArticle>
              <SubArticle>
                6.4. Dupa expirarea perioadei de garantie, serviciile de mentenanta si suport sunt
                disponibile contra cost, in baza unui contract separat de mentenanta.
              </SubArticle>
            </section>

            <SectionDivider />

            {/* Sectiunea 7 */}
            <section id="sectiunea-7" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-7">
                7. Proprietate intelectuala si drepturi de autor
              </SectionHeading>
              <SubArticle>
                7.1. La achitarea integrala a valorii contractului si livrarea finala a proiectului,
                clientul dobandeste drepturile de utilizare complete asupra tuturor elementelor
                create de Inovex in cadrul proiectului, incluzand design-ul grafic, codul sursa,
                structura bazei de date si documentatia tehnica.
              </SubArticle>
              <SubArticle>
                7.2. Transferul drepturilor prevazut la articolul 7.1 se refera exclusiv la
                elementele create de Inovex specific pentru proiectul clientului. Nu include:
              </SubArticle>
              <ItemList>
                <Item>
                  a) Librariile, framework-urile si componentele software open-source utilizate, care
                  raman supuse licentelor proprii ale acestora (MIT, GPL, Apache etc.);
                </Item>
                <Item>
                  b) Temele, plugin-urile sau componentele terte achizitionate separat, care raman
                  supuse licentelor emitentilor respectivi;
                </Item>
                <Item>
                  c) Elementele grafice sau fotografiile achizitionate de la terti (banci de imagini,
                  licente de font etc.), care raman supuse conditiilor de licentiere ale furnizorilor
                  respectivi.
                </Item>
              </ItemList>
              <SubArticle>
                7.3. Inovex isi rezerva dreptul de a prezenta proiectele finalizate in portofoliul
                propriu (site, retele sociale, materiale de marketing), cu exceptia cazului in care
                clientul solicita in scris confidentialitate in privinta acestora, inainte de
                semnarea contractului.
              </SubArticle>
              <SubArticle>
                7.4. Clientul garanteaza ca materialele furnizate Inovex pentru realizarea
                proiectului (texte, imagini, logo-uri, brand assets) nu incalca drepturile de autor
                ale tertilor. Orice raspundere decurgand din utilizarea de materiale furnizate de
                client fara drepturi legale revine exclusiv clientului.
              </SubArticle>
              <SubArticle>
                7.5. Este interzisa reproducerea, distribuirea sau modificarea continutului
                site-ului inovex.ro (texte, imagini, logo, design) fara acordul scris prealabil al
                VOID SFT GAMES SRL.
              </SubArticle>
            </section>

            <SectionDivider />

            {/* Sectiunea 8 */}
            <section id="sectiunea-8" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-8">
                8. Confidentialitate si date de acces
              </SectionHeading>
              <SubArticle>
                8.1. Pe durata prestarii serviciilor, Inovex poate avea acces la date de acces ale
                clientului (hosting, domeniu, conturi de email, retele sociale, procesatori de plata
                etc.). Aceste date sunt tratate ca strict confidentiale si utilizate exclusiv in
                scopul realizarii proiectului contractat.
              </SubArticle>
              <SubArticle>
                8.2. La finalizarea proiectului, Inovex preda clientului toate datele de acces
                create sau gestionate in cadrul proiectului. Clientul este responsabil sa schimbe
                parolele imediat dupa predare.
              </SubArticle>
              <SubArticle>
                8.3. Inovex nu stocheaza si nu arhiveaza date de acces dupa finalizarea proiectului
                si predarea acestora. Nu se poate considera responsabila pentru incidente de
                securitate survenite ca urmare a neschimbarii parolelor de catre client dupa predare.
              </SubArticle>
              <SubArticle>
                8.4. Ambele parti se obliga sa pastreze confidentialitatea informatiilor comerciale,
                tehnice si financiare ale celeilalte parti, la care iau cunostinta pe durata
                colaborarii, atat pe durata contractului cat si pentru o perioada de 2 (doi) ani
                dupa incetarea acestuia.
              </SubArticle>
              <SubArticle>
                8.5. Prelucrarea datelor cu caracter personal se realizeaza conform Politicii de
                Confidentialitate disponibile la{' '}
                <a href="https://inovex.ro/politica-de-confidentialitate" style={{ color: '#2B8FCC' }}>
                  https://inovex.ro/politica-de-confidentialitate
                </a>
                , care face parte integranta din prezentul document.
              </SubArticle>
            </section>

            <SectionDivider />

            {/* Sectiunea 9 */}
            <section id="sectiunea-9" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-9">9. Rezilierea contractului</SectionHeading>
              <SubArticle>
                9.1. Clientul poate rezilia contractul in orice moment, cu notificarea scrisa a
                Inovex. In acest caz:
              </SubArticle>
              <ItemList>
                <Item>
                  a) Avansul achitat este retinut integral de Inovex, ca despagubire pentru munca
                  depusa si resursele alocate proiectului;
                </Item>
                <Item>
                  b) Daca lucrarile au depasit valoarea avansului achitat, clientul datoreaza plata
                  pentru munca efectuata pana la data rezilierii, calculata proportional cu stadiul
                  de avansare al proiectului;
                </Item>
                <Item>
                  c) Inovex preda clientului toate materialele si livrabilele realizate pana la data
                  rezilierii, in starea in care se gasesc la acel moment.
                </Item>
              </ItemList>
              <SubArticle>
                9.2. Inovex poate rezilia contractul cu notificarea scrisa a clientului, cu minim 15
                (cincisprezece) zile calendaristice in avans, in cazuri justificate (imposibilitate
                obiectiva de executare, comportament abuziv al clientului, furnizarea de informatii
                false la incheierea contractului). In acest caz, Inovex returneaza avansul achitat
                minus valoarea muncii deja efectuate.
              </SubArticle>
              <SubArticle>
                9.3. Inovex poate rezilia contractul fara preaviz si fara restituirea avansului in
                cazul in care clientul solicita realizarea de continut ilegal, care promoveaza
                activitati ilegale, care incalca drepturile tertilor sau care contravine bunelor
                moravuri.
              </SubArticle>
              <SubArticle>
                9.4. Rezilierea contractului nu afecteaza obligatiile de plata scadente anterior
                rezilierii.
              </SubArticle>
            </section>

            <SectionDivider />

            {/* Sectiunea 10 */}
            <section id="sectiunea-10" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-10">10. Limitarea raspunderii</SectionHeading>
              <SubArticle>
                10.1. Inovex raspunde pentru prejudiciile directe cauzate clientului prin
                neindeplinirea sau indeplinirea necorespunzatoare a obligatiilor contractuale, in
                limita valorii totale a contractului in cauza.
              </SubArticle>
              <SubArticle>10.2. Inovex nu raspunde pentru:</SubArticle>
              <ItemList>
                <Item>
                  a) Prejudicii indirecte, pierderi de profit, pierderi de date sau pierderi de
                  oportunitate de afaceri ale clientului;
                </Item>
                <Item>
                  b) Defectiuni sau indisponibilitatea serviciilor tertilor de care depinde
                  functionarea proiectului (hosting, servicii email, procesatori de plata, API-uri
                  terte, CDN etc.);
                </Item>
                <Item>
                  c) Prejudicii rezultate din utilizarea necorespunzatoare a proiectului livrat de
                  catre client sau angajatii acestuia;
                </Item>
                <Item>
                  d) Pierderea de date cauzata de lipsa backup-urilor sau de configurarea
                  necorespunzatoare a infrastructurii de catre client;
                </Item>
                <Item>
                  e) Atacuri informatice, vulnerabilitati de securitate sau acces neautorizat la
                  sistemele clientului, survenite dupa livrarea finala si predarea accesurilor;
                </Item>
                <Item>
                  f) Modificarile legislative sau de politici ale platformelor terte (Google, Meta,
                  Apple, Google Play etc.) care afecteaza functionarea proiectului livrat.
                </Item>
              </ItemList>
              <SubArticle>
                10.3. Site-ul inovex.ro poate contine linkuri spre site-uri terte. Inovex nu este
                responsabila pentru continutul, politicile de confidentialitate sau practicile
                acestor site-uri.
              </SubArticle>
              <SubArticle>
                10.4. Inovex depune eforturi rezonabile pentru a mentine site-ul inovex.ro disponibil
                si functional, dar nu garanteaza disponibilitatea neintrerupta a acestuia.
              </SubArticle>
            </section>

            <SectionDivider />

            {/* Sectiunea 11 */}
            <section id="sectiunea-11" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-11">11. Forta majora</SectionHeading>
              <SubArticle>
                11.1. Niciuna dintre parti nu raspunde pentru neexecutarea sau executarea cu
                intarziere a obligatiilor contractuale, daca aceasta este cauzata de un eveniment de
                forta majora, conform definitiei din Codul Civil Roman.
              </SubArticle>
              <SubArticle>
                11.2. Constituie forta majora, fara a se limita la: calamitati naturale, pandemii
                declarate de autoritatile competente, conflicte armate, acte de terorism, greve
                generale, intreruperi ale furnizarii de energie sau servicii de internet la nivel
                national sau regional, acte ale autoritatilor publice care impiedica executarea
                contractului.
              </SubArticle>
              <SubArticle>
                11.3. Partea afectata de forta majora are obligatia de a notifica cealalta parte in
                scris in maximum 5 (cinci) zile calendaristice de la producerea evenimentului,
                indicand natura acestuia si durata estimata.
              </SubArticle>
              <SubArticle>
                11.4. Daca evenimentul de forta majora dureaza mai mult de 60 (saizeci) de zile
                calendaristice, oricare dintre parti poate rezilia contractul, cu returnarea
                proportionala a sumelor achitate pentru servicii neefectuate.
              </SubArticle>
            </section>

            <SectionDivider />

            {/* Sectiunea 12 */}
            <section id="sectiunea-12" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-12">12. Marketplace Inovex</SectionHeading>
              <SubArticle>
                12.1. Marketplace-ul Inovex ofera produse digitale (template-uri de website si
                magazine online) preconfigurate, disponibile pentru achizitie si personalizare.
              </SubArticle>
              <SubArticle>
                12.2. Produsele din Marketplace sunt vandute in regim de licenta de utilizare. La
                achizitie, cumparatorul dobandeste dreptul de utilizare a produsului pentru un singur
                proiect/domeniu, daca nu este specificat altfel in descrierea produsului.
              </SubArticle>
              <SubArticle>
                12.3. Produsele din Marketplace sunt furnizate &ldquo;ca atare&rdquo; (as-is), cu
                personalizare in limita specificata in descrierea produsului. Garantia de 30 de zile
                se aplica si pentru produsele din Marketplace, acoperind functionarea corecta a
                functionalitatilor descrise.
              </SubArticle>
              <SubArticle>
                12.4. Produsele marcate ca &ldquo;Exclusiv&rdquo; sau cu licenta exclusiva sunt
                vandute o singura data. Dupa vanzare, produsul este marcat ca indisponibil si nu mai
                poate fi achizitionat de alti cumparatori.
              </SubArticle>
              <SubArticle>
                12.5. Nu se admit retururi pentru produsele digitale din Marketplace, conform
                exceptiei prevazute la art. 16 lit. m) din OUG 34/2014, pentru continut digital
                furnizat altfel decat pe un suport material, a carui executare a inceput cu acordul
                prealabil al consumatorului.
              </SubArticle>
              <SubArticle>
                12.6. Preturile din Marketplace includ TVA, daca este aplicabil, si sunt afisate in
                EUR. Facturarea se realizeaza in RON, la cursul BNR din data facturarii.
              </SubArticle>
            </section>

            <SectionDivider />

            {/* Sectiunea 13 */}
            <section id="sectiunea-13" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-13">13. Solutionarea litigiilor</SectionHeading>
              <SubArticle>
                13.1. Prezentul document este guvernat de si interpretat in conformitate cu
                legislatia din Romania.
              </SubArticle>
              <SubArticle>
                13.2. Orice litigiu, disputa sau pretentie decurgand din sau in legatura cu prezentul
                document sau serviciile Inovex, se va solutiona cu prioritate pe cale amiabila, prin
                negociere directa intre parti.
              </SubArticle>
              <SubArticle>
                13.3. Termenul pentru solutionarea amiabila este de 30 (treizeci) de zile
                calendaristice de la data notificarii scrise a litigiului de catre oricare dintre
                parti.
              </SubArticle>
              <SubArticle>
                13.4. Daca solutionarea amiabila nu este posibila in termenul prevazut la articolul
                13.3, litigiul va fi solutionat de instantele judecatoresti competente din
                circumscriptia Tribunalului Gorj, cu sediul in Targu Jiu, judetul Gorj, Romania.
              </SubArticle>
              <SubArticle>
                13.5. Consumatorii persoane fizice au, de asemenea, dreptul de a accesa platforma
                europeana de solutionare online a litigiilor (SOL), disponibila la{' '}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2B8FCC' }}
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                .
              </SubArticle>
              <SubArticle>
                13.6. ANPC (Autoritatea Nationala pentru Protectia Consumatorilor) poate fi sesizata
                de consumatori la adresa{' '}
                <a
                  href="https://anpc.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2B8FCC' }}
                >
                  https://anpc.ro
                </a>{' '}
                sau la numarul de telefon 0219551.
              </SubArticle>
            </section>

            <SectionDivider />

            {/* Sectiunea 14 */}
            <section id="sectiunea-14" style={{ paddingTop: 72, marginTop: -24 }}>
              <SectionHeading id="sectiunea-14">14. Dispozitii finale</SectionHeading>
              <SubArticle>
                14.1. Daca oricare dintre prevederile prezentului document este declarata nula sau
                inaplicabila, celelalte prevederi raman valabile si producatoare de efecte juridice.
              </SubArticle>
              <SubArticle>
                14.2. Neutilizarea de catre Inovex a oricarui drept prevazut in prezentul document nu
                constituie o renuntare la acel drept.
              </SubArticle>
              <SubArticle>
                14.3. Prezentul document, impreuna cu contractul individual semnat si Politica de
                Confidentialitate disponibila pe site, reprezinta acordul complet dintre parti cu
                privire la obiectul sau si inlocuieste orice negocieri, intelegeri sau acorduri
                anterioare.
              </SubArticle>
              <SubArticle>
                14.4. Orice comunicare oficiala intre parti se realizeaza in scris, prin email, la
                adresele mentionate in contractul individual sau prin scrisoare recomandata cu
                confirmare de primire.
              </SubArticle>
              <SubArticle>
                14.5. Prezentul document a fost redactat in conformitate cu legislatia romana in
                vigoare la data: 1 aprilie 2026.
              </SubArticle>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}
