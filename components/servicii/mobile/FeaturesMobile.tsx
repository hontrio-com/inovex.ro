'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Palette,
  Cpu,
  Server,
  CreditCard,
  Upload,
  Code2,
  CheckCircle,
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const FEATURES: Feature[] = [
  {
    icon: <Palette size={22} className="text-[#2B8FCC]" />,
    title: 'Design & Experienta Utilizator',
    items: [
      'Design nativ per platforma: iOS Human Interface + Android Material Design',
      'Prototip interactiv Figma inainte de orice linie de cod',
      'Gesturi native: swipe, pull-to-refresh, long press, haptic feedback',
      'Dark mode nativ implementat corect pe ambele platforme',
      'Accesibilitate: VoiceOver (iOS) si TalkBack (Android)',
      'Animatii fluide 60fps, testate pe dispozitive reale',
    ],
  },
  {
    icon: <Cpu size={22} className="text-[#2B8FCC]" />,
    title: 'Functionalitati Native',
    items: [
      'Push notifications locale si remote (FCM/APNs)',
      'Autentificare biometrica: Face ID, Touch ID, amprenta Android',
      'Camera, galerie foto, scanare QR si coduri de bare',
      'GPS si harti: Google Maps, Apple Maps, Mapbox',
      'Bluetooth, NFC si senzori device',
      'Stocare locala offline cu sincronizare la reconectare',
    ],
  },
  {
    icon: <Server size={22} className="text-[#2B8FCC]" />,
    title: 'Backend & Date',
    items: [
      'API dedicat pentru aplicatie mobila, documentat complet',
      'Sincronizare offline-first (functioneaza fara internet)',
      'Stocare securizata credentiale (Keychain iOS / Keystore Android)',
      'Analytics in-app: Firebase Analytics, Mixpanel',
      'Crash reporting: Firebase Crashlytics, Sentry',
      'Real-time cu WebSockets pentru chat, notificari si date live',
    ],
  },
  {
    icon: <CreditCard size={22} className="text-[#2B8FCC]" />,
    title: 'Plati & Monetizare',
    items: [
      'Apple Pay si Google Pay integrate nativ',
      'Stripe SDK pentru plati cu card in aplicatie',
      'In-app purchases pentru continut premium',
      'Subscriptii lunare si anuale prin App Store / Google Play',
      'PayU si Netopia pentru piata romaneasca',
      'Facturare automata si receipt-uri generate pentru utilizator',
    ],
  },
  {
    icon: <Upload size={22} className="text-[#2B8FCC]" />,
    title: 'Publicare & Optimizare Store',
    items: [
      'Setup complet si publicare in App Store (Apple Developer inclus)',
      'Setup complet si publicare in Google Play Store',
      'Screenshot-uri si materiale grafice pentru store, incluse',
      'ASO: titlu, descriere si cuvinte cheie optimizate per platforma',
      'Actualizari OTA fara retrimitere la review (React Native / Expo)',
      'Review management: monitorizare recenzii si suport raspuns',
    ],
  },
  {
    icon: <Code2 size={22} className="text-[#2B8FCC]" />,
    title: 'Tehnologii Recomandate',
    items: [
      'React Native: cross-platform, 80% cod comun iOS + Android',
      'Flutter: performanta maxima pentru UI complex',
      'Swift nativ pentru iOS cand e nevoie de acces hardware profund',
      'Kotlin nativ pentru Android cu integratii specifice ecosistem',
      'Expo pentru lansare rapida si actualizari OTA facile',
      'Recomandam tehnologia potrivita pentru fiecare proiect',
    ],
  },
];

export default function FeaturesMobile() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section className="py-[100px] bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <Badge className="mb-4 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Serviciu complet
          </Badge>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.7rem,2.8vw,2.4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0D1117',
            }}
            className="mb-4"
          >
            Tot ce include un proiect de{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>aplicatie mobila</span>
          </h2>
          <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed">
            Gestionam fiecare aspect al dezvoltarii, de la design la publicare in store-uri.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
            >
              <Card className="h-full border border-[#E8ECF0] hover:border-[#C8E6F8] hover:shadow-md transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-xl bg-[#EAF5FF] flex items-center justify-center mb-4">
                    {feat.icon}
                  </div>
                  <h3
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1rem', color: '#0D1117', marginBottom: 12 }}
                  >
                    {feat.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {feat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle size={13} className="text-[#2B8FCC] shrink-0 mt-0.5" />
                        <span className="text-[12.5px] text-[#4A5568] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
