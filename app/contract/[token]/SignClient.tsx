'use client';

import { useRef, useState, useEffect } from 'react';
import { Check, Eraser, ShieldCheck, Download } from 'lucide-react';

export function SignClient({ token, contractNumber, title, content, clientName, logo }: {
  token: string; contractNumber: string | null; title: string | null; content: string; clientName: string; logo: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasDrawn = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Init canvas + logheaza deschiderea linkului (o data).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      const ctx = canvas.getContext('2d');
      if (ctx) { ctx.scale(ratio, ratio); ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#0F172A'; }
    }
    fetch(`/api/contract/${token}/view`, { method: 'POST' }).catch(() => {});
  }, [token]);

  function posOf(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault(); drawing.current = true;
    const ctx = canvasRef.current!.getContext('2d')!;
    const p = posOf(e); ctx.beginPath(); ctx.moveTo(p.x, p.y);
    canvasRef.current!.setPointerCapture(e.pointerId);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    const p = posOf(e); ctx.lineTo(p.x, p.y); ctx.stroke(); hasDrawn.current = true;
  }
  function up() { drawing.current = false; }
  function clearCanvas() {
    const canvas = canvasRef.current!;
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;
  }

  async function submit() {
    setError('');
    if (!hasDrawn.current) { setError('Semneaza in casuta de mai jos.'); return; }
    setSubmitting(true);
    try {
      const signature = canvasRef.current!.toDataURL('image/png');
      const res = await fetch(`/api/contract/${token}/sign`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ signature }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare la semnare');
      setPdfUrl(json.pdfUrl ?? null);
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
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, marginBottom: 22 }}>
            Multumim! Contractul a fost semnat cu succes. Poti descarca o copie PDF.
          </p>
          {pdfUrl && (
            <a href={pdfUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 48, padding: '0 24px', borderRadius: 10, background: '#2B8FCC', color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem' }}>
              <Download size={18} /> Descarca PDF
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* Header cu logo */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="Inovex" style={{ height: 38, objectFit: 'contain' }} />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#94A3B8', marginTop: 8 }}>Semnare electronica contract{contractNumber ? ` nr. ${contractNumber}` : ''}</p>
        </div>

        {/* Contract */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '36px 40px', marginBottom: 20, maxHeight: 480, overflowY: 'auto' }}>
          {title && <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8', marginBottom: 16 }}>{title}</div>}
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        {/* Semnare */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#0F172A', marginBottom: 4 }}>Semneaza contractul</h2>
          {clientName && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B', marginBottom: 16 }}>In numele: <strong>{clientName}</strong></p>}

          <div style={{ position: 'relative', border: '1.5px dashed #CBD5E1', borderRadius: 12, background: '#FBFCFE', marginBottom: 4 }}>
            <canvas ref={canvasRef} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
              style={{ width: '100%', height: 190, display: 'block', touchAction: 'none', cursor: 'crosshair' }} />
            <button type="button" onClick={clearCanvas} style={{ position: 'absolute', top: 8, right: 8, display: 'inline-flex', alignItems: 'center', gap: 5, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: '5px 10px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#64748B' }}>
              <Eraser size={13} /> Sterge
            </button>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8', marginBottom: 18 }}>Semneaza cu mouse-ul sau cu degetul, apoi apasa butonul.</p>

          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontFamily: 'var(--font-body)', fontSize: '0.82rem', marginBottom: 16 }}>{error}</div>
          )}

          <button onClick={submit} disabled={submitting}
            style={{ width: '100%', height: 50, borderRadius: 12, background: submitting ? '#60a5c4' : '#2B8FCC', color: '#fff', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <ShieldCheck size={18} /> {submitting ? 'Se semneaza...' : 'Semneaza contractul'}
          </button>
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#94A3B8', marginTop: 12 }}>
            Semnatura electronica simpla (eIDAS). Se inregistreaza data, ora si IP-ul.
          </p>
        </div>
      </div>
    </div>
  );
}
