import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica Cookies | Inovex',
  description: 'Politica de cookies Inovex: ce cookies folosim, de ce și cum le poți gestiona.',
  robots: { index: false },
};

const COOKIES = [
  { nume: 'inovex_consent', furnizor: 'Inovex', scop: 'Stochează preferințele tale de cookie-uri', durata: '180 zile', tip: 'Necesar' },
  { nume: '_ga', furnizor: 'Google Analytics', scop: 'Identifică utilizatori unici', durata: '2 ani', tip: 'Analitic' },
  { nume: '_ga_*', furnizor: 'Google Analytics', scop: 'Sesiune Google Analytics 4', durata: '2 ani', tip: 'Analitic' },
  { nume: '_fbp', furnizor: 'Meta Platforms', scop: 'Identifică browsere pentru publicitate Meta', durata: '90 zile', tip: 'Marketing' },
  { nume: '_ttp', furnizor: 'TikTok', scop: 'Tracking conversii TikTok Ads', durata: '13 luni', tip: 'Marketing' },
];

export default function PoliticaCookiesPage() {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-h1 text-gray-950 mb-4">Politica de Cookies</h1>
      <p className="text-sm text-gray-400 mb-10">Ultima actualizare: 2 Aprilie 2026</p>

      <div className="space-y-8 text-gray-500">
        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">Ce sunt cookie-urile?</h2>
          <p>Cookie-urile sunt fișiere text mici stocate în browserul tău când vizitezi un site web. Sunt folosite pentru a reține preferințe și pentru a permite funcționalități esențiale.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">Tipuri de cookie-uri pe care le folosim</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-950 mb-1">Cookie-uri strict necesare</h3>
              <p className="text-sm">Indispensabile funcționării site-ului. Nu pot fi dezactivate fără a afecta experiența de navigare. Nu necesită consimțământ.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-950 mb-1">Cookie-uri analitice</h3>
              <p className="text-sm">Ne ajută să înțelegem cum interacționezi cu site-ul (Google Analytics 4). Necesită consimțământ explicit.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-950 mb-1">Cookie-uri de marketing</h3>
              <p className="text-sm">Folosite pentru publicitate personalizată (Meta Pixel, TikTok Pixel). Necesită consimțământ explicit.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">Lista completă a cookie-urilor</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F4F6F8]">
                  {['Nume', 'Furnizor', 'Scop', 'Durată', 'Tip'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-900 border border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COOKIES.map(c => (
                  <tr key={c.nume} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border border-gray-200 font-mono text-xs">{c.nume}</td>
                    <td className="px-4 py-3 border border-gray-200">{c.furnizor}</td>
                    <td className="px-4 py-3 border border-gray-200">{c.scop}</td>
                    <td className="px-4 py-3 border border-gray-200">{c.durata}</td>
                    <td className="px-4 py-3 border border-gray-200">{c.tip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-950 mb-3">Cum gestionezi preferințele</h2>
          <p>Poți modifica preferințele de cookies oricând din banner-ul de cookies (disponibil în footer → &ldquo;Gestionează preferințele&rdquo;) sau din setările browserului tău:</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-blue-600">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" target="_blank" rel="noopener noreferrer" className="text-blue-600">Apple Safari</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
