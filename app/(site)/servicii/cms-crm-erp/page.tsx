import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import HeroCrm from '@/components/servicii/crm/HeroCrm';
import DemoCrm from '@/components/servicii/crm/DemoCrm';
import FeaturesCrm from '@/components/servicii/crm/FeaturesCrm';
import PentruCine from '@/components/servicii/crm/PentruCine';
import ProcessCrm from '@/components/servicii/crm/ProcessCrm';
import StudiiDeCaz from '@/components/servicii/crm/StudiiDeCaz';
import { FAQ } from '@/components/sections/FAQ';
import CTACrm from '@/components/servicii/crm/CTACrm';

export const metadata: Metadata = {
  title: 'CRM, CMS & ERP Custom - Software de Management la Cheie',
  description:
    'Construim sisteme de management adaptate exact proceselor tale: CRM pentru vanzari, ERP pentru operatiuni, CMS pentru continut. Analiza, dezvoltare, training si suport - totul inclus. Solicita oferta gratuita.',
  alternates: { canonical: 'https://inovex.ro/servicii/cms-crm-erp' },
  openGraph: {
    title: 'CRM, CMS & ERP Custom - Software de Management',
    description:
      'Sisteme de management adaptate proceselor tale. CRM, ERP, CMS custom cu training inclus.',
    images: [{ url: '/images/og/cms-crm-erp.jpg', width: 1200, height: 630 }],
  },
};

const FAQ_ITEMS = [
  {
    id: '1',
    q: 'Cat dureaza construirea unui CRM sau ERP custom?',
    a: 'Un sistem cu functionalitatile de baza se livreaza in 8-14 saptamani. Un ERP complet cu toate modulele poate dura 4-8 luni. Stabilim timeline-ul exact dupa sesiunea de analiza a proceselor, cu milestone-uri clare si demo-uri la fiecare etapa.',
  },
  {
    id: '2',
    q: 'De ce nu folosim un software existent, gen Salesforce sau SAP?',
    a: 'Salesforce si SAP sunt excelente pentru corporatii cu bugete de sute de mii de euro si echipe dedicate de implementare. Pentru un IMM romanesc, costul de licente, implementare si training depaseste adesea costul unui sistem custom construit exact pe nevoile tale, pe care il stapanesti complet.',
  },
  {
    id: '3',
    q: 'Ce se intampla daca vrem sa adaugam module noi ulterior?',
    a: 'Proiectam arhitectura de la start sa permita extindere usoara. Fiecare modul nou se adauga fara a rescrie ce exista deja. Poti incepe cu CRM-ul si adauga ERP-ul 6 luni mai tarziu cand esti pregatit.',
  },
  {
    id: '4',
    q: 'Cine va folosi sistemul? Trebuie sa fie tehnic?',
    a: 'Sistemul este proiectat pentru utilizatori non-tehnici. Interfata se adapteaza rolului fiecaruia: un agent de vanzari vede altceva decat un manager sau un contabil. Includem training complet si documentatie pas cu pas pentru fiecare rol.',
  },
  {
    id: '5',
    q: 'Datele noastre sunt in siguranta?',
    a: 'Da. Sistemul ruleaza pe infrastructura ta sau pe cloud privat, nu pe servere partajate. Backup zilnic automat, criptare date la rest si in tranzit, audit log complet si conformitate GDPR sunt incluse standard.',
  },
  {
    id: '6',
    q: 'Puteti migra datele din sistemul pe care il folosim acum?',
    a: 'Da. Indiferent ca datele sunt in Excel, in alt software sau intr-o baza de date veche - le importam, le validam si le reconciliem. Predam sistemul cu toate datele istorice disponibile.',
  },
  {
    id: '7',
    q: 'Ce costa intretinerea dupa lansare?',
    a: 'Primele 30 zile de suport sunt incluse. Ulterior, oferim un contract de mentenanta lunara care include actualizari de securitate, backup monitorizat, remediere bug-uri si ore de dezvoltare pentru functionalitati noi. Poti continua si cu alta echipa - codul sursa este al tau integral.',
  },
];

export default function Page() {
  return (
    <>
      <ServiceJsonLd
        name="CRM, CMS & ERP Custom"
        description="Construim sisteme de management adaptate exact proceselor tale: CRM pentru vanzari, ERP pentru operatiuni, CMS pentru continut."
        url="https://inovex.ro/servicii/cms-crm-erp"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Servicii', url: 'https://inovex.ro/servicii' },
          { name: 'CMS, CRM & ERP', url: 'https://inovex.ro/servicii/cms-crm-erp' },
        ]}
      />
      <HeroCrm />
      <DemoCrm />
      <FeaturesCrm />
      <PentruCine />
      <ProcessCrm />
      <StudiiDeCaz />
      <FAQ items={FAQ_ITEMS} />
      <CTACrm />
    </>
  );
}
