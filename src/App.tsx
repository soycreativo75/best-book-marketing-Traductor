import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  X,
  Send,
  Star,
  Calculator,
  MessageCircle,
} from 'lucide-react';

import { ThemeMode, BookGenre, AppPage } from './types';
import {
  HERO_BOOK_PRESETS,
  SERVICES_DATA,
  PORTFOLIO_COVERS,
  BOOKTRAILERS_DATA,
  TESTIMONIALS_DATA,
} from './data/content';

import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import { Header, Footer } from './components/HeaderAndFooter';
import { BestBookLogo } from './components/BestBookLogo';
import { InteractiveBook3D } from './components/InteractiveBook3D';
import { PortadasCarousel } from './components/PortadasCarousel';
import { ServicesSection } from './components/ServicesSection';
import { BooktrailersGallery } from './components/BooktrailersGallery';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { RoyaltyCalculator } from './components/RoyaltyCalculator';
import { PricingAndContact } from './components/PricingAndContact';

import { AvisoConfidencialidadPage } from './components/pages/AvisoConfidencialidadPage';
import { CondicionesServicioPage } from './components/pages/CondicionesServicioPage';
import { FaqsPage } from './components/pages/FaqsPage';
import { AdminPanelPage } from './components/pages/AdminPanelPage';

function AppContent() {
  const { config, addLead, t, language } = useSiteConfig();

  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('bbm_user_theme_preference');
    if (saved === 'light' || saved === 'dark') return saved;
    return (config.defaultTheme as ThemeMode) || 'dark';
  });

  // Sincronizar tema directamente cuando el admin configure defaultTheme
  useEffect(() => {
    if (config.defaultTheme) {
      setTheme(config.defaultTheme as ThemeMode);
    }
  }, [config.defaultTheme]);

  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedGenre, setSelectedGenre] = useState<BookGenre>('business');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleSent, setScheduleSent] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    genero: 'Negocios & No-Ficción',
  });

  // Sincronización con el hash de la URL (#admin, #faqs, #privacidad, #terminos)
  useEffect(() => {
    // Si la página se abre inicialmente con #admin sin clic explícito, limpiar para mostrar la portada normal
    if (window.location.hash.toLowerCase() === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      setCurrentPage('home');
    }

    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin') setCurrentPage('admin');
      else if (hash === '#faqs') setCurrentPage('faqs');
      else if (hash === '#privacidad' || hash === '#confidencialidad') setCurrentPage('privacy');
      else if (hash === '#terminos' || hash === '#condiciones') setCurrentPage('terms');
      else if (hash === '' || hash === '#inicio') setCurrentPage('home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: AppPage) => {
    setCurrentPage(page);
    if (page === 'home') {
      window.location.hash = '';
    } else if (page === 'admin') {
      window.location.hash = 'admin';
    } else if (page === 'faqs') {
      window.location.hash = 'faqs';
    } else if (page === 'privacy') {
      window.location.hash = 'privacidad';
    } else if (page === 'terms') {
      window.location.hash = 'terminos';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('bbm_user_theme_preference', next);
      return next;
    });
  };

  const currentBook = HERO_BOOK_PRESETS[selectedGenre];

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleData.nombre || !scheduleData.email) return;

    // Guardar lead en el buzón central del panel de administración
    addLead({
      source: 'booking_modal',
      name: scheduleData.nombre,
      email: scheduleData.email,
      phone: scheduleData.whatsapp,
      genre: scheduleData.genero,
      manuscriptStatus: 'Solicitud de Asesoría 1-a-1',
      message: `Solicitud de Asesoría Editorial agendada para el género: ${scheduleData.genero}. Teléfono / WhatsApp: ${scheduleData.whatsapp || 'No proporcionado'}`,
    });

    setScheduleSent(true);
    setTimeout(() => {
      setScheduleSent(false);
      setIsScheduleModalOpen(false);
      setScheduleData({
        nombre: '',
        email: '',
        whatsapp: '',
        genero: 'Negocios & No-Ficción',
      });
    }, 4000);
  };

  // Vistas secundarias
  if (currentPage === 'admin') {
    return (
      <AdminPanelPage
        theme={theme}
        onNavigate={navigateTo}
        onToggleTheme={toggleTheme}
      />
    );
  }

  if (currentPage === 'faqs') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-[#F4F6F8] text-slate-900' : 'bg-[#080709] text-white'}`}>
        <Header
          theme={theme}
          currentPage={currentPage}
          toggleTheme={toggleTheme}
          onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
          onNavigate={navigateTo}
        />
        <main className="pt-24">
          <FaqsPage
            theme={theme}
            onNavigate={navigateTo}
            onOpenBooking={() => setIsScheduleModalOpen(true)}
          />
        </main>
        <Footer theme={theme} onNavigate={navigateTo} />
      </div>
    );
  }

  if (currentPage === 'privacy') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-[#F4F6F8] text-slate-900' : 'bg-[#080709] text-white'}`}>
        <Header
          theme={theme}
          currentPage={currentPage}
          toggleTheme={toggleTheme}
          onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
          onNavigate={navigateTo}
        />
        <main className="pt-24">
          <AvisoConfidencialidadPage theme={theme} onNavigate={navigateTo} />
        </main>
        <Footer theme={theme} onNavigate={navigateTo} />
      </div>
    );
  }

  if (currentPage === 'terms') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'light' ? 'bg-[#F4F6F8] text-slate-900' : 'bg-[#080709] text-white'}`}>
        <Header
          theme={theme}
          currentPage={currentPage}
          toggleTheme={toggleTheme}
          onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
          onNavigate={navigateTo}
        />
        <main className="pt-24">
          <CondicionesServicioPage theme={theme} onNavigate={navigateTo} />
        </main>
        <Footer theme={theme} onNavigate={navigateTo} />
      </div>
    );
  }

  // VISTA PRINCIPAL (HOME)
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#F4F6F8] text-slate-900' : 'bg-[#080709] text-white'
      }`}
    >
      <Header
        theme={theme}
        currentPage={currentPage}
        toggleTheme={toggleTheme}
        onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
        onNavigate={navigateTo}
      />

      <main className="pt-20">
        {/* ========================================================
            HERO PRINCIPAL (SIEMPRE FONDO OSCURO #080709)
            ======================================================== */}
        {config.sectionsVisibility.hero && (
          <section className="relative overflow-hidden bg-[#080709] text-white pt-10 pb-20 sm:pt-16 sm:pb-28 border-b border-white/10">
            {/* Iluminación de estudio cinematográfica */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none opacity-30 blur-3xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D62828] via-[#E63946]/20 to-transparent" />
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D62828]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Columna Izquierda: Mensaje de Autoridad y Conversión */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  className="lg:col-span-7 space-y-6 text-center lg:text-left"
                >
                  {/* Badge de Autoridad */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141118] border border-[#D62828]/50 text-xs font-gotham font-bold shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span className="text-slate-200">
                      {language === 'es' && config.heroBadge ? config.heroBadge : (t?.heroBadge || 'AGENCIA EDITORIAL ESPECIALIZADA EN AMAZON KDP')}
                    </span>
                  </div>

                  {/* Título Principal */}
                  <h1 className="font-gotham text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                    {language === 'es' && config.heroTitleLine1 ? config.heroTitleLine1 : (t?.heroTitle1 || 'Publica Tu Libro y Hazlo')}{' '}
                    <span className="bg-gradient-to-r from-[#D62828] via-[#E63946] to-[#F5A623] bg-clip-text text-transparent">
                      {language === 'es' && config.heroTitleHighlight ? config.heroTitleHighlight : (t?.heroTitleHighlight || '#1 Bestseller')}
                    </span>{' '}
                    {t?.heroTitleSuffix || (language === 'en' ? 'on Amazon KDP' : 'en Amazon KDP')}
                  </h1>

                  {/* Subtítulo de Conversión */}
                  <p className="text-slate-300 text-base sm:text-lg font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    {language === 'es' && config.heroSubtitle ? config.heroSubtitle : (t?.heroSubtitle ||
                      'Maquetación técnica impecable, portadas 3D de alta conversión, booktrailers cinematográficos en 4K y estrategia de lanzamiento diseñada para posicionarte en el Top 10 mientras conservas el 100% de tus regalías.')}
                  </p>

                  {/* Botones de Acción */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                    <button
                      onClick={() => setIsScheduleModalOpen(true)}
                      className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D62828] to-[#E63946] text-white font-gotham font-black text-sm uppercase tracking-wider hover:brightness-110 shadow-[0_0_30px_rgba(214,40,40,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{t?.heroCta || config.heroCtaText || 'Agendar Diagnóstico Gratuito'}</span>
                    </button>

                    <a
                      href="#calculadora"
                      className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#141118] hover:bg-white/10 text-white font-gotham font-bold text-sm border border-white/15 transition-all flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-4 h-4 text-[#F5A623]" />
                      <span>{t?.heroSecondaryCta || config.heroSecondaryCtaText || 'Calcular Mis Regalías'}</span>
                    </a>
                  </div>

                  {/* Métricas de Conversión */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                    <div className="p-3 rounded-2xl bg-[#141118]/80 border border-white/5">
                      <div className="font-gotham font-black text-2xl sm:text-3xl text-[#D62828]">
                        {config.statsTopBooks || '+180'}
                      </div>
                      <div className="text-[11px] text-slate-400 font-gotham font-bold uppercase">
                        {t?.stats1Label || 'Libros Bestseller'}
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#141118]/80 border border-white/5">
                      <div className="font-gotham font-black text-2xl sm:text-3xl text-white">
                        {config.statsRoyalties || '100%'}
                      </div>
                      <div className="text-[11px] text-slate-400 font-gotham font-bold uppercase">
                        {t?.stats2Label || 'Tus Regalías'}
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#141118]/80 border border-white/5">
                      <div className="font-gotham font-black text-2xl sm:text-3xl text-[#F5A623]">
                        {config.statsRating || '4.9 / 5'}
                      </div>
                      <div className="text-[11px] text-slate-400 font-gotham font-bold uppercase">
                        {t?.stats3Label || 'Calificación Autores'}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Columna Derecha: Libro 3D Interactivo con Coreografía Animada */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-5 flex flex-col items-center justify-center py-6"
                >
                  <InteractiveBook3D currentBook={currentBook} theme="dark" />
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================
            CARRUSEL DE PORTADAS BESTSELLER
            ======================================================== */}
        {config.sectionsVisibility.portfolioCovers && (
          <div id="portadas">
            <PortadasCarousel covers={config.portfolioCovers} theme={theme} />
          </div>
        )}

        {/* ========================================================
            SERVICIOS EDITORIALES 360
            ======================================================== */}
        {config.sectionsVisibility.services && (
          <div id="servicios">
            <ServicesSection
              services={config.services}
              theme={theme}
              onOpenBooking={() => setIsScheduleModalOpen(true)}
            />
          </div>
        )}

        {/* ========================================================
            BOOKTRAILERS CINEMATOGRÁFICOS 4K
            ======================================================== */}
        {config.sectionsVisibility.booktrailers && (
          <div id="booktrailers">
            <BooktrailersGallery trailers={config.booktrailers} theme={theme} />
          </div>
        )}

        {/* ========================================================
            CALCULADORA INTERACTIVA DE REGALÍAS KDP
            ======================================================== */}
        {config.sectionsVisibility.royaltyCalculator && (
          <div id="calculadora">
            <RoyaltyCalculator theme={theme} />
          </div>
        )}

        {/* ========================================================
            TESTIMONIOS DE AUTORES Y CASOS DE ÉXITO
            ======================================================== */}
        {config.sectionsVisibility.testimonials && (
          <div id="casos-de-exito">
            <TestimonialsCarousel testimonials={config.testimonials} theme={theme} />
          </div>
        )}

        {/* ========================================================
            PLANES, PRECIOS Y FORMULARIO DE CONTACTO
            ======================================================== */}
        {config.sectionsVisibility.pricing && (
          <div id="planes">
            <PricingAndContact theme={theme} />
          </div>
        )}
      </main>

      {/* ========================================================
          PIE DE PÁGINA (FOOTER - SIEMPRE OSCURO #080709)
          ======================================================== */}
      {config.sectionsVisibility.footer && (
        <Footer theme={theme} onNavigate={navigateTo} />
      )}

      {/* ========================================================
          MODAL DE AGENDAR ASESORÍA EDITORIAL
          ======================================================== */}
      <AnimatePresence>
        {isScheduleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl relative ${
                theme === 'light'
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-[#141118] border-white/10 text-white'
              }`}
            >
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D62828] to-[#E63946] flex items-center justify-center text-white">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-gotham font-black text-lg">
                    {t?.bookingTitle || 'Agendar Diagnóstico Gratuito'}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {t?.bookingSubtitle || 'Sesión 1-a-1 de 30 minutos vía Google Meet'}
                  </span>
                </div>
              </div>

              {scheduleSent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-gotham font-bold text-base text-emerald-500">
                    {t?.bookingSuccessTitle || '¡Solicitud Enviada con Éxito!'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    {t?.bookingSuccessDesc || 'Hemos registrado tu solicitud correctamente. Nuestro equipo editorial te contactará en menos de 24 horas.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-gotham font-bold mb-1">
                      {t?.contactNameLabel || 'Nombre Completo'}:
                    </label>
                    <input
                      type="text"
                      required
                      value={scheduleData.nombre}
                      onChange={(e) => setScheduleData({ ...scheduleData, nombre: e.target.value })}
                      placeholder={language === 'en' ? 'e.g. John Doe' : 'Ej. Juan Pérez'}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        theme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                          : 'bg-[#080709] border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-gotham font-bold mb-1">
                      {t?.contactEmailLabel || 'Correo Electrónico'}:
                    </label>
                    <input
                      type="email"
                      required
                      value={scheduleData.email}
                      onChange={(e) => setScheduleData({ ...scheduleData, email: e.target.value })}
                      placeholder="tu@correo.com"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        theme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                          : 'bg-[#080709] border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-gotham font-bold mb-1">
                      {t?.contactPhoneLabel || 'WhatsApp / Teléfono'}:
                    </label>
                    <input
                      type="tel"
                      value={scheduleData.whatsapp}
                      onChange={(e) => setScheduleData({ ...scheduleData, whatsapp: e.target.value })}
                      placeholder="+34 600 000 000"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        theme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white'
                          : 'bg-[#080709] border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-gotham font-bold mb-1">
                      {t?.contactGenreLabel || 'Género de tu Obra'}:
                    </label>
                    <select
                      value={scheduleData.genero}
                      onChange={(e) => setScheduleData({ ...scheduleData, genero: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        theme === 'light'
                          ? 'bg-slate-50 border-slate-300 text-slate-900'
                          : 'bg-[#080709] border-white/10 text-white'
                      }`}
                    >
                      <option value="Negocios & No-Ficción">
                        {language === 'en' ? 'Business & Non-Fiction' : 'Negocios & No-Ficción'}
                      </option>
                      <option value="Crecimiento Personal & Autoayuda">
                        {language === 'en' ? 'Personal Growth & Self-Help' : 'Crecimiento Personal & Autoayuda'}
                      </option>
                      <option value="Ficción, Novela o Thriller">
                        {language === 'en' ? 'Fiction, Mystery & Thriller' : 'Ficción, Novela o Thriller'}
                      </option>
                      <option value="Biografía o Memorias">
                        {language === 'en' ? 'Biography & Memoirs' : 'Biografía o Memorias'}
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#E63946] text-white font-gotham font-black uppercase tracking-wider hover:brightness-110 shadow-lg cursor-pointer"
                  >
                    {t?.bookingConfirmBtn || 'Confirmar y Agendar'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <SiteConfigProvider>
      <AppContent />
    </SiteConfigProvider>
  );
}
