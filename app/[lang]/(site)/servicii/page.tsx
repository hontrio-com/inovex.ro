import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Servicii Web',
  description: 'Descoperă serviciile Inovex: magazine online, website-uri de prezentare, aplicații web, CRM/ERP și aplicații mobile.',
  alternates: { canonical: 'https://inovex.ro/servicii' },
};

export default function ServiciiPage() {
  redirect('/servicii/magazine-online');
}
