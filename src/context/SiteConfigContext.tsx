import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  covers as initialCovers, 
  pricingTiers as initialPricingTiers, 
  faqs as initialFaqs, 
  booktrailers as initialBooktrailers 
} from '../data/content';

export const DEFAULT_SITE_CONFIG = {
  covers: initialCovers,
  pricingTiers: initialPricingTiers,
  faqs: initialFaqs,
  booktrailers: initialBooktrailers,
};

interface SiteConfigContextType {
  siteConfig: typeof DEFAULT_SITE_CONFIG;
  covers: any[];
  pricingTiers: any[];
  faqs: any[];
  booktrailers: any[];
  updateCovers: (newCovers: any[]) => void;
  updatePricingTiers: (newTiers: any[]) => void;
  updateFaqs: (newFaqs: any[]) => void;
  updateBooktrailers: (newTrailers: any[]) => void;
  resetToDefaults: () => void;
  isLoading: boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [covers, setCovers] = useState<any[]>(initialCovers);
  const [pricingTiers, setPricingTiers] = useState<any[]>(initialPricingTiers);
  const [faqs, setFaqs] = useState<any[]>(initialFaqs);
  const [booktrailers, setBooktrailers] = useState<any[]>(initialBooktrailers);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Cargar datos remotos respetando el fallback local si la nube está vacía
  useEffect(() => {
    const fetchRemoteData = async () => {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === 'object') {
            if (Array.isArray(data.covers) && data.covers.length > 0) setCovers(data.covers);
            if (Array.isArray(data.pricingTiers) && data.pricingTiers.length > 0) setPricingTiers(data.pricingTiers);
            if (Array.isArray(data.faqs) && data.faqs.length > 0) setFaqs(data.faqs);
            if (Array.isArray(data.booktrailers) && data.booktrailers.length > 0) setBooktrailers(data.booktrailers);
          }
        }
      } catch {
        console.warn('Cargando valores predeterminados locales...');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemoteData();
  }, []);

  const saveToVercelBlob = async (updatedData: Record<string, any>) => {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
    } catch (err) {
      console.error('Error al sincronizar con Vercel Blob:', err);
    }
  };

  const updateCovers = (newCovers: any[]) => {
    setCovers(newCovers);
    saveToVercelBlob({ covers: newCovers, pricingTiers, faqs, booktrailers });
  };

  const updatePricingTiers = (newTiers: any[]) => {
    setPricingTiers(newTiers);
    saveToVercelBlob({ covers, pricingTiers: newTiers, faqs: newTiers, booktrailers });
  };

  const updateFaqs = (newFaqs: any[]) => {
    setFaqs(newFaqs);
    saveToVercelBlob({ covers, pricingTiers, faqs: newFaqs, booktrailers });
  };

  const updateBooktrailers = (newTrailers: any[]) => {
    setBooktrailers(newTrailers);
    saveToVercelBlob({ covers, pricingTiers, faqs, booktrailers: newTrailers });
  };

  const resetToDefaults = () => {
    setCovers(initialCovers);
    setPricingTiers(initialPricingTiers);
    setFaqs(initialFaqs);
    setBooktrailers(initialBooktrailers);
    saveToVercelBlob(DEFAULT_SITE_CONFIG);
  };

  const siteConfig = {
    covers,
    pricingTiers,
    faqs,
    booktrailers,
  };

  return (
    <SiteConfigContext.Provider
      value={{
        siteConfig,
        covers,
        pricingTiers,
        faqs,
        booktrailers,
        updateCovers,
        updatePricingTiers,
        updateFaqs,
        updateBooktrailers,
        resetToDefaults,
        isLoading,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig debe ser usado dentro de SiteConfigProvider');
  }
  return context;
};