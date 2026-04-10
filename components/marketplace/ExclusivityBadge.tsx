import { Lock } from 'lucide-react';

interface Props {
  isSold?: boolean;
  size?: 'sm' | 'md';
}

export default function ExclusivityBadge({ isSold = false, size = 'sm' }: Props) {
  const iconSize  = size === 'sm' ? 10 : 12;
  const fontSize  = size === 'sm' ? 10 : 11;
  const padding   = size === 'sm' ? '3px 8px' : '5px 12px';

  if (isSold) {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5, borderRadius: 6,
        background: '#F4F6F8', border: '1px solid #E8ECF0', padding,
      }}>
        <Lock size={iconSize} color="#8A94A6" />
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize,
          color: '#8A94A6', textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>
          Vandut
        </span>
      </div>
    );
  }

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, borderRadius: 6,
      background: '#0D1117', padding,
    }}>
      <Lock size={iconSize} color="#fff" />
      <span style={{
        fontFamily: 'var(--font-body)', fontWeight: 600, fontSize,
        color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em',
      }}>
        Exclusiv
      </span>
    </div>
  );
}
