import { Construction } from 'lucide-react';

/**
 * Placeholder pentru modulele CRM in constructie (Fazele C-G).
 * Pagina e navigabila (fara 404), scheletul CRM e vizibil din prima.
 */
export function ComingSoon({ title, description, phase }: {
  title: string;
  description: string;
  phase: string;
}) {
  return (
    <div style={{ padding: '28px 32px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 4 }}>
        {title}
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B', marginBottom: 24 }}>
        {description}
      </p>

      <div style={{
        background: '#fff', border: '1.5px dashed #CBD5E1', borderRadius: 16,
        padding: '48px 32px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 10,
      }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Construction size={26} color="#2B8FCC" />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#334155' }}>
          Modul in constructie
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#94A3B8' }}>
          Se construieste in <strong style={{ color: '#2B8FCC' }}>{phase}</strong>. Structura de date e deja pregatita.
        </div>
      </div>
    </div>
  );
}
