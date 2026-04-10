'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router   = useRouter();
  const params   = useSearchParams();
  const redirect = params.get('redirect') ?? '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const j = await res.json();
        setError(j.error ?? 'Eroare la autentificare');
        return;
      }
      router.push(redirect);
      router.refresh();
    } catch {
      setError('Eroare de retea. Incearca din nou.');
    } finally {
      setLoading(false);
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', height: 46, border: '1px solid #E2E8F0', borderRadius: 10,
    padding: '0 14px', fontSize: '0.9375rem', color: '#0F172A',
    background: '#fff', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'var(--font-body)',
    transition: 'border-color 150ms ease',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: '#94A3B8' }}>
          Utilizator
        </label>
        <input
          type="text" value={username} onChange={(e) => setUsername(e.target.value)}
          placeholder="admin" required autoFocus style={inp}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: '#94A3B8' }}>
          Parola
        </label>
        <input
          type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••" required style={inp}
        />
      </div>

      {error && (
        <div style={{ background: '#450A0A', border: '1px solid #7F1D1D', borderRadius: 8, padding: '10px 14px', color: '#FCA5A5', fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}>
          {error}
        </div>
      )}

      <button
        type="submit" disabled={loading}
        style={{
          height: 48, borderRadius: 10, background: loading ? '#1a6fa8' : '#2B8FCC',
          color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem',
          transition: 'background 200ms ease', marginTop: 4,
        }}
      >
        {loading ? 'Se autentifica...' : 'Intra in cont'}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0F172A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16,
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: '#2B8FCC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
              inovex <span style={{ color: '#2B8FCC' }}>admin</span>
            </span>
          </div>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: 8, fontFamily: 'var(--font-body)' }}>
            Panou de administrare
          </p>
        </div>

        {/* Card */}
        <div style={{ background: '#1E293B', borderRadius: 16, padding: 32, border: '1px solid #334155' }}>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
