'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  MapPin,
  Phone,
  Camera,
  ArrowLeft,
  CheckCircle,
  Home,
  ClipboardList,
  BarChart2,
  User,
  Wifi,
  Battery,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import type { AppScreen } from './AppEcommerce';

/* ── Screen 1: Team Dashboard ── */
const TeamDashboardScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => {
  const tasks = [
    { title: 'Instalare echipament', client: 'SC Tech SRL', time: '13:00', status: 'Urgent', statusColor: '#EF4444', statusBg: '#FEE2E2', dot: '#EF4444' },
    { title: 'Revizie sistem', client: 'Firma ABC', time: '14:30', status: 'Programat', statusColor: '#D97706', statusBg: '#FEF3C7', dot: '#F59E0B' },
    { title: 'Consultanta tehnica', client: 'Ion Ionescu', time: '16:00', status: 'Normal', statusColor: '#6B7280', statusBg: '#F3F4F6', dot: '#10B981' },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520 }}>
      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px 4px' }}>
        <span style={{ fontSize: 11, fontWeight: 700 }}>10:24</span>
        <div style={{ display: 'flex', gap: 4 }}><Wifi size={11} /><Battery size={11} /></div>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 12px 8px', borderBottom: '1px solid #F3F4F6' }}>
        <span style={{ fontWeight: 800, fontSize: 13 }}>Inovex Field</span>
        <div style={{ position: 'relative' }}>
          <Bell size={18} />
          <span style={{ position: 'absolute', top: -5, right: -5, background: '#EF4444', color: '#fff', borderRadius: 99, fontSize: 8, fontWeight: 700, padding: '1px 3px' }}>3</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}>
        {/* User greeting */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Buna ziua, Mihai Ionescu</div>
          <div style={{ fontSize: 10, color: '#8A94A6' }}>Tehnician Senior</div>
        </div>

        {/* Stat tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7, marginBottom: 12 }}>
          {[{ l: '5 task-uri azi', c: '#F9FAFB', tc: '#4A5568' }, { l: '3 finalizate', c: '#F0FDF4', tc: '#10B981' }, { l: '2 urgente', c: '#FEF2F2', tc: '#EF4444' }].map(({ l, c, tc }) => (
            <div key={l} style={{ background: c, borderRadius: 8, padding: '7px 6px', textAlign: 'center' }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: tc }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Task list */}
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Task-uri active</div>
        {tasks.map((t, i) => (
          <div key={t.title} onClick={() => i === 0 && onNavigate(1)} style={{ background: '#fff', border: '1px solid #F3F4F6', borderRadius: 10, padding: '8px 10px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: i === 0 ? 'pointer' : 'default' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.dot, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700 }}>{t.title}</div>
                <div style={{ fontSize: 10, color: '#8A94A6' }}>{t.client} - {t.time}</div>
              </div>
            </div>
            <span style={{ fontSize: 9, fontWeight: 600, color: t.statusColor, background: t.statusBg, padding: '2px 7px', borderRadius: 99 }}>{t.status}</span>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div style={{ display: 'flex', borderTop: '1px solid #F3F4F6', background: '#fff', padding: '6px 0 8px' }}>
        {[{ Icon: Home, label: 'Acasa', active: true }, { Icon: ClipboardList, label: 'Task-uri' }, { Icon: BarChart2, label: 'Rapoarte' }, { Icon: User, label: 'Profil' }].map(({ Icon, label, active }) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Icon size={16} color={active ? '#2B8FCC' : '#8A94A6'} />
            <span style={{ fontSize: 9, color: active ? '#2B8FCC' : '#8A94A6' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Screen 2: Task Details (with functional checkboxes) ── */
const TaskDetailsScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => {
  const [checked, setChecked] = useState<boolean[]>([true, true, true, false, false]);

  const steps = [
    'Verificare echipament la sosire',
    'Testare conexiuni electrice',
    'Instalare software',
    'Testare functionare completa',
    'Instruire client',
  ];

  const toggle = (idx: number) => {
    setChecked(prev => prev.map((v, i) => i === idx ? !v : v));
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 8px', borderBottom: '1px solid #F3F4F6' }}>
        <button onClick={() => onNavigate(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><ArrowLeft size={18} /></button>
        <span style={{ fontWeight: 700, fontSize: 13 }}>Task #T-2847</span>
        <div style={{ width: 18 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
        {/* Client info */}
        <div style={{ background: '#F9FAFB', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>SC Tech SRL</div>
          <div style={{ fontSize: 10, color: '#4A5568', marginBottom: 4 }}>Dan Marinescu</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Phone size={11} color="#2B8FCC" />
            <span style={{ fontSize: 10, color: '#2B8FCC' }}>0722 987 654</span>
          </div>
        </div>

        {/* Location */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 8 }}>
          <MapPin size={13} color="#8A94A6" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <span style={{ fontSize: 11, color: '#4A5568' }}>Bd. Decebal 44, Bl. C2, Sc. 1, Ap. 5</span>
            <span style={{ fontSize: 10, color: '#2B8FCC', display: 'block', cursor: 'pointer' }}>Deschide in Maps</span>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 11, color: '#4A5568', lineHeight: 1.5, marginBottom: 12 }}>
          Instalare server rack si configurare echipamente de retea. Testare conectivitate si setare firewall.
        </p>

        {/* Checklist */}
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Pasi de executat</div>
        {steps.map((step, idx) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid #F9FAFB' }} onClick={() => toggle(idx)}>
            <Checkbox
              checked={checked[idx]}
              onCheckedChange={() => toggle(idx)}
              className="shrink-0"
              style={{ width: 16, height: 16 }}
            />
            <span style={{ fontSize: 11, color: checked[idx] ? '#8A94A6' : '#0D1117', textDecoration: checked[idx] ? 'line-through' : 'none', cursor: 'pointer' }}>{step}</span>
          </div>
        ))}

        {/* Photos section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700 }}>Fotografii</div>
          <span style={{ fontSize: 10, color: '#8A94A6' }}>0/3 fotografii</span>
        </div>
        <div style={{ background: '#F3F4F6', borderRadius: 8, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 10, cursor: 'pointer' }}>
          <Camera size={14} color="#8A94A6" />
          <span style={{ fontSize: 11, color: '#8A94A6' }}>Adauga fotografie</span>
        </div>

        {/* Note */}
        <textarea
          placeholder="Note tehnice..."
          style={{ width: '100%', borderRadius: 8, border: '1px solid #E5E7EB', padding: '7px 10px', fontSize: 11, color: '#4A5568', resize: 'none', height: 48, outline: 'none', fontFamily: 'inherit', marginBottom: 12, boxSizing: 'border-box' }}
        />

        <button onClick={() => onNavigate(2)} style={{ width: '100%', background: '#10B981', color: '#fff', border: 'none', borderRadius: 10, padding: '11px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
          Marcheaza finalizat
        </button>
      </div>
    </div>
  );
};

/* ── Screen 3: Completion Report ── */
const CompletionReportScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => (
  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520, padding: '20px 16px' }}>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}
    >
      <CheckCircle size={56} color="#10B981" strokeWidth={1.5} />
    </motion.div>

    <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 800, marginBottom: 14 }}>Task finalizat cu succes!</div>

    <div style={{ background: '#F9FAFB', borderRadius: 10, padding: '10px 12px', marginBottom: 12 }}>
      {[{ l: 'Ora start', v: '13:05' }, { l: 'Ora finalizare', v: '14:22' }, { l: 'Durata', v: '1h 17min' }, { l: 'Fotografii', v: '3 adaugate' }].map(({ l, v }) => (
        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 11 }}>
          <span style={{ color: '#8A94A6' }}>{l}</span>
          <span style={{ fontWeight: 600 }}>{v}</span>
        </div>
      ))}
    </div>

    {/* Signature placeholder */}
    <div style={{ background: '#F3F4F6', borderRadius: 10, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 14 }}>
      <span style={{ fontSize: 11, color: '#8A94A6' }}>Semnatura client</span>
    </div>

    <button style={{ width: '100%', background: '#2B8FCC', color: '#fff', border: 'none', borderRadius: 10, padding: '11px', fontSize: 12, fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}>
      Trimite raportul
    </button>
    <button onClick={() => onNavigate(0)} style={{ width: '100%', background: 'none', color: '#8A94A6', border: 'none', fontSize: 12, cursor: 'pointer' }}>
      Inapoi la task-uri
    </button>
  </div>
);

export const businessScreens: AppScreen[] = [
  { id: 'dashboard', component: TeamDashboardScreen },
  { id: 'task', component: TaskDetailsScreen },
  { id: 'report', component: CompletionReportScreen },
];
