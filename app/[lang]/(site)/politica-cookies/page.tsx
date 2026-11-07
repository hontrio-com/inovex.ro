import type { Metadata } from 'next';
import { DocumentLegalPagina, metadataLegal } from '@/components/legal/DocumentLegal';

// Textele, in fiecare limba: lib/i18n/pagini/legal/ (designul comun: components/legal/DocumentLegal.tsx)

type Props = { params: Promise<{ lang: string }> };

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return metadataLegal(params, 'cookies');
}

export default function PoliticaCookiesPage({ params }: Props) {
  return <DocumentLegalPagina params={params} fel="cookies" />;
}
