import type { Metadata } from 'next';
import PoliticaCookiesClient from './PoliticaCookiesClient';

export const metadata: Metadata = {
  title: 'Politica de Cookies',
  description:
    'Informatii despre cookie-urile utilizate pe inovex.ro si cum poti gestiona preferintele tale. Cookie-uri necesare, analitice si de marketing.',
  alternates: { canonical: 'https://inovex.ro/politica-cookies' },
  robots: 'index, follow',
};

export default function PoliticaCookiesPage() {
  return <PoliticaCookiesClient />;
}
