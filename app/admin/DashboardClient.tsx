'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Target, Building2, TrendingUp, TrendingDown, RefreshCw, FileSignature,
  Loader2, ArrowUpRight, Activity as ActivityIcon,
} from 'lucide-react';
import type { Member } from '@/types/crm';
import { LEAD_COLUMNS, STATUS_LABEL, PLATFORM_META, fmtMoney } from './lead-uri/meta';

interface Stats {
  leads: { last7: number; last30: number; prev30: number; total: number; won: number; lost: number };
  conversionRate: number;
  clientsTotal: number;
  pipeline: Record<string, { count: number; value: number }>;
  platforms: Record<string, number>;
  contracts: { draft: number; trimis: number; semnat: number; signedValue: number };
  subs: { active: number; mrr: number; renewals30: number };
  activities: { id: string; type: string; title: string | null; body: string | null; created_by: string | null; created_at: string }[];
}

const card: React.CSSProperties = { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: 22 };
const cardTitle: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: '#0F172A', marginBottom: 16 };

function fmtDateTime(iso: string) { return new Date(iso).toLocaleString('ro-RO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }); }

function KpiTile({ icon, color, label, value, sub }: { icon: React.ReactNode; color: string; label: string; value: string; sub?: React.ReactNode }) {
  return (
    <div style={{ ...card, padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
        {sub}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.7rem', color: '#0F172A', lineHeight: 1 }}>{value}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#94A3B8', marginTop: 5 }}>{label}</div>
      </div>
    </div>
  );
}

export function DashboardClient({ userName }: { userName: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/stats').then((r) => r.json()),
      fetch('/api/admin/members').then((r) => r.json()).catch(() => ({ members: [] })),
    ]).then(([s, m]) => { setStats(s); setMembers(m.members ?? []); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const memberName = (id: string | null) => { if (!id) return 'Sistem'; const m = members.find((x) => x.id === id); return m ? (m.full_name || m.email) : '—'; };

  if (loading || !stats) {
    return <div style={{ padding: 60, textAlign: 'center', color: '#64748B' }}><Loader2 size={20} className="animate-spin" style={{ display: 'inline' }} /> Se incarca dashboard-ul...</div>;
  }

  const trend = stats.leads.prev30 > 0 ? Math.round(((stats.leads.last30 - stats.leads.prev30) / stats.leads.prev30) * 100) : (stats.leads.last30 > 0 ? 100 : 0);
  const trendUp = trend >= 0;
  const activeCols = LEAD_COLUMNS.filter((c) => c.key !== 'convertit' && c.key !== 'edinio' && c.key !== 'pierdut');
  const pipeMax = Math.max(1, ...activeCols.map((c) => stats.pipeline[c.key]?.count ?? 0));
  const pipeValue = activeCols.reduce((a, c) => a + (stats.pipeline[c.key]?.value ?? 0), 0);
  const platEntries = Object.entries(stats.platforms).sort((a, b) => b[1] - a[1]);
  const platMax = Math.max(1, ...platEntries.map(([, n]) => n));

  const trendBadge = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, color: trendUp ? '#15803D' : '#DC2626', background: trendUp ? '#F0FDF4' : '#FEF2F2', borderRadius: 6, padding: '2px 7px' }}>
      {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {trend > 0 ? '+' : ''}{trend}%
    </span>
  );

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: '#0F172A', marginBottom: 4 }}>Bine ai revenit{userName ? `, ${userName.split(' ')[0]}` : ''}</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>Privire de ansamblu asupra activitatii CRM.</p>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 16 }}>
        <KpiTile icon={<Target size={19} />} color="#2B8FCC" label="Lead-uri noi (30 zile)" value={String(stats.leads.last30)} sub={trendBadge} />
        <KpiTile icon={<ArrowUpRight size={19} />} color="#7C3AED" label="Rata conversie lead→client" value={`${stats.conversionRate}%`} />
        <KpiTile icon={<Building2 size={19} />} color="#15803D" label="Clienti in total" value={String(stats.clientsTotal)} />
        <KpiTile icon={<RefreshCw size={19} />} color="#EA580C" label="MRR (venit recurent lunar)" value={fmtMoney(stats.subs.mrr, 'RON') ?? '0'} sub={stats.subs.renewals30 > 0 ? <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#EA580C', fontWeight: 600 }}>{stats.subs.renewals30} reinnoiri</span> : undefined} />
      </div>

      {/* Pipeline + Activitate */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
        <div style={{ ...card, flex: '1 1 400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={cardTitle}>Pipeline lead-uri</span>
            <Link href="/admin/lead-uri" style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#2B8FCC', textDecoration: 'none', fontWeight: 600 }}>Vezi tot →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activeCols.map((c) => {
              const d = stats.pipeline[c.key] ?? { count: 0, value: 0 };
              return (
                <div key={c.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#334155', fontWeight: 500 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: c.color }} />{STATUS_LABEL[c.key]}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B' }}><strong style={{ color: '#0F172A' }}>{d.count}</strong>{d.value > 0 ? ` · ${fmtMoney(d.value, 'RON')}` : ''}</span>
                  </div>
                  <div style={{ height: 7, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(d.count / pipeMax) * 100}%`, background: c.color, borderRadius: 4, minWidth: d.count > 0 ? 6 : 0 }} />
                  </div>
                </div>
              );
            })}
          </div>
          {pipeValue > 0 && <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #F1F5F9', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B' }}>Valoare estimata in pipeline: <strong style={{ color: '#0F172A' }}>{fmtMoney(pipeValue, 'RON')}</strong></div>}
        </div>

        <div style={{ ...card, flex: '1 1 320px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <ActivityIcon size={16} color="#2B8FCC" /><span style={cardTitle as React.CSSProperties}>Ultimele activitati</span>
          </div>
          {stats.activities.length === 0 ? (
            <div style={{ padding: '20px 0', textAlign: 'center', color: '#94A3B8', fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>Nicio activitate inca.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {stats.activities.map((a) => (
                <div key={a.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: '#CBD5E1', marginTop: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#334155' }}>{a.title || a.body || a.type}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#94A3B8' }}>{memberName(a.created_by)} · {fmtDateTime(a.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contracte + Abonamente + Platforme */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ ...card, flex: '1 1 240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}><FileSignature size={16} color="#2B8FCC" /><span style={cardTitle}>Contracte (luna curenta)</span></div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {[{ l: 'Draft', v: stats.contracts.draft, c: '#64748B' }, { l: 'Trimise', v: stats.contracts.trimis, c: '#1D4ED8' }, { l: 'Semnate', v: stats.contracts.semnat, c: '#15803D' }].map((x) => (
              <div key={x.l} style={{ flex: 1, textAlign: 'center', background: '#F8FAFC', borderRadius: 10, padding: '12px 4px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: x.c }}>{x.v}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: '#94A3B8' }}>{x.l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B' }}>Valoare semnata: <strong style={{ color: '#15803D' }}>{fmtMoney(stats.contracts.signedValue, 'RON')}</strong></div>
        </div>

        <div style={{ ...card, flex: '1 1 240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}><RefreshCw size={16} color="#2B8FCC" /><span style={cardTitle}>Abonamente</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#64748B' }}>Active</span><strong style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#0F172A' }}>{stats.subs.active}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#64748B' }}>MRR</span><strong style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#15803D' }}>{fmtMoney(stats.subs.mrr, 'RON')}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#64748B' }}>Reinnoiri 30 zile</span><strong style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#EA580C' }}>{stats.subs.renewals30}</strong></div>
          </div>
        </div>

        <div style={{ ...card, flex: '1 1 280px' }}>
          <span style={cardTitle}>Lead-uri pe platforma</span>
          {platEntries.length === 0 ? (
            <div style={{ padding: '10px 0', color: '#94A3B8', fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>Niciun lead inca.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {platEntries.map(([p, n]) => {
                const meta = PLATFORM_META[p] ?? { label: p, color: '#94A3B8' };
                return (
                  <div key={p}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#334155' }}>{meta.label}</span>
                      <strong style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#0F172A' }}>{n}</strong>
                    </div>
                    <div style={{ height: 6, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(n / platMax) * 100}%`, background: meta.color, borderRadius: 4 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
