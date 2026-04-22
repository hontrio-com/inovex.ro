import type { Metadata } from 'next';
import { ConfiguratorAplicatieWebClient } from './ConfiguratorAplicatieWebClient';

export const metadata: Metadata = {
  title: 'Configureaza Aplicatia Ta Web | Inovex',
  description:
    'Spune-ne despre aplicatia sau platforma SaaS pe care vrei sa o construiesti. Primesti o propunere personalizata in 24 de ore.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://inovex.ro/configurare-aplicatie-web' },
};

export default function ConfiguratorAplicatieWebPage() {
  return <ConfiguratorAplicatieWebClient />;
}
