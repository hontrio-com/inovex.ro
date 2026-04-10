'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Menu, X, ShoppingCart, Globe, Code2, Database, Smartphone, Zap, ChevronDown, FileSearch,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SERVICII_COL1 = [
  {
    href: '/servicii/magazine-online',
    icon: ShoppingCart,
    titlu: 'Magazine Online',
    descriere: 'WooCommerce, Shopify, soluții custom care vând',
  },
  {
    href: '/servicii/website-de-prezentare',
    icon: Globe,
    titlu: 'Website de Prezentare',
    descriere: 'Design modern, încărcare rapidă, construit pentru conversii',
  },
  {
    href: '/servicii/aplicatii-web-saas',
    icon: Code2,
    titlu: 'Aplicații Web & SaaS',
    descriere: 'Platforme scalabile, dezvoltate pentru creștere reală',
  },
];

const SERVICII_COL2 = [
  {
    href: '/servicii/cms-crm-erp',
    icon: Database,
    titlu: 'CMS, CRM & ERP',
    descriere: 'Sisteme personalizate pentru automatizare și control total',
  },
  {
    href: '/servicii/aplicatii-mobile',
    icon: Smartphone,
    titlu: 'Aplicații Mobile',
    descriere: 'iOS și Android, experiență fluidă și performanță ridicată',
  },
  {
    href: '/servicii/automatizari-ai',
    icon: Zap,
    titlu: 'Automatizari AI',
    descriere: 'Reducem costurile și munca manuală prin automatizări inteligente',
  },
  {
    href: 'https://www.novin.ro',
    icon: FileSearch,
    titlu: 'Audit Website Gratuit',
    descriere: 'Analiza gratuita a site-ului tau: viteza, SEO, securitate',
  },
];

export function Header() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviciiOpen, setServiciiOpen] = useState(false);
  const pathname   = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServiciiOpen(false);
  }, [pathname]);

  /* Hover helpers with small close-delay so cursor can reach dropdown */
  const openDropdown  = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServiciiOpen(true);
  };
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setServiciiOpen(false), 120);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/70 shadow-sm' : 'bg-white'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[62px] lg:h-[66px]">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0" aria-label="Inovex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/imagini/logo_negru.png"
                alt="Inovex"
                style={{ height: 40, width: 'auto', display: 'block' }}
              />
            </Link>

            {/* Nav desktop */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigare principală">

              {/* Servicii cu dropdown la hover */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 px-3.5 py-2 rounded-lg text-[14px] font-medium transition-colors',
                    pathname.startsWith('/servicii')
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                  aria-expanded={serviciiOpen}
                >
                  Servicii
                  <ChevronDown
                    size={14}
                    className={cn('text-gray-400 transition-transform duration-200', serviciiOpen && 'rotate-180')}
                  />
                </button>

                <AnimatePresence>
                  {serviciiOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[540px] bg-white rounded-2xl border border-gray-200/80 overflow-hidden"
                      style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 60px -10px rgba(0,0,0,0.12), 0 0 0 1px rgba(43,143,204,0.06)' }}
                    >
                      <div className="grid grid-cols-2">
                        <div className="p-3 border-r border-gray-100">
                          <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                            Dezvoltare Web
                          </p>
                          {SERVICII_COL1.map((s) => (
                            <DropdownItem key={s.href} {...s} />
                          ))}
                        </div>
                        <div className="p-3">
                          <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                            Soluții Complete
                          </p>
                          {SERVICII_COL2.map((s) => (
                            <DropdownItem key={s.href} {...s} />
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-gray-100 px-5 py-3 bg-gray-50 flex items-center justify-between">
                        <span className="text-[12px] text-gray-500">Explorează toate serviciile noastre</span>
                        <Link href="/servicii" className="text-[12px] text-blue-600 font-semibold hover:text-blue-700">
                          Vezi toate
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Linkuri simple */}
              {[
                { href: '/portofoliu',     label: 'Portofoliu'     },
                { href: '/marketplace',    label: 'Marketplace'    },
                { href: '/contact',        label: 'Contact'        },
                { href: '/invata-gratuit', label: 'Invata Gratuit' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-[14px] font-medium transition-colors',
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'))
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Dreapta desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="tel:+40750456096"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[14px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <Phone size={14} className="text-gray-400" />
                0750 456 096
              </a>
              <Button href="/oferta" size="sm" className="btn-shimmer border-0 shadow-sm">
                Solicită Oferta
              </Button>
            </div>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -mr-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label={mobileOpen ? 'Inchide meniu' : 'Deschide meniu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[62px] left-0 right-0 z-50 lg:hidden bg-white border-b border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto"
            >
              <nav className="max-w-7xl mx-auto px-5 py-4 space-y-0.5">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">Servicii</div>
                {[...SERVICII_COL1, ...SERVICII_COL2].map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <s.icon size={13} className="text-gray-500" />
                    </span>
                    {s.titlu}
                  </Link>
                ))}

                <div className="pt-2 border-t border-gray-100 space-y-0.5">
                  {[
                    { href: '/portofoliu',     label: 'Portofoliu'     },
                    { href: '/marketplace',    label: 'Marketplace'    },
                    { href: '/contact',        label: 'Contact'        },
                    { href: '/invata-gratuit', label: 'Invata Gratuit' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <a href="tel:+40750456096" className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Phone size={15} className="text-gray-400" />
                    0750 456 096
                  </a>
                  <Button href="/oferta" size="sm" className="btn-shimmer border-0 shadow-sm">
                    Solicită Oferta
                  </Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function DropdownItem({
  href, icon: Icon, titlu, descriere, badge,
}: {
  href: string;
  icon: React.ElementType;
  titlu: string;
  descriere: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
    >
      <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
        <Icon size={15} className="text-gray-500 group-hover:text-blue-600 transition-colors" />
      </span>
      <span>
        <span className="flex items-center gap-2 text-[13.5px] font-semibold text-gray-900">
          {titlu}
          {badge && (
            <Badge className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md">
              {badge}
            </Badge>
          )}
        </span>
        <span className="block text-[12px] text-gray-500 mt-0.5">{descriere}</span>
      </span>
    </Link>
  );
}
