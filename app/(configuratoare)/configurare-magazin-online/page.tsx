import type { Metadata } from 'next';
import { ConfiguratorMagazinClient } from './ConfiguratorMagazinClient';

export const metadata: Metadata = {
  title: 'Configurator Magazin Online | Inovex',
  description: 'Configureaza cererea ta pentru un magazin online profesional. Raspuns in 24 de ore.',
  robots: { index: false },
};

export default function ConfiguratorMagazinPage() {
  return <ConfiguratorMagazinClient />;
}
