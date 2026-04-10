'use client';

import {
  Mail, Brain, GitBranch, UserPlus, Ticket, PenLine, Send, Bell,
  ClipboardList, UserSearch, Star, Filter, UserCheck, Rss, Database,
  MessageSquare, Upload, ScanLine, SquareCheck, Archive, MessageCircle,
  HelpCircle, Bot, Users, BookOpen, Clock, Download, TrendingUp,
  FileChartColumn, Share2, Target, ChartBar, FileSearch, Check, X,
} from 'lucide-react';
import type { WorkflowNode as WorkflowNodeType, NodeStatus } from '@/lib/workflow-demo-data';

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Mail, Brain, GitBranch, UserPlus, Ticket, PenLine, Send, Bell,
  ClipboardList, UserSearch, Star, Filter, UserCheck, Rss, Database,
  MessageSquare, Upload, ScanLine,
  CheckSquare: SquareCheck,
  Archive, MessageCircle,
  HelpCircle, Bot, Users, BookOpen, Clock, Download, TrendingUp,
  FileBarChart: FileChartColumn,
  Share2, Target,
  BarChart3: ChartBar,
  FileSearch,
};

const TYPE_CONFIG = {
  trigger:    { color: '#F59E0B', bg: '#FEF3C7', label: 'TRIGGER' },
  ai:         { color: '#8B5CF6', bg: '#EDE9FE', label: 'AI' },
  conditie:   { color: '#F97316', bg: '#FFEDD5', label: 'CONDITIE' },
  actiune:    { color: '#2B8FCC', bg: '#EAF5FF', label: 'ACTIUNE' },
  notificare: { color: '#10B981', bg: '#D1FAE5', label: 'NOTIFICARE' },
};

interface WorkflowNodeProps {
  node: WorkflowNodeType;
  status: NodeStatus;
}

export default function WorkflowNode({ node, status }: WorkflowNodeProps) {
  const config = TYPE_CONFIG[node.type];
  const IconComponent = ICONS[node.icon];

  const borderColor =
    status === 'processing' ? '#2B8FCC' :
    status === 'completed'  ? '#10B981' :
    status === 'error'      ? '#EF4444' :
    '#E8ECF0';

  const bgColor =
    status === 'completed' ? 'rgba(16,185,129,0.03)' : 'white';

  return (
    <div
      style={{
        width: 148,
        flexShrink: 0,
        background: bgColor,
        border: `2px solid ${borderColor}`,
        borderRadius: 12,
        padding: '10px 12px 12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'all 300ms',
        position: 'relative',
      }}
    >
      {/* Type label */}
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: config.color,
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 8,
        }}
      >
        {config.label}
      </span>

      {/* Status indicator top-right */}
      {status === 'processing' && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 14,
            height: 14,
            borderRadius: '50%',
            border: '2px solid #2B8FCC',
            borderTopColor: 'transparent',
            animation: 'spin 0.7s linear infinite',
          }}
        />
      )}
      {status === 'completed' && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={9} color="white" />
        </div>
      )}
      {status === 'error' && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={9} color="white" />
        </div>
      )}

      {/* Icon */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: config.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        {IconComponent && <IconComponent size={16} color={config.color} />}
      </div>

      {/* Title */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#0D1117',
          lineHeight: 1.3,
          marginBottom: node.subtitle ? 3 : 0,
        }}
      >
        {node.title}
      </p>

      {/* Subtitle */}
      {node.subtitle && (
        <p style={{ fontSize: 11, color: '#8A94A6', lineHeight: 1.4 }}>
          {node.subtitle}
        </p>
      )}

      {/* Branch pills for conditie */}
      {node.branches && node.branches.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 6 }}>
          {node.branches.map((b) => (
            <span
              key={b}
              style={{
                fontSize: 9,
                background: config.bg,
                color: config.color,
                borderRadius: 4,
                padding: '1px 5px',
                fontWeight: 600,
              }}
            >
              {b}
            </span>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
