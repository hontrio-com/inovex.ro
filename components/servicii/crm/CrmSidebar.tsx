'use client';

import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  CalendarDays,
  FileText,
  BarChart3,
  Settings,
  Bell,
  Settings2,
} from 'lucide-react';

interface CrmSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'pipeline', icon: KanbanSquare, label: 'Pipeline Vanzari' },
  { id: 'clienti', icon: Users, label: 'Clienti & Contacte' },
  { id: 'activitati', icon: CalendarDays, label: 'Activitati' },
  { id: 'oferte', icon: FileText, label: 'Oferte & Contracte' },
  { id: 'rapoarte', icon: BarChart3, label: 'Rapoarte' },
  { id: 'setari', icon: Settings, label: 'Setari' },
];

const NOTIFICATIONS = [
  { color: '#F59E0B', text: '3 oferte expira in 2 zile' },
  { color: '#EF4444', text: '1 activitate intarziata' },
  { color: '#10B981', text: 'Deal castigat - 72.000 EUR' },
];

export default function CrmSidebar({ activeView, onViewChange }: CrmSidebarProps) {
  return (
    <div
      className="flex flex-col h-full shrink-0 overflow-y-auto"
      style={{ width: 240, background: '#FFFFFF', borderRight: '1px solid #E8ECF0' }}
    >
      {/* Logo area */}
      <div className="px-4 py-4 border-b border-[#E8ECF0]">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #2B8FCC 0%, #1a6fa8 100%)' }}
          >
            I
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-[#0D1117] leading-none">Inovex CRM</p>
            <p className="text-[11px] text-amber-500 mt-0.5 leading-none">Cont Demo - Trial gratuit</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-150 text-[12.5px] font-medium"
              style={
                isActive
                  ? {
                      background: '#EAF5FF',
                      color: '#2B8FCC',
                      borderLeft: '2px solid #2B8FCC',
                      paddingLeft: '10px',
                    }
                  : {
                      color: '#4A5568',
                      borderLeft: '2px solid transparent',
                      paddingLeft: '10px',
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = '#F4F6F8';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }
              }}
            >
              <Icon size={15} className="shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Notifications */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 mb-2">
          <Bell size={12} className="text-[#8A94A6]" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#8A94A6]">
            Notificari
          </span>
        </div>
        <div className="space-y-1.5">
          {NOTIFICATIONS.map((n, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: n.color }} />
              <p className="text-[10.5px] text-[#4A5568] leading-tight truncate">{n.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom user area */}
      <div className="border-t border-[#E8ECF0] px-3 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #2B8FCC 0%, #9333ea 100%)' }}
          >
            IP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-[#0D1117] leading-none truncate">Ion Popescu</p>
            <p className="text-[10px] text-[#8A94A6] mt-0.5 leading-none truncate">Manager Vanzari</p>
          </div>
          <Settings2 size={13} className="text-[#8A94A6] shrink-0 cursor-pointer hover:text-[#4A5568]" />
        </div>
      </div>
    </div>
  );
}
