import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  covers as initialCovers, 
  pricingTiers as initialPricingTiers, 
  faqs as initialFaqs, 
  booktrailers as initialBooktrailers 
} from '../data/content';

export const DEFAULT_SITE_CONFIG = {
  covers: initialCovers || [],
  pricingTiers: initialPricingTiers || [],
  faqs: initialFaqs || [],
  booktrailers: initialBooktrailers || [],
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
  const [covers, setCovers] = useState<any[]>(Array.isArray(initialCovers) ? initialCovers : []);
  const [pricingTiers, setPricingTiers] = useState<any[]>(Array.isArray(initialPricingTiers) ? initialPricingTiers : []);
  const [faqs, setFaqs] = useState<any[]>(Array.isArray(initialFaqs) ? initialFaqs : []);
  const [booktrailers, setBooktrailers] = useState<any[]>(Array.isArray(initialBooktrailers) ? initialBooktrailers : []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchRemoteData = async () => {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          if (data && isMounted) {
            if (Array.isArray(data.covers) && data.covers.length > 0) setCovers(data.covers);
            if (Array.isArray(data.pricingTiers) && data.pricingTiers.length > 0) setPricingTiers(data.pricingTiers);
            if (Array.isArray(data.faqs) && data.faqs.length > 0) setFaqs(data.faqs);
            if (Array.isArray(data.booktrailers) && data.booktrailers.length > 0) setBooktrailers(data.booktrailers);
          }
        }
      } catch (err) {
        console.warn('Cargando valores por defecto...');
      }
    };

    fetchRemoteData();
    return () => { isMounted = false; };
  }, []);

  const saveToVercelBlob = async (updatedData: Record<string, any>) => {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
    } catch (err) {
      console.error('Error al guardar en Vercel Blob:', err);
    }
  };

  const updateCovers = (newCovers: any[]) => {
    setCovers(newCovers);
    saveToVercelBlob({ covers: newCovers, pricingTiers, faqs, booktrailers });
  };

  const updatePricingTiers = (newTiers: any[]) => {
    setPricingTiers(newTiers);
    saveToVercelBlob({ covers, pricingTiers: newTiers, faqs, booktrailers });
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
    const safeCovers = Array.isArray(initialCovers) ? initialCovers : [];
    const safePricing = Array.isArray(initialPricingTiers) ? initialPricingTiers : [];
    const safeFaqs = Array.isArray(initialFaqs) ? initialFaqs : [];
    const safeTrailers = Array.isArray(initialBooktrailers) ? initialBooktrailers : [];

    setCovers(safeCovers);
    setPricingTiers(safePricing);
    setFaqs(safeFaqs);
    setBooktrailers(safeTrailers);
    saveToVercelBlob({
      covers: safeCovers,
      pricingTiers: safePricing,
      faqs: safeFaqs,
      booktrailers: safeTrailers,
    });
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
    return {
      siteConfig: DEFAULT_SITE_CONFIG,
      covers: DEFAULT_SITE_CONFIG.covers,
      pricingTiers: DEFAULT_SITE_CONFIG.pricingTiers,
      faqs: DEFAULT_SITE_CONFIG.faqs,
      booktrailers: DEFAULT_SITE_CONFIG.booktrailers,
      updateCovers: () => {},
      updatePricingTiers: () => {},
      updateFaqs: () => {},
      updateBooktrailers: () => {},
      resetToDefaults: () => {},
      isLoading: false,
    };
  }
  return context;
};