import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termeni și Condiții',
  description: 'Termenii și condițiile de utilizare ale serviciilor Inovex (VOID SFT GAMES SRL).',
  robots: { index: false },
};

export default function TermeniPage() {
  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-h1 text-gray-950 mb-4">Termeni și Condiții</h1>
      <p className="text-sm text-gray-400 mb-10">Ultima actualizare: 2 Aprilie 2026</p>

      <div className="space-y-8 text-gray-500">
        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">1. Definiții</h2>
          <ul className="space-y-2 text-sm">
            <li><strong>Prestator</strong>: VOID SFT GAMES SRL, CUI 43474393, Târgu Jiu, Gorj, operând sub marca comercială Inovex</li>
            <li><strong>Client</strong>: persoana fizică sau juridică care solicită sau achiziționează serviciile Prestatorului</li>
            <li><strong>Servicii</strong>: proiectare, dezvoltare și mentenanță website-uri, magazine online, aplicații web și mobile</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">2. Servicii oferite</h2>
          <p className="text-sm">Inovex oferă servicii de dezvoltare web, design digital, optimizare SEO, mentenanță și suport tehnic. Specificațiile exacte, termenele și prețul sunt stabilite în propunerea tehnică acceptată de Client.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">3. Obligațiile Prestatorului</h2>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Livrarea proiectului conform specificațiilor agreate</li>
            <li>Comunicare transparentă pe parcursul proiectului</li>
            <li>30 zile garanție post-lansare pentru bug-uri din vina noastră</li>
            <li>Confidențialitatea datelor și informațiilor clientului</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">4. Obligațiile Clientului</h2>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Furnizarea promptă a materialelor necesare (texte, imagini, accesuri)</li>
            <li>Plata conform graficului agreat</li>
            <li>Aprobarea etapelor în termenele stabilite</li>
            <li>Notificarea imediată a oricăror modificări de cerințe</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">5. Proprietate intelectuală</h2>
          <p className="text-sm">La plata integrală, Clientul primește drepturile de utilizare deplină asupra produsului livrat. Inovex păstrează dreptul de a folosi proiectul în portofoliu și materiale de marketing, cu acordul implicit al Clientului.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">6. Limitarea răspunderii</h2>
          <p className="text-sm">Inovex nu răspunde pentru pierderi indirecte, pierderi de profit sau oportunități de afaceri. Răspunderea totală nu poate depăși valoarea contractului.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">7. Forță majoră</h2>
          <p className="text-sm">Niciuna dintre părți nu este responsabilă pentru neîndeplinirea obligațiilor cauzate de forță majoră (catastrofe naturale, pandemii, acte guvernamentale).</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">8. Litigii și legea aplicabilă</h2>
          <p className="text-sm">Prezentul contract este guvernat de legea română. Litigiile se soluționează pe cale amiabilă sau, în caz de eșec, de <strong>Tribunalul Gorj</strong>, ca instanță competentă.</p>
        </section>
      </div>
    </div>
  );
}
