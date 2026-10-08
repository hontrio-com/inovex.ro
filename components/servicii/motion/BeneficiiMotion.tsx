import { Zap, BadgePercent, Palette, Megaphone, type LucideIcon } from 'lucide-react';
import { motionPrice, formatLei } from '@/lib/motion-design';

const BENEFICII: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Zap,
    title: 'Gata in maximum 48 de ore',
    text: 'Comanzi azi, iar in cel mult doua zile ai videoclipul. Nu astepti saptamani dupa o agentie.',
  },
  {
    icon: BadgePercent,
    title: `De la ${formatLei(motionPrice(1))}, pret fix`,
    text: 'Stii exact cat platesti inainte sa comanzi. Fara filmari, fara actori, fara costuri ascunse.',
  },
  {
    icon: Palette,
    title: 'Facut pentru afacerea ta',
    text: 'Logo-ul, culorile si oferta ta, animate de la zero. Nu un sablon in care schimbam doar numele.',
  },
  {
    icon: Megaphone,
    title: 'Gata de pus in reclame',
    text: 'Il primesti in formatele pentru Facebook, Instagram, TikTok, YouTube si site. Doar il incarci.',
  },
];

export default function BeneficiiMotion() {
  return (
    <section className="py-16 max-md:py-12 bg-white" aria-labelledby="beneficii-motion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="beneficii-motion"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.5rem,2.4vw,2rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.015em',
            color: '#0D1117',
          }}
          className="text-center mb-10"
        >
          De ce sa cumperi un videoclip{' '}
          <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>de la noi?</span>
        </h2>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFICII.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-[#E8ECF0] bg-[#F8FAFB] p-5">
              <span className="w-10 h-10 rounded-xl bg-[#2B8FCC] flex items-center justify-center mb-4">
                <Icon size={19} className="text-white" />
              </span>
              <span className="block text-[16px] font-semibold text-[#0D1117] leading-snug mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>
                {title}
              </span>
              <span className="block text-[13.5px] text-[#4A5568] leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
