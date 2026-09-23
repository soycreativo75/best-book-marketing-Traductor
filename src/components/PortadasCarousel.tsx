import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Award, Sparkles, Image as ImageIcon, Pause, Play, ArrowRight } from 'lucide-react';
import { PortfolioCover, ThemeMode } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface PortadasCarouselProps {
  covers: PortfolioCover[];
  theme: ThemeMode;
  onSelectCoverForHero?: (cover: PortfolioCover) => void;
}

export const PortadasCarousel: React.FC<PortadasCarouselProps> = ({ covers, theme }) => {
  const { t, language } = useSiteConfig();
  const [selectedCoverModal, setSelectedCoverModal] = useState<PortfolioCover | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Preparamos los elementos a desplegar asegurando que cada pista sea lo suficientemente ancha
  const baseItems = covers.length > 0 ? covers : [];
  let trackItems = [...baseItems];
  while (trackItems.length < 8 && trackItems.length > 0) {
    trackItems = [...trackItems, ...baseItems];
  }

  // Desplazamiento manual interactivo opcional
  const handleScrollManual = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Renderizador de una tarjeta de portada individual
  const renderCoverCard = (cover: PortfolioCover, uniqueKey: string) => (
    <div
      key={uniqueKey}
      onClick={() => setSelectedCoverModal(cover)}
      className={`group flex-shrink-0 w-[280px] sm:w-[310px] rounded-2xl p-5 border backdrop-blur-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
        theme === 'light'
          ? 'bg-white/95 border-slate-200 hover:border-[#D62828] hover:shadow-2xl hover:shadow-slate-300/60'
          : 'bg-[#141118]/95 border-white/10 hover:border-[#D62828]/70 hover:shadow-[0_0_35px_rgba(214,40,40,0.3)]'
      }`}
    >
      {/* Representación visual de la portada con aspecto 3D */}
      <div
        className={`relative w-full h-[360px] rounded-xl overflow-hidden bg-gradient-to-br ${cover.bgGradient} p-5 flex flex-col justify-between border border-white/10 shadow-lg group-hover:scale-[1.02] transition-transform duration-300`}
      >
        {/* Textura y brillo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.2),transparent_70%)] pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/50 to-transparent" />

        {/* Badge de Categoría */}
        <div className="relative z-10 flex justify-between items-start">
          <span className="text-[10px] font-gotham font-black px-2 py-0.5 rounded bg-black/70 text-[#F5A623] border border-[#D62828]/40 shadow-sm">
            {cover.genre}
          </span>
          <div className="w-6 h-6 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 flex items-center justify-center text-[#F5A623] text-xs font-bold">
            ★
          </div>
        </div>

        {/* Título de la Portada con Gotham Bold */}
        <div className="relative z-10 my-auto text-center space-y-2">
          <div className="w-8 h-[2px] bg-gradient-to-r from-[#D62828] to-[#F5A623] mx-auto" />
          <h4 className="font-gotham text-xl sm:text-2xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-md">
            {cover.title}
          </h4>
          <p className="text-[10px] text-slate-300 font-medium">Edición Especial Amazon KDP</p>
        </div>

        {/* Pie de la Portada */}
        <div className="relative z-10 pt-2 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-300">
          <span className="font-gotham font-bold text-[#F5A623]">{cover.sales}</span>
          <span className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[9px]">300 DPI</span>
        </div>
      </div>

      {/* Información debajo de la portada */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
        <div>
          <div className="text-xs font-gotham font-black text-[#D62828] flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>{cover.bestsellerRank}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            {language === 'en' ? 'Click to inspect specifications' : 'Clic para ver ficha técnica'}
          </div>
        </div>
        <div className="text-xs font-gotham font-bold text-slate-300 group-hover:text-[#D62828] transition-colors flex items-center gap-0.5">
          <span>{t?.coversViewDetails || 'Ver'}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );

  // Tarjeta de llamada para portada personalizada
  const renderCtaCard = (uniqueKey: string) => (
    <div
      key={uniqueKey}
      className={`flex-shrink-0 w-[280px] sm:w-[310px] rounded-2xl p-6 border-2 border-dashed flex flex-col justify-center items-center text-center backdrop-blur-xl ${
        theme === 'light'
          ? 'bg-slate-50/90 border-slate-300 text-slate-700'
          : 'bg-[#141118]/70 border-[#D62828]/40 text-slate-300'
      }`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#D62828]/15 border border-[#D62828]/35 flex items-center justify-center text-[#D62828] mb-4 shadow-sm">
        <ImageIcon className="w-7 h-7" />
      </div>
      <h4 className={`font-gotham text-lg font-black mb-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
        ¿Quieres ver tu portada aquí?
      </h4>
      <p className="text-xs text-slate-400 mb-5 leading-relaxed">
        Diseñamos portadas personalizadas desde cero o maquetamos tu portada actual para cumplir al 100% las especificaciones de Amazon KDP.
      </p>
      <a
        href="#contacto"
        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs hover:brightness-110 shadow-lg transition-all cursor-pointer"
      >
        Diseñar la Portada de mi Libro
      </a>
    </div>
  );

  return (
    <section
      id="portadas"
      className="relative z-10 py-16 lg:py-20 border-t border-white/10 overflow-hidden"
    >
      <style>{`
        @keyframes bbmMarqueeFlow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .bbm-marquee-wrapper {
          display: flex;
          overflow: hidden;
          width: 100%;
          user-select: none;
        }
        .bbm-marquee-item-track {
          display: flex;
          flex-shrink: 0;
          align-items: stretch;
          gap: 1.5rem;
          padding-right: 1.5rem;
          animation: bbmMarqueeFlow 36s linear infinite;
          will-change: transform;
        }
        .bbm-marquee-wrapper:hover .bbm-marquee-item-track,
        .bbm-marquee-wrapper.is-paused .bbm-marquee-item-track {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera del Carrusel de Portadas */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080709] border border-[#D62828]/45 text-[#F5A623] text-xs font-gotham font-bold uppercase tracking-wider mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D62828]" />
              {t?.coversBadge || 'Galería de Lanzamientos Destacados'}
            </div>
            <h3 className={`font-gotham text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              {t?.coversTitle || 'Portadas Diseñadas para Convertir Lectores'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              {t?.coversSubtitle || 'Cada portada es calibrada para sobresalir en las miniaturas de Amazon KDP y catapultarse a las listas Bestseller.'}
            </p>
          </div>

          {/* Controles de navegación y estado de pausa interactivo */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141118] border border-white/10 text-[11px] text-slate-300 font-gotham font-bold shadow-sm">
              {isHovered ? (
                <>
                  <Pause className="w-3 h-3 text-[#F5A623]" />
                  <span className="text-[#F5A623]">{t?.coversPaused || 'Pausado en hover'}</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse" />
                  <span>{t?.coversAutoActive || 'Loop continuo infinito'}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScrollManual('left')}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-[#141118] border-white/10 text-slate-300 hover:border-[#D62828] hover:text-[#D62828]'
                }`}
                title="Desplazar a la izquierda"
                aria-label="Portada anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScrollManual('right')}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-[#141118] border-white/10 text-slate-300 hover:border-[#D62828] hover:text-[#D62828]'
                }`}
                title="Desplazar a la derecha"
                aria-label="Portada siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cinta de Carrusel Continuo Infinito (Sin saltos ni espacios negros) */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-hidden py-4 select-none relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Degradados sutiles en los bordes para transición suave adaptados al tema */}
        <div className={`absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r ${theme === 'light' ? 'from-[#F4F6F8]' : 'from-[#080709]'} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l ${theme === 'light' ? 'from-[#F4F6F8]' : 'from-[#080709]'} to-transparent z-10 pointer-events-none`} />

        <div className={`bbm-marquee-wrapper ${isHovered ? 'is-paused' : ''}`}>
          {/* Pista A */}
          <div className="bbm-marquee-item-track">
            {trackItems.map((cover, idx) => renderCoverCard(cover, `trackA-${cover.id}-${idx}`))}
            {renderCtaCard('trackA-cta')}
          </div>

          {/* Pista B: Réplica exacta que sigue inmediatamente a la Pista A para un bucle infinito continuo */}
          <div className="bbm-marquee-item-track" aria-hidden="true">
            {trackItems.map((cover, idx) => renderCoverCard(cover, `trackB-${cover.id}-${idx}`))}
            {renderCtaCard('trackB-cta')}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 text-center">
        <p className="text-[11px] text-slate-500 font-gotham">
          💡 Pasa el ratón sobre cualquier portada para pausar la rotación y explorar sus detalles técnicos.
        </p>
      </div>

      {/* Modal de Detalle de Portada */}
      <AnimatePresence>
        {selectedCoverModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`border rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-[0_0_50px_rgba(214,40,40,0.3)] ${
                theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#141118] border-[#D62828]/50 text-white'
              }`}
            >
              <button
                onClick={() => setSelectedCoverModal(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-black/40 hover:bg-black/60 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D62828]/20 border border-[#D62828] flex items-center justify-center text-[#D62828]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-gotham text-xl font-black">{selectedCoverModal.title}</h4>
                    <p className="text-xs text-[#F5A623] font-gotham font-bold">{selectedCoverModal.bestsellerRank}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#080709] border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-slate-400">Género Editorial:</span>
                    <span className="font-gotham font-bold text-slate-200">{selectedCoverModal.genre}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/10">
                    <span className="text-slate-400">Rendimiento Comercial:</span>
                    <span className="font-gotham font-bold text-[#F5A623]">{selectedCoverModal.sales}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Especificación Técnica:</span>
                    <span className="font-mono text-emerald-400">CMYK 300 DPI + Sangrado Exacto KDP</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Diseño concebido para destacar tanto en la búsqueda de la app de Amazon (versión miniatura en móvil) como en el formato físico de tapa blanda y tapa dura.
                </p>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setSelectedCoverModal(null)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs text-center hover:brightness-110 shadow-lg transition-all cursor-pointer"
                  >
                    Entendido / Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
