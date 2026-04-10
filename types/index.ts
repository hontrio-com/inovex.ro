// Tipuri globale pentru proiectul Inovex

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  featured: boolean;
  client?: string;
  liveUrl?: string;
  screenshot: string;
  gallery?: string[];
  description: string;
  challenge?: string;
  solution?: string;
  results?: string;
  features?: string[];
  technologies?: string[];
  industry?: string;
  publishedAt: string;
  order?: number;
}

export type ProjectCategory =
  | 'magazine-online'
  | 'website-prezentare'
  | 'aplicatie-web-saas'
  | 'cms-crm-erp'
  | 'aplicatie-mobila';

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  companyLogo?: string;
  rating: number;
  quote: string;
  projectRef?: string;
  approved: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  publishedAt: string;
  status: 'draft' | 'published';
  readTime?: number;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  icon: string;
}

// Tipuri pentru formulare
export interface ContactFormData {
  nume: string;
  email: string;
  telefon: string;
  companie?: string;
  mesaj: string;
  acordPrivacitate: boolean;
}

export interface OfertaFormData {
  tipEntitate: string;
  tipProiect: string[];
  industrie?: string;
  detalii: Record<string, string | boolean | number>;
  timeline: string;
  buget: string;
  nume: string;
  email: string;
  telefon: string;
  companie?: string;
  websiteExistent?: string;
  mesajAditional?: string;
  acordPrivacitate: boolean;
}
