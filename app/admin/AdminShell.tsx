'use client';

import { useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Settings,
  Gavel, LogOut, ChevronRight, Globe,
  BookOpen, Tag, MessageSquare, Mail, Menu, X, Users,
  Building2, Target, FileSignature, RefreshCw,
} from 'lucide-react';

type Role = 'owner' | 'admin' | 'agent';

type NavEntry = {
  label: string;
  href: string;
  icon: React.ElementType | null;
  roles?: Role[];
};

const NAV: NavEntry[] = [
  { label: 'Dashboard',         href: '/admin',                           icon: LayoutDashboard },
  { label: 'Clienti',           href: '/admin/clienti',                   icon: Building2       },
  { label: 'Lead-uri',          href: '/admin/lead-uri',                  icon: Target          },
  { label: 'Contracte',         href: '/admin/contracte',                 icon: FileSignature   },
  { label: 'Abonamente',        href: '/admin/abonamente',                icon: RefreshCw       },
  { label: 'Site web',          href: '',                                  icon: null            },
  { label: 'Marketplace',       href: '/admin/marketplace',               icon: ShoppingBag     },
  { label: 'Oferte',            href: '/admin/bids',                      icon: Gavel           },
  { label: 'Continut educativ', href: '/admin/invata-gratuit',            icon: BookOpen        },
  { label: 'Categorii',         href: '/admin/invata-gratuit/categorii',  icon: Tag             },
  { label: 'Comentarii',        href: '/admin/invata-gratuit/comentarii', icon: MessageSquare   },
  { label: 'Lead-uri resurse',  href: '/admin/invata-gratuit/leads',      icon: Mail            },
  { label: '─',                 href: '',                                  icon: null            },
  { label: 'Setari site',       href: '/admin/settings',                  icon: Settings        },
  { label: 'Utilizatori',       href: '/admin/settings/utilizatori',      icon: Users, roles: ['owner'] },
];

const SIDEBAR_W = 240;

const ROLE_LABEL: Record<Role, string> = { owner: 'Owner', admin: 'Administrator', agent: 'Agent' };

function NavItem({ item, active, onClick }: { item: NavEntry; active: boolean; onClick?: () => void }) {
  if (!item.href) {
    // Separator (─) sau titlu de sectiune (orice alt text)
    if (item.label === '─') {
      return <div style={{ height: 1, background: '#F1F5F9', margin: '6px 8px' }} />;
    }
    return (
      <div style={{ padding: '14px 12px 5px', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8' }}>
        {item.label}
      </div>
    );
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

function Sidebar({ onClose, role, userEmail, userName }: {
  onClose?: () => void;
  role: Role | null;
  userEmail: string | null;
  userName: string | null;
}) {
  const pathname = usePathname();
  const router   = useRouter();

  const visibleNav = NAV.filter((item) => !item.roles || (role != null && item.roles.includes(role)));

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
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
        {visibleNav.map((item, i) => (
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
        {userEmail && (
          <div style={{ padding: '6px 12px 10px' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {userName || userEmail}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
              {role && (
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#2B8FCC', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 5, padding: '1px 6px' }}>
                  {ROLE_LABEL[role]}
                </span>
              )}
              {userName && (
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {userEmail}
                </span>
              )}
            </div>
          </div>
        )}
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

export function AdminShell({ children, role = null, userEmail = null, userName = null }: {
  children: React.ReactNode;
  role?: Role | null;
  userEmail?: string | null;
  userName?: string | null;
}) {
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
        <Sidebar role={role} userEmail={userEmail} userName={userName} />
      </aside>

      {/* ── Mobile overlay sidebar ── */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 60, backdropFilter: 'blur(2px)' }}
          />
          <aside style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: SIDEBAR_W, zIndex: 70, borderRight: '1px solid #F1F5F9', display: 'flex', boxShadow: '4px 0 24px rgba(0,0,0,0.10)' }}>
            <Sidebar onClose={() => setOpen(false)} role={role} userEmail={userEmail} userName={userName} />
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
