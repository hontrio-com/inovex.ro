'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Settings, Users, Star, HelpCircle,
  List, Image, Gavel, LogOut, ChevronRight, Globe, Layers, FileText,
  BookOpen, Tag, MessageSquare, Mail,
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard',     href: '/admin',              icon: LayoutDashboard },
  { label: 'Marketplace',   href: '/admin/marketplace',  icon: ShoppingBag     },
  { label: 'Oferte (bids)', href: '/admin/bids',         icon: Gavel           },
  { label: '─────────',     href: '',                    icon: null            },
  { label: 'Servicii',      href: '/admin/services',     icon: Globe           },
  { label: 'Portofoliu',    href: '/admin/portfolio',    icon: Image           },
  { label: 'Testimoniale',  href: '/admin/testimonials', icon: Star            },
  { label: 'Intrebari FAQ', href: '/admin/faq',          icon: HelpCircle      },
  { label: 'Proces',        href: '/admin/process',      icon: List            },
  { label: '─────────',                href: '',                                 icon: null           },
  { label: 'Continut educativ',         href: '/admin/invata-gratuit',            icon: BookOpen       },
  { label: 'Categorii',                 href: '/admin/invata-gratuit/categorii',  icon: Tag            },
  { label: 'Comentarii',                href: '/admin/invata-gratuit/comentarii', icon: MessageSquare  },
  { label: 'Lead-uri',                  href: '/admin/invata-gratuit/leads',      icon: Mail           },
  { label: '─────────',                href: '',                                 icon: null           },
  { label: 'Setari site',   href: '/admin/settings',     icon: Settings        },
];

function NavItem({ item, active }: { item: typeof NAV[0]; active: boolean }) {
  if (!item.href) {
    return <div style={{ height: 1, background: '#1E293B', margin: '4px 0' }} />;
  }
  const Icon = item.icon!;
  return (
    <Link
      href={item.href}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 12px', borderRadius: 8,
        background: active ? 'rgba(43,143,204,0.15)' : 'transparent',
        color: active ? '#7DD3FC' : '#94A3B8',
        textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.875rem',
        transition: 'background 150ms ease, color 150ms ease',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)';
          (e.currentTarget as HTMLAnchorElement).style.color = '#CBD5E1';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
          (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8';
        }
      }}
    >
      <Icon size={16} />
      {item.label}
      {active && <ChevronRight size={13} style={{ marginLeft: 'auto' }} />}
    </Link>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  // Don't render shell on login page
  if (pathname === '/admin/login') return <>{children}</>;

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F172A' }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: 252, flexShrink: 0, background: '#0F172A',
        borderRight: '1px solid #1E293B',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #1E293B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, background: '#2B8FCC', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div>
              <p style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1 }}>inovex</p>
              <p style={{ color: '#2B8FCC', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>admin panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
          {NAV.map((item, i) => (
            <NavItem
              key={i}
              item={item}
              active={item.href ? (item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)) : false}
            />
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid #1E293B' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8,
              color: '#64748B', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.8125rem',
              transition: 'color 150ms ease',
            }}
          >
            <Globe size={15} />
            Vizualizeaza site-ul
          </Link>
          <button
            onClick={logout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, border: 'none', background: 'transparent',
              color: '#64748B', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.8125rem',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#F87171'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#64748B'; }}
          >
            <LogOut size={15} />
            Deconectare
          </button>
        </div>
      </aside>

      {/* ── Content ── */}
      <main style={{ flex: 1, marginLeft: 252, minHeight: '100vh', background: '#F8FAFC', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
