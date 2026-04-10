'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sparkles,
  Info,
  LockKeyhole,
  ExternalLink,
  LayoutDashboard,
  Users,
  DollarSign,
  FolderKanban,
  BarChart3,
  Settings,
  Download,
  Plus,
} from 'lucide-react';
import DemoSidebar from '@/components/servicii/saas/DemoSidebar';
import ViewOverview from '@/components/servicii/saas/DemoViews/ViewOverview';
import ViewUsers from '@/components/servicii/saas/DemoViews/ViewUsers';
import ViewRevenue from '@/components/servicii/saas/DemoViews/ViewRevenue';
import ViewProjects from '@/components/servicii/saas/DemoViews/ViewProjects';
import ViewAnalytics from '@/components/servicii/saas/DemoViews/ViewAnalytics';
import ViewSettings from '@/components/servicii/saas/DemoViews/ViewSettings';

const VIEW_TITLES: Record<string, string> = {
  overview: 'Prezentare generala',
  users: 'Utilizatori',
  revenue: 'Venituri',
  projects: 'Proiecte',
  analytics: 'Analiza',
  settings: 'Setari',
};

const MOBILE_NAV = [
  { id: 'overview', icon: LayoutDashboard },
  { id: 'users', icon: Users },
  { id: 'revenue', icon: DollarSign },
  { id: 'projects', icon: FolderKanban },
  { id: 'analytics', icon: BarChart3 },
  { id: 'settings', icon: Settings },
];

function renderView(view: string) {
  switch (view) {
    case 'overview': return <ViewOverview />;
    case 'users': return <ViewUsers />;
    case 'revenue': return <ViewRevenue />;
    case 'projects': return <ViewProjects />;
    case 'analytics': return <ViewAnalytics />;
    case 'settings': return <ViewSettings />;
    default: return <ViewOverview />;
  }
}

export default function DemoInteractiv() {
  const [activeView, setActiveView] = useState('overview');

  return (
    <section id="demo-interactiv" className="py-[100px] bg-[#F8FAFB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-[640px] mx-auto text-center mb-14">
          <Badge
            variant="outline"
            className="mb-4 inline-flex items-center gap-1.5 border-[#C8E6F8] text-[#2B8FCC]"
          >
            <Sparkles size={12} />
            Demo interactiv
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
            Exploreaza un exemplu real de aplicatie{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>SaaS</span>
          </h2>
          <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed">
            Navigheza prin toate sectiunile unui dashboard real. Datele sunt
            demonstrative, dar interfata este identica cu ce construim pentru
            clientii nostri.
          </p>
        </div>

        {/* Disclaimer bar */}
        <div className="bg-[#EAF5FF] border border-[#C8E6F8] rounded-lg flex items-center gap-2 mb-6 px-5 py-2.5">
          <Info size={15} className="text-[#2B8FCC] shrink-0" />
          <p className="text-[13px] font-medium text-[#2B8FCC]">
            Acest demo este doar pentru prezentare. Toate datele sunt fictive si
            nicio actiune nu este salvata.
          </p>
        </div>

        {/* Demo wrapper */}
        <div
          className="rounded-[20px] overflow-hidden border border-black/[0.06] bg-white"
          style={{
            boxShadow:
              '0 32px 80px rgba(0,0,0,0.12),0 8px 24px rgba(0,0,0,0.08)',
          }}
        >
          {/* Browser chrome */}
          <div className="h-10 bg-[#F4F6F8] border-b border-[#E8ECF0] flex items-center px-3 gap-3">
            {/* Dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            {/* URL bar */}
            <div className="flex-1 flex justify-center">
              <div className="bg-white rounded px-3 py-1 flex items-center gap-1.5 max-w-[260px] w-full">
                <LockKeyhole size={10} className="text-[#8A94A6] shrink-0" />
                <span className="text-[11px] text-[#4A5568] truncate">
                  app.inovex-demo.ro
                </span>
              </div>
            </div>
            {/* External link */}
            <ExternalLink size={13} className="text-[#8A94A6] shrink-0" />
          </div>

          {/* Dashboard body */}
          <div className="flex h-[600px]">
            {/* Sidebar - desktop only */}
            <div className="hidden md:flex">
              <DemoSidebar activeView={activeView} onViewChange={setActiveView} />
            </div>

            {/* Main area */}
            <div className="flex-1 overflow-hidden bg-[#F8FAFB] flex flex-col min-w-0">
              {/* Top bar */}
              <div className="h-14 bg-white border-b border-[#E8ECF0] flex items-center justify-between px-5 shrink-0">
                <h3
                  className="text-sm font-semibold text-[#0D1117]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {VIEW_TITLES[activeView]}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#8A94A6] hidden sm:block">
                    9 Apr 2026
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs border-[#E8ECF0] hidden sm:flex"
                    leftIcon={<Download size={11} />}
                  >
                    Export
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 text-xs"
                    leftIcon={<Plus size={11} />}
                  >
                    Adauga
                  </Button>
                  <Avatar className="w-7 h-7 shrink-0">
                    <AvatarFallback className="text-[9px] font-bold text-white bg-gradient-to-br from-[#2B8FCC] to-[#9333ea]">
                      AI
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderView(activeView)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile bottom nav */}
          <div className="flex md:hidden bg-[#0D1117] border-t border-[rgba(255,255,255,0.08)]">
            {MOBILE_NAV.map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveView(id)}
                className="flex-1 flex items-center justify-center py-3 transition-colors"
              >
                <Icon
                  size={18}
                  className={
                    activeView === id
                      ? 'text-[#4AADE8]'
                      : 'text-[rgba(255,255,255,0.50)]'
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
