'use client';

import { Badge } from '@/components/ui/badge';
import KanbanCard from '@/components/servicii/crm/KanbanCard';
import { KANBAN_DEALS } from '@/lib/crm-demo-data';
import type { DealStatus } from '@/lib/crm-demo-data';

const COLUMNS: { id: DealStatus; label: string; color: string }[] = [
  { id: 'Calificat', label: 'Calificat', color: '#8A94A6' },
  { id: 'Propunere trimisa', label: 'Propunere trimisa', color: '#2B8FCC' },
  { id: 'Negociere', label: 'Negociere', color: '#F59E0B' },
  { id: 'Castigat', label: 'Castigat', color: '#10B981' },
];

export default function ViewPipeline() {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-3 min-w-[880px]">
        {COLUMNS.map((col) => {
          const deals = KANBAN_DEALS.filter((d) => d.status === col.id);
          const total = deals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div
              key={col.id}
              className="flex-1 rounded-xl p-3 min-w-[220px]"
              style={{ background: '#F4F6F8' }}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: col.color }} />
                  <span className="text-[11.5px] font-bold text-[#0D1117]">{col.label}</span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 h-4 bg-white border border-[#E8ECF0] text-[#4A5568]"
                  >
                    {deals.length}
                  </Badge>
                </div>
              </div>
              <p
                className="text-[11px] font-bold mb-3 leading-none"
                style={{ color: col.color, fontFamily: 'var(--font-display)' }}
              >
                €{total.toLocaleString('ro-RO')}
              </p>

              {/* Cards */}
              <div className="space-y-[10px]">
                {deals.map((deal) => (
                  <KanbanCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
