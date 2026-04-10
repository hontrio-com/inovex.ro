'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, AlertCircle } from 'lucide-react';
import { calculateDelivery, type DeliveryInfo } from '@/lib/deliveryTimer';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  workingDays?: number;
}

function getTimeLeft(targetDate: Date): TimeLeft {
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  return {
    hours:   Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function getDayProgress(): number {
  const now = new Date();
  const start = new Date(now); start.setHours(9, 0, 0, 0);
  const end   = new Date(now); end.setHours(18, 0, 0, 0);
  return Math.min(100, Math.max(0, (now.getTime() - start.getTime()) / (end.getTime() - start.getTime()) * 100));
}

export default function DeliveryTimer({ workingDays = 2 }: Props) {
  const [delivery,  setDelivery]  = useState<DeliveryInfo | null>(null);
  const [timeLeft,  setTimeLeft]  = useState<TimeLeft | null>(null);
  const [progress,  setProgress]  = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const info = calculateDelivery(workingDays);
    setDelivery(info);
    setTimeLeft(getTimeLeft(info.targetDate));
    setProgress(getDayProgress());

    intervalRef.current = setInterval(() => {
      setTimeLeft(getTimeLeft(info.targetDate));
      setProgress(getDayProgress());
    }, 1000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [workingDays]);

  if (!delivery || !timeLeft) {
    return <div style={{ height: 96, background: '#F8FAFB', borderRadius: 12, marginBottom: 16 }} />;
  }

  const urgent = delivery.isUrgent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background:   urgent ? '#FFFBEB' : '#F0F7FF',
        border:       `1px solid ${urgent ? '#FDE68A' : '#C8E6F8'}`,
        borderRadius: 12,
        padding:      16,
        marginBottom: 16,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        {urgent
          ? <AlertCircle size={14} color="#D97706" />
          : <Zap size={14} color="#2B8FCC" />
        }
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 10,
          textTransform: 'uppercase', letterSpacing: '0.06em',
          color: urgent ? '#D97706' : '#2B8FCC',
        }}>
          {urgent ? 'Comanda acum, mai ai timp' : 'Livrare garantata'}
        </span>
      </div>

      {/* Countdown — doar daca e urgent */}
      {urgent && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 12 }}>
          {[
            { value: timeLeft.hours,   label: 'ore' },
            { value: timeLeft.minutes, label: 'min' },
            { value: timeLeft.seconds, label: 'sec' },
          ].map((unit, i) => (
            <div key={unit.label} style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
              {i > 0 && <span style={{ color: '#D1D5DB', fontWeight: 700, fontSize: 18, lineHeight: 1, marginBottom: 14 }}>:</span>}
              <div style={{ textAlign: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={unit.value}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.12 }}
                    style={{
                      background: '#fff', borderRadius: 8, minWidth: 44, textAlign: 'center',
                      padding: '4px 8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem',
                      color: '#0D1117', lineHeight: 1,
                    }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.div>
                </AnimatePresence>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: '#9CA3AF', marginTop: 4, display: 'block', fontWeight: 500 }}>
                  {unit.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Data livrare */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6B7280', fontWeight: 500 }}>
          Site live pana:
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: '#0D1117' }}>
          {delivery.targetDateLabel}
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#9CA3AF' }}>
          {delivery.targetTimeLabel}
        </span>
      </div>

      {/* Bara progres zi */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>09:00</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>18:00</span>
        </div>
        <div style={{ position: 'relative', height: 6, background: '#E5E7EB', borderRadius: 4, overflow: 'visible' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 4,
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #2B8FCC, #4AADE8)',
            transition: 'width 1s linear',
          }} />
          <div style={{
            position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)',
            left: `${progress}%`,
            width: 12, height: 12, borderRadius: '50%',
            background: '#2B8FCC', border: '2px solid #fff',
            boxShadow: '0 1px 4px rgba(43,143,204,0.4)',
            transition: 'left 1s linear',
          }} />
        </div>
      </div>

      {/* Mesaj urgenta */}
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, marginTop: 10,
        color: urgent ? '#D97706' : '#2B8FCC',
      }}>
        {delivery.urgencyMessage}
      </p>
    </motion.div>
  );
}
