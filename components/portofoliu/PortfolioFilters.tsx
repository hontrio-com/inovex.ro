'use client';

import { FILTER_CATEGORIES } from '@/lib/portfolio-data';

interface PortfolioFiltersProps {
  activeFilter: string;
  onFilterChange: (key: string) => void;
  totalVisible: number;
}

export function PortfolioFilters({
  activeFilter,
  onFilterChange,
  totalVisible,
}: PortfolioFiltersProps): React.ReactElement {
  return (
    <div
      className="sticky top-[72px] z-40 border-b border-[#E8ECF0]"
      style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div
          className="flex items-center gap-2 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => onFilterChange(cat.key)}
              className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border"
              style={{
                background: activeFilter === cat.key ? '#0D1117' : 'transparent',
                borderColor: activeFilter === cat.key ? '#0D1117' : '#E8ECF0',
                color: activeFilter === cat.key ? 'white' : '#4A5568',
              }}
            >
              {cat.label}
            </button>
          ))}

          {/* Spacer */}
          <div className="flex-1 shrink-0 min-w-4" />

          {/* Count text */}
          <span className="shrink-0 text-sm text-[#8A94A6]">{totalVisible} proiecte</span>
        </div>
      </div>
    </div>
  );
}
