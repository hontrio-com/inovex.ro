'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Info,
  Camera,
  Pencil,
  ArrowLeft,
  CheckCircle,
  Home,
  ClipboardList,
  BarChart2,
  User,
  Navigation,
  Wifi,
  Battery,
} from 'lucide-react';
import type { AppScreen } from './AppEcommerce';

/* ── Screen 1: Courier Dashboard ── */
const CourierDashboardScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => {
  const deliveries = [
    { num: '#1247', addr: 'Str. Mihai Eminescu 14', time: '14:30', status: 'Urmatoarea', statusColor: '#2B8FCC', statusBg: '#EAF5FF' },
    { num: '#1248', addr: 'Bd. Unirii 22', time: '15:00', status: 'In asteptare', statusColor: '#D97706', statusBg: '#FEF3C7' },
    { num: '#1249', addr: 'Calea Victoriei 88', time: '15:45', status: 'Finalizata', statusColor: '#10B981', statusBg: '#D1FAE5' },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520 }}>
      {/* Status bar with green tint */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px 4px', background: '#D1FAE5' }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Wifi size={11} /><Battery size={11} />
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981' }}>Tura activa</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px 8px', borderBottom: '1px solid #F3F4F6' }}>
        <span style={{ fontWeight: 800, fontSize: 13 }}>Inovex Delivery</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10, color: '#8A94A6', background: '#F3F4F6', padding: '2px 7px', borderRadius: 99 }}>Tura 2</span>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2B8FCC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700 }}>CM</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}>
        {/* Progress card */}
        <div style={{ background: '#F9FAFB', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>6 livrari ramase</div>
          <div style={{ height: 6, background: '#E5E7EB', borderRadius: 99, marginBottom: 4 }}>
            <div style={{ width: '40%', height: '100%', background: '#10B981', borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 10, color: '#8A94A6' }}>4 finalizate din 10</div>
        </div>

        {/* Map placeholder */}
        <div style={{ height: 75, background: '#F3F4F6', borderRadius: 10, marginBottom: 10, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', left: '25%', top: '40%', width: 10, height: 10, borderRadius: '50%', background: '#2B8FCC' }} />
          <div style={{ position: 'absolute', right: '25%', top: '40%', width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ borderTop: '1.5px dashed #8A94A6', width: '50%' }} />
          <span style={{ position: 'absolute', bottom: 5, right: 8, fontSize: 9, color: '#8A94A6' }}>Ruta optimizata</span>
        </div>

        {/* Delivery list */}
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Livrari azi</div>
        {deliveries.map((d) => (
          <div key={d.num} style={{ background: '#fff', border: '1px solid #F3F4F6', borderRadius: 10, padding: '8px 10px', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{d.num}</div>
              <div style={{ fontSize: 10, color: '#4A5568' }}>{d.addr}</div>
              <div style={{ fontSize: 10, color: '#8A94A6' }}>{d.time}</div>
            </div>
            <span style={{ fontSize: 9, fontWeight: 600, color: d.statusColor, background: d.statusBg, padding: '3px 7px', borderRadius: 99 }}>{d.status}</span>
          </div>
        ))}

        <button onClick={() => onNavigate(1)} style={{ width: '100%', background: '#2B8FCC', color: '#fff', border: 'none', borderRadius: 10, padding: '11px', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', marginTop: 4 }}>
          <Navigation size={14} /> Navigheaza la urmatoarea
        </button>
      </div>

      {/* Bottom Nav */}
      <div style={{ display: 'flex', borderTop: '1px solid #F3F4F6', background: '#fff', padding: '6px 0 8px' }}>
        {[{ Icon: Home, label: 'Acasa', active: true }, { Icon: ClipboardList, label: 'Livrari' }, { Icon: BarChart2, label: 'Rapoarte' }, { Icon: User, label: 'Profil' }].map(({ Icon, label, active }) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Icon size={16} color={active ? '#2B8FCC' : '#8A94A6'} />
            <span style={{ fontSize: 9, color: active ? '#2B8FCC' : '#8A94A6' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Screen 2: Delivery Details ── */
const DeliveryDetailsScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => (
  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520 }}>
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 8px', borderBottom: '1px solid #F3F4F6' }}>
      <button onClick={() => onNavigate(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><ArrowLeft size={18} /></button>
      <span style={{ fontWeight: 700, fontSize: 13 }}>Livrare #1247</span>
      <div style={{ width: 18 }} />
    </div>

    <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
      {/* Client card */}
      <div style={{ background: '#F9FAFB', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2B8FCC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>IP</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>Ion Popescu</div>
            <div style={{ fontSize: 10, color: '#8A94A6' }}>0722 123 456</div>
          </div>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Phone size={14} color="#2B8FCC" />
        </div>
      </div>

      {/* Address */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 8 }}>
        <MapPin size={14} color="#8A94A6" style={{ flexShrink: 0, marginTop: 1 }} />
        <span style={{ fontSize: 11, color: '#4A5568', lineHeight: 1.5 }}>Str. Mihai Eminescu 14, Ap. 5, Sector 1, Bucuresti</span>
      </div>

      {/* Instructions */}
      <div style={{ background: '#FEF3C7', borderRadius: 8, padding: '8px 10px', display: 'flex', gap: 6, marginBottom: 12 }}>
        <Info size={13} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
        <span style={{ fontSize: 10, color: '#92400E', lineHeight: 1.5 }}>Etajul 3, apartament 12, interfon 312</span>
      </div>

      {/* Products */}
      <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Produse de livrat</div>
      {[{ name: 'Colet 1', w: '2.5 kg' }, { name: 'Colet 2', w: '1.8 kg' }, { name: 'Colet 3', w: '0.9 kg' }].map((c) => (
        <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #F3F4F6', fontSize: 11 }}>
          <span style={{ color: '#4A5568' }}>{c.name}</span>
          <span style={{ fontWeight: 600 }}>{c.w}</span>
        </div>
      ))}

      {/* Confirmation code */}
      <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: 10, padding: '10px', marginTop: 12, marginBottom: 14, textAlign: 'center' }}>
        <div style={{ fontSize: 10, color: '#8A94A6', marginBottom: 4 }}>Cod confirmare</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#10B981', fontFamily: 'monospace' }}>4821</div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onNavigate(2)} style={{ flex: 2, background: '#10B981', color: '#fff', border: 'none', borderRadius: 10, padding: '10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
          Marcheaza livrat
        </button>
        <button style={{ flex: 1, background: '#fff', color: '#EF4444', border: '1.5px solid #EF4444', borderRadius: 10, padding: '10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
          Problema
        </button>
      </div>
    </div>
  </div>
);

/* ── Screen 3: Delivery Confirmation ── */
const DeliveryConfirmScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => (
  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520, padding: '20px 16px' }}>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}
    >
      <CheckCircle size={56} color="#10B981" strokeWidth={1.5} />
    </motion.div>

    <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 800, marginBottom: 14 }}>Livrare confirmata!</div>

    <div style={{ background: '#F9FAFB', borderRadius: 10, padding: '10px 12px', marginBottom: 12 }}>
      {[{ l: 'Ora', v: '14:27' }, { l: 'Adresa', v: 'Str. Eminescu 14' }, { l: 'Colete', v: '3 buc' }].map(({ l, v }) => (
        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 11 }}>
          <span style={{ color: '#8A94A6' }}>{l}</span>
          <span style={{ fontWeight: 600 }}>{v}</span>
        </div>
      ))}
    </div>

    {/* Photo placeholder */}
    <div style={{ background: '#F3F4F6', borderRadius: 10, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8, cursor: 'pointer' }}>
      <Camera size={18} color="#8A94A6" />
      <span style={{ fontSize: 11, color: '#8A94A6' }}>Fotografie dovada</span>
    </div>

    {/* Signature placeholder */}
    <div style={{ background: '#F3F4F6', borderRadius: 10, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 14, cursor: 'pointer' }}>
      <Pencil size={14} color="#8A94A6" />
      <span style={{ fontSize: 11, color: '#8A94A6' }}>Semnatura client</span>
    </div>

    <button onClick={() => onNavigate(0)} style={{ width: '100%', background: '#2B8FCC', color: '#fff', border: 'none', borderRadius: 10, padding: '11px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
      Continua la urmatoarea
    </button>
  </div>
);

export const livariScreens: AppScreen[] = [
  { id: 'dashboard', component: CourierDashboardScreen },
  { id: 'details', component: DeliveryDetailsScreen },
  { id: 'confirm', component: DeliveryConfirmScreen },
];
