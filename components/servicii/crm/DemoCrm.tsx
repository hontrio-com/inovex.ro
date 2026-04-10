'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Info,
  LockKeyhole,
  ExternalLink,
  LayoutDashboard,
  KanbanSquare,
  Users,
  CalendarDays,
  FileText,
  BarChart3,
  Settings,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';
import CrmSidebar from '@/components/servicii/crm/CrmSidebar';
import ViewDashboard from '@/components/servicii/crm/CrmViews/ViewDashboard';
import ViewPipeline from '@/components/servicii/crm/CrmViews/ViewPipeline';
import ViewClienti from '@/components/servicii/crm/CrmViews/ViewClienti';
import ViewActivitati from '@/components/servicii/crm/CrmViews/ViewActivitati';
import ViewOferte from '@/components/servicii/crm/CrmViews/ViewOferte';
import ViewRapoarte from '@/components/servicii/crm/CrmViews/ViewRapoarte';
import ViewSetari from '@/components/servicii/crm/CrmViews/ViewSetari';

const VIEW_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  pipeline: 'Pipeline Vanzari',
  clienti: 'Clienti & Contacte',
  activitati: 'Activitati',
  oferte: 'Oferte & Contracte',
  rapoarte: 'Rapoarte',
  setari: 'Setari',
};

const MOBILE_NAV = [
  { id: 'dashboard', icon: LayoutDashboard },
  { id: 'pipeline', icon: KanbanSquare },
  { id: 'clienti', icon: Users },
  { id: 'activitati', icon: CalendarDays },
  { id: 'oferte', icon: FileText },
  { id: 'rapoarte', icon: BarChart3 },
  { id: 'setari', icon: Settings },
];

function renderView(view: string) {
  switch (view) {
    case 'dashboard': return <ViewDashboard />;
    case 'pipeline': return <ViewPipeline />;
    case 'clienti': return <ViewClienti />;
    case 'activitati': return <ViewActivitati />;
    case 'oferte': return <ViewOferte />;
    case 'rapoarte': return <ViewRapoarte />;
    case 'setari': return <ViewSetari />;
    default: return <ViewDashboard />;
  }
}

export default function DemoCrm() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <section id="demo-interactiv" className="py-[100px] bg-[#F8FAFB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-[640px] mx-auto text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 inline-flex items-center gap-1.5 border-[#C8E6F8] text-[#2B8FCC]"
          >
            <Sparkles size={12} />
            Demo interactiv CRM
          </Badge>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.7rem,2.8vw,2.4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0D1117',
            }}
            className="mb-4"
          >
            Exploreaza un CRM real, construit pentru{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>vanzari romanesti</span>
          </h2>
          <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed">
            Navigheza prin toate sectiunile unui CRM real. Datele sunt demonstrative, dar interfata este identica cu ce construim pentru clientii nostri.
          </p>
        </div>

        {/* Disclaimer bar */}
        <div className="bg-[#EAF5FF] border border-[#C8E6F8] rounded-lg flex items-center gap-2 mb-6 px-5 py-2.5">
          <Info size={15} className="text-[#2B8FCC] shrink-0" />
          <p className="text-[13px] font-medium text-[#2B8FCC]">
            Acest demo este doar pentru prezentare. Toate datele sunt fictive si nicio actiune nu este salvata.
          </p>
        </div>

        {/* Demo wrapper */}
        <div
          className="rounded-[20px] overflow-hidden border border-black/[0.06] bg-white"
          style={{
            boxShadow: '0 32px 80px rgba(0,0,0,0.12),0 8px 24px rgba(0,0,0,0.08)',
          }}
        >
          {/* Browser chrome */}
          <div className="h-10 bg-[#F4F6F8] border-b border-[#E8ECF0] flex items-center px-3 gap-3">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white rounded px-3 py-1 flex items-center gap-1.5 max-w-[260px] w-full">
                <LockKeyhole size={10} className="text-[#8A94A6] shrink-0" />
                <span className="text-[11px] text-[#4A5568] truncate">crm.inovex-demo.ro</span>
              </div>
            </div>
            <ExternalLink size={13} className="text-[#8A94A6] shrink-0" />
          </div>

          {/* Dashboard body */}
          <div className="flex h-[640px] overflow-hidden max-md:flex-col">
            {/* Sidebar - desktop only */}
            <div className="hidden md:flex">
              <CrmSidebar activeView={activeView} onViewChange={setActiveView} />
            </div>

            {/* Main area */}
            <div className="flex-1 overflow-hidden bg-[#F8FAFB] flex flex-col min-w-0">
              {/* Top bar */}
              <div className="h-14 bg-white border-b border-[#E8ECF0] flex items-center justify-between px-5 shrink-0">
                <h3
                  className="text-sm font-bold text-[#0D1117]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {VIEW_TITLES[activeView]}
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-[#E8ECF0] hidden sm:flex"
                    leftIcon={<SlidersHorizontal size={11} />}
                  >
                    Filtreaza
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 text-xs"
                    leftIcon={<Plus size={11} />}
                  >
                    Adauga
                  </Button>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderView(activeView)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile bottom navigation */}
          <div className="flex md:hidden bg-white border-t border-[#E8ECF0]">
            {MOBILE_NAV.map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveView(id)}
                className="flex-1 flex items-center justify-center py-3 transition-colors"
              >
                <Icon
                  size={17}
                  className={activeView === id ? 'text-[#2B8FCC]' : 'text-[#8A94A6]'}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
