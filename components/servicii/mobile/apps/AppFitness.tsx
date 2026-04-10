'use client';

import {
  Calendar,
  Filter,
  ArrowLeft,
  Play,
  Dumbbell,
  Flame,
  BarChart2,
  Home,
  Activity,
  Apple,
  Settings,
  Wifi,
  Battery,
} from 'lucide-react';
import type { AppScreen } from './AppEcommerce';

/* ── Screen 1: Activity Dashboard ── */
const DashboardScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => {
  const stats = [
    { label: 'Pasi', val: '7.340', icon: '👟' },
    { label: 'Km', val: '5.2', icon: '📍' },
    { label: 'Calorii', val: '1.847', icon: '🔥' },
    { label: 'Somn', val: '7.5h', icon: '💤' },
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
        <div>
          <div style={{ fontWeight: 800, fontSize: 13 }}>Buna dimineata, Alex!</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={10} color="#8A94A6" />
            <span style={{ fontSize: 10, color: '#8A94A6' }}>Joi, 10 Aprilie</span>
          </div>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2B8FCC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>A</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
        {/* Progress rings */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          {/* Outer ring: red, 84% */}
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: `conic-gradient(#EF4444 ${84*3.6}deg, #F3F4F6 0deg)`, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Middle ring: green, 70% */}
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: `conic-gradient(#10B981 ${70*3.6}deg, #F3F4F6 0deg)`, padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Inner ring: blue, 73% */}
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: `conic-gradient(#2B8FCC ${73*3.6}deg, #F3F4F6 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#fff', borderRadius: '50%', width: '70%', height: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#0D1117' }}>73%</span>
                  <span style={{ fontSize: 8, color: '#8A94A6' }}>pasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ring legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
          {[{c:'#EF4444',l:'Cal 84%'},{c:'#10B981',l:'Misc 70%'},{c:'#2B8FCC',l:'Pasi 73%'}].map(({c,l}) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
              <span style={{ fontSize: 9, color: '#4A5568' }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Stat tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 12 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: '#F9FAFB', borderRadius: 10, padding: '8px 10px' }}>
              <div style={{ fontSize: 11, color: '#8A94A6', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0D1117' }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Today's workout */}
        <div style={{ background: '#FEF2F2', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => onNavigate(1)}>
          <div>
            <div style={{ fontSize: 10, color: '#EF4444', opacity: 0.7, marginBottom: 2 }}>Antrenamentul de azi</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#EF4444', marginBottom: 4 }}>HIIT Cardio</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontSize: 10, color: '#EF4444', opacity: 0.85 }}>35 min</span>
              <span style={{ fontSize: 10, color: '#EF4444', opacity: 0.85 }}>380 kcal</span>
            </div>
          </div>
          <Dumbbell size={28} color="#EF4444" />
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{ display: 'flex', borderTop: '1px solid #F3F4F6', background: '#fff', padding: '6px 0 8px' }}>
        {[{ Icon: Home, label: 'Acasa', active: true }, { Icon: Activity, label: 'Activitate' }, { Icon: Apple, label: 'Nutritie' }, { Icon: BarChart2, label: 'Progres' }, { Icon: Settings, label: 'Setari' }].map(({ Icon, label, active }) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Icon size={16} color={active ? '#2B8FCC' : '#8A94A6'} />
            <span style={{ fontSize: 9, color: active ? '#2B8FCC' : '#8A94A6' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Screen 2: Workouts List ── */
const WorkoutsListScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => {
  const workouts = [
    { title: 'HIIT Cardio Intens', bg: '#FEF2F2', level: 'Avansat', dur: '35 min', kcal: '380 kcal', levelColor: '#EF4444' },
    { title: 'Yoga Matinal', bg: '#F0FDF4', level: 'Incepator', dur: '25 min', kcal: '120 kcal', levelColor: '#10B981' },
    { title: 'Forta Superioara', bg: '#EAF5FF', level: 'Intermediar', dur: '45 min', kcal: '290 kcal', levelColor: '#2B8FCC' },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 8px', borderBottom: '1px solid #F3F4F6' }}>
        <span style={{ fontWeight: 800, fontSize: 14 }}>Antrenamente</span>
        <Filter size={16} color="#8A94A6" />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '6px 12px', gap: 6, borderBottom: '1px solid #F3F4F6' }}>
        {['Recomandate', 'Ale mele', 'Populare'].map((t, i) => (
          <span key={t} style={{ padding: '4px 10px', borderRadius: 99, fontSize: 10, fontWeight: 600, background: i === 0 ? '#2B8FCC' : '#F3F4F6', color: i === 0 ? '#fff' : '#4A5568', cursor: 'pointer' }}>{t}</span>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {workouts.map((w) => (
          <div key={w.title} onClick={() => onNavigate(2)} style={{ background: '#fff', borderRadius: 12, border: '1px solid #F3F4F6', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ height: 50, background: w.bg, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
              <Dumbbell size={16} color={w.levelColor} />
              <span style={{ fontSize: 12, fontWeight: 700, color: w.levelColor }}>{w.title}</span>
            </div>
            <div style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: w.levelColor, background: `${w.levelColor}15`, padding: '2px 6px', borderRadius: 99 }}>{w.level}</span>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 10, color: '#4A5568' }}>{w.dur}</span>
                <span style={{ fontSize: 10, color: '#4A5568' }}>{w.kcal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div style={{ display: 'flex', borderTop: '1px solid #F3F4F6', background: '#fff', padding: '6px 0 8px' }}>
        {[{ Icon: Home, label: 'Acasa' }, { Icon: Activity, label: 'Activitate', active: true }, { Icon: Apple, label: 'Nutritie' }, { Icon: BarChart2, label: 'Progres' }, { Icon: Settings, label: 'Setari' }].map(({ Icon, label, active }) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Icon size={16} color={active ? '#2B8FCC' : '#8A94A6'} />
            <span style={{ fontSize: 9, color: active ? '#2B8FCC' : '#8A94A6' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Screen 3: Workout Details ── */
const WorkoutDetailScreen: React.FC<{ onNavigate: (i: number) => void }> = ({ onNavigate }) => {
  const exercises = [
    { name: 'Jumping Jacks', sets: '3 x 30 rep' },
    { name: 'Burpees', sets: '3 x 15 rep' },
    { name: 'Mountain Climbers', sets: '3 x 20 rep' },
    { name: 'High Knees', sets: '3 x 45 sec' },
    { name: 'Push-ups', sets: '4 x 12 rep' },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#0D1117', display: 'flex', flexDirection: 'column', height: 520 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 8px', borderBottom: '1px solid #F3F4F6' }}>
        <button onClick={() => onNavigate(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><ArrowLeft size={18} /></button>
        <span style={{ fontWeight: 700, fontSize: 12 }}>HIIT Cardio Intens</span>
        <div style={{ width: 18 }} />
      </div>

      {/* Header image */}
      <div style={{ height: 80, background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Flame size={28} color="#EF4444" />
        <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 14 }}>
          <span style={{ fontSize: 10, color: '#EF4444', fontWeight: 600 }}>35 min</span>
          <span style={{ fontSize: 10, color: '#EF4444', fontWeight: 600 }}>380 kcal</span>
          <span style={{ fontSize: 10, color: '#EF4444', fontWeight: 600 }}>Avansat</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '0 12px', borderBottom: '1px solid #F3F4F6' }}>
        {['Exercitii', 'Info', 'Istoric'].map((t, i) => (
          <span key={t} style={{ padding: '8px 12px', fontSize: 11, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#2B8FCC' : '#8A94A6', borderBottom: i === 0 ? '2px solid #2B8FCC' : '2px solid transparent', marginBottom: -1, cursor: 'pointer' }}>{t}</span>
        ))}
      </div>

      {/* Exercise list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {exercises.map((ex, idx) => (
          <div key={ex.name}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#EAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#2B8FCC' }}>{idx + 1}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{ex.name}</span>
              </div>
              <span style={{ fontSize: 11, color: '#4A5568', fontWeight: 500 }}>{ex.sets}</span>
            </div>
            {idx < exercises.length - 1 && <div style={{ borderBottom: '1px solid #F3F4F6', margin: '0 12px' }} />}
          </div>
        ))}
      </div>

      {/* Start button */}
      <div style={{ padding: '10px 12px 14px', borderTop: '1px solid #F3F4F6' }}>
        <button style={{ width: '100%', background: '#10B981', color: '#fff', border: 'none', borderRadius: 10, padding: '11px', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
          <Play size={14} fill="#fff" /> Incepe antrenamentul
        </button>
      </div>
    </div>
  );
};

export const fitnessScreens: AppScreen[] = [
  { id: 'dashboard', component: DashboardScreen },
  { id: 'workouts', component: WorkoutsListScreen },
  { id: 'detail', component: WorkoutDetailScreen },
];
