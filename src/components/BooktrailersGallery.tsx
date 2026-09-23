import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Film,
  Sparkles,
  Clock,
  Eye,
  Volume2,
  ArrowRight,
  CheckCircle2,
  Pause,
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Video,
} from 'lucide-react';
import { BooktrailerItem, ThemeMode } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface BooktrailersGalleryProps {
  trailers: BooktrailerItem[];
  theme: ThemeMode;
}

export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regExp);
  if (match && match[1]) {
    return match[1];
  }
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

export const BooktrailersGallery: React.FC<BooktrailersGalleryProps> = ({ trailers, theme }) => {
  const { t, language } = useSiteConfig();
  const [selectedTrailer, setSelectedTrailer] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const safeTrailers = trailers && trailers.length > 0 ? trailers : [];
  const currentTrailer = safeTrailers[selectedTrailer] || safeTrailers[0] || null;

  const handleSelectTrailer = (index: number) => {
    setSelectedTrailer(index);
    setIsPlaying(false);
  };

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (!carouselContainerRef.current) return;
    const isDesktop = window.innerWidth >= 1024;
    const scrollStep = isDesktop ? 190 : 260;

    if (direction === 'prev') {
      carouselContainerRef.current.scrollBy({
        top: isDesktop ? -scrollStep : 0,
        left: !isDesktop ? -scrollStep : 0,
        behavior: 'smooth',
      });
      // Navegación cíclica de selección
      if (selectedTrailer > 0) {
        setSelectedTrailer((prev) => prev - 1);
        setIsPlaying(false);
      }
    } else {
      carouselContainerRef.current.scrollBy({
        top: isDesktop ? scrollStep : 0,
        left: !isDesktop ? scrollStep : 0,
        behavior: 'smooth',
      });
      // Navegación cíclica de selección
      if (selectedTrailer < safeTrailers.length - 1) {
        setSelectedTrailer((prev) => prev + 1);
        setIsPlaying(false);
      }
    }
  };

  if (!currentTrailer) {
    return null;
  }

  const youtubeId = extractYouTubeId(currentTrailer.youtubeUrl);

  return (
    <section
      id="booktrailers"
      className={`relative z-10 py-20 lg:py-28 border-t transition-colors ${
        theme === 'light'
          ? 'bg-white border-slate-200'
          : 'bg-[#080709] border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080709] border border-[#D62828]/45 text-[#F5A623] text-xs font-gotham font-bold uppercase tracking-widest shadow-sm">
            <Film className="w-3.5 h-3.5 text-[#D62828]" />
            {t?.trailersBadge || 'Producción Audiovisual Cinematográfica'}
          </div>
          <h2
            className={`font-gotham text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}
          >
            {t?.trailersTitle || 'Booktrailers que Convierten Espectadores en'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] to-[#F5A623]">
              {t?.trailersTitleHighlight || 'Lectores Obsesivos'}
            </span>
          </h2>
          <p className={`text-base sm:text-lg ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
            {t?.trailersSubtitle || 'Lanza tu libro con la misma emoción que un estreno cinematográfico. Producimos trailers en 4K con efectos visuales y sonido envolvente para tus anuncios en Meta, TikTok y YouTube.'}
          </p>
        </div>

        {/* Reproductor Principal y Carrusel Lateral */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lado Izquierdo: Pantalla de Reproducción de Video */}
          <div className="lg:col-span-8">
            <div
              className={`relative rounded-2xl overflow-hidden aspect-video border shadow-2xl group flex items-center justify-center ${
                theme === 'light'
                  ? 'border-slate-300 bg-slate-900'
                  : 'border-[#D62828]/40 bg-black shadow-[0_0_40px_rgba(214,40,40,0.25)]'
              }`}
            >
              {isPlaying && youtubeId ? (
                /* Reproductor de YouTube embebido en tiempo real */
                <div className="relative w-full h-full z-20">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={currentTrailer.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0 absolute inset-0"
                  />
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/80 hover:bg-black text-white hover:text-[#D62828] border border-white/20 transition-all cursor-pointer shadow-lg"
                    title={t?.trailersCloseBtn || 'Cerrar video'}
                    aria-label="Cerrar reproductor"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                /* Poster y botón de reproducción cinematográfico - EXACTAMENTE CENTRADO SOBRE EL VIDEO */
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={currentTrailer.thumbnail}
                    alt={currentTrailer.title}
                    className="absolute inset-0 w-full h-full object-cover brightness-75 filter contrast-105 transition-all duration-700 group-hover:scale-105"
                  />

                  {/* Degradado cinematográfico */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                  {/* Efecto letterbox de cine */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-black/80 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/80 pointer-events-none" />

                  {/* Botón Central de Play - Posicionado con precisión absoluta en el centro del video */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="pointer-events-auto relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#D62828] to-[#b71c1c] text-white flex items-center justify-center shadow-[0_0_50px_rgba(214,40,40,0.95)] hover:scale-110 active:scale-95 transition-all cursor-pointer group"
                      aria-label="Reproducir trailer en YouTube"
                    >
                      <span className="absolute inset-0 rounded-full bg-[#D62828] opacity-50 animate-ping pointer-events-none" />
                      <Play className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 fill-current text-white pl-1" />
                    </button>
                    <span className="mt-3 px-3 py-1 rounded-full bg-black/85 border border-white/20 text-[11px] font-gotham font-black uppercase tracking-wider text-white shadow-xl pointer-events-none">
                      {language === 'en' ? 'Watch Trailer' : 'Reproducir Trailer'}
                    </span>
                  </div>

                  {/* Información flotante sobre el video */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end pointer-events-none">
                    <div className="space-y-1">
                      <span className="text-[10px] font-gotham font-black uppercase tracking-wider text-[#F5A623] px-2 py-0.5 rounded bg-black/70 border border-[#D62828]/40">
                        {currentTrailer.genre}
                      </span>
                      <h4 className="font-gotham text-xl sm:text-2xl font-black text-white drop-shadow-md">
                        {currentTrailer.title}
                      </h4>
                      <p className="text-xs text-slate-300 font-medium">
                        {currentTrailer.duration} • Master 4K Ultra HD
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-white bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
                      <Volume2 className="w-4 h-4 text-[#F5A623]" />
                      <span>{t?.trailersSoundTag || 'Sonido Estéreo / 5.1'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lado Derecho: Carrusel Lateral de Booktrailers */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-3">
            {/* Barra superior de control del carrusel */}
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="font-gotham font-black text-sm uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#D62828]" />
                  <span>{t?.trailersCatalogTitle || 'Catálogo de Trailers'}</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  {selectedTrailer + 1} {t?.trailersOf || 'de'} {safeTrailers.length} {language === 'en' ? 'productions' : 'producciones'}
                </span>
              </div>

              {/* Botones de navegación del carrusel lateral */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollCarousel('prev')}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : 'bg-[#141118] hover:bg-[#1f1a24] border-white/10 text-white hover:border-[#D62828]'
                  }`}
                  title="Anterior en el carrusel"
                  aria-label="Anterior trailer"
                >
                  <span className="hidden lg:inline">
                    <ChevronUp className="w-4 h-4" />
                  </span>
                  <span className="lg:hidden">
                    <ChevronLeft className="w-4 h-4" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollCarousel('next')}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : 'bg-[#141118] hover:bg-[#1f1a24] border-white/10 text-white hover:border-[#D62828]'
                  }`}
                  title="Siguiente en el carrusel"
                  aria-label="Siguiente trailer"
                >
                  <span className="hidden lg:inline">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                  <span className="lg:hidden">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </div>

            {/* Ventana Contenedora del Carrusel:
                - En Desktop: Carrusel vertical acotado a la altura del video (max-h-[350px] o ~3-4 tarjetas visibles) con scroll suave y sin desbordarse
                - En Móvil: Carrusel horizontal suave con snap-x sin apilamiento vertical
            */}
            <div className="relative">
              <div
                ref={carouselContainerRef}
                className="lg:max-h-[350px] lg:overflow-y-auto overflow-x-auto lg:overflow-x-hidden flex lg:flex-col flex-row gap-2.5 scroll-smooth snap-y snap-mandatory py-1 px-0.5 [scrollbar-width:thin] [scrollbar-color:rgba(214,40,40,0.4)_transparent]"
              >
                {safeTrailers.map((trailer, idx) => {
                  const isSelected = selectedTrailer === idx;
                  return (
                    <div
                      key={trailer.id}
                      onClick={() => handleSelectTrailer(idx)}
                      className={`min-w-[260px] lg:min-w-0 flex-shrink-0 p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 snap-start group ${
                        isSelected
                          ? 'bg-[#1a141f] border-[#D62828] shadow-[0_0_20px_rgba(214,40,40,0.3)] ring-1 ring-[#D62828]'
                          : theme === 'light'
                          ? 'bg-slate-50 border-slate-200 hover:border-[#D62828]/50 hover:bg-slate-100'
                          : 'bg-[#141118]/70 border-white/10 hover:border-[#D62828]/50 hover:bg-[#141118]'
                      }`}
                    >
                      {/* Miniatura */}
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                        <img
                          src={trailer.thumbnail}
                          alt={trailer.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div
                          className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                            isSelected ? 'bg-black/30' : 'bg-black/50 group-hover:bg-black/30'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isSelected ? 'bg-[#D62828] text-white shadow-md' : 'bg-white/20 text-white'
                            }`}
                          >
                            <Play className="w-3 h-3 fill-current ml-0.5" />
                          </div>
                        </div>

                        <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-[8px] text-white font-mono leading-none">
                          {trailer.duration}
                        </span>
                      </div>

                      {/* Datos del Trailer */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[9px] font-gotham font-black uppercase text-[#F5A623] truncate">
                            {trailer.genre}
                          </span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse flex-shrink-0" />
                          )}
                        </div>
                        <h4
                          className={`font-gotham font-black text-xs truncate leading-snug ${
                            isSelected
                              ? 'text-white'
                              : theme === 'light'
                              ? 'text-slate-900 group-hover:text-[#D62828]'
                              : 'text-slate-200 group-hover:text-white'
                          }`}
                        >
                          {trailer.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {trailer.videoPlaceholderTag || 'Master 4K Ultra HD'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botón de Contacto / Llamado a la Acción */}
            <div className="pt-2">
              <a
                href="#contacto"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t?.trailersCtaBtn || 'Solicitar Booktrailer para mi Libro'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

