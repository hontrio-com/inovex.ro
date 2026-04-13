import type { Metadata } from 'next';
import TermeniClient from './TermeniClient';

export const metadata: Metadata = {
  title: 'Termeni si Conditii',
  description:
    'Termenii si conditiile de utilizare a serviciilor si site-ului Inovex, operat de VOID SFT GAMES SRL, CUI RO43474393. Legea aplicabila: romana.',
  alternates: { canonical: 'https://inovex.ro/termeni-si-conditii' },
  robots: 'index, follow',
};

export default function TermeniPage() {
  return <TermeniClient />;
}
