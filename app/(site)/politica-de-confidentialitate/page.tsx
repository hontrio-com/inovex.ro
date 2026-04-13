import type { Metadata } from 'next';
import PoliticaClient from './PoliticaClient';

export const metadata: Metadata = {
  title: 'Politica de Confidentialitate',
  description:
    'Politica de confidentialitate si prelucrare a datelor cu caracter personal a Inovex (VOID SFT GAMES SRL, CUI RO43474393), conform GDPR si legislatiei romane. Afla cum iti protejam datele.',
  alternates: { canonical: 'https://inovex.ro/politica-de-confidentialitate' },
  robots: 'index, follow',
};

export default function PoliticaPage() {
  return <PoliticaClient />;
}
