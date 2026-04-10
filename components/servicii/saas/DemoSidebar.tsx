'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  FolderKanban,
  BarChart3,
  Settings,
} from 'lucide-react';

interface DemoSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const NAV_ITEMS = [
  { id: 'overview', icon: LayoutDashboard, label: 'Prezentare generala' },
  { id: 'users', icon: Users, label: 'Utilizatori' },
  { id: 'revenue', icon: DollarSign, label: 'Venituri' },
  { id: 'projects', icon: FolderKanban, label: 'Proiecte' },
  { id: 'analytics', icon: BarChart3, label: 'Analiza' },
  { id: 'settings', icon: Settings, label: 'Setari' },
];

export default function DemoSidebar({ activeView, onViewChange }: DemoSidebarProps) {
  return (
    <div
      className="w-[220px] flex-shrink-0 bg-[#0D1117] flex flex-col h-full"
      style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-4 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="w-8 h-8 rounded-full bg-[#2B8FCC] flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">I</span>
        </div>
        <span className="text-white text-sm font-semibold leading-tight">
          Inovex Analytics
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-all duration-150 ${
                isActive
                  ? 'bg-[rgba(43,143,204,0.20)] text-[#4AADE8] border-l-2 border-[#2B8FCC]'
                  : 'text-[rgba(255,255,255,0.50)] hover:bg-[rgba(255,255,255,0.05)] border-l-2 border-transparent'
              }`}
              style={{
                borderRadius: isActive ? '0 8px 8px 0' : '0 8px 8px 0',
              }}
            >
              <Icon
                size={15}
                className={isActive ? 'text-[#4AADE8]' : 'text-[rgba(255,255,255,0.50)]'}
              />
              <span className="text-[12px] font-medium truncate">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom user row */}
      <div>
        <Separator style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="flex items-center gap-2.5 px-4 py-3">
          <div className="relative shrink-0">
            <Avatar className="w-7 h-7">
              <AvatarFallback className="text-[9px] font-bold text-white bg-gradient-to-br from-[#2B8FCC] to-[#9333ea]">
                AI
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#16a34a] rounded-full border-2 border-[#0D1117]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-white leading-tight truncate">
              Admin Inovex
            </p>
            <p className="text-[9px] text-[rgba(255,255,255,0.40)] leading-tight">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
