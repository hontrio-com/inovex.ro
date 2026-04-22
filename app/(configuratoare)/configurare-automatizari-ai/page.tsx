import type { Metadata } from 'next';
import { ConfiguratorAutomatizariClient } from './ConfiguratorAutomatizariClient';

export const metadata: Metadata = {
  title: 'Configureaza Automatizarile Tale | Inovex',
  description:
    'Spune-ne ce procese vrei sa automatizezi in afacerea ta. Primesti o propunere personalizata de implementare AI in 24 de ore.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://inovex.ro/configurare-automatizari-ai' },
};

export default function ConfiguratorAutomatizariPage() {
  return <ConfiguratorAutomatizariClient />;
}
