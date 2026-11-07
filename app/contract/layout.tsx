import '../globals.css';
import { clasaHtml } from '../fonturi';
import { Pixeli } from '@/components/analytics/Pixeli';

/* Layout radacina pentru semnarea contractelor (/contract/[token]), din 2026-11-05, de cand site-ul
   public are layout-ul lui sub app/[lang]: aceleasi fonturi si pixeli ca inainte. */
export default function ContractLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={clasaHtml}>
      <body className="min-h-full flex flex-col">
        <Pixeli />
        {children}
      </body>
    </html>
  );
}
