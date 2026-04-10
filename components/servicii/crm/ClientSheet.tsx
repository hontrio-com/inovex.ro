'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Building2,
  Users,
  TrendingUp,
  Phone as PhoneIcon,
  Calendar,
} from 'lucide-react';
import type { CrmClient } from '@/lib/crm-demo-data';
import { KANBAN_DEALS } from '@/lib/crm-demo-data';

interface ClientSheetProps {
  client: CrmClient | null;
  open: boolean;
  onClose: () => void;
}

const STATUS_BADGE: Record<string, string> = {
  'Client activ': 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]',
  'Prospect': 'bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]',
  'Negociere': 'bg-amber-50 text-amber-600 border border-amber-200',
  'Inactiv': 'bg-[#F4F6F8] text-[#8A94A6] border border-[#E8ECF0]',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

const CIRCLE_COLORS = [
  'linear-gradient(135deg, #2B8FCC 0%, #1a6fa8 100%)',
  'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
  'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
  'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
  'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
];

const CONTACTS = [
  { name: 'Director General', phone: '+40 740 123 456', email: 'director@company.ro' },
  { name: 'Manager IT', phone: '+40 756 234 567', email: 'it@company.ro' },
  { name: 'Contabil Sef', phone: '+40 721 345 678', email: 'contabilitate@company.ro' },
];

const ACTIVITY_HISTORY = [
  { icon: Phone, text: 'Apel initial - identificare nevoi', time: '28 Mar', color: '#2B8FCC' },
  { icon: Mail, text: 'Trimis prezentare companie', time: '01 Apr', color: '#F59E0B' },
  { icon: Calendar, text: 'Demo programat', time: '09 Apr', color: '#10B981' },
];

export default function ClientSheet({ client, open, onClose }: ClientSheetProps) {
  if (!client) return null;

  const clientDeals = KANBAN_DEALS.filter((d) =>
    d.company.toLowerCase().includes(client.company.split(' ')[0].toLowerCase())
  );

  const colorIdx = Math.abs(client.id.charCodeAt(1) - 48) % CIRCLE_COLORS.length;

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <SheetContent className="w-[480px] sm:max-w-[480px] p-0 overflow-y-auto">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#E8ECF0]">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-[15px] font-bold text-white shrink-0"
              style={{ background: CIRCLE_COLORS[colorIdx] }}
            >
              {getInitials(client.company)}
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-[15px] font-bold text-[#0D1117] leading-tight">
                {client.company}
              </SheetTitle>
              <p className="text-[11px] text-[#8A94A6] mt-0.5">{client.cui}</p>
              <Badge className={`mt-1.5 text-[10px] px-2 py-0 ${STATUS_BADGE[client.status] ?? ''}`}>
                {client.status}
              </Badge>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="general" className="mt-0">
          <TabsList className="mx-6 mt-4 h-8 text-xs">
            <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
            <TabsTrigger value="contacte" className="text-xs">Contacte</TabsTrigger>
            <TabsTrigger value="oportunitati" className="text-xs">Oportunitati</TabsTrigger>
            <TabsTrigger value="activitate" className="text-xs">Activitate</TabsTrigger>
          </TabsList>

          {/* General */}
          <TabsContent value="general" className="px-6 pb-6 mt-4 space-y-3">
            {client.address && (
              <div className="flex gap-3">
                <MapPin size={14} className="text-[#8A94A6] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-[#8A94A6] mb-0.5">Adresa</p>
                  <p className="text-[12.5px] font-medium text-[#0D1117]">{client.address}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <PhoneIcon size={14} className="text-[#8A94A6] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-[#8A94A6] mb-0.5">Telefon</p>
                <p className="text-[12.5px] font-medium text-[#0D1117]">{client.phone}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail size={14} className="text-[#8A94A6] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-[#8A94A6] mb-0.5">Email</p>
                <p className="text-[12.5px] font-medium text-[#0D1117]">{client.email}</p>
              </div>
            </div>

            {client.website && (
              <div className="flex gap-3">
                <Globe size={14} className="text-[#8A94A6] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-[#8A94A6] mb-0.5">Website</p>
                  <p className="text-[12.5px] font-medium text-[#2B8FCC]">{client.website}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Building2 size={14} className="text-[#8A94A6] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-[#8A94A6] mb-0.5">Industrie</p>
                <p className="text-[12.5px] font-medium text-[#0D1117]">{client.industry}</p>
              </div>
            </div>

            {client.employees && (
              <div className="flex gap-3">
                <Users size={14} className="text-[#8A94A6] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-[#8A94A6] mb-0.5">Angajati</p>
                  <p className="text-[12.5px] font-medium text-[#0D1117]">{client.employees} persoane</p>
                </div>
              </div>
            )}

            <Separator className="bg-[#F4F6F8] my-4" />

            <div className="flex gap-3">
              <TrendingUp size={14} className="text-[#8A94A6] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-[#8A94A6] mb-0.5">Valoare totala</p>
                <p
                  className="text-[15px] font-bold text-[#0D1117]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  €{client.totalValue.toLocaleString('ro-RO')}
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Contacte */}
          <TabsContent value="contacte" className="px-6 pb-6 mt-4 space-y-3">
            {CONTACTS.map((c, i) => (
              <div key={i} className="p-3 border border-[#E8ECF0] rounded-xl space-y-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: CIRCLE_COLORS[i % CIRCLE_COLORS.length] }}
                  >
                    {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className="text-[12px] font-semibold text-[#0D1117]">
                    {i === 0 ? client.contact : c.name}
                  </span>
                </div>
                <div className="flex gap-4 pl-9">
                  <div className="flex items-center gap-1 text-[11px] text-[#4A5568]">
                    <PhoneIcon size={11} className="text-[#8A94A6]" />
                    {i === 0 ? client.phone : c.phone}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#4A5568]">
                    <Mail size={11} className="text-[#8A94A6]" />
                    {i === 0 ? client.email : c.email}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Oportunitati */}
          <TabsContent value="oportunitati" className="px-6 pb-6 mt-4 space-y-2">
            {clientDeals.length === 0 ? (
              <p className="text-[12px] text-[#8A94A6] text-center py-6">Nicio oportunitate gasita.</p>
            ) : (
              clientDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="p-3 border border-[#E8ECF0] rounded-xl flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#0D1117] truncate">{deal.company}</p>
                    <p className="text-[11px] text-[#8A94A6] mt-0.5">{deal.status} - {deal.date}</p>
                  </div>
                  <p
                    className="text-[13px] font-bold text-[#0D1117] shrink-0"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    €{deal.value.toLocaleString('ro-RO')}
                  </p>
                </div>
              ))
            )}
          </TabsContent>

          {/* Activitate */}
          <TabsContent value="activitate" className="px-6 pb-6 mt-4 space-y-4">
            {ACTIVITY_HISTORY.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${item.color}20` }}
                >
                  <item.icon size={13} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-[#0D1117]">{item.text}</p>
                  <p className="text-[10px] text-[#8A94A6] mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
