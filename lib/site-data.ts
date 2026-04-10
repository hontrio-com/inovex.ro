import { readData } from './data-layer';

export interface FaqItem       { id: string; q: string; a: string; }
export interface TestimonialItem { id: string; clientName: string; clientRole: string; company: string; rating: number; quote: string; }
export interface PortfolioItem { id: string; titlu: string; categorie: string; descriere: string; tags: string[]; link: string; imagine: string; accentColor: string; }
export interface ProcessStep   { id: string; numar: string; iconName: string; titlu: string; descriere: string; }
export interface ServiceFeatureJSON { iconName: string; label: string; desc: string; }
export interface ServiceRowJSON {
  id: string; iconName: string; eyebrow: string;
  headlinePlain: string; headlineBold: string; subtitle: string;
  features: ServiceFeatureJSON[];
  badge: string; badgeColor: string; ctaText: string; ctaHref: string; detailsHref: string;
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return (await readData<FaqItem[]>('faq')) ?? [];
}
export async function getTestimonials(): Promise<TestimonialItem[]> {
  return (await readData<TestimonialItem[]>('testimonials')) ?? [];
}
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  return (await readData<PortfolioItem[]>('portfolio')) ?? [];
}
export async function getProcessSteps(): Promise<ProcessStep[]> {
  return (await readData<ProcessStep[]>('process')) ?? [];
}
export async function getServices(): Promise<ServiceRowJSON[]> {
  return (await readData<ServiceRowJSON[]>('services')) ?? [];
}
