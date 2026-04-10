'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Download,
  Copy,
  MoreHorizontal,
  Search,
  Plus,
} from 'lucide-react';
import { CRM_OFERTE } from '@/lib/crm-demo-data';
import type { CrmOferta, OfertaStatus } from '@/lib/crm-demo-data';
import OfertaSheet from '@/components/servicii/crm/OfertaSheet';

const STATUS_BADGE: Record<OfertaStatus, string> = {
  Draft: 'bg-[#F4F6F8] text-[#4A5568] border border-[#E8ECF0]',
  Trimisa: 'bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]',
  'In negociere': 'bg-amber-50 text-amber-600 border border-amber-200',
  Acceptata: 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]',
  Refuzata: 'bg-red-50 text-red-600 border border-red-200',
  Expirata: 'bg-[#F4F6F8] text-[#8A94A6] border border-[#E8ECF0]',
};

export default function ViewOferte() {
  const [selectedOferta, setSelectedOferta] = useState<CrmOferta | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function openOferta(oferta: CrmOferta) {
    setSelectedOferta(oferta);
    setSheetOpen(true);
  }

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-[140px]">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
          <Input
            placeholder="Cauta oferta..."
            className="h-8 pl-8 text-xs border-[#E8ECF0]"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="h-8 text-xs w-[120px] border-[#E8ECF0]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">Toate</SelectItem>
            <SelectItem value="draft" className="text-xs">Draft</SelectItem>
            <SelectItem value="trimisa" className="text-xs">Trimisa</SelectItem>
            <SelectItem value="negociere" className="text-xs">In negociere</SelectItem>
            <SelectItem value="acceptata" className="text-xs">Acceptata</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="h-8 text-xs w-[110px] border-[#E8ECF0]">
            <SelectValue placeholder="Perioada" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">Toate</SelectItem>
            <SelectItem value="luna" className="text-xs">Luna aceasta</SelectItem>
            <SelectItem value="trimestru" className="text-xs">Trimestrul curent</SelectItem>
          </SelectContent>
        </Select>
        <Button size="sm" className="h-8 text-xs">
          <Plus size={12} className="mr-1" />
          Oferta noua
        </Button>
      </div>

      {/* Table */}
      <div className="border border-[#E8ECF0] rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F8FAFB] border-b border-[#E8ECF0] hover:bg-[#F8FAFB]">
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 pl-4">Nr. oferta</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5">Client</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 hidden md:table-cell">Agent</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 text-right">Valoare</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 hidden lg:table-cell">Trimisa</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 hidden lg:table-cell">Valabila</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5">Status</TableHead>
              <TableHead className="text-[10px] font-semibold text-[#8A94A6] uppercase tracking-wide py-2.5 pr-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CRM_OFERTE.map((oferta) => (
              <TableRow
                key={oferta.id}
                className="cursor-pointer border-b border-[#F4F6F8] last:border-0"
                onClick={() => openOferta(oferta)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#F8FAFB';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '';
                }}
              >
                <TableCell className="py-2.5 pl-4">
                  <p
                    className="text-[12px] font-bold text-[#2B8FCC]"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {oferta.nr}
                  </p>
                </TableCell>
                <TableCell className="py-2.5">
                  <p className="text-[11.5px] font-semibold text-[#0D1117] truncate max-w-[120px]">{oferta.client}</p>
                  <p className="text-[10px] text-[#8A94A6]">{oferta.contact}</p>
                </TableCell>
                <TableCell className="py-2.5 hidden md:table-cell">
                  <p className="text-[11.5px] text-[#4A5568]">{oferta.agent}</p>
                </TableCell>
                <TableCell className="py-2.5 text-right">
                  <p
                    className="text-[12px] font-bold text-[#0D1117]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    €{oferta.value.toLocaleString('ro-RO')}
                  </p>
                </TableCell>
                <TableCell className="py-2.5 hidden lg:table-cell">
                  <p className="text-[11px] text-[#4A5568]">{oferta.dateTrimisa}</p>
                </TableCell>
                <TableCell className="py-2.5 hidden lg:table-cell">
                  <p className="text-[11px] text-[#4A5568]">{oferta.valabilaPana}</p>
                </TableCell>
                <TableCell className="py-2.5">
                  <Badge className={`text-[10px] px-1.5 py-0 ${STATUS_BADGE[oferta.status]}`}>
                    {oferta.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-2.5 pr-4">
                  <div className="flex items-center gap-1">
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F4F6F8] transition-colors"
                      onClick={(e) => { e.stopPropagation(); openOferta(oferta); }}
                    >
                      <Eye size={12} className="text-[#8A94A6]" />
                    </button>
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F4F6F8] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={12} className="text-[#8A94A6]" />
                    </button>
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F4F6F8] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Copy size={12} className="text-[#8A94A6]" />
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

      <OfertaSheet
        oferta={selectedOferta}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
