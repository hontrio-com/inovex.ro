'use client';

import {
  MessageSquare, FileText, Layers, Code2, Rocket,
  ShoppingCart, Globe, Database, Smartphone, Zap, Settings, Search, Bell,
  CreditCard, Truck, FileSpreadsheet, TrendingUp, Shield, BarChart3,
  GitBranch, Kanban, Package, BarChart2, FileCheck, Wifi, Lock, Star, Send,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import type { ProcessStep } from '@/lib/site-data';

type LucideIcon = React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

const ICON_MAP: Record<string, LucideIcon> = {
  MessageSquare, FileText, Layers, Code2, Rocket,
  ShoppingCart, Globe, Database, Smartphone, Zap, Settings, Search, Bell,
  CreditCard, Truck, FileSpreadsheet, TrendingUp, Shield, BarChart3,
  GitBranch, Kanban, Package, BarChart2, FileCheck, Wifi, Lock, Star, Send,
};

function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? MessageSquare;
}

interface PasInternal { numar: string; icon: LucideIcon; titlu: string; descriere: string; }

const PASI: PasInternal[] = [
  { numar: '01', icon: MessageSquare, titlu: 'Consultație Gratuită',  descriere: 'Discutăm proiectul tău, înțelegem obiectivele și îți oferim o estimare inițială în aceeași zi.' },
  { numar: '02', icon: FileText,      titlu: 'Strategie & Propunere', descriere: 'Elaborăm propunerea tehnică detaliată, wireframe-urile inițiale și planul de proiect cu timeline clar.' },
  { numar: '03', icon: Layers,        titlu: 'Design & Prototip',     descriere: 'Creăm designul complet în Figma, iterăm până la aprobare, fără costuri suplimentare pentru revizii.' },
  { numar: '04', icon: Code2,         titlu: 'Dezvoltare & Testare',  descriere: 'Construim și testăm pe toate dispozitivele și browserele. Tu urmărești progresul în timp real.' },
  { numar: '05', icon: Rocket,        titlu: 'Lansare & Suport',      descriere: 'Lansăm, configurăm tot, facem handover complet și oferim suport post-lansare inclus 30 de zile.' },
];

export function Process({ steps }: { steps?: ProcessStep[] } = {}) {
  const pasi: PasInternal[] = steps && steps.length > 0
    ? steps.map((s) => ({ numar: s.numar, icon: resolveIcon(s.iconName), titlu: s.titlu, descriere: s.descriere }))
    : PASI;

  return (
    <section className="py-20 lg:py-28 bg-gray-950" aria-labelledby="proces-titlu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 id="proces-titlu" className="text-h2 text-white mb-4">Cum lucrăm</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Un proces transparent și predictibil, de la idee la lansare, fără surprize.
          </p>
        </ScrollReveal>

        {/* Timeline desktop */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-5 gap-4 relative">
            <div className="absolute top-8 left-[10%] right-[10%] h-px bg-white/10" aria-hidden="true">
              <motion.div
                className="h-full bg-blue-500 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] as [number,number,number,number] }}
              />
            </div>

            {pasi.map((pas, i) => (
              <ScrollReveal key={pas.numar} delay={i * 0.12} className="text-center relative">
                <PasCard pas={pas} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Timeline mobile */}
        <div className="lg:hidden space-y-4 relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />
          {PASI.map((pas, i) => (
            <ScrollReveal key={pas.numar} delay={i * 0.1} className="relative pl-20">
              <Badge className="absolute left-4 top-4 size-8 rounded-full flex items-center justify-center p-0 text-xs font-bold bg-blue-600 text-white border-0">
                {i + 1}
              </Badge>
              <Card className="bg-white/[0.04] border-white/10">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <pas.icon size={20} className="text-blue-400" />
                    <h3 className="text-white font-semibold">{pas.titlu}</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{pas.descriere}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PasCard({ pas }: { pas: PasInternal }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        <span className="absolute -top-3 -right-3 text-[80px] font-bold text-white/[0.04] leading-none select-none pointer-events-none" style={{ fontFamily: 'var(--font-display)' }}>
          {pas.numar}
        </span>
        <Card className="w-16 h-16 rounded-2xl bg-white/[0.06] border-white/10 flex items-center justify-center">
          <pas.icon size={28} className="text-blue-400" />
        </Card>
      </div>
      <h3 className="text-white font-semibold text-center mb-2 text-sm">{pas.titlu}</h3>
      <p className="text-white/50 text-xs text-center leading-relaxed">{pas.descriere}</p>
    </div>
  );
}
