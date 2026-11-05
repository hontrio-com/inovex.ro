'use client';

import type { ComponentProps } from 'react';
import { TELEFON } from '@/components/layout/meniu-servicii/date';
import { trackConversions } from '@/lib/gtm';

// linkul catre telefonul Inovex, cu conversia „telefon” trimisa la clic (ca in antet si subsol)
export function LinkTelefon(props: Omit<ComponentProps<'a'>, 'href' | 'onClick'>) {
  return <a href={TELEFON.href} onClick={() => trackConversions.telefon()} {...props} />;
}
