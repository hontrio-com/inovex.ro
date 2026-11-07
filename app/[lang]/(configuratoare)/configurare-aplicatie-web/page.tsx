import type { Metadata } from 'next';
import { alternanteMetadata, esteLimba, LIMBA_IMPLICITA, type Limba } from '@/lib/i18n/config';
import { textConfiguratoare } from '@/lib/i18n/pagini/configuratoare';
import { ConfiguratorAplicatieWebClient } from './ConfiguratorAplicatieWebClient';

type Props = { params: Promise<{ lang: string }> };

const limba = async (params: Props['params']): Promise<Limba> => {
  const { lang } = await params;
  return esteLimba(lang) ? lang : LIMBA_IMPLICITA;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await limba(params);
  const { meta } = textConfiguratoare(lang).aplicatie;
  return {
    title: meta.titlu,
    description: meta.descriere,
    robots: { index: false, follow: false },
    alternates: alternanteMetadata(lang, '/configurare-aplicatie-web'),
  };
}

export default async function ConfiguratorAplicatieWebPage({ params }: Props) {
  const lang = await limba(params);
  return <ConfiguratorAplicatieWebClient t={textConfiguratoare(lang).aplicatie} />;
}
