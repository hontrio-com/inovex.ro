'use client';

import { useRef, useState, useEffect } from 'react';
import { Check, Eraser, ShieldCheck } from 'lucide-react';

export function SignClient({ id, token, contractNumber, title, content }: {
  id: string; token: string; contractNumber: string | null; title: string | null; content: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasDrawn = useRef(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gdpr, setGdpr] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#0F172A';
  }, []);

  function posOf(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current!.getContext('2d')!;
    const p = posOf(e); ctx.beginPath(); ctx.moveTo(p.x, p.y);
    canvasRef.current!.setPointerCapture(e.pointerId);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    const p = posOf(e); ctx.lineTo(p.x, p.y); ctx.stroke();
    hasDrawn.current = true;
  }
  function up() { drawing.current = false; }
  function clearCanvas() {
    const canvas = canvasRef.current!;
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;
  }

  async function submit() {
    setError('');
    if (!name.trim()) { setError('Introdu numele complet.'); return; }
    if (!hasDrawn.current) { setError('Semneaza in casuta de mai jos.'); return; }
    if (!gdpr) { setError('Trebuie sa accepti prelucrarea datelor.'); return; }
    setSubmitting(true);
    try {
      const signature = canvasRef.current!.toDataURL('image/png');
      const res = await fetch(`/api/contract/${id}/${token}/sign`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signer_name: name, signer_email: email, signature, gdpr: true }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare la semnare');
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Eroare la semnare');
    } finally { setSubmitting(false); }
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '44px 34px', maxWidth: 460, textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <Check size={30} color="#15803D" />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 10 }}>Contract semnat!</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>
            Multumim, {name}. Contractul a fost semnat cu succes{email ? ' si vei primi PDF-ul pe email' : ''}.
          </p>
        </div>
      </div>
    );
  }

  const inp: React.CSSProperties = { width: '100%', height: 44, border: '1px solid #E2E8F0', borderRadius: 10, padding: '0 14px', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#0F172A', background: '#fff', outline: 'none', boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '0.06em', color: '#2B8FCC' }}>INOVEX</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#94A3B8', marginTop: 2 }}>Semnare electronica contract{contractNumber ? ` nr. ${contractNumber}` : ''}</p>
        </div>

        {/* Contract */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '36px 40px', marginBottom: 20, maxHeight: 460, overflowY: 'auto' }}>
          {title && <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8', marginBottom: 16 }}>{title}</div>}
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        {/* Semnare */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#0F172A', marginBottom: 16 }}>Semneaza contractul</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.82rem', color: '#374151' }}>Nume complet *</label>
              <input style={inp} value={name} onChange={(e) => setName(e.target.value)} placeholder="Prenume Nume" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.82rem', color: '#374151' }}>Email (pentru copia PDF)</label>
              <input style={inp} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplu.ro" />
            </div>
          </div>

          <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.82rem', color: '#374151' }}>Semnatura *</label>
          <div style={{ position: 'relative', border: '1.5px dashed #CBD5E1', borderRadius: 12, background: '#FBFCFE', marginBottom: 4 }}>
            <canvas
              ref={canvasRef}
              onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
              style={{ width: '100%', height: 180, display: 'block', touchAction: 'none', cursor: 'crosshair' }}
            />
            <button type="button" onClick={clearCanvas} style={{ position: 'absolute', top: 8, right: 8, display: 'inline-flex', alignItems: 'center', gap: 5, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: '5px 10px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#64748B' }}>
              <Eraser size={13} /> Sterge
            </button>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8', marginBottom: 16 }}>Semneaza cu mouse-ul sau cu degetul.</p>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 20, cursor: 'pointer' }}>
            <input type="checkbox" checked={gdpr} onChange={(e) => setGdpr(e.target.checked)} style={{ width: 18, height: 18, marginTop: 1, flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
              Sunt de acord cu semnarea electronica a acestui contract si cu prelucrarea datelor mele conform politicii de confidentialitate.
            </span>
          </label>

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontFamily: 'var(--font-body)', fontSize: '0.82rem', marginBottom: 16 }}>{error}</div>
          )}

          <button onClick={submit} disabled={submitting}
            style={{ width: '100%', height: 50, borderRadius: 12, background: submitting ? '#60a5c4' : '#2B8FCC', color: '#fff', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <ShieldCheck size={18} /> {submitting ? 'Se semneaza...' : 'Semneaza contractul'}
          </button>
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#94A3B8', marginTop: 12 }}>
            Semnatura electronica simpla (eIDAS). Se inregistreaza data, ora si IP-ul pentru audit.
          </p>
        </div>
      </div>
    </div>
  );
}
