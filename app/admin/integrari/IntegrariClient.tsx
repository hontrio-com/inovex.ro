'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Plug, Loader2, Check, X, Copy, Inbox, Send, RefreshCw,
  CircleCheck, CircleAlert, ChevronDown, ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LeadStats { count: number; lastAt: string | null }
interface SignalStats { sent: number; pending: number; failed: number; skipped: number }
interface Inbound { configured: boolean; env: Record<string, boolean>; webhookUrl: string; verifyToken?: string | null; webhookKey?: string | null; leads?: LeadStats }
interface Outbound { configured: boolean; env: Record<string, boolean>; signals: SignalStats }
interface PlatformState { inbound: Inbound; outbound: Outbound }
interface StatusData { meta: PlatformState; tiktok: PlatformState; google: PlatformState }

const EVENTS = ['lead_qualified (Calificat)', 'lead_converted (Convertit, cu valoare)', 'lead_edinio (Catre Edinio)', 'lead_disqualified (Pierdut)'];

function fmtDateTime(iso: string | null) {
  return iso ? new Date(iso).toLocaleString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : null;
}
function copy(text: string) { navigator.clipboard.writeText(text).then(() => toast.success('Copiat')).catch(() => {}); }

function StatusBadge({ ok, labelOk, labelKo }: { ok: boolean; labelOk: string; labelKo: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 10px', borderRadius: 999,
      fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
      background: ok ? '#F0FDF4' : '#FFFBEB', color: ok ? '#15803D' : '#B45309',
      border: `1px solid ${ok ? '#BBF7D0' : '#FDE68A'}`,
    }}>
      {ok ? <CircleCheck size={13} /> : <CircleAlert size={13} />} {ok ? labelOk : labelKo}
    </span>
  );
}

function EnvChecklist({ env }: { env: Record<string, boolean> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {Object.entries(env).map(([name, ok]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-body)', fontSize: '0.78rem' }}>
          {ok ? <Check size={14} color="#15803D" /> : <X size={14} color="#DC2626" />}
          <code style={{ fontFamily: 'monospace', fontSize: '0.74rem', color: ok ? '#334155' : '#B91C1C', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 5, padding: '1px 6px' }}>{name}</code>
        </div>
      ))}
    </div>
  );
}

function CopyBox({ value }: { value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input readOnly value={value} onFocus={(e) => e.target.select()}
        style={{ flex: 1, minWidth: 0, height: 34, border: '1px solid #E2E8F0', borderRadius: 7, padding: '0 10px', fontFamily: 'monospace', fontSize: '0.72rem', color: '#334155', background: '#F8FAFC' }} />
      <Button variant="outline" size="sm" onClick={() => copy(value)} leftIcon={<Copy size={13} />}>Copiaza</Button>
    </div>
  );
}

function SignalRow({ signals }: { signals: SignalStats }) {
  const items = [
    { label: 'trimise', value: signals.sent, color: '#15803D' },
    { label: 'in asteptare', value: signals.pending, color: '#B45309' },
    { label: 'esuate', value: signals.failed, color: '#DC2626' },
    { label: 'sarite', value: signals.skipped, color: '#94A3B8' },
  ];
  return (
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
      {items.map((it) => (
        <div key={it.label} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#64748B' }}>
          <strong style={{ color: it.color, fontSize: '0.95rem' }}>{it.value}</strong> {it.label}
        </div>
      ))}
    </div>
  );
}

const sectionLbl: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.82rem', color: '#0F172A', marginBottom: 10 };
const subtle: React.CSSProperties = { fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#64748B', lineHeight: 1.55 };

function PlatformCard({ name, color, state, steps, extraInbound }: {
  name: string; color: string; state: PlatformState; steps: string[]; extraInbound?: React.ReactNode;
}) {
  const [showSteps, setShowSteps] = useState(false);
  const leads = state.inbound.leads;
  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 22, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ width: 12, height: 12, borderRadius: 4, background: color }} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#0F172A', marginRight: 'auto' }}>{name}</h2>
        <StatusBadge ok={state.inbound.configured} labelOk="Primire activa" labelKo="Primire: chei lipsa" />
        <StatusBadge ok={state.outbound.configured} labelOk="Semnale active" labelKo="Semnale: chei lipsa" />
      </div>

      {/* Inbound */}
      <div>
        <div style={sectionLbl}><Inbox size={15} color={color} /> Primire lead-uri (webhook)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <CopyBox value={state.inbound.webhookUrl} />
          {extraInbound}
          <EnvChecklist env={state.inbound.env} />
          <div style={{ ...subtle, display: 'flex', alignItems: 'center', gap: 6 }}>
            {leads && leads.count > 0
              ? <>Lead-uri primite: <strong style={{ color: '#0F172A' }}>{leads.count}</strong> · ultimul {fmtDateTime(leads.lastAt)}</>
              : 'Niciun lead primit inca pe acest webhook.'}
          </div>
        </div>
      </div>

      {/* Outbound */}
      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 16 }}>
        <div style={sectionLbl}><Send size={15} color={color} /> Semnale de calitate (feedback catre algoritm)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <EnvChecklist env={state.outbound.env} />
          <SignalRow signals={state.outbound.signals} />
        </div>
      </div>

      {/* Setup steps */}
      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12 }}>
        <button onClick={() => setShowSteps((s) => !s)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, color: '#2B8FCC' }}>
          {showSteps ? <ChevronUp size={14} /> : <ChevronDown size={14} />} Pasi de configurare
        </button>
        {showSteps && (
          <ol style={{ margin: '10px 0 0', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {steps.map((s, i) => <li key={i} style={subtle}>{s}</li>)}
          </ol>
        )}
      </div>
    </div>
  );
}

export function IntegrariClient() {
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/integrari');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json);
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 8 }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 4 }}>
            <Plug size={22} color="#2B8FCC" /> Integrari Ads
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>
            Lead-urile din campanii intra automat in CRM, iar statusurile (Calificat / Convertit / Catre Edinio / Pierdut) se trimit inapoi ca semnale — algoritmii invata cine e clientul ideal.
          </p>
        </div>
        <Button variant="outline" onClick={load} disabled={loading} leftIcon={<RefreshCw size={14} />}>Reincarca</Button>
      </div>

      <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '12px 16px', marginBottom: 20, fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#1E40AF', lineHeight: 1.6 }}>
        Evenimentele trimise (le mapezi in Events Manager la Meta/TikTok, respectiv actiuni de conversie la Google):{' '}
        {EVENTS.map((e, i) => <code key={i} style={{ background: '#fff', border: '1px solid #BFDBFE', borderRadius: 5, padding: '1px 6px', margin: '0 3px', fontSize: '0.72rem' }}>{e}</code>)}
      </div>

      {loading || !data ? (
        <div style={{ padding: 60, textAlign: 'center', color: '#64748B' }}><Loader2 size={18} className="animate-spin" style={{ display: 'inline' }} /> Se incarca...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 16 }}>
          <PlatformCard
            name="Meta (Facebook & Instagram)"
            color="#1877F2"
            state={data.meta}
            extraInbound={data.meta.inbound.verifyToken ? (
              <div style={subtle}>
                Verify token (il ceri la abonarea webhook-ului in aplicatia Meta):
                <div style={{ marginTop: 6 }}><CopyBox value={data.meta.inbound.verifyToken} /></div>
              </div>
            ) : null}
            steps={[
              'In Meta Business Manager creeaza o aplicatie de tip Business (developers.facebook.com).',
              'Adauga produsul Webhooks -> obiect "Page" -> abonare la campul "leadgen" cu URL-ul si verify token-ul de mai sus.',
              'Creeaza un System User in Business Settings, da-i acces la Pagina si genereaza un token cu permisiunile leads_retrieval + pages_manage_metadata -> META_PAGE_TOKEN.',
              'App Secret (din setarile aplicatiei) -> META_APP_SECRET.',
              'Pentru semnale: ID-ul dataset-ului/pixelului din Events Manager -> META_DATASET_ID (token-ul poate fi acelasi System User).',
              'In Events Manager configureaza funelul Conversion Leads cu evenimentele lead_qualified / lead_converted / lead_disqualified, apoi seteaza campaniile pe obiectivul "Conversion Leads".',
            ]}
          />
          <PlatformCard
            name="TikTok Ads"
            color="#111827"
            state={data.tiktok}
            steps={[
              'In TikTok for Business (ads.tiktok.com) -> Tools -> Events / Lead Generation.',
              'Configureaza webhook-ul de lead-uri cu URL-ul de mai sus (include cheia in URL).',
              'Genereaza un Access Token pentru Events API (TikTok Business API) -> TIKTOK_ACCESS_TOKEN.',
              'ID-ul sursei de evenimente CRM (Events Manager -> CRM) -> TIKTOK_EVENT_SOURCE_ID; optional pixel-ul web -> TIKTOK_PIXEL_CODE.',
              'Mapeaza evenimentele lead_qualified / lead_converted in Events Manager pentru optimizarea pe calitate.',
            ]}
          />
          <PlatformCard
            name="Google Ads"
            color="#EA4335"
            state={data.google}
            extraInbound={data.google.inbound.webhookKey ? (
              <div style={subtle}>
                Cheia (se lipeste in Google Ads la configurarea webhook-ului):
                <div style={{ marginTop: 6 }}><CopyBox value={data.google.inbound.webhookKey} /></div>
              </div>
            ) : null}
            steps={[
              'PRIMIRE (5 minute, fara API): in Google Ads -> Assets -> Lead form -> "Export lead-uri" -> Webhook: lipeste URL-ul si cheia de mai sus, apoi apasa "Trimite date de test".',
              'SEMNALE: aplica pentru un Developer Token (Google Ads API, cont MCC) -> GOOGLE_ADS_DEVELOPER_TOKEN.',
              'Creeaza credentiale OAuth in Google Cloud Console -> GOOGLE_ADS_CLIENT_ID + GOOGLE_ADS_CLIENT_SECRET + GOOGLE_ADS_REFRESH_TOKEN.',
              'ID-ul contului (fara liniute) -> GOOGLE_ADS_CUSTOMER_ID (+ GOOGLE_ADS_LOGIN_CUSTOMER_ID daca folosesti MCC).',
              'In Google Ads creeaza actiuni de conversie de tip "Import" (Lead calificat / Client semnat) si pune ID-urile in GOOGLE_ADS_CA_QUALIFIED / GOOGLE_ADS_CA_CONVERTED.',
              'Nota: Google nu are conversii negative — statusul Pierdut nu se trimite (doar Calificat/Convertit/Edinio).',
            ]}
          />
        </div>
      )}
    </div>
  );
}
