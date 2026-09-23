import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Star, Sparkles, BookOpen, Barcode, CheckCircle } from 'lucide-react';
import { BookPreset, ThemeMode } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface InteractiveBook3DProps {
  currentBook: BookPreset;
  theme: ThemeMode;
}

// Fases de la coreografía continua de animación
type AnimationPhase =
  | 'idle'
  | 'opening'
  | 'flipping'
  | 'closing'
  | 'spinning'
  | 'waiting';

export const InteractiveBook3D: React.FC<InteractiveBook3DProps> = ({ currentBook, theme }) => {
  const { config } = useSiteConfig();
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [tilt, setTilt] = useState({ x: 4, y: -10 });
  const [isHovered, setIsHovered] = useState(false);

  // Referencias para evitar stale closures en temporizadores
  const isHoveredRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cycleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  // Coreografía continua solicitada:
  // 1. Abre la portada
  // 2. Se mueven algunas hojas sin sobrepasar la portada
  // 3. Se cierra el libro
  // 4. Gira el libro una vez mostrando la contraportada y regresa a su posición original
  // 5. Espera 2 segundos exactos
  // 6. Si sigue el mouse sobre el libro, vuelve a comenzar la animación en bucle continuo
  const startChoreography = () => {
    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);

    // 1. Abre la portada (0ms a 900ms)
    setPhase('opening');

    // 2. Hojeo de páginas internas sin pasar la portada (a los 900ms hasta 2400ms)
    cycleTimeoutRef.current = setTimeout(() => {
      setPhase('flipping');

      // 3. Se cierra el libro herméticamente (a los 2400ms hasta 3200ms)
      cycleTimeoutRef.current = setTimeout(() => {
        setPhase('closing');

        // 4. Gira el libro 360° mostrando contraportada y vuelve (a los 3200ms hasta 5200ms)
        cycleTimeoutRef.current = setTimeout(() => {
          setPhase('spinning');

          // 5. Vuelve a su posición original y ESPERA EXACTAMENTE 2 SEGUNDOS (5200ms a 7200ms)
          cycleTimeoutRef.current = setTimeout(() => {
            setPhase('waiting');

            // 6. Tras los 2 segundos de espera, si el mouse sigue sobre, reinicia el ciclo
            cycleTimeoutRef.current = setTimeout(() => {
              if (isHoveredRef.current) {
                startChoreography();
              } else {
                setPhase('idle');
              }
            }, 2000); // 2000 ms = 2 segundos exactos
          }, 2000); // Duración del giro 360°
        }, 800); // Duración de cierre
      }, 1500); // Duración del hojeo
    }, 900); // Duración de apertura
  };

  const stopChoreography = () => {
    if (cycleTimeoutRef.current) {
      clearTimeout(cycleTimeoutRef.current);
      cycleTimeoutRef.current = null;
    }
    // Regresa a reposo
    setPhase('idle');
  };

  // Solo reacciona a mouseover / mouseenter (NO al click)
  const handleMouseEnter = () => {
    setIsHovered(true);
    isHoveredRef.current = true;
    if (phase === 'idle' || phase === 'waiting') {
      startChoreography();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    isHoveredRef.current = false;
    setTilt({ x: 4, y: -10 });
    if (phase === 'waiting' || phase === 'idle') {
      stopChoreography();
    }
  };

  // Limpieza al desmontar
  useEffect(() => {
    return () => {
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    };
  }, []);

  // Parámetros angulares ópticamente calibrados para que la portada NUNCA desaparezca:
  // Ángulo de apertura de portada: -56° (claramente visible en perspectiva 3D, nunca llega a -90°)
  // Página 1 (Capítulo II): -38° (estrictamente detrás de la portada)
  // Página 2 (Prólogo): -20° (estrictamente detrás de la Página 1)
  let coverRotateY = 0;
  let page1RotateY = 0;
  let page2RotateY = 0;
  let bookRotateY = tilt.y;
  let bookRotateX = tilt.x;

  if (phase === 'opening') {
    coverRotateY = -56;
    page1RotateY = -34;
    page2RotateY = -18;
    bookRotateY = -6;
    bookRotateX = 3;
  } else if (phase === 'flipping') {
    coverRotateY = -56;
    page1RotateY = -42;
    page2RotateY = -24;
    bookRotateY = -6;
    bookRotateX = 3;
  } else if (phase === 'closing') {
    coverRotateY = 0;
    page1RotateY = 0;
    page2RotateY = 0;
    bookRotateY = -10;
    bookRotateX = 4;
  } else if (phase === 'spinning') {
    coverRotateY = 0;
    page1RotateY = 0;
    page2RotateY = 0;
    // Giro completo de 360° mostrando lomo y contraportada
    bookRotateY = -370;
    bookRotateX = 4;
  } else {
    // idle o waiting
    coverRotateY = 0;
    page1RotateY = 0;
    page2RotateY = 0;
    bookRotateY = tilt.y;
    bookRotateX = tilt.x;
  }

  // Transiciones fluidas adaptadas a cada fase
  const getCoverTransition = (): any => {
    if (phase === 'opening') return { duration: 0.85, ease: [0.25, 1, 0.5, 1] };
    if (phase === 'closing') return { duration: 0.75, ease: 'easeInOut' };
    return { duration: 0.4 };
  };

  const getPage1Transition = (): any => {
    if (phase === 'opening') return { duration: 0.75, delay: 0.1, ease: 'easeOut' };
    if (phase === 'flipping') return { duration: 1.3, repeat: 1, repeatType: 'reverse', ease: 'easeInOut' };
    if (phase === 'closing') return { duration: 0.6, ease: 'easeIn' };
    return { duration: 0.4 };
  };

  const getPage2Transition = (): any => {
    if (phase === 'opening') return { duration: 0.75, delay: 0.2, ease: 'easeOut' };
    if (phase === 'flipping') return { duration: 1.2, repeat: 1, repeatType: 'reverse', ease: 'easeInOut' };
    if (phase === 'closing') return { duration: 0.5, ease: 'easeIn' };
    return { duration: 0.4 };
  };

  const getBookTransition = (): any => {
    if (phase === 'spinning') {
      return { duration: 1.9, ease: 'easeInOut' };
    }
    return { duration: 0.6, ease: 'easeOut' };
  };

  return (
    <div className="flex flex-col items-center justify-center relative w-full select-none">
      {/* Contenedor con perspectiva 3D - SOLO reacciona a mouseover (NO a click) */}
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="perspective-1200 w-full max-w-[340px] sm:max-w-[390px] h-[470px] sm:h-[520px] flex items-center justify-center cursor-default relative py-6 group select-none"
        aria-label="Libro 3D interactivo con apertura de portada, hojeo de páginas sin sobrepasar la tapa y giro 360°"
      >
        {/* Resplandor ambiental dinámico con Rich Crimson Red y Amber Yellow */}
        <div
          className="absolute inset-0 rounded-full blur-[90px] opacity-40 transition-all duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(214,40,40,0.35) 0%, rgba(245,166,35,0.2) 60%, transparent 80%)',
            transform: `scale(${phase !== 'idle' ? 1.25 : 1})`,
          }}
        />

        {/* Badge flotante de Bestseller Amazon KDP */}
        <div className="absolute top-2 right-4 sm:right-6 z-30 pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#141118]/95 border border-[#D62828]/50 shadow-[0_4px_25px_rgba(214,40,40,0.35)] backdrop-blur-md flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-[#D62828] text-white flex items-center justify-center">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-[#F5A623] font-gotham font-black">
                AMAZON KDP
              </div>
              <div className="text-[11px] font-gotham font-black text-white">
                #1 Bestseller Badge
              </div>
            </div>
          </div>
        </div>

        {/* Sombra de apoyo en la mesa */}
        <div
          className="absolute bottom-6 w-[230px] sm:w-[260px] h-9 rounded-full bg-black/80 blur-xl pointer-events-none transition-all duration-500"
          style={{
            transform: `scale(${phase === 'opening' || phase === 'flipping' ? 1.15 : 1})`,
            opacity: phase === 'spinning' ? 0.4 : 0.85,
          }}
        />

        {/* ========================================================================= */}
        {/* CONTENEDOR PRINCIPAL DEL LIBRO 3D (GIRA 360° EN FASE 'SPINNING')           */}
        {/* ========================================================================= */}
        <motion.div
          className="relative preserve-3d w-[240px] sm:w-[270px] h-[360px] sm:h-[400px]"
          animate={{
            rotateX: bookRotateX,
            rotateY: bookRotateY,
          }}
          transition={getBookTransition()}
        >
          {/* ========================================================================= */}
          {/* PÁGINA INTERNA DERECHA (FONDO EDITORIAL FIJO DE IMPRENTA)                 */}
          {/* ========================================================================= */}
          <div
            className={`absolute inset-0 rounded-r-lg bg-[#fbf9f4] text-slate-800 p-5 shadow-2xl overflow-hidden border-r-2 border-amber-900/20 z-0 ${
              theme === 'light' ? 'shadow-slate-400' : ''
            }`}
            style={{ transform: 'translateZ(-1px)' }}
          >
            <div className="flex justify-between items-center text-[8px] tracking-widest text-slate-400 uppercase font-mono pb-2 border-b border-slate-200">
              <span className="font-gotham font-bold">{currentBook.category}</span>
              <span className="font-mono">PÁG. 17</span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex gap-2">
                <span className="text-2xl font-serif font-black leading-none text-[#D62828]">E</span>
                <div className="space-y-1.5 flex-1 pt-1">
                  <div className="h-1.5 bg-slate-400/80 rounded w-full" />
                  <div className="h-1.5 bg-slate-300/90 rounded w-[92%]" />
                </div>
              </div>
              <div className="h-1.5 bg-slate-300/90 rounded w-full" />
              <div className="h-1.5 bg-slate-300/80 rounded w-[96%]" />
              <div className="h-1.5 bg-slate-300/80 rounded w-[88%]" />
              <div className="h-1.5 bg-slate-300/90 rounded w-[94%]" />

              <div className="pt-2">
                <div className="w-8 h-[1px] bg-slate-300 mx-auto my-2" />
                <div className="h-1.5 bg-slate-400/80 rounded w-[80%]" />
                <div className="h-1.5 bg-slate-300/80 rounded w-[90%] mt-1.5" />
                <div className="h-1.5 bg-slate-300/80 rounded w-[85%] mt-1.5" />
                <div className="h-1.5 bg-slate-300/70 rounded w-[70%] mt-1.5" />
              </div>
            </div>

            <div className="absolute bottom-4 right-4 text-[7px] tracking-widest uppercase text-slate-400 font-gotham font-bold">
              Best Book Marketing Edition
            </div>
          </div>

          {/* ========================================================================= */}
          {/* HOJA INTERIOR 1 (CAPÍTULO II) - NUNCA SOBREPASA LA PORTADA                */}
          {/* ========================================================================= */}
          <motion.div
            className="absolute inset-0 rounded-r-lg bg-[#f7f4ec] text-slate-800 p-5 shadow-lg overflow-hidden border-r border-amber-900/20 origin-left z-10"
            animate={{ rotateY: page1RotateY }}
            transition={getPage1Transition()}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex justify-between items-center text-[8px] text-slate-400 uppercase font-mono pb-2 border-b border-slate-200">
              <span className="font-gotham font-bold">Capítulo II</span>
              <span>15</span>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="h-1.5 bg-slate-400/80 rounded w-[75%]" />
              <div className="h-1.5 bg-slate-300/80 rounded w-full" />
              <div className="h-1.5 bg-slate-300/90 rounded w-[94%]" />
              <div className="h-1.5 bg-slate-300/80 rounded w-[90%]" />
              <div className="h-1.5 bg-slate-300/80 rounded w-[85%]" />
              <div className="h-1.5 bg-slate-300/90 rounded w-[96%]" />
              <div className="h-1.5 bg-slate-300/70 rounded w-[60%]" />
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* HOJA INTERIOR 2 (PRÓLOGO) - NUNCA SOBREPASA LA HOJA 1 NI LA PORTADA       */}
          {/* ========================================================================= */}
          <motion.div
            className="absolute inset-0 rounded-r-lg bg-[#faf8f2] text-slate-800 p-5 shadow-md overflow-hidden border-r border-amber-900/20 origin-left z-15"
            animate={{ rotateY: page2RotateY }}
            transition={getPage2Transition()}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex justify-between items-center text-[8px] text-slate-400 uppercase font-mono pb-2 border-b border-slate-200">
              <span className="font-gotham font-bold">Prólogo</span>
              <span>11</span>
            </div>
            <div className="mt-4 space-y-1.5">
              <div className="h-1.5 bg-slate-400/80 rounded w-[85%]" />
              <div className="h-1.5 bg-slate-300/90 rounded w-full" />
              <div className="h-1.5 bg-slate-300/80 rounded w-[92%]" />
              <div className="h-1.5 bg-slate-300/80 rounded w-[88%]" />
              <div className="h-1.5 bg-slate-300/90 rounded w-[95%]" />
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* CUBIERTA FRONTAL 3D: SE ABRE A -56°, PERMANECE VISIBLE Y SE CIERRA        */}
          {/* ========================================================================= */}
          <motion.div
            className="absolute inset-0 rounded-r-xl rounded-l-sm origin-left z-20"
            animate={{ rotateY: coverRotateY }}
            transition={getCoverTransition()}
            style={{
              transformStyle: 'preserve-3d',
              boxShadow:
                coverRotateY < -20
                  ? '-14px 20px 40px rgba(0,0,0,0.8), 0 0 25px rgba(214,40,40,0.3)'
                  : '10px 20px 40px rgba(0,0,0,0.85), -5px 0 20px rgba(214,40,40,0.2)',
            }}
          >
            {/* Cara frontal de la portada */}
            <div
              className="relative w-full h-full rounded-r-xl rounded-l-sm overflow-hidden border-y border-r border-white/20"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {config.heroBookCustomCoverImage ? (
                /* Imagen personalizada de portada subida por el usuario */
                <div className="relative w-full h-full">
                  <img
                    src={config.heroBookCustomCoverImage}
                    alt="Portada del Libro"
                    className="w-full h-full object-cover"
                  />
                  {/* Destello de brillo interactivo */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
                    style={{
                      background: `radial-gradient(circle at 45% 45%, rgba(255,255,255,0.85) 0%, transparent 60%)`,
                    }}
                  />
                  {/* Relieve sutil del lomo */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/80 via-transparent to-black/20 pointer-events-none border-r border-white/10" />
                </div>
              ) : (
                /* Diseño editorial predeterminado con gradiente de alto impacto */
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentBook.gradient} opacity-100`} />

                  {/* Destello de brillo interactivo */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
                    style={{
                      background: `radial-gradient(circle at 45% 45%, rgba(255,255,255,0.85) 0%, transparent 60%)`,
                    }}
                  />

                  {/* Relieve del lomo */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/80 via-transparent to-black/25 pointer-events-none border-r border-white/10" />

                  {/* Contenido frontal de la portada */}
                  <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                    {/* Cabecera de la Portada */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-gotham font-black tracking-widest uppercase text-white px-2.5 py-0.5 rounded bg-black/40 border border-white/20 backdrop-blur-sm shadow-sm">
                        {currentBook.category}
                      </span>
                      <div className="flex text-[#F5A623] text-xs tracking-tighter drop-shadow-sm">
                        ★★★★★
                      </div>
                    </div>

                    {/* Centro de la portada con tipografía Gotham Black de alto impacto */}
                    <div className="space-y-2.5 my-auto">
                      <div className="w-10 h-[3px] bg-gradient-to-r from-[#F5A623] via-white to-[#F5A623] shadow-sm" />
                      <h2 className="font-gotham text-2xl sm:text-3xl font-black text-white tracking-tight leading-none uppercase drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]">
                        {currentBook.title}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-white/90 leading-snug font-medium line-clamp-3 drop-shadow-sm">
                        {currentBook.subtitle}
                      </p>
                    </div>

                    {/* Pie de portada: Sello de lanzamiento KDP */}
                    <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#F5A623] animate-ping" />
                        <span className="text-[10px] tracking-wider uppercase font-gotham font-black text-white drop-shadow-sm">
                          Edición Especial KDP
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-black/40 border border-white/30 flex items-center justify-center text-[10px] font-gotham font-black text-[#F5A623] shadow-sm">
                        KDP
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Contracubierta interior de la portada (visible si se gira hacia atrás) */}
            <div
              className="absolute inset-0 rounded-r-xl rounded-l-sm bg-[#141118] border border-white/10 p-5 flex flex-col justify-between"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="text-[9px] uppercase font-gotham font-black text-[#D62828]">
                Best Book Marketing
              </div>
              <div className="text-center my-auto">
                <BookOpen className="w-10 h-10 text-[#F5A623]/60 mx-auto mb-2" />
                <p className="text-[10px] text-slate-300 font-gotham font-bold uppercase tracking-wider">
                  Edición Certificada para Amazon KDP
                </p>
              </div>
              <div className="text-[8px] text-slate-400 font-mono text-center">
                ISBN 978-3-16-148410-0
              </div>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* LOMO DEL LIBRO 3D (VISIBLE CUANDO GIRA)                                   */}
          {/* ========================================================================= */}
          <div
            className="absolute top-0 bottom-0 left-0 w-[42px] border-y border-l border-[#D62828]/60 rounded-l-sm overflow-hidden z-10 shadow-lg"
            style={{
              transform: 'translateX(-41px) rotateY(-90deg)',
              transformOrigin: 'right center',
            }}
          >
            {config.heroBookCustomSpineImage ? (
              <img
                src={config.heroBookCustomSpineImage}
                alt="Lomo del Libro"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#6a040f] flex flex-col items-center justify-between py-5 text-white">
                <div className="text-[9px] font-gotham font-black text-[#F5A623]">BBM</div>
                <span
                  className="font-gotham text-[10px] font-black text-white tracking-widest whitespace-nowrap uppercase drop-shadow-sm"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {currentBook.title}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
              </div>
            )}
          </div>

          {/* Canto de páginas del libro (Grosor lateral derecho) */}
          <div
            className="absolute top-1 bottom-1 right-0 w-[38px] bg-[#e6e2d8] rounded-r-sm z-0 shadow-inner"
            style={{
              transform: 'translateX(37px) rotateY(90deg)',
              transformOrigin: 'left center',
              backgroundImage: 'repeating-linear-gradient(to right, #cfc9be 0px, #fbf9f4 2px, #e6e2d8 3px)',
            }}
          />

          {/* ========================================================================= */}
          {/* CONTRAPORTADA POSTERIOR REALISTA (SE MUESTRA CLARAMENTE DURANTE EL GIRO) */}
          {/* ========================================================================= */}
          <div
            className="absolute inset-0 rounded-l-xl overflow-hidden border border-[#D62828]/60 text-white"
            style={{
              transform: 'translateZ(-39px) rotateY(180deg)',
              background: `linear-gradient(135deg, #780016 0%, #9D0208 50%, #4A000E 100%)`,
              backfaceVisibility: 'visible',
            }}
          >
            {config.heroBookCustomBackCoverImage ? (
              <img
                src={config.heroBookCustomBackCoverImage}
                alt="Contraportada del Libro"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full p-5 flex flex-col justify-between">
                {/* Cabecera de la Contraportada */}
                <div className="flex items-center justify-between pb-2 border-b border-white/20">
                  <span className="text-[9px] font-gotham font-black uppercase text-[#F5A623]">
                    Sinopsis Oficial
                  </span>
                  <span className="text-[9px] font-gotham font-bold text-white/80">
                    KDP Verified
                  </span>
                </div>

                {/* Texto de Sinopsis */}
                <div className="space-y-2 py-2">
                  <p className="text-[10px] sm:text-[11px] leading-relaxed text-white/90 font-sans">
                    &ldquo;Una obra indispensable diseñada minuciosamente para cautivar desde el primer capítulo hasta la última página. Posicionada como referente indiscutible en su categoría.&rdquo;
                  </p>
                  <div className="flex items-center gap-1 text-[#F5A623] text-xs">
                    ★★★★★
                    <span className="text-[9px] text-white/70 ml-1 font-mono">
                      (500+ reseñas de 5 estrellas)
                    </span>
                  </div>
                </div>

                {/* Código de barras y sellos editoriales */}
                <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                  <div className="bg-white p-1 rounded flex items-center shadow-sm">
                    <Barcode className="w-12 h-6 text-black" />
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] font-gotham font-bold uppercase text-[#F5A623]">
                      Best Book Marketing
                    </span>
                    <span className="block text-[9px] font-mono text-white/80">
                      978-84-123456-7-8
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Badge flotante inferior */}
        <div className="absolute bottom-2 left-4 sm:left-6 z-30 pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#141118]/95 border border-white/10 shadow-lg backdrop-blur-md flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F5A623]" />
            <span className="text-[11px] font-gotham font-bold text-slate-200">
              Maquetación Editorial Pro
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
