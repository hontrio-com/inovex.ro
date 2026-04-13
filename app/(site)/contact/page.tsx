import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, ChevronRight, MessageSquare } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contacteaza echipa Inovex pentru un proiect web. Raspundem in maximum 24 de ore. Telefon: 0750 456 096. Email: contact@inovex.ro.',
  alternates: { canonical: 'https://inovex.ro/contact' },
  openGraph: {
    title: 'Contact',
    description: 'Contacteaza echipa Inovex. Raspundem in maximum 24 de ore.',
    url: 'https://inovex.ro/contact',
    images: [{ url: '/images/og/inovex-og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact',
    description: 'Contacteaza echipa Inovex. Raspundem in maximum 24 de ore.',
    images: ['/images/og/inovex-og.jpg'],
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Contact', url: 'https://inovex.ro/contact' },
        ]}
      />

      {/* HERO */}
      <section className="bg-white border-b border-[#E8ECF0] pt-[120px] pb-14 max-md:pt-20 max-md:pb-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm mb-10">
            <a href="/" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Acasa</a>
            <ChevronRight size={14} className="text-[#8A94A6]" />
            <span className="text-[#0D1117] font-semibold">Contact</span>
          </nav>

          <div className="max-w-[560px]">
            <Badge className="mb-5 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
              <MessageSquare size={13} />
              Scrie-ne
            </Badge>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(2rem, 3.4vw, 2.9rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.022em',
                color: '#0D1117',
              }}
              className="mb-4"
            >
              Hai sa{' '}
              <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>discutam</span>
              {' '}proiectul tau
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                color: '#4A5568',
              }}
            >
              Completeaza formularul si iti raspundem in maximum{' '}
              <strong className="text-[#0D1117] font-semibold">24 de ore</strong>.
              Fara presiune, fara angajamente.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-[#F8FAFB] py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">

            {/* LEFT: Form */}
            <div className="bg-white border border-[#E8ECF0] rounded-2xl p-8 md:p-10" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
              <p
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', color: '#0D1117' }}
                className="mb-6"
              >
                Trimite-ne un mesaj
              </p>
              <ContactForm />
            </div>

            {/* RIGHT: Contact info */}
            <div className="flex flex-col gap-4 sticky top-28">

              {/* Date de contact */}
              <div className="bg-white border border-[#E8ECF0] rounded-2xl p-6" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                <p
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', color: '#0D1117' }}
                  className="mb-5"
                >
                  Date de contact
                </p>
                <div className="flex flex-col gap-4">
                  <ContactItem icon={Phone} label="Telefon">
                    <a href="tel:+40750456096" className="text-[#2B8FCC] font-semibold hover:underline text-[14px]">
                      0750 456 096
                    </a>
                  </ContactItem>
                  <ContactItem icon={Mail} label="Email">
                    <a href="mailto:contact@inovex.ro" className="text-[#2B8FCC] font-semibold hover:underline text-[14px]">
                      contact@inovex.ro
                    </a>
                  </ContactItem>
                  <ContactItem icon={MapPin} label="Sedii">
                    <div className="text-[#4A5568] text-[13px] space-y-0.5">
                      <div>Targu Jiu, Gorj</div>
                      <div>Bucuresti</div>
                    </div>
                  </ContactItem>
                  <ContactItem icon={Clock} label="Program">
                    <div className="text-[#4A5568] text-[13px]">
                      Luni - Vineri: 08:00 - 20:00
                    </div>
                  </ContactItem>
                </div>
                <div className="mt-5 pt-4 border-t border-[#E8ECF0]">
                  <p className="text-[12px] text-[#8A94A6]">
                    <strong className="text-[#4A5568]">VOID SFT GAMES SRL</strong>
                    <br />CUI: 43474393 | Romania
                  </p>
                </div>
              </div>

              {/* Timp de raspuns */}
              <div className="bg-[#EAF5FF] border border-[#C8E6F8] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#2B8FCC] animate-pulse" />
                  <span className="text-[12px] font-semibold text-[#2B8FCC] uppercase tracking-widest">
                    Timp de raspuns
                  </span>
                </div>
                <p className="text-[#0D1117] font-semibold text-[0.9375rem]">Sub 24 de ore</p>
                <p className="text-[#4A5568] text-[13px] mt-1 leading-relaxed">
                  De obicei raspundem in aceeasi zi, in orele de program.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-[#EAF5FF] flex items-center justify-center shrink-0">
        <Icon size={15} className="text-[#2B8FCC]" />
      </div>
      <div>
        <div className="text-[11px] font-semibold text-[#8A94A6] uppercase tracking-widest mb-0.5">
          {label}
        </div>
        {children}
      </div>
    </div>
  );
}
