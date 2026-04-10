'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GripVertical,
  MoreHorizontal,
  Calendar,
  Clock,
  Phone,
  Mail,
  Users,
  FileText,
  Download,
  CheckCircle,
  User,
} from 'lucide-react';
import type { KanbanDeal } from '@/lib/crm-demo-data';

interface KanbanCardProps {
  deal: KanbanDeal;
}

const TAG_COLORS: Record<string, string> = {
  ERP: 'bg-[#F3E8FF] text-[#7c3aed]',
  CRM: 'bg-[#EAF5FF] text-[#2B8FCC]',
  CMS: 'bg-[#ECFDF5] text-[#059669]',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getDaysInStage(dateStr: string): number {
  const parts = dateStr.split(' ');
  const day = parseInt(parts[0]);
  const monthMap: Record<string, number> = {
    Ian: 0, Feb: 1, Mar: 2, Apr: 3, Mai: 4, Iun: 5,
    Iul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const month = monthMap[parts[1]] ?? 3;
  const date = new Date(2026, month, day);
  const now = new Date(2026, 3, 9);
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

const ACTIVITY_TIMELINE = [
  { type: 'Phone', icon: Phone, label: 'Apel telefonic', time: '09:00', text: 'Discutat cerinte tehnice si termen de implementare.', color: '#2B8FCC' },
  { type: 'Mail', icon: Mail, label: 'Email', time: '11:30', text: 'Trimis documentatie tehnica si prezentare solutie.', color: '#F59E0B' },
  { type: 'Meeting', icon: Users, label: 'Intalnire', time: '14:00', text: 'Demo produs cu echipa de management - 5 participanti.', color: '#10B981' },
  { type: 'Note', icon: FileText, label: 'Nota', time: '16:00', text: 'Client solicita referinte din industria farmaceutica.', color: '#8A94A6' },
];

const DOCUMENTS = [
  { name: 'Oferta_tehnica_v2.pdf', size: '2.4 MB', icon: FileText },
  { name: 'Prezentare_solutie.pptx', size: '8.1 MB', icon: FileText },
  { name: 'Contract_cadru_draft.docx', size: '340 KB', icon: FileText },
];

export default function KanbanCard({ deal }: KanbanCardProps) {
  const [open, setOpen] = useState(false);
  const daysInStage = getDaysInStage(deal.date);

  return (
    <>
      <Card
        className="cursor-pointer transition-all duration-200 border border-[#E8ECF0] bg-white"
        style={{ userSelect: 'none' }}
        onClick={() => setOpen(true)}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.10)';
          el.style.borderColor = 'rgba(43,143,204,0.25)';
          el.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = '';
          el.style.borderColor = '';
          el.style.transform = '';
        }}
      >
        <CardContent className="p-3">
          {/* Header row */}
          <div className="flex items-start justify-between gap-1 mb-2">
            <div className="flex items-start gap-1.5 flex-1 min-w-0">
              <GripVertical size={13} className="text-[#8A94A6] shrink-0 opacity-25 mt-0.5" />
              <p className="text-[12.5px] font-bold text-[#0D1117] leading-tight line-clamp-2">
                {deal.company}
              </p>
            </div>
            <MoreHorizontal size={13} className="text-[#8A94A6] shrink-0 mt-0.5" />
          </div>

          {/* Value */}
          <p
            className="text-[15px] font-bold text-[#0D1117] mb-2 leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            €{deal.value.toLocaleString('ro-RO')}
          </p>

          {/* Agent */}
          <div className="flex items-center gap-1.5 mb-3">
            <Avatar className="w-5 h-5">
              <AvatarFallback className="text-[8px] font-bold text-white bg-gradient-to-br from-[#2B8FCC] to-[#1a6fa8]">
                {getInitials(deal.agent)}
              </AvatarFallback>
            </Avatar>
            <span className="text-[10.5px] text-[#8A94A6]">{deal.agent}</span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className={`text-[10px] px-1.5 py-0 ${TAG_COLORS[deal.tag] ?? ''}`}
            >
              {deal.tag}
            </Badge>
            <div className="flex items-center gap-1 text-[10px] text-[#8A94A6]">
              <Calendar size={10} />
              <span>{deal.date}</span>
              {daysInStage > 0 && (
                <span className="text-[#8A94A6] ml-1">{daysInStage}z</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[520px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-5 pb-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Badge
                  variant="secondary"
                  className={`mb-2 text-[10px] ${TAG_COLORS[deal.tag] ?? ''}`}
                >
                  {deal.tag}
                </Badge>
                <DialogTitle
                  className="text-[16px] font-bold text-[#0D1117] leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {deal.company}
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="detalii" className="mt-3">
            <TabsList className="mx-6 mb-0 h-8 text-xs">
              <TabsTrigger value="detalii" className="text-xs">Detalii</TabsTrigger>
              <TabsTrigger value="activitate" className="text-xs">Activitate</TabsTrigger>
              <TabsTrigger value="documente" className="text-xs">Documente</TabsTrigger>
            </TabsList>

            {/* Detalii tab */}
            <TabsContent value="detalii" className="px-6 pb-6 mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F8FAFB] rounded-lg p-3">
                  <p className="text-[10px] text-[#8A94A6] mb-1">Valoare</p>
                  <p className="text-[15px] font-bold text-[#0D1117]" style={{ fontFamily: 'var(--font-display)' }}>
                    €{deal.value.toLocaleString('ro-RO')}
                  </p>
                </div>
                <div className="bg-[#F8FAFB] rounded-lg p-3">
                  <p className="text-[10px] text-[#8A94A6] mb-1">Probabilitate</p>
                  <p className="text-[15px] font-bold text-[#0D1117]" style={{ fontFamily: 'var(--font-display)' }}>
                    {deal.probability ?? 50}%
                  </p>
                </div>
                <div className="bg-[#F8FAFB] rounded-lg p-3">
                  <p className="text-[10px] text-[#8A94A6] mb-1">Etapa</p>
                  <p className="text-[12px] font-semibold text-[#0D1117]">{deal.status}</p>
                </div>
                <div className="bg-[#F8FAFB] rounded-lg p-3">
                  <p className="text-[10px] text-[#8A94A6] mb-1">Agent</p>
                  <div className="flex items-center gap-1.5">
                    <Avatar className="w-4 h-4">
                      <AvatarFallback className="text-[8px] font-bold text-white bg-gradient-to-br from-[#2B8FCC] to-[#1a6fa8]">
                        {getInitials(deal.agent)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-[12px] font-semibold text-[#0D1117] truncate">{deal.agent}</p>
                  </div>
                </div>
              </div>

              {deal.description && (
                <div>
                  <p className="text-[10px] text-[#8A94A6] mb-1.5">Descriere</p>
                  <p className="text-[12px] text-[#4A5568] leading-relaxed">{deal.description}</p>
                </div>
              )}

              <Separator className="bg-[#F4F6F8]" />

              <div className="flex gap-2">
                <Button size="sm" className="text-xs h-8 flex-1">
                  <Phone size={12} className="mr-1" />
                  Apel
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-8 flex-1 border-[#E8ECF0]">
                  <Mail size={12} className="mr-1" />
                  Email
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-8 flex-1 border-[#E8ECF0]">
                  <User size={12} className="mr-1" />
                  Profil
                </Button>
              </div>
            </TabsContent>

            {/* Activitate tab */}
            <TabsContent value="activitate" className="px-6 pb-6 mt-4">
              <div className="space-y-4">
                {ACTIVITY_TIMELINE.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}20` }}
                    >
                      <item.icon size={13} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[11px] font-semibold text-[#0D1117]">{item.label}</span>
                        <span className="text-[10px] text-[#8A94A6]">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-[#4A5568]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Documente tab */}
            <TabsContent value="documente" className="px-6 pb-6 mt-4">
              <div className="space-y-2">
                {DOCUMENTS.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border border-[#E8ECF0] hover:bg-[#F8FAFB] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-[#EAF5FF] rounded-md flex items-center justify-center">
                        <FileText size={14} className="text-[#2B8FCC]" />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#0D1117]">{doc.name}</p>
                        <p className="text-[10px] text-[#8A94A6]">{doc.size}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                      <Download size={13} className="text-[#8A94A6]" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#8A94A6]">
                <CheckCircle size={12} className="text-[#10B981]" />
                3 documente sincronizate
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
