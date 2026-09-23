import React from 'react';
import { ThemeMode } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface BestBookLogoProps {
  theme?: ThemeMode;
  colorMode?: 'white' | 'black' | 'auto';
  layout?: 'horizontal' | 'stacked';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BestBookLogo: React.FC<BestBookLogoProps> = ({
  theme = 'dark',
  colorMode = 'auto',
  layout = 'horizontal',
  className = '',
  size = 'md',
}) => {
  const { config } = useSiteConfig();

  // Determinar si mostrar versión para fondo oscuro (blanco) o fondo claro
  const isWhiteText =
    colorMode === 'white' || (colorMode === 'auto' && theme === 'dark');

  // Si el usuario subió su propio logotipo mediante el panel de control
  const customLogoUrl = isWhiteText ? config.logoWhiteUrl : config.logoBlackUrl;

  if (customLogoUrl) {
    const heightClass =
      size === 'sm'
        ? 'h-8'
        : size === 'md'
        ? 'h-10'
        : size === 'lg'
        ? 'h-14'
        : 'h-18';

    return (
      <div className={`flex items-center select-none ${className}`}>
        <img
          src={customLogoUrl}
          alt="Best Book Marketing Logo"
          className={`${heightClass} w-auto object-contain transition-opacity duration-300`}
        />
      </div>
    );
  }

  // Logotipo vectorial con la nueva paleta: Rich Crimson Red (#D62828) y Amber Yellow (#F5A623)
  const renderWingedBook = (iconClass = 'w-9 h-7') => (
    <svg
      viewBox="0 0 600 360"
      className={`${iconClass} flex-shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bbmWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D62828" />
          <stop offset="100%" stopColor="#F5A623" />
        </linearGradient>
      </defs>
      <g fill="url(#bbmWingGrad)">
        {/* Ala Izquierda - Hoja Superior */}
        <path d="M 285 300 C 285 240, 260 140, 160 50 C 150 42, 140 40, 135 40 L 210 40 C 270 120, 290 210, 288 300 Z" />
        {/* Ala Izquierda - Hoja Media */}
        <path d="M 275 315 C 250 235, 190 135, 80 90 L 130 90 C 220 125, 275 220, 280 315 Z" />
        {/* Ala Izquierda - Hoja Inferior */}
        <path d="M 280 330 C 225 285, 125 210, 10 160 L 60 280 C 160 230, 245 295, 280 330 Z" />

        {/* Ala Derecha - Hoja Superior */}
        <path d="M 315 300 C 315 240, 340 140, 440 50 C 450 42, 460 40, 465 40 L 390 40 C 330 120, 310 210, 312 300 Z" />
        {/* Ala Derecha - Hoja Media */}
        <path d="M 325 315 C 350 235, 410 135, 520 90 L 470 90 C 380 125, 325 220, 320 315 Z" />
        {/* Ala Derecha - Hoja Inferior */}
        <path d="M 320 330 C 375 285, 475 210, 590 160 L 540 280 C 440 230, 355 295, 320 330 Z" />
      </g>
      {/* Destello central en Ámbar */}
      <circle cx="300" cy="310" r="16" fill="#F5A623" />
    </svg>
  );

  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <div className="w-20 sm:w-24 mb-1.5 flex justify-center">
          {renderWingedBook('w-full h-auto')}
        </div>
        <span
          className={`font-gotham font-black tracking-tight leading-none text-2xl sm:text-3xl ${
            isWhiteText ? 'text-white' : 'text-[#080709]'
          }`}
        >
          Best Book
        </span>
        <span className="font-gotham font-extrabold tracking-wide text-[#D62828] text-xl sm:text-2xl leading-tight mt-0.5">
          Marketing
        </span>
      </div>
    );
  }

  // Disposición horizontal para Header y Footer
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-[#D62828]/10 border border-[#D62828]/30 shadow-[0_0_15px_rgba(214,40,40,0.25)]">
        {renderWingedBook(
          size === 'sm'
            ? 'w-7 h-5'
            : size === 'lg'
            ? 'w-12 h-8'
            : size === 'xl'
            ? 'w-14 h-10'
            : 'w-9 h-6'
        )}
      </div>

      <div className="flex flex-col justify-center text-left">
        <span
          className={`font-gotham font-black tracking-tight leading-none ${
            size === 'sm'
              ? 'text-sm'
              : size === 'lg'
              ? 'text-xl sm:text-2xl'
              : 'text-base sm:text-lg'
          } ${isWhiteText ? 'text-white' : 'text-[#080709]'}`}
        >
          Best Book
        </span>
        <span
          className={`font-gotham font-extrabold tracking-wide text-[#D62828] leading-tight ${
            size === 'sm'
              ? 'text-[11px]'
              : size === 'lg'
              ? 'text-sm'
              : 'text-xs'
          }`}
        >
          Marketing
        </span>
      </div>
    </div>
  );
};
