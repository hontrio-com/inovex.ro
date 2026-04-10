import { Star, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface AppCardProps {
  gradient: string;
  iconBg: string;
  icon: React.ReactNode;
  category: string;
  platform: 'iOS & Android' | 'iOS' | 'Android';
  title: string;
  description: string;
  rating: number;
  reviews: number;
  tech: string[];
}

const PLATFORM_COLORS: Record<string, { bg: string; text: string }> = {
  'iOS & Android': { bg: '#EAF5FF', text: '#2B8FCC' },
  'iOS': { bg: '#E8F0FE', text: '#007AFF' },
  'Android': { bg: '#E6F4EA', text: '#34A853' },
};

export default function AppCard({
  gradient,
  iconBg,
  icon,
  category,
  platform,
  title,
  description,
  rating,
  reviews,
  tech,
}: AppCardProps) {
  const platformStyle = PLATFORM_COLORS[platform] ?? PLATFORM_COLORS['iOS & Android'];

  return (
    <Card className="rounded-2xl border border-[#E8ECF0] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Top gradient area */}
      <div className="h-[120px] flex items-center justify-center" style={{ background: gradient }}>
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-md" style={{ background: iconBg }}>
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge className="text-[11px] bg-[#F3F4F6] text-[#4A5568] border-none">{category}</Badge>
          <Badge className="text-[11px] border-none" style={{ background: platformStyle.bg, color: platformStyle.text }}>{platform}</Badge>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', color: '#0D1117', marginBottom: 6 }}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-[#4A5568] leading-relaxed mb-4 flex-1">
          {description}
        </p>

        <Separator className="mb-4" />

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[0,1,2,3,4].map(i => {
              const filled = i < Math.floor(rating);
              return <Star key={i} size={12} fill={filled ? '#F59E0B' : 'none'} color="#F59E0B" />;
            })}
          </div>
          <span className="text-[12px] font-semibold text-[#0D1117]">{rating}</span>
          <span className="text-[11px] text-[#8A94A6]">({reviews.toLocaleString('ro-RO')} recenzii)</span>
        </div>

        {/* Tech pills */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {tech.slice(0, 2).map((t) => (
              <span key={t} className="text-[10px] font-medium text-[#4A5568] bg-[#F3F4F6] px-2 py-0.5 rounded-md">{t}</span>
            ))}
          </div>
          <a href="#" className="flex items-center gap-1 text-[12px] font-semibold text-[#2B8FCC] hover:text-[#1a6fa0] transition-colors">
            Detalii <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </Card>
  );
}
