import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate',
  description: 'Politica de confidențialitate Inovex (VOID SFT GAMES SRL). Cum colectăm, utilizăm și protejăm datele tale personale.',
  robots: { index: false },
};

export default function PoliticaConfidentialitatePage() {
  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-h1 text-gray-950 mb-4">Politica de Confidențialitate</h1>
      <p className="text-sm text-gray-400 mb-10">Ultima actualizare: 2 Aprilie 2026</p>

      <div className="prose prose-slate max-w-none space-y-8 text-gray-500">
        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">1. Operatorul de date</h2>
          <p>Datele tale personale sunt prelucrate de <strong>VOID SFT GAMES SRL</strong>, cu sediul în Târgu Jiu, Gorj, România, CUI 43474393, denumit în continuare &ldquo;Inovex&rdquo;, &ldquo;noi&rdquo; sau &ldquo;operatorul&rdquo;.</p>
          <p>Contact DPO / responsabil prelucrare date: <a href="mailto:contact@inovex.ro" className="text-blue-600">contact@inovex.ro</a></p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">2. Ce date colectăm și de ce</h2>
          <ul className="space-y-3">
            <li><strong>Date de contact</strong> (nume, email, telefon): colectate prin formularele de pe site, cu temeiul legal <em>consimțământul tău</em> (Art. 6(1)(a) GDPR) sau <em>interesul nostru legitim</em> de a răspunde solicitărilor.</li>
            <li><strong>Date de navigare</strong> (IP, browser, pagini vizitate): colectate prin Google Analytics cu consimțământul tău pentru cookies analitice.</li>
            <li><strong>Date marketing</strong>: colectate prin Meta Pixel și TikTok Pixel numai dacă ai acceptat cookies de marketing.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">3. Cât timp păstrăm datele</h2>
          <ul className="space-y-2">
            <li>Date formular contact: 3 ani de la ultimul contact, sau până la revocare</li>
            <li>Date analitice (Google Analytics): 26 luni (configurat în GA4)</li>
            <li>Date cookies marketing: conform politicii furnizorilor (Meta, TikTok)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">4. Cu cine împărtășim datele</h2>
          <p>Nu vindem datele tale. Le împărtășim cu:</p>
          <ul className="space-y-2">
            <li>Google LLC:analytics și advertising (SUA, acoperit de Clauzele Contractuale Standard)</li>
            <li>Meta Platforms:advertising (SUA, acoperit de Clauzele Contractuale Standard)</li>
            <li>Furnizorul de hosting:Vercel Inc. (SUA)</li>
            <li>Furnizorul de email:serviciu SMTP propriu pe hosting cPanel România</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">5. Drepturile tale</h2>
          <p>Conform GDPR, ai dreptul la: <strong>acces, rectificare, ștergere, portabilitate, restricționare și opoziție</strong> față de prelucrare.</p>
          <p>Pentru a exercita aceste drepturi, contactează-ne la <a href="mailto:contact@inovex.ro" className="text-blue-600">contact@inovex.ro</a>. Răspundem în maximum 30 de zile. Poți depune plângere la <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-blue-600">ANSPDCP</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">6. Securitate</h2>
          <p>Implementăm măsuri tehnice și organizatorice pentru protejarea datelor: HTTPS, acces restricționat, backup regulat, parole criptate.</p>
        </section>
      </div>
    </div>
  );
}
