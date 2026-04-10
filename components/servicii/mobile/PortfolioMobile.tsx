import { ArrowRight, Truck, Activity, ShoppingBag } from 'lucide-react';
import AppCard from './AppCard';

const APPS = [
  {
    gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)',
    iconBg: '#FEF3C7',
    icon: <Truck size={28} className="text-[#D97706]" />,
    category: 'Livrari',
    platform: 'iOS & Android' as const,
    title: 'FoodRun',
    description: 'Aplicatie de livrare mancare cu tracking in timp real, notificari push si sistem de rating pentru curieri si restaurante.',
    rating: 4.7,
    reviews: 1240,
    tech: ['React Native', 'Firebase'],
  },
  {
    gradient: 'linear-gradient(135deg,#EF4444,#EC4899)',
    iconBg: '#FEE2E2',
    icon: <Activity size={28} className="text-[#EF4444]" />,
    category: 'Fitness',
    platform: 'iOS' as const,
    title: 'FitTrack Pro',
    description: 'Aplicatie fitness cu tracking activitate, antrenamente ghidate, integrare HealthKit si grafice de progres saptamanal.',
    rating: 4.9,
    reviews: 856,
    tech: ['Swift', 'HealthKit'],
  },
  {
    gradient: 'linear-gradient(135deg,#2B8FCC,#7C3AED)',
    iconBg: '#EAF5FF',
    icon: <ShoppingBag size={28} className="text-[#2B8FCC]" />,
    category: 'E-commerce',
    platform: 'iOS & Android' as const,
    title: 'ShopNow',
    description: 'Magazin online mobil cu catalog de produse, filtre avansate, checkout rapid cu Apple Pay si Google Pay integrate.',
    rating: 4.6,
    reviews: 2130,
    tech: ['Flutter', 'Stripe'],
  },
];

export default function PortfolioMobile() {
  return (
    <section className="py-[100px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-4 gap-4">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.6rem,2.6vw,2.2rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0D1117',
            }}
          >
            Aplicatii publicate
          </h2>
          <a
            href="/portofoliu"
            className="flex items-center gap-1.5 text-[13px] font-semibold text-[#2B8FCC] hover:text-[#1a6fa0] transition-colors shrink-0"
          >
            Vezi portofoliul <ArrowRight size={14} />
          </a>
        </div>
        <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed mb-10 max-w-[600px]">
          Aplicatii live in App Store si Google Play, construite pentru clienti din diverse industrii.
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPS.map((app) => (
            <AppCard key={app.title} {...app} />
          ))}
        </div>
      </div>
    </section>
  );
}
