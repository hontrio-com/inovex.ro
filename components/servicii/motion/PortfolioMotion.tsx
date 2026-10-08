import { Badge } from '@/components/ui/badge';
import ServiceVideo from '@/components/sections/ServiceVideo';
import { MOTION_PORTFOLIO } from '@/lib/motion-design';

export default function PortfolioMotion() {
  return (
    <section id="exemple" className="py-[100px] max-md:py-16 bg-[#F8FAFB] border-y border-[#E8ECF0] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <Badge className="mb-4 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Exemple
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
            className="mb-4"
          >
            Exemple de videoclipuri{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>facute de noi</span>
          </h2>
          <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed">
            Asa arata un videoclip animat facut de echipa Inovex. Al tau va fi construit pe brandul si oferta ta.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOTION_PORTFOLIO.map((item) => (
            <figure
              key={item.src}
              className="bg-white rounded-2xl border border-[#E8ECF0] overflow-hidden hover:border-[#C8E6F8] hover:shadow-md transition-all duration-300"
            >
              <div style={{ aspectRatio: '16/10', background: '#F4F6F8' }}>
                <ServiceVideo src={item.src} />
              </div>
              <figcaption className="px-5 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#2B8FCC] mb-1">{item.category}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', color: '#0D1117' }}>{item.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
