import Link from 'next/link';
import { Phone, FileText, Receipt, Shield } from 'lucide-react';
import { CookieConsent } from '@/components/layout/CookieConsent';

export default function ConfiguratoareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Header minimal */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E8ECF0]"
        style={{ height: '56px' }}
      >
        <div
          className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-full"
        >
          <Link href="/" aria-label="Inovex - Acasa">
            <img
              src="/imagini/logo_negru.png"
              alt="Inovex"
              style={{ height: 32, width: 'auto', display: 'block' }}
            />
          </Link>

          <a
            href="tel:+40750456096"
            className="flex items-center gap-2"
            aria-label="Suna-ne la 0750 456 096"
          >
            <Phone size={15} className="text-[#2B8FCC]" />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '14px',
                color: '#0D1117',
              }}
            >
              0750 456 096
            </span>
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-14 pb-[52px] min-h-screen">{children}</main>

      {/* Footer minimal */}
      <footer
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8ECF0]"
        style={{ height: '52px' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-center h-full">
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-1.5">
              <FileText size={13} className="text-[#2B8FCC]" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#4A5568',
                }}
              >
                Contract de prestari servicii
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Receipt size={13} className="text-[#2B8FCC]" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#4A5568',
                }}
              >
                Factura fiscala inclusa
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Shield size={13} className="text-[#16A34A]" />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: '#16A34A',
                }}
              >
                Garantie si asistenta gratuita
              </span>
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </>
  );
}
