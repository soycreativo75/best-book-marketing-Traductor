import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote, Award, BookCheck, Sparkles, TrendingUp } from 'lucide-react';
import { TestimonialItem, ThemeMode } from '../types';

interface TestimonialsCarouselProps {
  testimonials: TestimonialItem[];
  theme: ThemeMode;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-avance suave cada 5.5 segundos, pausándose al pasar el cursor
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section
      id="casos-de-exito"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative z-10 py-20 lg:py-28 border-t transition-colors ${
        theme === 'light'
          ? 'bg-slate-50/70 border-slate-200'
          : 'bg-[#080709] border-white/10'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080709] border border-[#D62828]/45 text-[#F5A623] text-xs font-gotham font-bold uppercase tracking-widest shadow-sm">
            <Award className="w-3.5 h-3.5 text-[#D62828]" />
            Casos de Éxito Reales
          </div>
          <h2 className={`font-gotham text-3xl sm:text-4xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            Autores que Conquistaron el Podio de Amazon
          </h2>
          <p className={`text-sm sm:text-base ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
            Descubre los resultados de quienes confiaron su manuscrito a nuestra agencia editorial.
          </p>
        </div>

        {/* Carrusel Mostrando UNO POR UNO */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className={`rounded-3xl p-8 sm:p-12 border backdrop-blur-2xl shadow-2xl relative overflow-hidden ${
                theme === 'light'
                  ? 'bg-white border-slate-200 shadow-slate-200'
                  : 'bg-[#141118]/90 border-white/10 shadow-[0_0_45px_rgba(214,40,40,0.15)]'
              }`}
            >
              {/* Icono de comillas decorativo en el fondo */}
              <div className="absolute -top-4 -right-4 text-[#D62828]/10 pointer-events-none">
                <Quote className="w-40 h-40" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                {/* Columna Izquierda: Perfil y Métricas del Caso */}
                <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                  <div className="relative">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#D62828] shadow-[0_0_20px_rgba(214,40,40,0.3)]"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white p-1.5 rounded-lg font-bold shadow-md">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h4 className={`font-gotham text-xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      {current.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {current.role}
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#080709] border border-white/10 text-[#F5A623] text-xs font-gotham font-bold mt-2">
                      <BookCheck className="w-3.5 h-3.5" />
                      <span>{current.book}</span>
                    </div>
                  </div>

                  {/* Rating 5 estrellas */}
                  <div className="flex items-center gap-1 text-[#F5A623]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-xs font-bold text-slate-300 ml-1">5.0</span>
                  </div>
                </div>

                {/* Columna Derecha: Testimonio y Resultados */}
                <div className="md:col-span-7 space-y-6">
                  <p className={`text-base sm:text-lg italic leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}>
                    "{current.quote}"
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="p-3.5 rounded-xl bg-[#080709] border border-white/10">
                      <div className="text-[10px] uppercase font-gotham font-bold text-slate-400">
                        Hito de Posicionamiento
                      </div>
                      <div className="text-sm sm:text-base font-gotham font-black text-[#F5A623] mt-0.5">
                        {current.metric}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#080709] border border-white/10">
                      <div className="text-[10px] uppercase font-gotham font-bold text-slate-400">
                        Ventas en Primer Trimestre
                      </div>
                      <div className="text-sm sm:text-base font-gotham font-black text-emerald-400 mt-0.5 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{current.copies}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botones de navegación del carrusel */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-[#D62828]'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Ver testimonio ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-[#141118] border-white/10 text-slate-300 hover:border-[#D62828] hover:text-[#D62828]'
                }`}
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-[#141118] border-white/10 text-slate-300 hover:border-[#D62828] hover:text-[#D62828]'
                }`}
                aria-label="Testimonio siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
