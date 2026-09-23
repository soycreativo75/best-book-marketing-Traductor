import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteConfig,
  PortfolioCover,
  TestimonialItem,
  BooktrailerItem,
  ServiceItem,
  FAQItem,
  LeadSubmission,
  SectionsVisibility,
} from '../types';
import {
  PORTFOLIO_COVERS,
  TESTIMONIALS_DATA,
  BOOKTRAILERS_DATA,
  SERVICES_DATA,
  INITIAL_FAQS,
} from '../data/content';
import { Language, TRANSLATIONS, Translations } from '../utils/i18n';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  // Logotipos y Favicon
  logoWhiteUrl: '',
  logoBlackUrl: '',
  logoUseCustomOnly: false,
  faviconUrl: '',

  // Configuración de Apariencia e Idioma por defecto
  defaultTheme: 'dark',
  defaultLanguage: 'es',
  enableLanguageSwitch: true,

  // Textos Legales y Confidencialidad Personalizables
  privacyNoticeTitle: 'Aviso de Confidencialidad y Protección de Manuscritos',
  privacyNoticeContent: '',
  termsConditionsTitle: 'Términos y Condiciones de Servicio Editorial',
  termsConditionsContent: '',

  // Hero Textos
  heroBadge: 'Agencia Nº 1 en Lanzamientos KDP & Bestsellers',
  heroTitleLine1: 'Lanza tu Libro en Amazon KDP y Conviértelo en',
  heroTitleHighlight: 'Bestseller Internacional',
  heroSubtitle:
    'Diseño de portadas cinematográficas, maquetación de imprenta de lujo y estrategias de posicionamiento para que tu libro lidere su categoría en Amazon.',
  heroCtaText: 'Comenzar Mi Proyecto',
  heroSecondaryCtaText: 'Calcular Mis Regalías',

  // Estadísticas Hero
  statsTopBooks: '+180',
  statsRoyalties: '100%',
  statsRating: '4.9 / 5',

  // Contacto & Información
  whatsappNumber: '+34612345678',
  whatsappMessage:
    'Hola, me gustaría información para publicar y posicionar mi libro en Amazon KDP con Best Book Marketing.',
  contactEmail: 'soycreativo2023@gmail.com',
  notificationEmail: 'soycreativo2023@gmail.com', // Correo receptor principal
  contactPhone: '+34 910 000 000',
  officeAddress: 'Paseo de la Castellana 95, Planta 14, 28046 Madrid, España',
  businessHours: 'Lunes a Viernes: 09:00 - 19:00 (CET / Madrid)',
  instagramUrl: 'https://instagram.com',
  linkedinUrl: 'https://linkedin.com',
  youtubeUrl: 'https://youtube.com',

  // Precios y Planes
  planStarterPrice: 490,
  planProPrice: 890,
  planElitePrice: 1490,
  planStarterTitle: 'Lanzamiento Esencial KDP',
  planProTitle: 'Bestseller Authority Pro',
  planEliteTitle: 'Campaña Integral 360',

  // Imágenes personalizadas para el libro 3D del Hero (vacías por defecto)
  heroBookCustomCoverImage: '',
  heroBookCustomBackCoverImage: '',
  heroBookCustomSpineImage: '',

  // Secciones Activas / Apagadas
  sectionsVisibility: {
    hero: true,
    portfolioCovers: true,
    services: true,
    booktrailers: true,
    royaltyCalculator: true,
    testimonials: true,
    pricing: true,
    contact: true,
    footer: true,
  },

  // Contenidos dinámicos administrables
  portfolioCovers: PORTFOLIO_COVERS,
  testimonials: TESTIMONIALS_DATA,
  booktrailers: BOOKTRAILERS_DATA,
  services: SERVICES_DATA,
  faqs: INITIAL_FAQS,

  // Bandeja de Leads inicial
  leadsInbox: [
    {
      id: 'lead-sample-1',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      source: 'contact_form',
      name: 'Gabriel Morales',
      email: 'g.morales@ejemplo.com',
      phone: '+34 654 321 098',
      genre: 'No-Ficción / Negocios',
      manuscriptStatus: 'Manuscrito Terminado',
      message: 'Busco publicar mi libro de finanzas para pymes en tapa blanda y digital antes de fin de año.',
      status: 'new',
    },
  ],
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  resetConfig: () => void;
  // Idioma
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  updateCustomTranslations: (lang: Language, newTranslations: Partial<Translations>) => void;
  resetCustomTranslations: (lang?: Language) => void;
  // Toggles de secciones
  toggleSection: (sectionKey: keyof SectionsVisibility) => void;
  // Leads Inbox
  addLead: (lead: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadSubmission['status']) => void;
  deleteLead: (id: string) => void;
  clearAllLeads: () => void;
  // Portadas
  addOrUpdateCover: (cover: PortfolioCover) => void;
  deleteCover: (id: number) => void;
  // Testimonios
  addOrUpdateTestimonial: (testimonial: TestimonialItem) => void;
  deleteTestimonial: (id: number) => void;
  // Booktrailers
  addOrUpdateBooktrailer: (trailer: BooktrailerItem) => void;
  deleteBooktrailer: (id: number) => void;
  // Servicios
  addOrUpdateService: (service: ServiceItem) => void;
  deleteService: (id: number) => void;
  // FAQs
  addOrUpdateFaq: (faq: FAQItem) => void;
  deleteFaq: (id: string) => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

const STORAGE_KEY = 'bbm_site_configuration_v3';

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          sectionsVisibility: {
            ...DEFAULT_SITE_CONFIG.sectionsVisibility,
            ...(parsed.sectionsVisibility || {}),
          },
          portfolioCovers: parsed.portfolioCovers || DEFAULT_SITE_CONFIG.portfolioCovers,
          testimonials: parsed.testimonials || DEFAULT_SITE_CONFIG.testimonials,
          booktrailers: parsed.booktrailers || DEFAULT_SITE_CONFIG.booktrailers,
          services: parsed.services || DEFAULT_SITE_CONFIG.services,
          faqs: parsed.faqs || DEFAULT_SITE_CONFIG.faqs,
          leadsInbox: parsed.leadsInbox || DEFAULT_SITE_CONFIG.leadsInbox,
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SITE_CONFIG;
  });

  // Actualización reactiva del Favicon en el documento
  React.useEffect(() => {
    try {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      if (config.faviconUrl && config.faviconUrl.trim() !== '') {
        link.href = config.faviconUrl;
      } else {
        // Favicon SVG predeterminado con logo rojo BBM
        link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="%23D62828"/><path d="M7 8h8a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H7V8z" fill="white" opacity="0.95"/><path d="M25 8h-8a4 4 0 0 0-4 4v12a4 4 0 0 1 4-4h8V8z" fill="white" opacity="0.75"/></svg>';
      }
    } catch (e) {
      console.warn('Favicon injection error:', e);
    }
  }, [config.faviconUrl]);

  const saveToStorage = (updated: SiteConfig) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving config to localStorage:', err);
    }
  };

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      saveToStorage(updated);
      return updated;
    });
  };

  const resetConfig = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setConfig(DEFAULT_SITE_CONFIG);
  };

  const toggleSection = (sectionKey: keyof SectionsVisibility) => {
    setConfig((prev) => {
      const updated: SiteConfig = {
        ...prev,
        sectionsVisibility: {
          ...prev.sectionsVisibility,
          [sectionKey]: !prev.sectionsVisibility[sectionKey],
        },
      };
      saveToStorage(updated);
      return updated;
    });
  };

  const addLead = (leadData: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>) => {
    const newLead: LeadSubmission = {
      ...leadData,
      id: 'lead-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    setConfig((prev) => {
      const updated: SiteConfig = {
        ...prev,
        leadsInbox: [newLead, ...(prev.leadsInbox || [])],
      };
      saveToStorage(updated);
      return updated;
    });

    // Envío real de notificación por correo mediante FormSubmit seguro
    try {
      const recipient = config.notificationEmail || 'soycreativo2023@gmail.com';
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[Nuevo Lead Best Book Marketing] - ${newLead.name}`,
          nombre: newLead.name,
          email: newLead.email,
          telefono: newLead.phone || 'No indicado',
          genero_o_proyecto: newLead.genre || 'No indicado',
          estado_manuscrito: newLead.manuscriptStatus || 'No indicado',
          origen: newLead.source === 'contact_form' ? 'Formulario de Contacto Web' : 'Modal de Sesión Estratégica',
          mensaje: newLead.message || 'Sin mensaje adicional',
          fecha: new Date().toLocaleString(),
          _template: 'table',
        }),
      }).catch((err) => {
        console.warn('Background FormSubmit notice:', err);
      });
    } catch (err) {
      console.warn('Lead submission network notice:', err);
    }
  };

  const updateLeadStatus = (id: string, status: LeadSubmission['status']) => {
    setConfig((prev) => {
      const updated: SiteConfig = {
        ...prev,
        leadsInbox: prev.leadsInbox.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
      };
      saveToStorage(updated);
      return updated;
    });
  };

  const deleteLead = (id: string) => {
    setConfig((prev) => {
      const updated: SiteConfig = {
        ...prev,
        leadsInbox: prev.leadsInbox.filter((lead) => lead.id !== id),
      };
      saveToStorage(updated);
      return updated;
    });
  };

  const clearAllLeads = () => {
    setConfig((prev) => {
      const updated: SiteConfig = {
        ...prev,
        leadsInbox: [],
      };
      saveToStorage(updated);
      return updated;
    });
  };

  // CRUD Portadas
  const addOrUpdateCover = (cover: PortfolioCover) => {
    setConfig((prev) => {
      const exists = prev.portfolioCovers.some((c) => c.id === cover.id);
      const updatedCovers = exists
        ? prev.portfolioCovers.map((c) => (c.id === cover.id ? cover : c))
        : [...prev.portfolioCovers, cover];
      const updated: SiteConfig = { ...prev, portfolioCovers: updatedCovers };
      saveToStorage(updated);
      return updated;
    });
  };

  const deleteCover = (id: number) => {
    setConfig((prev) => {
      const updated: SiteConfig = {
        ...prev,
        portfolioCovers: prev.portfolioCovers.filter((c) => c.id !== id),
      };
      saveToStorage(updated);
      return updated;
    });
  };

  // CRUD Testimonios
  const addOrUpdateTestimonial = (testimonial: TestimonialItem) => {
    setConfig((prev) => {
      const exists = prev.testimonials.some((t) => t.id === testimonial.id);
      const updatedItems = exists
        ? prev.testimonials.map((t) => (t.id === testimonial.id ? testimonial : t))
        : [...prev.testimonials, testimonial];
      const updated: SiteConfig = { ...prev, testimonials: updatedItems };
      saveToStorage(updated);
      return updated;
    });
  };

  const deleteTestimonial = (id: number) => {
    setConfig((prev) => {
      const updated: SiteConfig = {
        ...prev,
        testimonials: prev.testimonials.filter((t) => t.id !== id),
      };
      saveToStorage(updated);
      return updated;
    });
  };

  // CRUD Booktrailers
  const addOrUpdateBooktrailer = (trailer: BooktrailerItem) => {
    setConfig((prev) => {
      const exists = prev.booktrailers.some((b) => b.id === trailer.id);
      const updatedItems = exists
        ? prev.booktrailers.map((b) => (b.id === trailer.id ? trailer : b))
        : [...prev.booktrailers, trailer];
      const updated: SiteConfig = { ...prev, booktrailers: updatedItems };
      saveToStorage(updated);
      return updated;
    });
  };

  const deleteBooktrailer = (id: number) => {
    setConfig((prev) => {
      const updated: SiteConfig = {
        ...prev,
        booktrailers: prev.booktrailers.filter((b) => b.id !== id),
      };
      saveToStorage(updated);
      return updated;
    });
  };

  // CRUD Servicios
  const addOrUpdateService = (service: ServiceItem) => {
    setConfig((prev) => {
      const exists = prev.services.some((s) => s.id === service.id);
      const updatedItems = exists
        ? prev.services.map((s) => (s.id === service.id ? service : s))
        : [...prev.services, service];
      const updated: SiteConfig = { ...prev, services: updatedItems };
      saveToStorage(updated);
      return updated;
    });
  };

  const deleteService = (id: number) => {
    setConfig((prev) => {
      const updated: SiteConfig = {
        ...prev,
        services: prev.services.filter((s) => s.id !== id),
      };
      saveToStorage(updated);
      return updated;
    });
  };

  // CRUD FAQs
  const addOrUpdateFaq = (faq: FAQItem) => {
    setConfig((prev) => {
      const exists = prev.faqs.some((f) => f.id === faq.id);
      const updatedItems = exists
        ? prev.faqs.map((f) => (f.id === faq.id ? faq : f))
        : [...prev.faqs, faq];
      const updated: SiteConfig = { ...prev, faqs: updatedItems };
      saveToStorage(updated);
      return updated;
    });
  };

  const deleteFaq = (id: string) => {
    setConfig((prev) => {
      const updated: SiteConfig = {
        ...prev,
        faqs: prev.faqs.filter((f) => f.id !== id),
      };
      saveToStorage(updated);
      return updated;
    });
  };

  // Gestión de Idioma
  const [language, setLanguageState] = useState<Language>(() => {
    return (config.defaultLanguage as Language) || 'es';
  });

  // Si cambia el defaultLanguage en config, sincronizar
  useEffect(() => {
    if (config.defaultLanguage && (config.defaultLanguage === 'es' || config.defaultLanguage === 'en')) {
      setLanguageState(config.defaultLanguage);
    }
  }, [config.defaultLanguage]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const updateCustomTranslations = (lang: Language, newTranslations: Partial<Translations>) => {
    setConfig((prev) => {
      const existing = prev.customTranslations?.[lang] || {};
      const updated = {
        ...prev,
        customTranslations: {
          ...prev.customTranslations,
          [lang]: {
            ...existing,
            ...newTranslations,
          },
        },
      };
      saveToStorage(updated);
      return updated;
    });
  };

  const resetCustomTranslations = (lang?: Language) => {
    setConfig((prev) => {
      let updatedCustom = { ...(prev.customTranslations || {}) };
      if (lang) {
        delete updatedCustom[lang];
      } else {
        updatedCustom = {};
      }
      const updated: SiteConfig = {
        ...prev,
        customTranslations: updatedCustom,
      };
      saveToStorage(updated);
      return updated;
    });
  };

  const baseTranslations = TRANSLATIONS[language] || TRANSLATIONS.es;
  const customForLang = (config.customTranslations?.[language] as Partial<Translations>) || {};
  const t: Translations = {
    ...baseTranslations,
    ...customForLang,
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        language,
        setLanguage,
        t,
        updateCustomTranslations,
        resetCustomTranslations,
        toggleSection,
        addLead,
        updateLeadStatus,
        deleteLead,
        clearAllLeads,
        addOrUpdateCover,
        deleteCover,
        addOrUpdateTestimonial,
        deleteTestimonial,
        addOrUpdateBooktrailer,
        deleteBooktrailer,
        addOrUpdateService,
        deleteService,
        addOrUpdateFaq,
        deleteFaq,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
