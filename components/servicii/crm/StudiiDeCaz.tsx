import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const CASE_STUDIES = [
  {
    industry: 'Productie industriala',
    industryColor: '#2B8FCC',
    industryBg: '#EAF5FF',
    title: 'De la 12 foi Excel la un singur sistem',
    context:
      'Companie cu 240 angajati, 3 fabrici in Oltenia, gestiona stocurile si productia in foi Excel separate pe fiecare locatie. Date duplicate, stocuri nesincronizate, rapoarte manuale care durau 2 zile.',
    solution:
      'Am construit un ERP cu modul de gestiune stoc unificat pe toate cele 3 locatii, planificare productie cu fise de lucru si consum materie prima, raportare automata pentru management si integrare e-Factura ANAF.',
    results: [
      'Timp raportare zilnica: de la 2 zile la 20 minute',
      'Erori de stoc reduse cu 94% in primele 3 luni',
      'Vizibilitate completa in timp real pe toate fabricile',
      'Integrare e-Factura ANAF fara interventia echipei',
    ],
    imageAlt: 'ERP productie industriala',
    reverse: false,
  },
  {
    industry: 'Sanatate',
    industryColor: '#10B981',
    industryBg: '#ECFDF5',
    title: 'CRM si programari pentru clinica medicala',
    context:
      'Clinica cu 120 angajati din Cluj, gestionarea pacientilor se facea prin Excel si agenda fizica. Programari duble, dosare incomplete, imposibil de trimis rezultate digital, facturare manuala catre Casa de Sanatate.',
    solution:
      'Am dezvoltat un CRM medical cu dosar pacient digital, sistem de programari online cu confirmari automate, modul de facturare catre CNAS si portal patient pentru trimitere rezultate.',
    results: [
      'Zero programari duble de la implementare',
      'Dosar pacient digital cu istoricul complet',
      'Timp facturare CNAS redus cu 70%',
      'Satisfactie pacienti crescuta cu 40% (sondaj intern)',
    ],
    imageAlt: 'CRM clinica medicala',
    reverse: true,
  },
  {
    industry: 'eCommerce & Retail',
    industryColor: '#F59E0B',
    industryBg: '#FEF3C7',
    title: 'CMS headless pentru retea de 5 magazine online',
    context:
      'Retea de 5 magazine online cu stoc centralizat, administrate din 3 sisteme diferite, sincronizare manuala o data pe zi. Supravanzare frecventa, actualizare lenta de preturi si stoc, SEO slab.',
    solution:
      'Am construit un CMS headless cu API care alimenteaza toate cele 5 magazine in timp real, modul de gestiune stoc centralizat cu rezervare automata si sincronizare instantanee pe toate canalele.',
    results: [
      'Stoc sincronizat in timp real pe toate canalele',
      'Zero supravanzari de la lansare',
      'Timp adaugare produs nou: de la 40 min la 5 min',
      'Trafic organic crescut cu 65% in 6 luni',
    ],
    imageAlt: 'CMS retea magazine online',
    reverse: false,
  },
];

export default function StudiiDeCaz() {
  return (
    <section className="bg-[#F8FAFB] py-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 max-w-[600px] mx-auto">
          <Badge className="mb-4 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Rezultate reale
          </Badge>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.7rem,2.8vw,2.4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0D1117',
            }}
          >
            Ce am construit pentru{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>alti antreprenori</span>
          </h2>
          <p className="mt-4 text-[#4A5568] text-[0.9375rem] leading-relaxed">
            Fiecare sistem este unic. Acestea sunt exemple de probleme reale pe care le-am rezolvat.
          </p>
        </div>

        {/* Alternating rows */}
        <div className="space-y-24 lg:space-y-32">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.title}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                cs.reverse ? 'lg:[direction:rtl]' : ''
              }`}
            >
              {/* Text side */}
              <div className={cs.reverse ? 'lg:[direction:ltr]' : ''}>
                <Badge
                  className="mb-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide"
                  style={{
                    background: cs.industryBg,
                    color: cs.industryColor,
                    border: `1px solid ${cs.industryColor}40`,
                  }}
                >
                  {cs.industry}
                </Badge>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(1.4rem,2.2vw,1.9rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-0.018em',
                    color: '#0D1117',
                  }}
                  className="mb-5"
                >
                  {cs.title}
                </h3>

                <div className="space-y-4 mb-7">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#8A94A6] mb-1.5">
                      Situatia initiala
                    </p>
                    <p className="text-[0.9375rem] text-[#4A5568] leading-relaxed">{cs.context}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#8A94A6] mb-1.5">
                      Ce am construit
                    </p>
                    <p className="text-[0.9375rem] text-[#4A5568] leading-relaxed">{cs.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div
                  className="rounded-xl p-5"
                  style={{ background: cs.industryBg, border: `1px solid ${cs.industryColor}25` }}
                >
                  <p
                    className="text-[11px] font-bold uppercase tracking-widest mb-4"
                    style={{ color: cs.industryColor }}
                  >
                    Rezultate
                  </p>
                  <ul className="space-y-2.5">
                    {cs.results.map((r) => (
                      <li key={r} className="flex items-start gap-2.5">
                        <CheckCircle
                          size={15}
                          className="mt-0.5 shrink-0"
                          style={{ color: cs.industryColor }}
                        />
                        <span className="text-[0.875rem] font-semibold text-[#0D1117]">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual side — decorative mockup block */}
              <div className={cs.reverse ? 'lg:[direction:ltr]' : ''}>
                <div
                  className="w-full rounded-2xl overflow-hidden"
                  style={{
                    aspectRatio: '4/3',
                    background: cs.industryBg,
                    border: `1px solid ${cs.industryColor}20`,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '28px',
                    gap: '16px',
                  }}
                >
                  {/* Fake top bar */}
                  <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: cs.industryColor }}
                    />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full" />
                    <div
                      className="h-5 w-16 rounded text-[9px] font-bold flex items-center justify-center text-white"
                      style={{ background: cs.industryColor }}
                    >
                      {cs.industry.split(' ')[0]}
                    </div>
                  </div>

                  {/* Fake content rows */}
                  <div className="flex-1 flex flex-col gap-3">
                    {[80, 60, 90, 45, 70].map((w, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-lg flex-shrink-0"
                          style={{ background: `${cs.industryColor}25` }}
                        />
                        <div className="flex-1 space-y-1.5">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${w}%`, background: `${cs.industryColor}40` }}
                          />
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${w * 0.6}%`, background: `${cs.industryColor}20` }}
                          />
                        </div>
                        {i % 2 === 0 && (
                          <div
                            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: `${cs.industryColor}20`,
                              color: cs.industryColor,
                            }}
                          >
                            OK
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Fake stat row */}
                  <div className="grid grid-cols-3 gap-3">
                    {cs.results.slice(0, 3).map((r, i) => (
                      <div key={i} className="bg-white rounded-lg p-2.5 shadow-sm text-center">
                        <div
                          className="text-[10px] font-bold leading-tight"
                          style={{ color: cs.industryColor }}
                        >
                          {i === 0 ? '-94%' : i === 1 ? '100%' : '+65%'}
                        </div>
                        <div className="text-[8px] text-[#8A94A6] mt-0.5 leading-tight line-clamp-2">
                          {r.split(':')[0].trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
