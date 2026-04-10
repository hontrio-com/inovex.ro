import type { Metadata } from 'next';
import { ConfiguratorWebsiteClient } from './ConfiguratorWebsiteClient';

export const metadata: Metadata = {
  title: 'Configurator Website Prezentare | Inovex',
  description: 'Configureaza cererea ta pentru un website de prezentare profesional. Raspuns in 24 de ore.',
  robots: { index: false },
};

export default function ConfiguratorWebsitePage() {
  return <ConfiguratorWebsiteClient />;
}
