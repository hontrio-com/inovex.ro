'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NextImage from 'next/image';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const SECURITY_CODE = '82073992';

const inp: React.CSSProperties = {
  width: '100%', height: 48, border: '1.5px solid #E2E8F0', borderRadius: 10,
  padding: '0 14px', fontSize: '0.9375rem', color: '#0F172A',
  background: '#fff', outline: 'none', boxSizing: 'border-box',
  fontFamily: 'var(--font-body)', transition: 'border-color 150ms ease',
};

function SecurityCodeForm({ onSuccess }: { onSuccess: () => void }) {
  const [code, setCode]         = useState('');
  const [error, setError]       = useState('');
  const [showCode, setShowCode] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (code === SECURITY_CODE) {
      onSuccess();
    } else {
      setError('Cod de securitate incorect. Incearca din nou.');
      setCode('');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
          <ShieldCheck size={26} color="#2B8FCC" />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0F172A', marginBottom: 6 }}>
          Verificare securitate
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5 }}>
          Introdu codul de securitate pentru a continua.
        </p>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 7, fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>
          Cod de securitate
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={showCode ? 'text' : 'password'}
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); }}
            placeholder="••••••••"
            required
            autoFocus
            style={{ ...inp, paddingRight: 44 }}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#2B8FCC'; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E2E8F0'; }}
          />
          <button type="button" onClick={() => setShowCode(!showCode)}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0, display: 'flex' }}>
            {showCode ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}>
          {error}
        </div>
      )}

      <button type="submit"
        style={{ height: 48, borderRadius: 10, background: '#2B8FCC', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#1a6fa8'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#2B8FCC'; }}
      >
        <Lock size={16} />
        Continua
      </button>
    </form>
  );
}

function LoginFormInner() {
  const router   = useRouter();
  const params   = useSearchParams();
  const redirect = params.get('redirect') ?? '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
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

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0F172A', marginBottom: 6 }}>
          Bine ai revenit
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>
          Autentifica-te in panoul de administrare.
        </p>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 7, fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>
          Utilizator
        </label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
          placeholder="admin" required autoFocus style={inp}
          onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#2B8FCC'; }}
          onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E2E8F0'; }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: 7, fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>
          Parola
        </label>
        <div style={{ position: 'relative' }}>
          <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" required style={{ ...inp, paddingRight: 44 }}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#2B8FCC'; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E2E8F0'; }}
          />
          <button type="button" onClick={() => setShowPass(!showPass)}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0, display: 'flex' }}>
            {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={loading}
        style={{ height: 48, borderRadius: 10, background: loading ? '#60a5c4' : '#2B8FCC', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem' }}
        onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#1a6fa8'; }}
        onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#2B8FCC'; }}
      >
        {loading ? 'Se autentifica...' : 'Intra in cont'}
      </button>
    </form>
  );
}

function AdminLoginInner() {
  const [step, setStep] = useState<'code' | 'login'>('code');

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <NextImage src="/imagini/logo_negru.png" alt="Inovex" width={140} height={42} style={{ objectFit: 'contain', margin: '0 auto' }} priority />
        </div>
        <div style={{ background: '#fff', borderRadius: 20, padding: '36px 32px', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          {step === 'code'
            ? <SecurityCodeForm onSuccess={() => setStep('login')} />
            : <Suspense fallback={null}><LoginFormInner /></Suspense>
          }
        </div>
        <p style={{ textAlign: 'center', marginTop: 20, fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#94A3B8' }}>
          inovex.ro &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginInner />
    </Suspense>
  );
}
