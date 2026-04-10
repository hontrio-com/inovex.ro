'use client';

import {
  Mail, Target, FileSearch, MessageSquare, ChartBar,
  TrendingUp, TrendingDown, Clock,
} from 'lucide-react';
import type { Scenario } from '@/lib/workflow-demo-data';

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>> = {
  Mail, Target, FileSearch, MessageSquare, BarChart3: ChartBar,
};

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const STAT_ICONS = [TrendingUp, Clock, TrendingDown];

export default function ScenarioSelector({ scenarios, activeIndex, onSelect }: ScenarioSelectorProps) {
  const active = scenarios[activeIndex];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'white',
        borderRight: '1px solid #E8ECF0',
      }}
    >
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #E8ECF0' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#8A94A6', textTransform: 'uppercase' }}>
          Alege un scenariu
        </p>
      </div>

      {/* Scenario list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {scenarios.map((scenario, i) => {
          const IconComp = ICONS[scenario.icon];
          const isActive = i === activeIndex;
          return (
            <button
              key={scenario.id}
              onClick={() => onSelect(i)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: 10,
                border: `1.5px solid ${isActive ? '#2B8FCC' : 'transparent'}`,
                background: isActive ? '#EAF5FF' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                marginBottom: 2,
                transition: 'all 200ms',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: isActive ? 'rgba(43,143,204,0.15)' : '#F4F6F8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {IconComp && <IconComp size={15} color={isActive ? '#2B8FCC' : '#8A94A6'} />}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: isActive ? '#0D1117' : '#374151',
                    lineHeight: 1.3,
                    marginBottom: 2,
                  }}
                >
                  {scenario.title}
                </p>
                <p style={{ fontSize: 11, color: '#8A94A6', lineHeight: 1.4 }}>
                  {scenario.description}
                </p>
              </div>

              {/* Steps badge */}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: isActive ? '#2B8FCC' : '#8A94A6',
                  background: isActive ? 'rgba(43,143,204,0.12)' : '#F4F6F8',
                  borderRadius: 20,
                  padding: '2px 7px',
                  flexShrink: 0,
                }}
              >
                {scenario.steps}p
              </span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#E8ECF0', margin: '0 16px' }} />

      {/* Active scenario stats */}
      {active && (
        <div style={{ padding: '12px 14px' }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: '#8A94A6', textTransform: 'uppercase', marginBottom: 8 }}>
            Rezultate tipice
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[active.stats.stat1, active.stats.stat2, active.stats.stat3].map((stat, i) => {
              const StatIcon = STAT_ICONS[i % STAT_ICONS.length];
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <StatIcon size={12} color="#10B981" />
                  <span style={{ fontSize: 11, color: '#1A202C', fontWeight: 500 }}>{stat}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
