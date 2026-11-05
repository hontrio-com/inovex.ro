import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Lock } from 'lucide-react';
import type { MarketplaceProduct } from '@/types/marketplace';
import { ETICHETE_CATEGORII } from './etichete';
import styles from './ProductCard.module.css';

/* Cardul unui produs din marketplace, in stilul portofoliului de pe prima pagina (2026-10-29): sus,
   pe fundalul gri granulat, o fereastra de browser cu imaginea produsului (daca are una incarcata) sau
   o schita de pagina; dedesubt numele, descrierea, tehnologiile si pretul. Tot cardul duce la pagina
   produsului; „Demo live” deschide demo-ul intr-o fila noua. */

interface Props {
  product: MarketplaceProduct;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: Props) {
  const technologies = product.techSpecs?.technologies ?? [];
  const pills = technologies.slice(0, 3);
  const extraPills = technologies.length - 3;
  // doar imaginile incarcate din admin (adrese complete); cele din datele locale nu exista in /public
  const imagine = product.mainImage?.startsWith('http') ? product.mainImage : null;
  const adresa = product.demoUrl ? product.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'inovex.ro';

  return (
    <article className={styles.card} data-vandut={product.isSold || undefined}>
      <div className={styles.vizual}>
        <div className={styles.fereastra} aria-hidden>
          <div className={styles.bara}>
            <span className={styles.butoane}>
              <i />
              <i />
              <i />
            </span>
            <span className={styles.adresa}>{adresa}</span>
          </div>
          <div className={styles.captura}>
            {imagine ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagine} alt="" loading="lazy" />
            ) : (
              <div className={styles.schita}>
                <span className={styles.schitaNav} />
                <span className={styles.schitaTitlu} />
                <span className={styles.schitaText} />
                <span className={styles.schitaButon} />
                <span className={styles.schitaGrila}>
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            )}
          </div>
        </div>

        <span className={styles.categorie}>{ETICHETE_CATEGORII[product.category]}</span>
        {product.isExclusive && !product.isSold ? (
          <span className={styles.eticheta}>
            <Lock aria-hidden />
            Exclusiv
          </span>
        ) : product.badge && !product.isSold ? (
          <span className={styles.eticheta}>{product.badge}</span>
        ) : null}

        {product.isSold && (
          <div className={styles.vandut}>
            <Lock aria-hidden />
            <p>Acest produs a fost vândut</p>
          </div>
        )}
      </div>

      <div className={styles.text}>
        <p className={styles.platforma}>{product.platform}</p>
        <h3 className={styles.nume}>
          {/* linkul acopera tot cardul (vezi ::after in css) */}
          <Link href={`/marketplace/${product.slug}`} className={styles.link}>
            {product.title}
          </Link>
        </h3>
        <p className={styles.descriere}>{product.description}</p>

        {!compact && pills.length > 0 && (
          <ul className={styles.tehnologii} aria-label="Tehnologii">
            {pills.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
            {extraPills > 0 && <li>+{extraPills}</li>}
          </ul>
        )}

        <div className={styles.jos}>
          {product.isSold ? (
            <>
              <span className={styles.indisponibil}>Indisponibil</span>
              <Link href="/oferta" className={styles.similar}>
                Solicită similar
              </Link>
            </>
          ) : (
            <>
              <span className={styles.pret}>
                {product.price.toLocaleString('ro-RO')} <span>EUR</span>
              </span>
              <span className={styles.actiuni}>
                {product.demoUrl && (
                  <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.demo}>
                    <ExternalLink aria-hidden />
                    Demo live
                  </a>
                )}
                <span className={styles.sageata} aria-hidden>
                  <ArrowUpRight />
                </span>
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
