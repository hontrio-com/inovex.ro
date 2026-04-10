'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Check, XCircle } from 'lucide-react';

const IDEAL_ITEMS = [
  'Echipa ta face aceleasi actiuni repetitive de zeci de ori pe zi',
  'Procesezi zeci sau sute de emailuri, documente sau formulare saptamanal',
  'Ai o baza de cunostinte (FAQ, proceduri) pe care angajatii o cauta constant',
  'Pierzi lead-uri pentru ca nu ai raspuns suficient de rapid',
  'Rapoartele tale manuale dureaza ore si se fac la aceleasi date fixe',
  'Ai date in mai multe sisteme care nu comunica intre ele',
  'Angajatii tai se plang de sarcini repetitive care consuma timp',
  'Vrei sa scalezi fara sa angajezi proportional mai multi oameni',
];

const WAIT_ITEMS = [
  'Procesele tale se schimba frecvent si nu sunt stabilizate',
  'Volumul de sarcini repetitive e mic (sub 10-20 pe zi)',
  'Echipa nu este deschisa sa adopte instrumente noi',
  'Calitatea datelor existente este slaba sau inconsistenta',
  'Ai nevoie de rezultate in mai putin de 2 saptamani',
];

export default function PentruCineAi() {
  return (
    <section className="bg-[#F8FAFB] py-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - left aligned */}
        <div className="max-w-[560px] mb-12">
          <Badge className="mb-5 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Potrivit pentru
          </Badge>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0D1117',
              marginBottom: 16,
            }}
          >
            Automatizarile AI functioneaza{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>daca...</span>
          </h2>
          <p style={{ color: '#4A5568', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Nu fiecare afacere are nevoie de AI azi. Iti spunem sincer cand are sens si cand inca nu.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Makes sense */}
          <Card
            style={{
              border: '1.5px solid #C8E6F8',
              background: 'rgba(43,143,204,0.03)',
            }}
          >
            <CardContent className="p-8">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <CheckCircle size={20} color="#2B8FCC" />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '1.0625rem',
                    color: '#0D1117',
                  }}
                >
                  Automatizarea are sens daca:
                </h3>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {IDEAL_ITEMS.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: '#EAF5FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <Check size={11} color="#2B8FCC" />
                    </div>
                    <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Right: Maybe wait */}
          <Card
            style={{
              border: '1.5px solid #FDE68A',
              background: 'rgba(245,158,11,0.03)',
            }}
          >
            <CardContent className="p-8">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <AlertCircle size={20} color="#F59E0B" />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '1.0625rem',
                    color: '#0D1117',
                  }}
                >
                  S-ar putea sa astepti daca:
                </h3>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {WAIT_ITEMS.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <XCircle size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Extra note */}
              <div
                style={{
                  marginTop: 24,
                  padding: '14px 16px',
                  background: 'rgba(245,158,11,0.06)',
                  borderRadius: 10,
                  border: '1px solid rgba(245,158,11,0.20)',
                }}
              >
                <p style={{ fontSize: 13, color: '#92400E', lineHeight: 1.6 }}>
                  Chiar si in aceste situatii, poti incepe cu ceva mic si sa scalezi dupa ce procesele se stabilizeaza.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom note */}
        <div className="text-center mt-8">
          <p style={{ fontSize: 14, color: '#4A5568', lineHeight: 1.6 }}>
            Nu stii sigur? Consultatia initiala este gratuita si iti analizam procesele inainte sa recomandam orice solutie.{' '}
            <a
              href="/contact"
              style={{ color: '#2B8FCC', fontWeight: 600, textDecoration: 'underline' }}
            >
              Programeaza o discutie
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
