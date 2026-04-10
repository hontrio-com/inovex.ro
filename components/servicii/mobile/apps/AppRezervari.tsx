'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Bell,
  Home,
  Search,
  Heart,
  User,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Wifi,
  Battery,
} from 'lucide-react';
import type { AppScreen } from './AppEcommerce';

/* ── Screen 1: Home Services ── */
const HomeServicesScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => {
  const services = [
    { name: 'Tuns & Coafat', duration: '45 min', rating: 4.9, bg: '#F5F3FF', textColor: '#7C3AED' },
    { name: 'Vopsit par', duration: '90 min', rating: 4.7, bg: '#FFFBEB', textColor: '#F59E0B' },
    { name: 'Manichiura', duration: '40 min', rating: 4.8, bg: '#FDF2F8', textColor: '#EC4899' },
  ];
  const specialists = [
    { initials: 'EM', name: 'Elena M.', specialty: 'Coafor Senior', rating: 4.9, bg: '#2B8FCC' },
    { initials: 'AM', name: 'Ana M.', specialty: 'Nail Artist', rating: 4.8, bg: '#EC4899' },
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontWeight: 800, fontSize: 14 }}>Salon Elena</span>
          <MapPin size={12} color="#8A94A6" />
        </div>
        <Bell size={18} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}>
        {/* Banner */}
        <div style={{ background: '#F59E0B', borderRadius: 10, padding: '10px 14px', marginBottom: 12, color: '#fff' }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Rezerva acum - 10% reducere</div>
          <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2 }}>La prima programare online</div>
        </div>

        {/* Services */}
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Servicii populare</div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 14, paddingBottom: 4 }}>
          {services.map((s) => (
            <div key={s.name} onClick={() => onNavigate(1)} style={{ flexShrink: 0, width: 100, background: '#fff', borderRadius: 10, border: '1px solid #F3F4F6', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 50, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: s.textColor }}>{s.name}</span>
              </div>
              <div style={{ padding: '6px 7px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 2 }}>{s.name}</div>
                <div style={{ fontSize: 10, color: '#8A94A6' }}>{s.duration}</div>
                <div style={{ fontSize: 10, color: '#F59E0B', fontWeight: 600 }}>★ {s.rating}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Specialists */}
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Specialisti</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {specialists.map((sp) => (
            <div key={sp.name} style={{ flex: 1, background: '#fff', borderRadius: 10, border: '1px solid #F3F4F6', padding: '8px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: sp.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{sp.initials}</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700 }}>{sp.name}</div>
                <div style={{ fontSize: 9, color: '#8A94A6' }}>{sp.specialty}</div>
                <div style={{ fontSize: 9, color: '#F59E0B' }}>★ {sp.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{ display: 'flex', borderTop: '1px solid #F3F4F6', background: '#fff', padding: '6px 0 8px' }}>
        {[{ Icon: Home, label: 'Home', active: true }, { Icon: Search, label: 'Cauta' }, { Icon: Calendar, label: 'Rezervari' }, { Icon: Heart, label: 'Favorite' }, { Icon: User, label: 'Profil' }].map(({ Icon, label, active }) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Icon size={16} color={active ? '#2B8FCC' : '#8A94A6'} />
            <span style={{ fontSize: 9, color: active ? '#2B8FCC' : '#8A94A6' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Screen 2: Date/Time Selection ── */
const DateTimeScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => {
  const days = [
    { day: 'Lu', date: 7, avail: true },
    { day: 'Ma', date: 8, avail: true },
    { day: 'Mi', date: 9, avail: false },
    { day: 'Jo', date: 10, avail: true, today: true },
    { day: 'Vi', date: 11, avail: true },
    { day: 'Sa', date: 12, avail: true },
    { day: 'Du', date: 13, avail: false },
  ];
  const slots = [
    { t: '09:00', avail: true }, { t: '09:30', avail: true }, { t: '10:00', avail: true },
    { t: '10:30', avail: false }, { t: '11:00', avail: false }, { t: '11:30', avail: true, selected: true },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 8px', borderBottom: '1px solid #F3F4F6' }}>
        <button onClick={() => onNavigate(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><ArrowLeft size={18} /></button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 13 }}>Tuns & Coafat</div>
          <span style={{ background: '#EAF5FF', color: '#2B8FCC', fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 99 }}>45 min</span>
        </div>
        <div style={{ width: 18 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
        {/* Week calendar */}
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Alege data</div>
        <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
          {days.map((d) => (
            <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5px 2px', borderRadius: 8, background: d.today ? '#2B8FCC' : d.avail ? '#F9FAFB' : '#F3F4F6', opacity: d.avail ? 1 : 0.45, cursor: d.avail ? 'pointer' : 'default' }}>
              <span style={{ fontSize: 9, color: d.today ? 'rgba(255,255,255,0.8)' : '#8A94A6', marginBottom: 2 }}>{d.day}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: d.today ? '#fff' : '#0D1117' }}>{d.date}</span>
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Alege ora</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 14 }}>
          {slots.map((s) => (
            <div key={s.t} style={{ padding: '6px', borderRadius: 8, border: s.selected ? '2px solid #2B8FCC' : '1.5px solid #E5E7EB', background: s.selected ? '#2B8FCC' : s.avail ? '#fff' : '#F9FAFB', textAlign: 'center', cursor: s.avail ? 'pointer' : 'default', opacity: s.avail ? 1 : 0.45 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: s.selected ? '#fff' : s.avail ? '#0D1117' : '#8A94A6', textDecoration: !s.avail ? 'line-through' : 'none' }}>{s.t}</span>
            </div>
          ))}
        </div>

        {/* Specialist */}
        <div style={{ background: '#F9FAFB', borderRadius: 10, padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2B8FCC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>EM</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700 }}>Elena M.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: 10, color: '#10B981', fontWeight: 600 }}>Disponibila</span>
            </div>
          </div>
        </div>

        <button onClick={() => onNavigate(2)} style={{ width: '100%', background: '#2B8FCC', color: '#fff', border: 'none', borderRadius: 10, padding: '11px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
          Confirma rezervarea
        </button>
      </div>

      {/* Bottom Nav */}
      <div style={{ display: 'flex', borderTop: '1px solid #F3F4F6', background: '#fff', padding: '6px 0 8px' }}>
        {[{ Icon: Home, label: 'Home' }, { Icon: Search, label: 'Cauta' }, { Icon: Calendar, label: 'Rezervari', active: true }, { Icon: Heart, label: 'Favorite' }, { Icon: User, label: 'Profil' }].map(({ Icon, label, active }) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Icon size={16} color={active ? '#2B8FCC' : '#8A94A6'} />
            <span style={{ fontSize: 9, color: active ? '#2B8FCC' : '#8A94A6' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Screen 3: Confirmation ── */
const ConfirmationScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => (
  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520, padding: '20px 16px' }}>
    {/* Animated check */}
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}
    >
      <CheckCircle size={64} color="#10B981" strokeWidth={1.5} />
    </motion.div>

    <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Rezervare confirmata!</div>
    <div style={{ textAlign: 'center', fontSize: 11, color: '#8A94A6', marginBottom: 16 }}>SMS de confirmare trimis</div>

    {/* Summary card */}
    <div style={{ background: '#F9FAFB', borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
      {[
        { label: 'Serviciu', val: 'Tuns & Coafat' },
        { label: 'Data', val: 'Joi, 10 Aprilie' },
        { label: 'Ora', val: '11:30' },
        { label: 'Specialist', val: 'Elena M.' },
      ].map(({ label, val }) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 11 }}>
          <span style={{ color: '#8A94A6' }}>{label}</span>
          <span style={{ fontWeight: 600 }}>{val}</span>
        </div>
      ))}
    </div>

    <button style={{ width: '100%', background: '#fff', color: '#2B8FCC', border: '1.5px solid #2B8FCC', borderRadius: 10, padding: '9px', fontSize: 12, fontWeight: 700, cursor: 'pointer', marginBottom: 8 }}>
      Adauga in calendar
    </button>
    <button onClick={() => onNavigate(0)} style={{ width: '100%', background: 'none', color: '#8A94A6', border: 'none', fontSize: 12, cursor: 'pointer' }}>
      Inapoi la home
    </button>
  </div>
);

export const rezervariScreens: AppScreen[] = [
  { id: 'home', component: HomeServicesScreen },
  { id: 'datetime', component: DateTimeScreen },
  { id: 'confirmation', component: ConfirmationScreen },
];
