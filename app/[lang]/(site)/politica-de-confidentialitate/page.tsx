import type { Metadata } from 'next';
import { DocumentLegalPagina, metadataLegal } from '@/components/legal/DocumentLegal';

// Textele, in fiecare limba: lib/i18n/pagini/legal/ (designul comun: components/legal/DocumentLegal.tsx)

type Props = { params: Promise<{ lang: string }> };

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return metadataLegal(params, 'confidentialitate');
}

export default function PoliticaConfidentialitatePage({ params }: Props) {
  return <DocumentLegalPagina params={params} fel="confidentialitate" />;
}
