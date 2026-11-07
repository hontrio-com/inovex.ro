import { Inter, Manrope } from 'next/font/google';

/* Tipografia site-ului: doar doua fonturi. Inter pentru text, Manrope pentru titluri. latin-ext se
   preincarca si el: contine ă, ș, ț (si ß, ä, é pentru germana si franceza). Definite o singura data aici,
   folosite de toate layout-urile radacina (site: app/[lang], admin, semnarea contractelor). */

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const clasaHtml = `${inter.variable} ${manrope.variable} h-full antialiased`;
