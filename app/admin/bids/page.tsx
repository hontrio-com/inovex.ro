'use client';

import { useEffect, useState } from 'react';
import { A, SaveBar, AdminHeader } from '@/app/admin/_components/AdminPage';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

type BidStatus = 'pending' | 'accepted' | 'rejected';

type Bid = {
  id: string;
  productSlug: string;
  productTitle: string;
  name: string;
  email: string;
  phone: string;
  offeredPrice: number;
  message: string;
  status: BidStatus;
  createdAt: string;
};

const STATUS_CONFIG: Record<BidStatus, { label: string; bg: string; color: string; border: string }> = {
  pending: { label: 'In asteptare', bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' },
  accepted: { label: 'Acceptata', bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' },
  rejected: { label: 'Respinsa', bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
};

function StatusBadge({ status }: { status: BidStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px', borderRadius: 20,
      fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.72rem',
      background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
      whiteSpace: 'nowrap',
    }}>
      {cfg.label}
    </span>
  );
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('ro-RO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON', maximumFractionDigits: 0 }).format(price);
}

export default function BidsPage() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<BidStatus | 'all'>('all');

  useEffect(() => {
    loadBids();
  }, []);

  function loadBids() {
    setLoading(true);
    fetch('/api/admin/generic/bids')
      .then((r) => r.json())
      .then((d: Bid[]) => setBids(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  }

  async function saveBids(updated: Bid[]) {
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/admin/generic/bids', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  function updateStatus(id: string, status: BidStatus) {
    const updated = bids.map((b) => b.id === id ? { ...b, status } : b);
    setBids(updated);
    saveBids(updated);
  }

  const filtered = filter === 'all' ? bids : bids.filter((b) => b.status === filter);

  const counts = {
    all: bids.length,
    pending: bids.filter((b) => b.status === 'pending').length,
    accepted: bids.filter((b) => b.status === 'accepted').length,
    rejected: bids.filter((b) => b.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div style={{ padding: 32, fontFamily: 'var(--font-body)', color: '#64748B' }}>
        Se incarca ofertele...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <SaveBar saving={saving} onSave={() => saveBids(bids)} saved={saved} />

      <AdminHeader
        title="Oferte primite (Bids)"
        desc="Ofertele trimise de clienti pentru produsele din catalog."
        action={
          <button style={A.btnOutline} onClick={loadBids}>
            <RefreshCw size={14} />
            Reincarca
          </button>
        }
      />

      <div style={{ padding: '0 32px 40px' }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {(['all', 'pending', 'accepted', 'rejected'] as const).map((f) => {
            const labels: Record<typeof f, string> = { all: 'Toate', pending: 'In asteptare', accepted: 'Acceptate', rejected: 'Respinse' };
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  ...A.btnOutline,
                  background: isActive ? '#2B8FCC' : '#fff',
                  color: isActive ? '#fff' : '#374151',
                  border: isActive ? '1px solid #2B8FCC' : '1px solid #E2E8F0',
                  gap: 6,
                }}
              >
                {labels[f]}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 20, height: 20, borderRadius: 10,
                  background: isActive ? 'rgba(255,255,255,0.25)' : '#F1F5F9',
                  color: isActive ? '#fff' : '#64748B',
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.7rem',
                }}>
                  {counts[f]}
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 0',
            fontFamily: 'var(--font-body)', color: '#94A3B8', fontSize: '0.9rem',
          }}>
            {filter === 'all' ? 'Nicio oferta primita inca.' : `Nicio oferta cu statusul "${STATUS_CONFIG[filter as BidStatus]?.label}".`}
          </div>
        )}

        {filtered.length > 0 && (
          <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
            {/* Table header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr 140px 130px 100px 110px 160px',
              gap: 12,
              padding: '10px 16px',
              background: '#F1F5F9',
              borderBottom: '1px solid #E2E8F0',
            }}>
              {['Data', 'Produs / Client', 'Email', 'Telefon', 'Pret oferit', 'Status', 'Actiuni'].map((h) => (
                <span key={h} style={{
                  fontFamily: 'var(--font-body)', fontWeight: 700,
                  fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {filtered.map((bid, idx) => {
              const isExpanded = expandedId === bid.id;
              const isLast = idx === filtered.length - 1;

              return (
                <div key={bid.id} style={{ borderBottom: isLast ? 'none' : '1px solid #E2E8F0' }}>
                  {/* Main row */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '160px 1fr 140px 130px 100px 110px 160px',
                      gap: 12,
                      padding: '14px 16px',
                      alignItems: 'center',
                      cursor: 'pointer',
                      background: isExpanded ? '#FAFBFF' : '#fff',
                      transition: 'background 150ms ease',
                    }}
                    onClick={() => setExpandedId(isExpanded ? null : bid.id)}
                  >
                    {/* Date */}
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#64748B' }}>
                      {formatDate(bid.createdAt)}
                    </span>

                    {/* Product / Client */}
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {bid.productTitle || bid.productSlug}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#64748B' }}>
                        {bid.name}
                      </div>
                    </div>

                    {/* Email */}
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {bid.email}
                    </span>

                    {/* Phone */}
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#64748B' }}>
                      {bid.phone || '-'}
                    </span>

                    {/* Price */}
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>
                      {formatPrice(bid.offeredPrice)}
                    </span>

                    {/* Status */}
                    <StatusBadge status={bid.status} />

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 6 }} onClick={(e) => e.stopPropagation()}>
                      {bid.status !== 'accepted' && (
                        <button
                          onClick={() => updateStatus(bid.id, 'accepted')}
                          title="Accepta oferta"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            height: 32, padding: '0 12px', borderRadius: 7,
                            background: '#ECFDF5', color: '#059669',
                            border: '1px solid #A7F3D0', cursor: 'pointer',
                            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.75rem',
                          }}
                        >
                          <CheckCircle size={13} />
                          Accept
                        </button>
                      )}
                      {bid.status !== 'rejected' && (
                        <button
                          onClick={() => updateStatus(bid.id, 'rejected')}
                          title="Respinge oferta"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            height: 32, padding: '0 12px', borderRadius: 7,
                            background: '#FEF2F2', color: '#DC2626',
                            border: '1px solid #FECACA', cursor: 'pointer',
                            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.75rem',
                          }}
                        >
                          <XCircle size={13} />
                          Respinge
                        </button>
                      )}
                      {bid.status !== 'pending' && (
                        <button
                          onClick={() => updateStatus(bid.id, 'pending')}
                          title="Reseteaza la in asteptare"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            height: 32, padding: '0 10px', borderRadius: 7,
                            background: '#F8FAFC', color: '#64748B',
                            border: '1px solid #E2E8F0', cursor: 'pointer',
                            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.75rem',
                          }}
                        >
                          <RefreshCw size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded message */}
                  {isExpanded && (
                    <div style={{
                      padding: '0 16px 16px',
                      borderTop: '1px solid #F1F5F9',
                      background: '#FAFBFF',
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, paddingTop: 16 }}>
                        <div>
                          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.78rem', color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Mesaj client
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#374151',
                            lineHeight: 1.6, background: '#fff', border: '1px solid #E2E8F0',
                            borderRadius: 8, padding: '12px 14px',
                            minHeight: 60,
                          }}>
                            {bid.message || <span style={{ color: '#CBD5E1' }}>Niciun mesaj lasat.</span>}
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.78rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>
                            Detalii oferta
                          </div>
                          {[
                            ['Produs slug', bid.productSlug],
                            ['Pret oferit', formatPrice(bid.offeredPrice)],
                            ['ID oferta', bid.id],
                          ].map(([label, value]) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}>
                              <span style={{ color: '#64748B' }}>{label}</span>
                              <span style={{ color: '#0F172A', fontWeight: 600 }}>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
