'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, Send, Copy, CheckCircle, Clock, Eye } from 'lucide-react';
import type { CrmOferta, OfertaStatus } from '@/lib/crm-demo-data';

interface OfertaSheetProps {
  oferta: CrmOferta | null;
  open: boolean;
  onClose: () => void;
}

const STATUS_BADGE: Record<OfertaStatus, string> = {
  Draft: 'bg-[#F4F6F8] text-[#4A5568] border border-[#E8ECF0]',
  Trimisa: 'bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]',
  'In negociere': 'bg-amber-50 text-amber-600 border border-amber-200',
  Acceptata: 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]',
  Refuzata: 'bg-red-50 text-red-600 border border-red-200',
  Expirata: 'bg-[#F4F6F8] text-[#8A94A6] border border-[#E8ECF0]',
};

const SERVICES = [
  { desc: 'Licenta software (12 luni)', qty: 1, unitPrice: 0, total: 0, isBase: true },
  { desc: 'Implementare si configurare', qty: 40, unitPrice: 0, total: 0, isImpl: true },
  { desc: 'Migrare date si integrari', qty: 1, unitPrice: 0, total: 0, isLump: true },
  { desc: 'Training utilizatori (3 sesiuni)', qty: 3, unitPrice: 0, total: 0, isTraining: true },
  { desc: 'Suport tehnic 12 luni', qty: 12, unitPrice: 0, total: 0, isSupport: true },
];

const STATUS_TIMELINE: { key: OfertaStatus; label: string; icon: React.ElementType }[] = [
  { key: 'Draft', label: 'Creata', icon: Copy },
  { key: 'Trimisa', label: 'Trimisa', icon: Send },
  { key: 'In negociere', label: 'Vizualizata', icon: Eye },
  { key: 'Acceptata', label: 'Acceptata', icon: CheckCircle },
];

const STATUS_ORDER: OfertaStatus[] = ['Draft', 'Trimisa', 'In negociere', 'Acceptata'];

function getStatusStep(status: OfertaStatus): number {
  if (status === 'Refuzata') return 3;
  if (status === 'Expirata') return 2;
  return STATUS_ORDER.indexOf(status);
}

function distributeValue(total: number): { licenta: number; impl: number; migrare: number; training: number; suport: number } {
  const licenta = Math.round(total * 0.45);
  const impl = Math.round(total * 0.25);
  const migrare = Math.round(total * 0.15);
  const training = Math.round(total * 0.08);
  const suport = total - licenta - impl - migrare - training;
  return { licenta, impl, migrare, training, suport };
}

export default function OfertaSheet({ oferta, open, onClose }: OfertaSheetProps) {
  if (!oferta) return null;

  const dist = distributeValue(oferta.value);
  const rows = [
    { desc: 'Licenta software (12 luni)', qty: 1, unitPrice: dist.licenta, total: dist.licenta },
    { desc: 'Implementare si configurare', qty: 40, unitPrice: Math.round(dist.impl / 40), total: dist.impl },
    { desc: 'Migrare date si integrari', qty: 1, unitPrice: dist.migrare, total: dist.migrare },
    { desc: 'Training utilizatori (3 sesiuni)', qty: 3, unitPrice: Math.round(dist.training / 3), total: dist.training },
    { desc: 'Suport tehnic 12 luni', qty: 12, unitPrice: Math.round(dist.suport / 12), total: dist.suport },
  ];

  const subtotal = oferta.value;
  const tva = Math.round(subtotal * 0.19);
  const total = subtotal + tva;

  const currentStep = getStatusStep(oferta.status);
  const isRejected = oferta.status === 'Refuzata';
  const isExpired = oferta.status === 'Expirata';

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <SheetContent className="w-[520px] sm:max-w-[520px] p-0 overflow-y-auto">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#E8ECF0]">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                className="text-[13px] font-bold text-[#2B8FCC] mb-1 tracking-wide"
                style={{ fontFamily: 'monospace' }}
              >
                {oferta.nr}
              </p>
              <SheetTitle className="text-[15px] font-bold text-[#0D1117] leading-tight">
                {oferta.client}
              </SheetTitle>
              <p className="text-[11px] text-[#8A94A6] mt-0.5">
                {oferta.contact} - {oferta.agent}
              </p>
            </div>
            <Badge className={`shrink-0 text-[10px] mt-1 ${STATUS_BADGE[oferta.status]}`}>
              {oferta.status}
            </Badge>
          </div>
        </SheetHeader>

        <div className="px-6 py-5 space-y-5">
          {/* Service table */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8A94A6] mb-3">
              Servicii incluse
            </p>
            <div className="border border-[#E8ECF0] rounded-xl overflow-hidden">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="bg-[#F8FAFB] border-b border-[#E8ECF0]">
                    <th className="text-left px-3 py-2 font-semibold text-[#4A5568] w-[45%]">Serviciu</th>
                    <th className="text-right px-3 py-2 font-semibold text-[#4A5568]">Cant.</th>
                    <th className="text-right px-3 py-2 font-semibold text-[#4A5568]">Pret unit.</th>
                    <th className="text-right px-3 py-2 font-semibold text-[#4A5568]">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-b border-[#F4F6F8] last:border-0">
                      <td className="px-3 py-2 text-[#0D1117] font-medium">{row.desc}</td>
                      <td className="px-3 py-2 text-right text-[#4A5568]">{row.qty}</td>
                      <td className="px-3 py-2 text-right text-[#4A5568]">
                        €{row.unitPrice.toLocaleString('ro-RO')}
                      </td>
                      <td className="px-3 py-2 text-right font-semibold text-[#0D1117]">
                        €{row.total.toLocaleString('ro-RO')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-3 space-y-1.5 border-t border-[#E8ECF0] pt-3">
              <div className="flex justify-between text-[12px]">
                <span className="text-[#4A5568]">Subtotal</span>
                <span className="font-medium text-[#0D1117]">€{subtotal.toLocaleString('ro-RO')}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[#4A5568]">TVA 19%</span>
                <span className="font-medium text-[#0D1117]">€{tva.toLocaleString('ro-RO')}</span>
              </div>
              <div className="flex justify-between text-[14px] font-bold">
                <span className="text-[#0D1117]">Total cu TVA</span>
                <span
                  className="text-[#0D1117]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  €{total.toLocaleString('ro-RO')}
                </span>
              </div>
            </div>
          </div>

          <Separator className="bg-[#F4F6F8]" />

          {/* Status timeline */}
          {!isRejected && !isExpired && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8A94A6] mb-3">
                Status oferta
              </p>
              <div className="flex items-center gap-0">
                {STATUS_TIMELINE.map((step, i) => {
                  const isActive = i <= currentStep;
                  const isCurrent = i === currentStep;
                  return (
                    <div key={step.key} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors"
                          style={{
                            borderColor: isActive ? '#2B8FCC' : '#E8ECF0',
                            background: isActive ? '#EAF5FF' : '#F8FAFB',
                          }}
                        >
                          <step.icon
                            size={12}
                            style={{ color: isActive ? '#2B8FCC' : '#8A94A6' }}
                          />
                        </div>
                        <p
                          className="text-[9px] mt-1 text-center leading-tight"
                          style={{
                            color: isCurrent ? '#2B8FCC' : isActive ? '#4A5568' : '#8A94A6',
                            fontWeight: isCurrent ? 700 : 400,
                          }}
                        >
                          {step.label}
                        </p>
                      </div>
                      {i < STATUS_TIMELINE.length - 1 && (
                        <div
                          className="flex-1 h-0.5 mb-4"
                          style={{ background: i < currentStep ? '#2B8FCC' : '#E8ECF0' }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8FAFB] rounded-lg p-3">
              <p className="text-[10px] text-[#8A94A6] mb-1 flex items-center gap-1">
                <Send size={10} /> Data trimisa
              </p>
              <p className="text-[12px] font-semibold text-[#0D1117]">{oferta.dateTrimisa}</p>
            </div>
            <div className="bg-[#F8FAFB] rounded-lg p-3">
              <p className="text-[10px] text-[#8A94A6] mb-1 flex items-center gap-1">
                <Clock size={10} /> Valabila pana
              </p>
              <p className="text-[12px] font-semibold text-[#0D1117]">{oferta.valabilaPana}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button size="sm" className="text-xs h-8 flex-1">
              <Download size={12} className="mr-1" />
              Descarca PDF
            </Button>
            {oferta.status === 'Draft' && (
              <Button size="sm" variant="outline" className="text-xs h-8 flex-1 border-[#E8ECF0]">
                <Send size={12} className="mr-1" />
                Trimite
              </Button>
            )}
            {oferta.status === 'Trimisa' && (
              <Button size="sm" variant="outline" className="text-xs h-8 flex-1 border-[#E8ECF0]">
                <Copy size={12} className="mr-1" />
                Duplica
              </Button>
            )}
            {(oferta.status === 'Expirata' || oferta.status === 'Refuzata') && (
              <Button size="sm" variant="outline" className="text-xs h-8 flex-1 border-[#E8ECF0]">
                <Copy size={12} className="mr-1" />
                Retrimit
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
