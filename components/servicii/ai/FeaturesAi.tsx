'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Bot, Mail, FileSearch, GitFork, TrendingUp, Plug } from 'lucide-react';

const FEATURES = [
  {
    icon: Bot,
    title: 'Chatboti si Agenti AI',
    items: [
      'Chatbot antrenat pe documentele si FAQ-urile tale',
      'Agent WhatsApp cu raspuns sub 5 secunde',
      'Escalare automata catre agent uman cand e necesar',
      'Suport multilingv fara costuri suplimentare',
      'Integrare pe orice canal: web, email, social media',
      'Imbunatatire continua din conversatiile reale',
    ],
  },
  {
    icon: Mail,
    title: 'Procesare Automata Emailuri',
    items: [
      'Clasificare automata pe categorii si prioritati',
      'Extragere date structurate din orice email',
      'Raspunsuri personalizate generate de AI',
      'Routing automat catre departamentul corect',
      'Alerta imediata pentru emailuri VIP sau urgente',
      'Raport zilnic cu volumul si timpii de procesare',
    ],
  },
  {
    icon: FileSearch,
    title: 'OCR si Procesare Documente',
    items: [
      'Extragere date din facturi, contracte si formulare',
      'Clasificare automata a tipului de document',
      'Validare si detectie erori de completare',
      'Inregistrare automata in ERP sau CRM',
      'Arhivare cu metadate structurate si cautare rapida',
      'Formate suportate: PDF, imagini, Word, Excel',
    ],
  },
  {
    icon: GitFork,
    title: 'Automatizari Procese',
    items: [
      'Implementare pe Make, n8n sau Zapier',
      'Notificari automate pe Slack, email sau SMS',
      'Generare documente pe baza de template-uri',
      'Sincronizare date intre sisteme diferite',
      'Rapoarte periodice generate si trimise automat',
      'Alerta pe exceptii si situatii care necesita atentie',
    ],
  },
  {
    icon: TrendingUp,
    title: 'AI pentru Vanzari',
    items: [
      'Calificare si scoring automat al lead-urilor',
      'Follow-up automat bazat pe comportament',
      'Descrieri de produse generate de AI in masa',
      'Recomandari personalizate pentru fiecare client',
      'Analiza sentiment recenzii si feedback',
      'Raport saptamanal cu pipeline si conversii',
    ],
  },
  {
    icon: Plug,
    title: 'Integratii si Modele AI',
    items: [
      'OpenAI GPT-4o pentru taskuri complexe',
      'Anthropic Claude pentru analiza documentelor',
      'Google Gemini pentru procesare multimodala',
      'Modele locale pentru date confidentiale',
      'Fine-tuning pe datele si stilul tau',
      'RAG - raspunsuri bazate pe baza ta de cunostinte',
    ],
  },
];

export default function FeaturesAi() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section className="bg-white py-[100px]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <Badge className="mb-5 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Servicii complete AI
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
            Ce implementam concret{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>in afacerea ta</span>
          </h2>
          <p style={{ color: '#4A5568', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Nu vindem tool-uri. Implementam solutii complete, configurate pe procesele tale, cu training si suport inclus.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                whileHover={shouldReduceMotion ? {} : { y: -3 }}
              >
                <Card className="h-full border-[#E8ECF0] hover:border-[#C8E6F8] hover:shadow-md transition-all duration-300">
                  <CardContent className="p-7">
                    {/* Icon */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: '#EAF5FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16,
                      }}
                    >
                      <Icon size={22} color="#2B8FCC" />
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: '1.0625rem',
                        color: '#0D1117',
                        marginBottom: 16,
                        lineHeight: 1.3,
                      }}
                    >
                      {feature.title}
                    </h3>

                    {/* Items */}
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {feature.items.map((item) => (
                        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                          <CheckCircle
                            size={14}
                            color="#2B8FCC"
                            style={{ flexShrink: 0, marginTop: 2 }}
                          />
                          <span style={{ fontSize: 13.5, color: '#4A5568', lineHeight: 1.5 }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
