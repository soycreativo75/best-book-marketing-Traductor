export type ThemeMode = 'dark' | 'light';

export type AppPage = 'home' | 'privacy' | 'terms' | 'faqs' | 'admin';

export type BookGenre = 'business' | 'fiction' | 'wellness';

export interface SectionsVisibility {
  hero: boolean;
  portfolioCovers: boolean;
  services: boolean;
  booktrailers: boolean;
  royaltyCalculator: boolean;
  testimonials: boolean;
  pricing: boolean;
  contact: boolean;
  footer: boolean;
}

export interface LeadSubmission {
  id: string;
  createdAt: string;
  source: 'contact_form' | 'booking_modal';
  name: string;
  email: string;
  phone?: string;
  genre?: string;
  manuscriptStatus?: string;
  message?: string;
  status: 'new' | 'contacted' | 'completed';
}

export interface SiteConfig {
  // Logotipos y Favicon
  logoWhiteUrl?: string; // Data URL or image path for dark background
  logoBlackUrl?: string; // Data URL or image path for light background
  logoUseCustomOnly?: boolean;
  faviconUrl?: string; // Icono de la pestaña del navegador

  // Textos Principales del Hero
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroSecondaryCtaText: string;

  // Estadísticas Hero
  statsTopBooks: string;
  statsRoyalties: string;
  statsRating: string;

  // Información General & Contacto
  whatsappNumber: string;
  whatsappMessage: string;
  contactEmail: string;
  notificationEmail: string; // Correo receptor de leads y formularios (soycreativo2023@gmail.com)
  contactPhone: string;
  officeAddress: string;
  businessHours: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;

  // Configuración de Apariencia e Idioma por defecto
  defaultTheme?: 'dark' | 'light';
  defaultLanguage?: 'es' | 'en';
  enableLanguageSwitch?: boolean;
  customTranslations?: {
    es?: Record<string, string>;
    en?: Record<string, string>;
  };

  // Textos Legales y Confidencialidad Personalizables
  privacyNoticeTitle?: string;
  privacyNoticeContent?: string;
  termsConditionsTitle?: string;
  termsConditionsContent?: string;

  // Precios y Planes
  planStarterPrice: number;
  planProPrice: number;
  planElitePrice: number;
  planStarterTitle: string;
  planProTitle: string;
  planEliteTitle: string;

  // Imágenes personalizadas para el libro 3D del Hero (opcional)
  heroBookCustomCoverImage?: string;
  heroBookCustomBackCoverImage?: string;
  heroBookCustomSpineImage?: string;

  // Control de Secciones (Apagar / Encender Secciones)
  sectionsVisibility: SectionsVisibility;

  // Contenido dinámico administrable
  portfolioCovers: PortfolioCover[];
  testimonials: TestimonialItem[];
  booktrailers: BooktrailerItem[];
  services: ServiceItem[];
  faqs: FAQItem[];

  // Bandeja de Leads recibidos
  leadsInbox: LeadSubmission[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'kdp' | 'diseno' | 'tramites' | 'marketing' | 'precios';
}

export interface BookPreset {
  id: BookGenre;
  label: string;
  title: string;
  subtitle: string;
  category: string;
  gradient: string;
  accentColor: string;
  badge: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  tagline: string;
  iconName: string;
  desc: string;
  features: string[];
  deliverables: string;
}

export interface PortfolioCover {
  id: number;
  title: string;
  genre: string;
  sales: string;
  imageUrl?: string;
  bgGradient: string;
  accentColor: string;
  bestsellerRank: string;
}

export interface BooktrailerItem {
  id: number;
  title: string;
  genre: string;
  duration: string;
  synopsis: string;
  thumbnail: string;
  videoPlaceholderTag: string;
  directorNote: string;
  views: string;
  youtubeUrl?: string; // Enlace o ID de YouTube funcional
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  book: string;
  metric: string;
  copies: string;
  quote: string;
  avatar: string;
  rating: number;
}
