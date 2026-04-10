'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Eye,
  Phone,
  MoreHorizontal,
  Search,
  UserPlus,
  Upload,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CRM_CLIENTS } from '@/lib/crm-demo-data';
import type { CrmClient, ClientStatus } from '@/lib/crm-demo-data';
import ClientSheet from '@/components/servicii/crm/ClientSheet';

const STATUS_BADGE: Record<ClientStatus, string> = {
  'Client activ': 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]',
  'Prospect': 'bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]',
  'Negociere': 'bg-amber-50 text-amber-600 border border-amber-200',
  'Inactiv': 'bg-[#F4F6F8] text-[#8A94A6] border border-[#E8ECF0]',
};

const AGENT_COLORS: Record<string, string> = {
  'Ion Popescu': 'from-[#2B8FCC] to-[#1a6fa8]',
  'Elena Dumitrescu': 'from-[#16a34a] to-[#15803d]',
  'Andrei Stancu': 'from-[#9333ea] to-[#7e22ce]',
  'Maria Ionescu': 'from-[#ea580c] to-[#c2410c]',
  'Mihai Georgescu': 'from-[#0891b2] to-[#0e7490]',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function getCircleColor(name: string): string {
  const colors = ['#2B8FCC', '#16a34a', '#9333ea', '#ea580c', '#0891b2', '#db2777'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default function ViewClienti() {
  const [selectedClient, setSelectedClient] = useState<CrmClient | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function openClient(client: CrmClient) {
    setSelectedClient(client);
    setSheetOpen(true);
  }

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-[160px]">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
          <Input
            placeholder="Cauta client..."
            className="h-8 pl-8 text-xs border-[#E8ECF0]"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="h-8 text-xs w-[130px] border-[#E8ECF0]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">Toate</SelectItem>
            <SelectItem value="activ" className="text-xs">Client activ</SelectItem>
            <SelectItem value="prospect" className="text-xs">Prospect</SelectItem>
            <SelectItem value="negociere" className="text-xs">Negociere</SelectItem>
          </SelectContent>
        </Select>
        <Button size="sm" variant="outline" className="h-8 text-xs border-[#E8ECF0]">
          <Upload size={12} className="mr-1" />
          Importa Excel
        </Button>
        <Button size="sm" className="h-8 text-xs">
          <UserPlus size={12} className="mr-1" />
          Client nou
        </Button>
      </div>

      {/* Table */}
      <div className="border border-[#E8ECF0] rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F8FAFB] border-b border-[#E8ECF0] hover:bg-[#F8FAFB]">
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 pl-4">Companie</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 hidden md:table-cell">Contact</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 hidden lg:table-cell">Telefon</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5">Status</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 text-right">Valoare</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 hidden md:table-cell">Agent</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 pr-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CRM_CLIENTS.map((client) => (
              <TableRow
                key={client.id}
                className="cursor-pointer border-b border-[#F4F6F8] last:border-0"
                style={{ transition: 'background 0.12s' }}
                onClick={() => openClient(client)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#F8FAFB';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '';
                }}
              >
                <TableCell className="py-2.5 pl-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{ background: getCircleColor(client.company) }}
                    >
                      {getInitials(client.company)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-[#0D1117] truncate max-w-[130px]">
                        {client.company}
                      </p>
                      <p className="text-[10px] text-[#8A94A6]">{client.cui}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2.5 hidden md:table-cell">
                  <p className="text-[11.5px] font-medium text-[#0D1117]">{client.contact}</p>
                  <p className="text-[10px] text-[#8A94A6]">{client.email}</p>
                </TableCell>
                <TableCell className="py-2.5 hidden lg:table-cell">
                  <p className="text-[11.5px] text-[#4A5568]">{client.phone}</p>
                </TableCell>
                <TableCell className="py-2.5">
                  <Badge className={`text-[10px] px-1.5 py-0 ${STATUS_BADGE[client.status]}`}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-2.5 text-right">
                  <p
                    className="text-[12px] font-bold"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: client.totalValue > 50000 ? '#10B981' : '#0D1117',
                    }}
                  >
                    €{client.totalValue.toLocaleString('ro-RO')}
                  </p>
                </TableCell>
                <TableCell className="py-2.5 hidden md:table-cell">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback
                        className={`text-[8px] font-bold text-white bg-gradient-to-br ${AGENT_COLORS[client.agent] ?? 'from-[#8A94A6] to-[#4A5568]'}`}
                      >
                        {getInitials(client.agent)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[11px] text-[#4A5568] truncate max-w-[80px]">{client.agent}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5 pr-4">
                  <div className="flex items-center gap-1">
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F4F6F8] transition-colors"
                      onClick={(e) => { e.stopPropagation(); openClient(client); }}
                    >
                      <Eye size={12} className="text-[#8A94A6]" />
                    </button>
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F4F6F8] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone size={12} className="text-[#8A94A6]" />
                    </button>
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F4F6F8] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal size={12} className="text-[#8A94A6]" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-[11px] text-[#8A94A6]">1-10 din 847 clienti</p>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-7 w-7 p-0 border-[#E8ECF0]">
            <ChevronLeft size={12} />
          </Button>
          <Button size="sm" variant="outline" className="h-7 w-7 p-0 border-[#E8ECF0]">
            <ChevronRight size={12} />
          </Button>
        </div>
      </div>

      <ClientSheet
        client={selectedClient}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
