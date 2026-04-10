import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbJsonLd } from '@/lib/seo';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  const jsonLd = generateBreadcrumbJsonLd(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="breadcrumb"
        className={`flex items-center flex-wrap gap-1 text-sm ${className ?? ''}`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.url} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight size={13} className="text-[#8A94A6] shrink-0" />
              )}
              {isLast ? (
                <span className="text-[#0D1117] font-semibold">{item.name}</span>
              ) : (
                <Link
                  href={item.url}
                  className="text-[#4A5568] hover:text-[#0D1117] transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
