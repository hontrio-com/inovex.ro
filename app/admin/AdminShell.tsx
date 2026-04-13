'use client';

import { useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Settings,
  Gavel, LogOut, ChevronRight, Globe,
  BookOpen, Tag, MessageSquare, Mail, Menu, X,
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard',         href: '/admin',                           icon: LayoutDashboard },
  { label: 'Marketplace',       href: '/admin/marketplace',               icon: ShoppingBag     },
  { label: 'Oferte',            href: '/admin/bids',                      icon: Gavel           },
  { label: '─',                 href: '',                                  icon: null            },
  { label: 'Continut educativ', href: '/admin/invata-gratuit',            icon: BookOpen        },
  { label: 'Categorii',         href: '/admin/invata-gratuit/categorii',  icon: Tag             },
  { label: 'Comentarii',        href: '/admin/invata-gratuit/comentarii', icon: MessageSquare   },
  { label: 'Lead-uri',          href: '/admin/invata-gratuit/leads',      icon: Mail            },
  { label: '─',                 href: '',                                  icon: null            },
  { label: 'Setari site',       href: '/admin/settings',                  icon: Settings        },
];

const SIDEBAR_W = 240;

function NavItem({ item, active, onClick }: { item: typeof NAV[0]; active: boolean; onClick?: () => void }) {
  if (!item.href) {
    return <div style={{ height: 1, background: '#F1F5F9', margin: '6px 8px' }} />;
  }
  const Icon = item.icon!;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 12px', borderRadius: 8,
        background: active ? '#EFF6FF' : 'transparent',
        color: active ? '#2B8FCC' : '#4B5563',
        textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: active ? 600 : 500, fontSize: '0.875rem',
        transition: 'background 150ms ease, color 150ms ease',
      }}
      onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.background = '#F8FAFC'; (e.currentTarget as HTMLAnchorElement).style.color = '#1e293b'; } }}
      onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#4B5563'; } }}
    >
      <Icon size={16} />
      <span style={{ flex: 1 }}>{item.label}</span>
      {active && <ChevronRight size={13} />}
    </Link>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router   = useRouter();

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <div style={{ width: SIDEBAR_W, display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      {/* Logo */}
      <div style={{ padding: '18px 16px 14px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <NextImage src="/imagini/logo_negru.png" alt="Inovex" width={110} height={33} style={{ objectFit: 'contain', objectPosition: 'left', display: 'block' }} priority />
          <p style={{ color: '#94A3B8', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', marginTop: 4 }}>
            admin panel
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4, display: 'flex' }}>
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
        {NAV.map((item, i) => (
          <NavItem
            key={i}
            item={item}
            active={item.href ? (item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)) : false}
            onClick={onClose}
          />
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '10px 8px', borderTop: '1px solid #F1F5F9' }}>
        <Link href="/" target="_blank"
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, color: '#64748B', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.8125rem', transition: 'color 150ms ease' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#2B8FCC'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#64748B'; }}
        >
          <Globe size={15} />
          Vizualizeaza site-ul
        </Link>
        <button onClick={logout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, border: 'none', background: 'transparent', color: '#64748B', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.8125rem', transition: 'color 150ms ease' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#DC2626'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#64748B'; }}
        >
          <LogOut size={15} />
          Deconectare
        </button>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname     = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar-fixed { display: flex !important; }
          .admin-main { margin-left: ${SIDEBAR_W}px !important; }
          .admin-topbar { display: none !important; }
        }
        @media (max-width: 1023px) {
          .admin-sidebar-fixed { display: none; }
          .admin-main { margin-left: 0 !important; }
          .admin-topbar { display: flex !important; }
        }
      `}</style>

      {/* ── Fixed sidebar (desktop) ── */}
      <aside className="admin-sidebar-fixed" style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
        width: SIDEBAR_W,
        borderRight: '1px solid #F1F5F9',
        display: 'none',
      }}>
        <Sidebar />
      </aside>

      {/* ── Mobile overlay sidebar ── */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 60, backdropFilter: 'blur(2px)' }}
          />
          <aside style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: SIDEBAR_W, zIndex: 70, borderRight: '1px solid #F1F5F9', display: 'flex', boxShadow: '4px 0 24px rgba(0,0,0,0.10)' }}>
            <Sidebar onClose={() => setOpen(false)} />
          </aside>
        </>
      )}

      {/* ── Mobile topbar ── */}
      <header className="admin-topbar" style={{
        position: 'sticky', top: 0, zIndex: 40,
        height: 56, background: '#fff', borderBottom: '1px solid #F1F5F9',
        alignItems: 'center', padding: '0 16px', gap: 12,
        display: 'none',
      }}>
        <button onClick={() => setOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151', padding: 4, display: 'flex' }}>
          <Menu size={22} />
        </button>
        <NextImage src="/imagini/logo_negru.png" alt="Inovex" width={90} height={27} style={{ objectFit: 'contain' }} priority />
      </header>

      {/* ── Content ── */}
      <main className="admin-main" style={{ minHeight: '100vh', background: '#F8FAFC', overflowY: 'auto' }}>
        {children}
      </main>
    </>
  );
}
