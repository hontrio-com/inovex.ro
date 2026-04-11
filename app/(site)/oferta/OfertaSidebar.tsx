import { Phone, Mail, Clock, Star, Check } from 'lucide-react';
import { PhoneLink } from '@/components/ui/PhoneLink';

export function OfertaSidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-5 sticky top-28">
      {/* Card 1 — Contact direct */}
      <div className="bg-white border border-[#E8ECF0] rounded-2xl p-6">
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '15px',
            color: '#0D1117',
            marginBottom: '16px',
          }}
        >
          Preferi sa vorbesti direct?
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Phone size={15} className="text-[#2B8FCC] shrink-0" />
            <PhoneLink
              style={{ fontSize: '14px', color: '#0D1117', fontWeight: 500 }}
              className="hover:text-[#2B8FCC] transition-colors"
            >
              0750 456 096
            </PhoneLink>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={15} className="text-[#2B8FCC] shrink-0" />
            <a
              href="mailto:contact@inovex.ro"
              style={{ fontSize: '14px', color: '#0D1117', fontWeight: 500 }}
              className="hover:text-[#2B8FCC] transition-colors"
            >
              contact@inovex.ro
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-[#2B8FCC] shrink-0" />
            <span style={{ fontSize: '14px', color: '#4A5568' }}>Luni - Vineri, 09:00 - 18:00</span>
          </div>
        </div>
      </div>

      {/* Card 2 — Ce se intampla dupa */}
      <div className="bg-white border border-[#E8ECF0] rounded-2xl p-6">
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '15px',
            color: '#0D1117',
            marginBottom: '16px',
          }}
        >
          Ce se intampla dupa?
        </h3>
        <div className="flex flex-col gap-4">
          {[
            'Primesti email de confirmare instant',
            'Te contactam in 24h pentru detalii',
            'Primesti o propunere tehnica in 48h',
          ].map((text, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: '#EAF5FF' }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#2B8FCC' }}>
                  {idx + 1}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#4A5568', lineHeight: 1.5 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3 — Trust */}
      <div className="bg-[#F8FAFB] border border-[#E8ECF0] rounded-2xl p-6">
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
          ))}
          <span
            style={{ fontSize: '13px', fontWeight: 600, color: '#0D1117', marginLeft: '6px' }}
          >
            4.9 din 5
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {[
            '200+ proiecte livrate',
            '7+ ani experienta',
            'Raspuns in 24 de ore',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check size={13} className="text-[#10B981] shrink-0" />
              <span style={{ fontSize: '13px', color: '#4A5568' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
