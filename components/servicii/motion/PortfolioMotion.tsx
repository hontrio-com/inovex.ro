import { Badge } from '@/components/ui/badge';
import ExempluVideo from './ExempluVideo';
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
            Videoclipuri facute de echipa Inovex pentru clientii nostri. Al tau va fi construit pe brandul si oferta ta. Apasa pe difuzor pentru sunet.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {MOTION_PORTFOLIO.map((item) => (
            <figure
              key={item.src}
              className="bg-white rounded-2xl border border-[#E8ECF0] overflow-hidden hover:border-[#C8E6F8] hover:shadow-md transition-all duration-300"
            >
              <ExempluVideo src={item.src} poster={item.poster} title={`${item.client} - ${item.title}`} />
              <figcaption className="px-4 py-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#2B8FCC] mb-0.5">{item.title}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9375rem', color: '#0D1117' }}>{item.client}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
