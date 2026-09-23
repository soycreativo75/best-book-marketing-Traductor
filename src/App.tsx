import React from 'react';
import { SiteConfigProvider } from './context/SiteConfigContext';
import { HeaderAndFooter } from './components/HeaderAndFooter';
import { PortadasCarousel } from './components/PortadasCarousel';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { BooktrailersGallery } from './components/BooktrailersGallery';
import { PricingAndContact } from './components/PricingAndContact';
import { RoyaltyCalculator } from './components/RoyaltyCalculator';

export default function App() {
  return (
    <SiteConfigProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
        <HeaderAndFooter>
          <main className="flex-grow">
            {/* Carrusel de Portadas Destacadas */}
            <PortadasCarousel />

            {/* Sección de Servicios */}
            <ServicesSection />

            {/* Calculadora de Regalías KDP */}
            <RoyaltyCalculator />

            {/* Galería de Booktrailers */}
            <BooktrailersGallery />

            {/* Testimonios de Autores */}
            <TestimonialsCarousel />

            {/* Precios y Formulario de Contacto */}
            <PricingAndContact />
          </main>
        </HeaderAndFooter>
      </div>
    </SiteConfigProvider>
  );
}