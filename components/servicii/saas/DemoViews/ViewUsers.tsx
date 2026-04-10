'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { USERS } from '@/lib/demo-data';
import type { Plan } from '@/lib/demo-data';

const AVATAR_BG = [
  'from-[#2B8FCC] to-[#1a6fa8]',
  'from-[#16a34a] to-[#15803d]',
  'from-[#9333ea] to-[#7e22ce]',
  'from-[#ea580c] to-[#c2410c]',
  'from-[#0891b2] to-[#0e7490]',
  'from-[#db2777] to-[#be185d]',
  'from-[#ca8a04] to-[#a16207]',
  'from-[#475569] to-[#334155]',
  'from-[#7c3aed] to-[#5b21b6]',
  'from-[#0f766e] to-[#0d9488]',
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function PlanBadge({ plan }: { plan: Plan }) {
  if (plan === 'Free') {
    return <Badge variant="secondary">{plan}</Badge>;
  }
  if (plan === 'Pro') {
    return (
      <Badge className="bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
        {plan}
      </Badge>
    );
  }
  return (
    <Badge className="bg-[#0D1117] text-white border-transparent">{plan}</Badge>
  );
}

export default function ViewUsers() {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState<string>('all');

  const filtered = USERS.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === 'all' || u.plan === planFilter;
    return matchSearch && matchPlan;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Cauta utilizator..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-[200px] text-xs border-[#E8ECF0]"
          />
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="h-8 w-[130px] text-xs border-[#E8ECF0]">
              <SelectValue placeholder="Filtreaza plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toti</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Pro">Pro</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button size="sm" className="h-8 text-xs" leftIcon={<Plus size={13} />}>
          Adauga utilizator
        </Button>
      </div>

      {/* Table */}
      <div className="border border-[#E8ECF0] rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F8FAFB] hover:bg-[#F8FAFB]">
              <TableHead className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wide">
                Utilizator
              </TableHead>
              <TableHead className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wide">
                Plan
              </TableHead>
              <TableHead className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wide">
                Status
              </TableHead>
              <TableHead className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wide hidden sm:table-cell">
                Data inregistrare
              </TableHead>
              <TableHead className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wide hidden sm:table-cell">
                MRR
              </TableHead>
              <TableHead className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-wide">
                Actiuni
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user, idx) => (
              <TableRow
                key={user.id}
                className="hover:bg-[#F8FAFB] border-b border-[#F4F6F8]"
              >
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback
                        className={`text-[10px] font-bold text-white bg-gradient-to-br ${
                          AVATAR_BG[idx % AVATAR_BG.length]
                        }`}
                      >
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-semibold text-[#0D1117] leading-tight">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-[#8A94A6] leading-tight">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <PlanBadge plan={user.plan} />
                </TableCell>
                <TableCell>
                  {user.status === 'Activ' ? (
                    <Badge className="bg-[#F0FDF4] text-[#16a34a] border border-[#BBF7D0]">
                      Activ
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[#8A94A6]">
                      Inactiv
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-xs text-[#4A5568] hidden sm:table-cell">
                  {user.date}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {user.mrr === '-' ? (
                    <span className="text-xs text-[#8A94A6]">-</span>
                  ) : (
                    <span className="text-xs font-semibold text-[#16a34a]">
                      {user.mrr}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#F4F6F8] transition-colors">
                    <MoreHorizontal size={14} className="text-[#8A94A6]" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#8A94A6]">
          1-10 din 2.847 utilizatori
        </span>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" className="h-7 px-2 border-[#E8ECF0]">
            <ChevronLeft size={13} />
          </Button>
          <Button variant="outline" size="sm" className="h-7 px-2 border-[#E8ECF0]">
            <ChevronRight size={13} />
          </Button>
        </div>
      </div>
    </div>
  );
}
