'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from 'lucide-react';
import { KANBAN_ITEMS } from '@/lib/demo-data';
import type { KanbanItem, Priority } from '@/lib/demo-data';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function PriorityBadge({ priority }: { priority: Priority }) {
  if (priority === 'High') {
    return (
      <Badge className="text-[9px] py-0 px-1.5 bg-red-50 text-red-600 border border-red-200">
        High
      </Badge>
    );
  }
  if (priority === 'Medium') {
    return (
      <Badge className="text-[9px] py-0 px-1.5 bg-amber-50 text-amber-600 border border-amber-200">
        Medium
      </Badge>
    );
  }
  return (
    <Badge className="text-[9px] py-0 px-1.5 bg-green-50 text-green-600 border border-green-200">
      Low
    </Badge>
  );
}

function KanbanCard({ item }: { item: KanbanItem }) {
  return (
    <Card className="bg-white border border-[#E8ECF0] shadow-none mb-2">
      <CardContent className="p-3">
        <p className="text-[11px] font-semibold text-[#0D1117] mb-2 leading-snug">
          {item.title}
        </p>
        <div className="flex items-center gap-1.5 mb-2">
          <Avatar className="w-5 h-5">
            <AvatarFallback className="text-[8px] font-bold text-white bg-gradient-to-br from-[#2B8FCC] to-[#1a6fa8]">
              {getInitials(item.assignee)}
            </AvatarFallback>
          </Avatar>
          <span className="text-[10px] text-[#8A94A6]">{item.assignee}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <PriorityBadge priority={item.priority} />
          <span className="flex items-center gap-1 text-[9px] text-[#8A94A6]">
            <Calendar size={9} />
            {item.dueDate}
          </span>
        </div>
        {item.progress > 0 && (
          <div className="h-1 w-full bg-[#F4F6F8] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2B8FCC] rounded-full"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const COLUMNS: { key: keyof typeof KANBAN_ITEMS; label: string }[] = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'in_progress', label: 'In lucru' },
  { key: 'review', label: 'Review' },
  { key: 'done', label: 'Finalizat' },
];

export default function ViewProjects() {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 min-w-[640px]">
        {COLUMNS.map(({ key, label }) => {
          const items = KANBAN_ITEMS[key];
          return (
            <div
              key={key}
              className="flex-1 min-w-[150px] bg-[#F4F6F8] rounded-xl p-3"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-semibold text-[#4A5568]">
                  {label}
                </span>
                <Badge
                  variant="secondary"
                  className="text-[9px] px-1.5 py-0 h-4"
                >
                  {items.length}
                </Badge>
              </div>
              <div>
                {items.map((item) => (
                  <KanbanCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
