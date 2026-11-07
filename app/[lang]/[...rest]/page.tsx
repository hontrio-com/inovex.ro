import { notFound } from 'next/navigation';

/* Orice adresa fara pagina (si paginile inca netraduse, pe care proxy.ts le trimite aici in celelalte
   limbi) da 404 in layout-ul limbii, cu <html lang> corect. */
export default function Negasit() {
  notFound();
}
