import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  Layers,
  Rocket,
  Sparkles,
  Film,
  CheckCircle2,
  ChevronRight,
  X,
  ArrowRight,
  ShieldCheck,
  Check,
  BookOpen,
  PenTool,
  TrendingUp,
  Target,
  Award,
  Megaphone,
  Cpu,
  Globe,
  FileText,
  Zap,
  Star,
  BarChart3,
  Compass,
  Printer,
  Headphones,
  Video,
  DollarSign,
  Users,
  Lightbulb,
} from 'lucide-react';
import { ServiceItem, ThemeMode } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';
import { SERVICES_TRANSLATIONS_EN } from '../utils/i18n';

interface ServicesSectionProps {
  services: ServiceItem[];
  theme: ThemeMode;
  onOpenBooking?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, theme, onOpenBooking }) => {
  const { t, language } = useSiteConfig();
  const [activeServiceModal, setActiveServiceModal] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return Palette;
      case 'Layers':
        return Layers;
      case 'Film':
      case 'Video':
        return Film;
      case 'Rocket':
        return Rocket;
      case 'BookOpen':
        return BookOpen;
      case 'PenTool':
        return PenTool;
      case 'TrendingUp':
        return TrendingUp;
      case 'Target':
        return Target;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Award':
        return Award;
      case 'Megaphone':
        return Megaphone;
      case 'Cpu':
        return Cpu;
      case 'Globe':
        return Globe;
      case 'FileText':
        return FileText;
      case 'Zap':
        return Zap;
      case 'Star':
        return Star;
      case 'BarChart3':
        return BarChart3;
      case 'Compass':
        return Compass;
      case 'Printer':
        return Printer;
      case 'Headphones':
        return Headphones;
      case 'DollarSign':
        return DollarSign;
      case 'Users':
        return Users;
      case 'Lightbulb':
        return Lightbulb;
      case 'Sparkles':
      default:
        return Sparkles;
    }
  };

  const selectedService = services.find((s) => s.id === activeServiceModal);

  return (
    <section
      id="servicios"
      className={`relative z-10 py-20 lg:py-28 border-t transition-colors ${
        theme === 'light'
          ? 'bg-slate-50/80 border-slate-200'
          : 'bg-[#080709] border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de la sección */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080709] border border-[#D62828]/45 text-[#F5A623] text-xs font-gotham font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D62828]" />
            {t?.servicesBadge || 'Soluciones Editoriales de Élite'}
          </div>
          <h2 className={`font-gotham text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            {t?.servicesTitle || 'Servicios Integrales para Posicionar tu Obra en'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] to-[#F5A623]">
              {t?.servicesTitleHighlight || 'Amazon KDP'}
            </span>
          </h2>
          <p className={`text-base sm:text-lg ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
            {t?.servicesSubtitle || 'Diseño, maquetación profesional y producción audiovisual de nivel internacional para autores independientes que buscan el estándar de las grandes editoriales.'}
          </p>
        </div>

        {/* Grilla de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComp = getIcon(service.iconName);
            const isWide = index === 3 || index === 4;
            const enData = language === 'en' ? SERVICES_TRANSLATIONS_EN[service.id] : null;

            const serviceTitle = enData?.title || service.title;
            const serviceTagline = enData?.tagline || service.tagline;
            const serviceDesc = enData?.desc || service.desc;
            const serviceFeatures = enData?.features || service.features;
            const serviceDeliverables = enData?.deliverables || service.deliverables;

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between ${
                  isWide ? 'lg:col-span-1' : ''
                } ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 hover:border-[#D62828] hover:shadow-xl hover:shadow-slate-200'
                    : 'bg-[#141118]/90 border-white/10 hover:border-[#D62828]/60 hover:shadow-[0_0_35px_rgba(214,40,40,0.2)]'
                }`}
              >
                {/* Glow decorativo interno */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#D62828]/10 rounded-full blur-2xl group-hover:bg-[#D62828]/20 transition-all duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Header de la tarjeta */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#141118] to-[#250d11] border border-[#D62828]/40 flex items-center justify-center text-[#D62828] shadow-[0_0_15px_rgba(214,40,40,0.25)] group-hover:scale-110 group-hover:border-[#D62828] transition-all duration-300">
                      <IconComp className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Título y descripción */}
                  <h3
                    className={`font-gotham text-xl font-black mb-2 transition-colors ${
                      theme === 'light' ? 'text-slate-900 group-hover:text-[#D62828]' : 'text-white group-hover:text-[#F5A623]'
                    }`}
                  >
                    {serviceTitle}
                  </h3>
                  <p className="text-xs font-gotham font-bold text-[#D62828] mb-3">
                    {serviceTagline}
                  </p>
                  <p className={`text-xs leading-relaxed mb-6 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {serviceDesc}
                  </p>

                  {/* Lista de características */}
                  <ul className="space-y-2.5 mb-8">
                    {serviceFeatures.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#F5A623] flex-shrink-0 mt-0.5" />
                        <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón de acción */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {language === 'en' ? '100% KDP Guarantee' : 'Garantía KDP 100%'}
                  </span>
                  <button
                    onClick={() => setActiveServiceModal(service.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-gotham font-black text-[#D62828] hover:text-[#F5A623] transition-colors cursor-pointer"
                  >
                    <span>{t?.servicesDetailsBtn || 'Detalles Técnicos'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Detalle de Servicio */}
      <AnimatePresence>
        {selectedService && (() => {
          const enModal = language === 'en' ? SERVICES_TRANSLATIONS_EN[selectedService.id] : null;
          const modalTitle = enModal?.title || selectedService.title;
          const modalTagline = enModal?.tagline || selectedService.tagline;
          const modalDesc = enModal?.desc || selectedService.desc;
          const modalDeliverables = enModal?.deliverables || selectedService.deliverables;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={`relative w-full max-w-xl rounded-3xl p-8 border shadow-2xl ${
                  theme === 'light'
                    ? 'bg-white border-slate-300 text-slate-900'
                    : 'bg-[#141118] border-[#D62828]/50 text-white shadow-[0_0_50px_rgba(214,40,40,0.3)]'
                }`}
              >
                <button
                  onClick={() => setActiveServiceModal(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#D62828]/15 border border-[#D62828]/40 flex items-center justify-center text-[#D62828]">
                      {React.createElement(getIcon(selectedService.iconName), { className: 'w-6 h-6' })}
                    </div>
                    <div>
                      <h3 className="font-gotham text-2xl font-black">{modalTitle}</h3>
                      <p className="text-xs text-[#F5A623] font-gotham font-bold">{modalTagline}</p>
                    </div>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    {modalDesc}
                  </p>

                  <div className={`p-4 rounded-2xl border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#080709] border-white/10'}`}>
                    <h4 className="text-xs font-gotham font-black uppercase text-[#F5A623] mb-3">
                      {t?.servicesDeliverables || 'Entregables y Especificaciones Técnicas:'}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {modalDeliverables}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setActiveServiceModal(null);
                        if (onOpenBooking) onOpenBooking();
                      }}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{t?.servicesRequestBtn || 'Solicitar este Servicio'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveServiceModal(null)}
                      className="px-5 py-3.5 rounded-xl border border-white/10 text-xs font-gotham font-bold hover:bg-white/5 transition-all cursor-pointer"
                    >
                      {t?.servicesCloseBtn || 'Cerrar'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};
