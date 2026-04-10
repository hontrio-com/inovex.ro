'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, CheckCircle, Zap, Clock } from 'lucide-react';
import type { LogEntry } from '@/lib/workflow-demo-data';

interface WorkflowLogProps {
  logs: LogEntry[];
  isRunning: boolean;
  isCompleted: boolean;
  runCount: number;
  totalActions: number;
  duration: string;
}

export default function WorkflowLog({
  logs,
  isRunning,
  isCompleted,
  runCount,
  totalActions,
  duration,
}: WorkflowLogProps) {
  const estimatedMinutes = Math.round(totalActions * 0.87);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#FAFBFC',
        borderLeft: '1px solid #E8ECF0',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid #E8ECF0',
          background: 'white',
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#8A94A6', textTransform: 'uppercase' }}>
          Log executie
        </p>
      </div>

      {/* Log entries */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {logs.length === 0 && !isRunning ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '32px 16px',
              textAlign: 'center',
            }}
          >
            <PlayCircle size={28} color="#C8D0DA" />
            <p style={{ fontSize: 12, color: '#A0AABA', lineHeight: 1.5 }}>
              Apasa Run pentru a porni simularea
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                style={{ marginBottom: 8 }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  {/* Status dot */}
                  <div style={{ flexShrink: 0, marginTop: 3 }}>
                    {log.status === 'processing' ? (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#2B8FCC',
                          animation: 'pulse 1.5s ease-in-out infinite',
                        }}
                      />
                    ) : log.status === 'ok' ? (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                    ) : (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#8A94A6', flexShrink: 0 }}>
                        {log.time}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: '#1A202C', lineHeight: 1.45 }}>
                        {log.text}
                      </span>
                    </div>
                    {log.sub && (
                      <p style={{ fontSize: 11, color: '#8A94A6', marginTop: 2, lineHeight: 1.4 }}>
                        {log.sub}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Completion summary */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              marginTop: 8,
              background: '#F0FDF9',
              border: '1px solid #D1FAE5',
              borderRadius: 10,
              padding: '12px 14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <CheckCircle size={14} color="#10B981" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#065F46' }}>
                Workflow finalizat cu succes
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={11} color="#10B981" />
                <span style={{ fontSize: 11, color: '#047857' }}>Durata: {duration}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Zap size={11} color="#10B981" />
                <span style={{ fontSize: 11, color: '#047857' }}>Actiuni executate: {logs.filter(l => l.status === 'ok').length}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={11} color="#10B981" />
                <span style={{ fontSize: 11, color: '#047857' }}>Erori: 0</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom stats */}
      <div
        style={{
          borderTop: '1px solid #E8ECF0',
          padding: '10px 14px',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#8A94A6' }}>Rulari demo</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0D1117' }}>{runCount}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#8A94A6' }}>Actiuni simulate</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0D1117' }}>{totalActions}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#8A94A6' }}>Timp economisit</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#10B981' }}>{estimatedMinutes} min</span>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
