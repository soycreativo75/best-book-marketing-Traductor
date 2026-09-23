import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  FileCheck,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Lock,
  Globe,
} from 'lucide-react';
import { ThemeMode, AppPage } from '../types';
import { BestBookLogo } from './BestBookLogo';
import { useSiteConfig } from '../context/SiteConfigContext';

interface HeaderProps {
  theme: ThemeMode;
  currentPage: AppPage;
  toggleTheme: () => void;
  onOpenScheduleModal: () => void;
  onNavigate: (page: AppPage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  currentPage,
  toggleTheme,
  onOpenScheduleModal,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { config, language, setLanguage, t } = useSiteConfig();

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'es' ? 'en' : 'es';
    setLanguage(nextLang);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${
        theme === 'light'
          ? 'bg-white/90 border-slate-200 shadow-sm'
          : 'bg-[#080709]/90 border-[#141118] shadow-[0_4px_30px_rgba(0,0,0,0.7)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Oficial Best Book Marketing */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center group transition-transform hover:scale-[1.02] cursor-pointer"
            aria-label="Ir a Inicio"
          >
            <BestBookLogo theme={theme} layout="horizontal" size="md" />
          </button>

          {/* Menú de Navegación de Escritorio */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => handleNavClick('inicio')}
              className={`text-xs font-gotham font-bold hover:text-[#D62828] transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? theme === 'light'
                    ? 'text-slate-900 font-black'
                    : 'text-white font-black'
                  : theme === 'light'
                  ? 'text-slate-600'
                  : 'text-slate-300'
              }`}
            >
              {t?.navHome || 'Inicio'}
            </button>
            <button
              onClick={() => handleNavClick('servicios')}
              className={`text-xs font-gotham font-bold hover:text-[#D62828] transition-colors cursor-pointer ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {t?.navServices || 'Servicios'}
            </button>
            <button
              onClick={() => handleNavClick('booktrailers')}
              className={`text-xs font-gotham font-bold hover:text-[#D62828] transition-colors cursor-pointer ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {t?.navBooktrailers || 'Booktrailers'}
            </button>
            <button
              onClick={() => handleNavClick('casos-de-exito')}
              className={`text-xs font-gotham font-bold hover:text-[#D62828] transition-colors cursor-pointer ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {t?.navCovers || 'Casos de Éxito'}
            </button>
            <button
              onClick={() => handleNavClick('calculadora')}
              className={`text-xs font-gotham font-bold hover:text-[#D62828] transition-colors cursor-pointer ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {t?.navCalculator || 'Calculadora'}
            </button>
            <button
              onClick={() => handleNavClick('planes')}
              className={`text-xs font-gotham font-bold hover:text-[#D62828] transition-colors cursor-pointer ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {t?.navPricing || 'Planes'}
            </button>
            <button
              onClick={() => onNavigate('faqs')}
              className={`text-xs font-gotham font-bold hover:text-[#D62828] transition-colors cursor-pointer ${
                currentPage === 'faqs'
                  ? 'text-[#D62828] font-black'
                  : theme === 'light'
                  ? 'text-slate-600'
                  : 'text-slate-300'
              }`}
            >
              {t?.navFaqs || 'FAQs'}
            </button>
          </nav>

          {/* Acciones: Selector de Tema Claro/Oscuro, Selector de Idioma y Botón Agendar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Selector Sutil de Idioma (ES / EN) */}
            {config.enableLanguageSwitch !== false && (
              <button
                type="button"
                onClick={toggleLanguage}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                  theme === 'light'
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    : 'bg-[#141118] border-white/10 text-slate-300 hover:border-[#D62828] hover:text-[#D62828]'
                }`}
                title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                aria-label="Cambiar idioma de la página"
              >
                <Globe className="w-4 h-4 text-[#D62828]" />
                <span className="text-[11px] font-gotham font-black uppercase tracking-wider">
                  {language === 'es' ? 'ES' : 'EN'}
                </span>
              </button>
            )}

            {/* Toggle Tema (Dark / Light Mode con inversión de logo) */}
            <button
              onClick={toggleTheme}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                  : 'bg-[#141118] border-white/10 text-slate-300 hover:border-[#D62828] hover:text-[#D62828]'
              }`}
              title={theme === 'light' ? 'Cambiar a Fondo Oscuro' : 'Cambiar a Fondo Claro'}
              aria-label="Cambiar tema"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span className="hidden xl:inline text-xs font-gotham font-bold">{t?.themeDark || 'Fondo Oscuro'}</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-[#F5A623]" />
                  <span className="hidden xl:inline text-xs font-gotham font-bold text-slate-300">{t?.themeLight || 'Fondo Claro'}</span>
                </>
              )}
            </button>

            {/* Botón CTA "Agendar Consulta" con Rich Crimson Red */}
            <button
              onClick={onOpenScheduleModal}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_25px_rgba(214,40,40,0.45)] transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>{t?.navSchedule || 'Agendar Consulta'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-white/10 text-slate-300 cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden py-4 border-t space-y-2 ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#080709] border-[#141118]'
            }`}
          >
            <button
              onClick={() => handleNavClick('inicio')}
              className="w-full text-left px-3 py-2 text-sm font-gotham font-bold hover:text-[#D62828]"
            >
              {t?.navHome || 'Inicio'}
            </button>
            <button
              onClick={() => handleNavClick('servicios')}
              className="w-full text-left px-3 py-2 text-sm font-gotham font-bold hover:text-[#D62828]"
            >
              {t?.navServices || 'Servicios'}
            </button>
            <button
              onClick={() => handleNavClick('booktrailers')}
              className="w-full text-left px-3 py-2 text-sm font-gotham font-bold hover:text-[#D62828]"
            >
              {t?.navBooktrailers || 'Booktrailers'}
            </button>
            <button
              onClick={() => handleNavClick('casos-de-exito')}
              className="w-full text-left px-3 py-2 text-sm font-gotham font-bold hover:text-[#D62828]"
            >
              {t?.navCovers || 'Casos de Éxito'}
            </button>
            <button
              onClick={() => handleNavClick('calculadora')}
              className="w-full text-left px-3 py-2 text-sm font-gotham font-bold hover:text-[#D62828]"
            >
              {t?.navCalculator || 'Calculadora de Regalías'}
            </button>
            <button
              onClick={() => handleNavClick('planes')}
              className="w-full text-left px-3 py-2 text-sm font-gotham font-bold hover:text-[#D62828]"
            >
              {t?.navPricing || 'Planes'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('faqs');
              }}
              className="w-full text-left px-3 py-2 text-sm font-gotham font-bold text-[#D62828]"
            >
              {t?.navFaqs || 'Preguntas Frecuentes (FAQs)'}
            </button>

            {config.enableLanguageSwitch !== false && (
              <div className="pt-2 border-t border-white/10 flex items-center justify-between px-3">
                <span className="text-xs font-gotham font-bold text-slate-400">Idioma / Language:</span>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 rounded-lg border border-[#D62828] text-[#D62828] font-gotham font-black text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Español (ES) ➔ English' : 'English (EN) ➔ Español'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

interface FooterProps {
  theme: ThemeMode;
  onNavigate: (page: AppPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { config, t, language } = useSiteConfig();

  return (
    <footer className="bg-[#050406] border-t border-white/10 text-slate-400 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Columna 1: Marca y Propósito */}
          <div className="space-y-4 md:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center text-left cursor-pointer"
            >
              <BestBookLogo theme="dark" layout="horizontal" size="md" />
            </button>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {t?.footerTagline || 'Agencia líder en diseño de portadas cinematográficas, maquetación editorial de lujo y posicionamiento Bestseller en Amazon KDP para autores independientes de todo el mundo.'}
            </p>
            <div className="text-xs text-slate-400 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D62828]" />
                <span>{config.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D62828]" />
                <a href="#contacto" className="hover:text-[#D62828] transition-colors">
                  {language === 'en' ? 'Support & Editorial Inquiries' : 'Atención & Consultas Editoriales'}
                </a>
              </div>
            </div>
          </div>

          {/* Columna 2: Navegación Principal */}
          <div>
            <h3 className="font-gotham font-black text-xs uppercase tracking-wider text-[#F5A623] mb-4">
              {t?.footerNavTitle || 'Navegación'}
            </h3>
            <ul className="space-y-2.5 text-xs font-gotham font-bold text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#D62828] transition-colors cursor-pointer"
                >
                  {t?.navHome || 'Inicio'}
                </button>
              </li>
              <li>
                <a href="#servicios" className="hover:text-[#D62828] transition-colors">
                  {t?.navServices || 'Servicios Editoriales'}
                </a>
              </li>
              <li>
                <a href="#booktrailers" className="hover:text-[#D62828] transition-colors">
                  {t?.navBooktrailers || 'Booktrailers Cinematográficos'}
                </a>
              </li>
              <li>
                <a href="#casos-de-exito" className="hover:text-[#D62828] transition-colors">
                  {t?.navCovers || 'Casos de Éxito'}
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-[#D62828] transition-colors">
                  {t?.navCalculator || 'Calculadora de Regalías'}
                </a>
              </li>
              <li>
                <a href="#planes" className="hover:text-[#D62828] transition-colors">
                  {t?.navPricing || 'Planes & Presupuestos'}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información Legal & Soporte */}
          <div>
            <h3 className="font-gotham font-black text-xs uppercase tracking-wider text-[#F5A623] mb-4">
              {t?.footerLegalTitle || 'Legal & Asistencia'}
            </h3>
            <ul className="space-y-2.5 text-xs font-gotham font-bold">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-[#D62828] transition-colors text-left flex items-center gap-1.5 cursor-pointer text-slate-300"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D62828]" />
                  <span>{t?.footerPrivacy || 'Aviso de Confidencialidad'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-[#D62828] transition-colors text-left flex items-center gap-1.5 cursor-pointer text-slate-300"
                >
                  <FileCheck className="w-3.5 h-3.5 text-[#D62828]" />
                  <span>{t?.footerTerms || 'Condiciones del Servicio'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faqs')}
                  className="hover:text-[#D62828] transition-colors text-left flex items-center gap-1.5 cursor-pointer text-slate-300"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#D62828]" />
                  <span>{t?.footerFaqs || 'Preguntas Frecuentes (FAQs)'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Fila inferior: Copyright y Acceso Sutil al Panel de Administración */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Best Book Marketing. {t?.footerRights || 'Todos los derechos reservados.'}
          </p>
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-slate-400">
            <span>{t?.footerGuarantee || '100% Regalías para el Autor'}</span>
            <span>•</span>
            <span>Estándares Amazon KDP</span>
            <span>•</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-slate-500 hover:text-slate-300 transition-colors font-mono text-[10px] cursor-pointer flex items-center gap-1 py-0.5 px-1.5 rounded hover:bg-white/5 opacity-70 hover:opacity-100"
              title="Panel de Administración"
            >
              <Lock className="w-2.5 h-2.5 text-slate-500" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
