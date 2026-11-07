import type { Limba } from '@/lib/i18n/config';
import type { Tr } from '.';

/* Animatia aplicatiei SaaS (filmAplicatii.ts: Hontrio) in engleza, germana, franceza. Hontrio si
   app.hontrio.com raman; utilizatorul (Robert) primeste un nume de familie din tara limbii, magazinul lui
   aceeasi adresa ca in animatia magazinului, iar abonamentele sunt in euro (19 / 49 / 99 € pe luna). */

export const STATIC: Record<string, Tr> = {
  'Bine ai revenit': ['Welcome back', 'Willkommen zurück', 'Bon retour'],
  'Conectează-te pentru a continua': ['Sign in to continue', 'Melden Sie sich an, um fortzufahren', 'Connectez-vous pour continuer'],
  'Continuă cu Google': ['Continue with Google', 'Weiter mit Google', 'Continuer avec Google'],
  SAU: ['OR', 'ODER', 'OU'],
  EMAIL: ['EMAIL', 'E-MAIL', 'E-MAIL'],
  'contact@magazinul-tau.ro': ['contact@yourstore.com', 'kontakt@deinshop.de', 'contact@votreboutique.fr'],
  PAROLĂ: ['PASSWORD', 'PASSWORT', 'MOT DE PASSE'],
  'Ai uitat parola?': ['Forgot password?', 'Passwort vergessen?', 'Mot de passe oublié ?'],
  'Conectează-te': ['Sign in', 'Anmelden', 'Se connecter'],
  'Nu ai cont?': ['Don’t have an account?', 'Noch kein Konto?', 'Pas encore de compte ?'],
  'Creează cont gratuit': ['Create a free account', 'Kostenloses Konto erstellen', 'Créer un compte gratuit'],
  Dashboard: ['Dashboard', 'Dashboard', 'Tableau de bord'],
  Produse: ['Products', 'Produkte', 'Produits'],
  'AI Agent': ['AI Agent', 'KI-Agent', 'Agent IA'],
  'Imagini AI': ['AI Images', 'KI-Bilder', 'Images IA'],
  Abonament: ['Subscription', 'Abonnement', 'Abonnement'],
  Setări: ['Settings', 'Einstellungen', 'Paramètres'],
  Suport: ['Support', 'Support', 'Assistance'],
  Credite: ['Credits', 'Credits', 'Crédits'],
  'Upgrade plan': ['Upgrade plan', 'Plan upgraden', 'Passer au plan supérieur'],
  RI: ['RM', 'RS', 'RM'],
  'Robert Iordăchescu': ['Robert Miller', 'Robert Schmidt', 'Robert Martin'],
  'Plan Pro': ['Pro plan', 'Pro-Plan', 'Plan Pro'],
  'Caută produse, setări…': ['Search products, settings…', 'Produkte, Einstellungen suchen…', 'Rechercher produits, paramètres…'],
  'Bună ziua, Robert': ['Good afternoon, Robert', 'Guten Tag, Robert', 'Bonjour, Robert'],
  'Optimizează produse': ['Optimise products', 'Produkte optimieren', 'Optimiser les produits'],
  'Configurare cont': ['Account setup', 'Kontoeinrichtung', 'Configuration du compte'],
  'Cont creat': ['Account created', 'Konto erstellt', 'Compte créé'],
  'Magazin conectat': ['Store connected', 'Shop verbunden', 'Boutique connectée'],
  'Produse sincronizate': ['Products synced', 'Produkte synchronisiert', 'Produits synchronisés'],
  'Prima optimizare': ['First optimisation', 'Erste Optimierung', 'Première optimisation'],
  'AI Agent activat': ['AI Agent enabled', 'KI-Agent aktiviert', 'Agent IA activé'],
  'AI INSIGHT': ['AI INSIGHT', 'KI-INSIGHT', 'INSIGHT IA'],
  '1.248 produse': ['1,248 products', '1.248 Produkte', '1 248 produits'],
  '312 produse au descrieri scurte. Optimizează-le pentru un scor SEO mai bun.': [
    '312 products have short descriptions. Optimise them for a better SEO score.',
    '312 Produkte haben kurze Beschreibungen. Optimieren Sie sie für einen besseren SEO-Score.',
    '312 produits ont des descriptions courtes. Optimisez-les pour un meilleur score SEO.',
  ],
  'Vezi produsele': ['View products', 'Produkte ansehen', 'Voir les produits'],
  'Total produse': ['Total products', 'Produkte gesamt', 'Total produits'],
  'Imagini generate': ['Images generated', 'Generierte Bilder', 'Images générées'],
  'Scor SEO mediu': ['Average SEO score', 'Ø SEO-Score', 'Score SEO moyen'],
  'Credite rămase': ['Credits left', 'Verbleibende Credits', 'Crédits restants'],
  'Vezi toate →': ['View all →', 'Alle ansehen →', 'Tout voir →'],
  'Evoluție după optimizările AI · ultimele 30 de zile': [
    'Progress after AI optimisations · last 30 days',
    'Entwicklung nach KI-Optimierungen · letzte 30 Tage',
    'Évolution après les optimisations IA · 30 derniers jours',
  ],
  'Distribuție SEO': ['SEO distribution', 'SEO-Verteilung', 'Répartition SEO'],
  'Vezi ›': ['View ›', 'Ansehen ›', 'Voir ›'],
  'Bun (80+)': ['Good (80+)', 'Gut (80+)', 'Bon (80+)'],
  'Mediu (50–79)': ['Average (50–79)', 'Mittel (50–79)', 'Moyen (50–79)'],
  'Slab (sub 50)': ['Poor (under 50)', 'Schwach (unter 50)', 'Faible (moins de 50)'],
  'Optimizare finalizată': ['Optimisation complete', 'Optimierung abgeschlossen', 'Optimisation terminée'],
  '312 produse actualizate · SEO 86 → 94': ['312 products updated · SEO 86 → 94', '312 Produkte aktualisiert · SEO 86 → 94', '312 produits mis à jour · SEO 86 → 94'],
  Arhitectură: ['Architecture', 'Architektur', 'Architecture'],
  'POST /api/produse/optimizare': ['POST /api/products/optimise', 'POST /api/products/optimise', 'POST /api/products/optimise'],
  'Bază de date': ['Database', 'Datenbank', 'Base de données'],
  Coadă: ['Queue', 'Queue', 'File d’attente'],
  'Jobs în fundal': ['Background jobs', 'Hintergrund-Jobs', 'Tâches en arrière-plan'],
  'Model AI': ['AI model', 'KI-Modell', 'Modèle IA'],
  'Generare texte': ['Text generation', 'Textgenerierung', 'Génération de textes'],
  '201 Creat · 84 ms': ['201 Created · 84 ms', '201 Created · 84 ms', '201 Created · 84 ms'],
  Abonamente: ['Subscriptions', 'Abonnements', 'Abonnements'],
  'Plăți recurente active': ['Active recurring payments', 'Aktive wiederkehrende Zahlungen', 'Paiements récurrents actifs'],
  'Venit lunar recurent (MRR)': ['Monthly recurring revenue (MRR)', 'Monatlich wiederkehrender Umsatz (MRR)', 'Revenu mensuel récurrent (MRR)'],
  '0 lei': ['€0', '0 €', '0 €'],
  '+18% față de luna trecută': ['+18% vs last month', '+18 % ggü. Vormonat', '+18 % par rapport au mois dernier'],
  '99 lei / lună · 500 credite': ['€19 / month · 500 credits', '19 € / Monat · 500 Credits', '19 € / mois · 500 crédits'],
  '142 de magazine': ['142 stores', '142 Shops', '142 boutiques'],
  '249 lei / lună · 2.000 credite': ['€49 / month · 2,000 credits', '49 € / Monat · 2.000 Credits', '49 € / mois · 2 000 crédits'],
  'Cel mai ales': ['Most popular', 'Am beliebtesten', 'Le plus choisi'],
  '198 de magazine': ['198 stores', '198 Shops', '198 boutiques'],
  '499 lei / lună · 5.000 credite': ['€99 / month · 5,000 credits', '99 € / Monat · 5.000 Credits', '99 € / mois · 5 000 crédits'],
  '56 de magazine': ['56 stores', '56 Shops', '56 boutiques'],
  'Card •••• 4821 · plată recurentă': ['Card •••• 4821 · recurring payment', 'Karte •••• 4821 · wiederkehrende Zahlung', 'Carte •••• 4821 · paiement récurrent'],
  'Următoarea plată: 1 noiembrie · factură emisă automat': [
    'Next payment: 1 November · invoice issued automatically',
    'Nächste Zahlung: 1. November · Rechnung automatisch erstellt',
    'Prochain paiement : 1er novembre · facture émise automatiquement',
  ],
  'Performanță și scalare': ['Performance and scaling', 'Leistung und Skalierung', 'Performance et mise à l’échelle'],
  'Toate sistemele funcționează': ['All systems operational', 'Alle Systeme laufen', 'Tous les systèmes fonctionnent'],
  Uptime: ['Uptime', 'Uptime', 'Disponibilité'],
  'Timp de răspuns': ['Response time', 'Antwortzeit', 'Temps de réponse'],
  'Utilizatori activi': ['Active users', 'Aktive Nutzer', 'Utilisateurs actifs'],
  'Trafic · ultimele 60 de minute': ['Traffic · last 60 minutes', 'Traffic · letzte 60 Minuten', 'Trafic · 60 dernières minutes'],
  'Vârf de trafic ×4': ['Traffic spike ×4', 'Traffic-Spitze ×4', 'Pic de trafic ×4'],
  'Instanțe server': ['Server instances', 'Server-Instanzen', 'Instances serveur'],
  'Scalare automată': ['Auto-scaling', 'Automatische Skalierung', 'Mise à l’échelle auto'],
  'Nod 1': ['Node 1', 'Knoten 1', 'Nœud 1'],
  'Nod 2': ['Node 2', 'Knoten 2', 'Nœud 2'],
  'Nod 3': ['Node 3', 'Knoten 3', 'Nœud 3'],
  'Nod 4': ['Node 4', 'Knoten 4', 'Nœud 4'],
  'Nod 5': ['Node 5', 'Knoten 5', 'Nœud 5'],
  'Nod 6': ['Node 6', 'Knoten 6', 'Nœud 6'],
  '83.817 lei': ['€16,763', '16.763 €', '16 763 €'],
  '84.300 lei': ['€16,860', '16.860 €', '16 860 €'],
  // cifrele din dashboard, daca raman scrise in pagina
  '1.248': ['1,248', '1.248', '1 248'],
  '3.560': ['3,560', '3.560', '3 560'],
  '4.177': ['4,177', '4.177', '4 177'],
  '12.480': ['12,480', '12.480', '12 480'],
};

type Dinamic = { email: string; mrr: [number, number]; instante: (n: number) => string };

export const DINAMIC: Record<Limba, Dinamic> = {
  ro: { email: 'contact@magazinul-tau.ro', mrr: [71200, 84300], instante: (n) => n + ' instanțe active' + (n === 6 ? ' · trafic distribuit automat' : '') },
  en: { email: 'contact@yourstore.com', mrr: [14240, 16860], instante: (n) => n + ' active instances' + (n === 6 ? ' · traffic balanced automatically' : '') },
  de: { email: 'kontakt@deinshop.de', mrr: [14240, 16860], instante: (n) => n + ' aktive Instanzen' + (n === 6 ? ' · Traffic automatisch verteilt' : '') },
  fr: { email: 'contact@votreboutique.fr', mrr: [14240, 16860], instante: (n) => n + ' instances actives' + (n === 6 ? ' · trafic réparti automatiquement' : '') },
};

/** Un numar intreg cu separatorul de mii al limbii (1.248, 1,248, 1 248). */
export function intreg(lang: Limba, v: number) {
  const s = Math.round(v).toString();
  const sep = lang === 'en' ? ',' : lang === 'fr' ? ' ' : '.';
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

/** Procentul de uptime (99,98% / 99.98% / 99,98 %). */
export function procent(lang: Limba, v: number) {
  const s = v.toFixed(2);
  if (lang === 'en') return s + '%';
  return s.replace('.', ',') + (lang === 'fr' ? ' %' : '%');
}
