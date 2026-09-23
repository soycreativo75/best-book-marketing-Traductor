import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ArrowLeft, Search, ChevronDown, MessageCircle } from 'lucide-react';
import { ThemeMode, AppPage } from '../../types';
import { BestBookLogo } from '../BestBookLogo';
import { useSiteConfig } from '../../context/SiteConfigContext';

interface FaqsPageProps {
  theme: ThemeMode;
  onNavigate: (page: AppPage) => void;
  onOpenBooking: () => void;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({ theme, onNavigate, onOpenBooking }) => {
  const { config } = useSiteConfig();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openAccordionId, setOpenAccordionId] = useState<string | null>('kdp-1');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const isLight = theme === 'light';

  const categories = [
    { id: 'all', label: 'Todas las Preguntas' },
    { id: 'kdp', label: 'Amazon KDP & Regalías' },
    { id: 'diseno', label: 'Diseño & Maquetación' },
    { id: 'tramites', label: 'ISBN & Derechos' },
    { id: 'marketing', label: 'Marketing & Bestseller' },
    { id: 'precios', label: 'Plazos & Precios' },
  ];

  const faqsSource = config.faqs && config.faqs.length > 0 ? config.faqs : [];

  const filteredFaqs = faqsSource.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordionId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isLight ? 'bg-[#F4F6F8] text-slate-900' : 'bg-[#080709] text-slate-100'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Barra superior de navegación */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-10">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-2 text-xs font-gotham font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                : 'bg-[#141118] hover:bg-white/10 text-slate-200 border border-white/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-[#D62828]" />
            <span>Volver al Inicio</span>
          </button>

          <BestBookLogo theme={theme} size="sm" />
        </div>

        {/* Encabezado */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080709] border border-[#D62828]/45 text-[#F5A623] text-xs font-gotham font-bold uppercase tracking-wider mb-4 shadow-sm">
            <HelpCircle className="w-4 h-4 text-[#D62828]" />
            Centro de Respuestas Oficial
          </div>
          <h1 className={`font-gotham text-3xl sm:text-4xl font-black tracking-tight mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Preguntas Frecuentes sobre KDP y Nuestros Servicios
          </h1>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
            Resolvemos con total claridad todas tus dudas sobre el proceso editorial, publicación en Amazon, derechos de autor y posicionamiento de ventas.
          </p>
        </div>

        {/* Buscador de preguntas */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por palabra clave (ej. regalías, ISBN, plazos, portada...)"
            className={`w-full pl-12 pr-4 py-4 rounded-2xl border text-xs sm:text-sm focus:outline-none focus:border-[#D62828] transition-all ${
              isLight
                ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 shadow-sm'
                : 'bg-[#141118] border-white/10 text-white placeholder-slate-500'
            }`}
          />
        </div>

        {/* Filtros de Categorías */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-gotham font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white shadow-[0_0_15px_rgba(214,40,40,0.35)]'
                  : isLight
                  ? 'bg-white text-slate-900 hover:bg-slate-100 border border-slate-300'
                  : 'bg-[#141118] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Lista de Acordeones */}
        <div className="space-y-3 mb-14">
          {filteredFaqs.length === 0 ? (
            <div className={`text-center py-12 border border-dashed rounded-2xl p-8 ${isLight ? 'border-slate-300 bg-white' : 'border-white/10 bg-[#141118]/60'}`}>
              <p className={isLight ? 'text-slate-800 text-sm font-medium' : 'text-slate-400 text-sm'}>
                No encontramos preguntas que coincidan con tu búsqueda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs font-gotham font-bold text-[#D62828] underline cursor-pointer"
              >
                Limpiar búsqueda y ver todas
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openAccordionId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? isLight
                        ? 'bg-white border-[#D62828] shadow-md ring-1 ring-[#D62828]/20'
                        : 'bg-[#141118] border-[#D62828]/50 shadow-[0_0_20px_rgba(214,40,40,0.15)]'
                      : isLight
                      ? 'bg-white hover:bg-slate-50 border-slate-200'
                      : 'bg-[#141118]/60 hover:bg-[#141118] border-white/10'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 select-none cursor-pointer"
                  >
                    <span
                      className={`font-gotham font-bold text-sm sm:text-base leading-snug transition-colors ${
                        isOpen
                          ? 'text-[#D62828]'
                          : isLight
                          ? 'text-slate-900 hover:text-[#D62828]'
                          : 'text-white hover:text-[#D62828]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#D62828] text-white rotate-180'
                          : isLight
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`p-5 pt-0 text-xs sm:text-sm leading-relaxed border-t ${
                            isLight
                              ? 'text-slate-900 font-normal border-slate-100'
                              : 'text-slate-200 border-white/5'
                          }`}
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Caja de Ayuda Personalizada */}
        <div
          className={`p-8 rounded-3xl border text-center relative overflow-hidden ${
            isLight
              ? 'bg-white border-[#D62828]/30 shadow-lg text-slate-900'
              : 'bg-[#141118] border-[#D62828]/40 shadow-[0_0_30px_rgba(214,40,40,0.15)] text-white'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#080709] border border-[#D62828]/40 text-[#D62828] flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h2 className={`font-gotham text-xl font-black mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            ¿Tienes una pregunta específica sobre tu manuscrito?
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto mb-6 ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
            Nuestro equipo de consultores editoriales revisa tu caso sin compromiso y te explica el paso a paso adaptado a tu género literario.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(214,40,40,0.35)] cursor-pointer"
            >
              Agendar Asesoría Gratuita
            </button>
            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hola, tengo preguntas sobre el proceso editorial de Best Book Marketing.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-gotham font-bold text-xs sm:text-sm border transition-all ${
                isLight
                  ? 'border-slate-300 hover:bg-slate-100 text-slate-900'
                  : 'border-white/10 hover:bg-white/5 text-slate-200'
              }`}
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
