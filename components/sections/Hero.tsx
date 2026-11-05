import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CuvantRotativ } from './CuvantRotativ';
import styles from './Hero.module.css';

/* Hero in chenar (dupa exemplul Voiceflow dat de proprietar, 2026-10-17): un card alb cu colturi
   rotunjite, la --rama de marginile ecranului, pe fundal tot alb, cu contur si o rama subtire de
   sticla. Sus, antetul fix sta in el ca partea lui de sus; la derulare antetul se desprinde, iar
   chenarul urca pe sub el. */

// se schimba pe rand in pastila neagra din titlu
const SERVICII = ['magazine online', 'aplicații web', 'automatizări', 'website-uri de prezentare'];

// Clienti care ne recomanda, cu pozele lor de profil: logo-urile date de proprietar, intregi, cat de
// mari incap in patratel (in /imagini/hero/clienti, albe, la de 3 ori marimea lui).
const RECOMANDARI = [
  { nume: 'Stupina Vladilin', poza: '/imagini/hero/clienti/stupina-vladilin.webp' },
  { nume: 'Junior & Family Dental Clinics', poza: '/imagini/hero/clienti/junior-family.webp' },
  { nume: 'Panthera Med', poza: '/imagini/hero/clienti/panthera-med.webp' },
  { nume: 'Purarom', poza: '/imagini/hero/clienti/purarom.webp' },
  { nume: 'Sagra Handmade', poza: '/imagini/hero/clienti/sagra-handmade.webp' },
];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-titlu">
      <div className={styles.chenar}>
        <div className={styles.continut}>
          <h1 id="hero-titlu" className={styles.titlu}>
            {/* titlul intreg, pentru cititoarele de ecran si motoarele de cautare */}
            <span className={styles.ascuns}>
              Construim magazine online, aplicații web, automatizări și website-uri de prezentare care
              îți aduc clienți, nu doar trafic
            </span>{' '}
            {/* data-nosnippet: Google ia fragmentul din titlul de mai sus, nu din cuvintele pastilei */}
            <span className={styles.vizibil} aria-hidden data-nosnippet>
              <span className={styles.rand}>
                <span>Construim</span> <CuvantRotativ cuvinte={SERVICII} />
              </span>{' '}
              <span className={styles.continuare}>care îți aduc clienți, nu doar trafic</span>
            </span>
          </h1>

          <p className={styles.lead}>
            De la magazine online și <span className={styles.nowrap}>website-uri</span> de prezentare până la
            aplicații web și platforme SaaS, dezvoltăm soluții rapide, optimizate SEO și construite pentru
            conversii.
          </p>

          <div className={styles.actiuni}>
            <Link href="/oferta" className={styles.primar}>
              Solicită ofertă
              <ArrowRight aria-hidden />
            </Link>
            <Link href="/portofoliu" className={styles.secundar}>
              Vezi portofoliul
            </Link>
          </div>

          <div className={styles.dovada}>
            <ul className={styles.avatare} aria-label="Câțiva dintre clienții noștri">
              {RECOMANDARI.map((client) => (
                <li key={client.nume} title={client.nume}>
                  <Image src={client.poza} alt={client.nume} width={54} height={54} unoptimized loading="eager" />
                </li>
              ))}
            </ul>
            <div className={styles.dovadaText}>
              <div className={styles.stele} role="img" aria-label="Evaluare de 5 stele pe Google">
                {[0, 1, 2, 3, 4].map((k) => (
                  <Stea key={k} />
                ))}
                <LogoGoogle />
              </div>
              <p className={styles.recomandat}>
                Recomandați de <strong>peste 200 de afaceri</strong> din România
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stea() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

// „G”-ul Google in cele patru culori ale lui
function LogoGoogle() {
  return (
    <svg className={styles.google} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
