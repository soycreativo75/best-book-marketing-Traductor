import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Sparkles, ShieldCheck, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { ThemeMode } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface RoyaltyCalculatorProps {
  theme: ThemeMode;
}

export const RoyaltyCalculator: React.FC<RoyaltyCalculatorProps> = ({ theme }) => {
  const { t, language } = useSiteConfig();
  const [bookPrice, setBookPrice] = useState<number>(14.99);
  const [pageCount, setPageCount] = useState<number>(220);
  const [projectedSales, setProjectedSales] = useState<number>(180);
  const [format, setFormat] = useState<'paperback' | 'ebook'>('paperback');

  // Cálculos matemáticos basados en los términos oficiales de Amazon KDP:
  // Paperback (Tapa blanda): Regalía = (60% * Precio) - Costo de impresión ($0.85 base + $0.012 por página aprox en B&N)
  // eBook (Kindle): Regalía = 70% del PVP (entre $2.99 y $9.99 USD en KDP Select)
  const printCost = format === 'paperback' ? +(0.85 + pageCount * 0.012).toFixed(2) : 0;
  const amazonFee = +(format === 'paperback' ? bookPrice * 0.40 : bookPrice * 0.30).toFixed(2);
  const royaltyPerUnit =
    format === 'paperback'
      ? Math.max(0, +(bookPrice * 0.60 - printCost).toFixed(2))
      : +(bookPrice * 0.70).toFixed(2);

  // Proyección mensual simulada según el volumen seleccionado
  const simulatedMonthlyRoyalty = Math.round(royaltyPerUnit * projectedSales);
  const simulatedAnnualRoyalty = simulatedMonthlyRoyalty * 12;

  // Comparativa con editorial tradicional (8% a 10% del PVP)
  const traditionalRoyaltyPerUnit = +(bookPrice * 0.09).toFixed(2);
  const traditionalMonthlyRoyalty = Math.round(traditionalRoyaltyPerUnit * projectedSales);

  const applyPresetScenario = (sales: number) => {
    setProjectedSales(sales);
  };

  return (
    <section
      id="calculadora"
      className={`relative z-10 py-20 lg:py-28 border-t transition-colors ${
        theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#080709] border-white/10'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera del Simulador */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080709] border border-[#D62828]/45 text-[#F5A623] text-xs font-gotham font-bold uppercase tracking-widest shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-[#D62828]" />
            {t?.calcBadge || 'Simulador de Márgenes & Regalías KDP'}
          </div>
          <h2 className={`font-gotham text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            {t?.calcTitle || 'Calcula tus Regalías Reales en'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] to-[#F5A623]">
              {t?.calcTitleHighlight || 'Amazon KDP'}
            </span>
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
            {t?.calcSubtitle || 'A diferencia del modelo editorial tradicional (donde el autor sólo recibe el 8-10%), en Amazon KDP retienes hasta el 70% de cada ejemplar vendido. Simula tus márgenes con las fórmulas oficiales de Amazon.'}
          </p>
        </div>

        {/* Tablero Principal de la Calculadora */}
        <div
          className={`rounded-3xl p-6 sm:p-10 border shadow-2xl ${
            theme === 'light'
              ? 'bg-white border-slate-200 shadow-slate-200'
              : 'bg-[#141118]/90 border-white/10 shadow-[0_0_45px_rgba(214,40,40,0.15)]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Columna Izquierda: Parámetros del Libro y Simulación */}
            <div className="lg:col-span-7 space-y-6">
              {/* Selector de Formato */}
              <div>
                <label className={`block text-xs font-gotham font-bold uppercase tracking-wider mb-2.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                  {t?.calcFormatLabel || '1. Formato de Edición'}:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormat('paperback');
                      if (bookPrice < 7.99) setBookPrice(14.99);
                    }}
                    className={`py-3 px-4 rounded-xl border text-xs font-gotham font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      format === 'paperback'
                        ? 'bg-[#D62828] text-white border-[#D62828] shadow-md'
                        : theme === 'light'
                        ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                        : 'bg-[#080709] border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span>{t?.calcPaperback || '📖 Tapa Blanda (Impreso)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormat('ebook');
                      if (bookPrice > 9.99) setBookPrice(4.99);
                    }}
                    className={`py-3 px-4 rounded-xl border text-xs font-gotham font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      format === 'ebook'
                        ? 'bg-[#D62828] text-white border-[#D62828] shadow-md'
                        : theme === 'light'
                        ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                        : 'bg-[#080709] border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span>{t?.calcEbook || '📱 eBook Kindle (Digital)'}</span>
                  </button>
                </div>
              </div>

              {/* Precio de Venta al Público (PVP) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={`text-xs font-gotham font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                    {t?.calcPriceLabel || '2. Precio de Venta al Público (PVP)'}:
                  </label>
                  <span className="font-gotham font-black text-lg text-[#F5A623]">
                    {bookPrice.toFixed(2)} € / $
                  </span>
                </div>
                <input
                  type="range"
                  min={format === 'ebook' ? 2.99 : 7.99}
                  max={format === 'ebook' ? 9.99 : 35.00}
                  step={0.50}
                  value={bookPrice}
                  onChange={(e) => setBookPrice(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-700 appearance-none cursor-pointer accent-[#D62828]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>{format === 'ebook' ? (language === 'en' ? '2.99 € (Min. 70%)' : '2.99 € (Mín. 70%)') : '7.99 €'}</span>
                  <span>{format === 'ebook' ? (language === 'en' ? '9.99 € (Max. 70%)' : '9.99 € (Máx. 70%)') : '35.00 €'}</span>
                </div>
              </div>

              {/* Número de Páginas (Solo Paperback) */}
              {format === 'paperback' && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={`text-xs font-gotham font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                      {t?.calcPagesLabel || '3. Extensión del Manuscrito'}:
                    </label>
                    <span className="font-gotham font-black text-sm text-slate-200">
                      {pageCount} {language === 'en' ? 'pages' : 'páginas'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={80}
                    max={650}
                    step={10}
                    value={pageCount}
                    onChange={(e) => setPageCount(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg bg-slate-700 appearance-none cursor-pointer accent-[#D62828]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>80 {language === 'en' ? 'pages' : 'págs'}</span>
                    <span>{language === 'en' ? `Print cost: ~${printCost.toFixed(2)} € / unit` : `Coste de imprenta: ~${printCost.toFixed(2)} € / unidad`}</span>
                    <span>650 {language === 'en' ? 'pages' : 'págs'}</span>
                  </div>
                </div>
              )}

              {/* Volumen de Ventas Proyectado */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={`text-xs font-gotham font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                    {t?.calcVolumeLabel || '4. Volumen Mensual Estimado'}:
                  </label>
                  <span className="font-gotham font-black text-lg text-[#F5A623]">
                    {projectedSales} {language === 'en' ? 'books / month' : 'libros / mes'}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={1200}
                  step={10}
                  value={projectedSales}
                  onChange={(e) => setProjectedSales(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-700 appearance-none cursor-pointer accent-[#D62828]"
                />

                {/* Botones de Escenarios Realistas */}
                <div className="flex flex-wrap gap-2 mt-3 items-center">
                  <span className={`text-[10px] uppercase font-gotham font-bold mr-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    {language === 'en' ? 'Simulation scenarios:' : 'Escenarios de simulación:'}
                  </span>
                  <button
                    type="button"
                    onClick={() => applyPresetScenario(40)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-gotham font-bold border transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                        : 'bg-[#080709] border-white/10 text-slate-300 hover:border-[#D62828]'
                    }`}
                  >
                    {language === 'en' ? 'Initial Launch (40/mo)' : 'Lanzamiento Inicial (40/mes)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPresetScenario(180)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-gotham font-bold border transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                        : 'bg-[#080709] border-white/10 text-slate-300 hover:border-[#D62828]'
                    }`}
                  >
                    {language === 'en' ? 'Category Top (180/mo)' : 'Top de Categoría (180/mes)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPresetScenario(600)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-gotham font-bold border transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                        : 'bg-[#080709] border-white/10 text-slate-300 hover:border-[#D62828]'
                    }`}
                  >
                    {language === 'en' ? '#1 Sustained Bestseller (600/mo)' : '#1 Bestseller Sostenido (600/mes)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta de Resultados */}
            <div className="lg:col-span-5 space-y-4">
              <div
                className={`p-6 sm:p-7 rounded-2xl border shadow-xl ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 shadow-slate-100'
                    : 'bg-[#080709] border-[#D62828]/50 shadow-[0_0_35px_rgba(214,40,40,0.2)]'
                }`}
              >
                <div className={`flex items-center justify-between pb-3 border-b mb-4 ${theme === 'light' ? 'border-slate-200' : 'border-white/10'}`}>
                  <span className={`text-xs font-gotham font-bold uppercase tracking-wider ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {t?.calcRoyaltyPerUnit || 'Regalía Limpia por Unidad'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-gotham font-black uppercase bg-[#D62828]/20 text-[#F5A623] border border-[#D62828]/40">
                    {format === 'paperback' ? '60% KDP' : '70% KDP'}
                  </span>
                </div>

                {/* Ganancia por ejemplar vendido */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-gotham text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] to-[#F5A623]">
                    {royaltyPerUnit.toFixed(2)} €
                  </span>
                  <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                    {t?.calcUnit || '/ por cada copia vendida'}
                  </span>
                </div>

                {/* Desglose de Amazon */}
                <div className={`space-y-2 py-3 border-y text-xs ${theme === 'light' ? 'border-slate-200' : 'border-white/10'}`}>
                  <div className={`flex justify-between ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    <span>{language === 'en' ? 'Retail Price (MSRP):' : 'Precio al Lector (PVP):'}</span>
                    <span className={`font-mono font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>{bookPrice.toFixed(2)} €</span>
                  </div>
                  {format === 'paperback' && (
                    <div className={`flex justify-between ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                      <span>{language === 'en' ? 'Amazon Print Cost:' : 'Coste Impresión Amazon:'}</span>
                      <span className="font-mono text-rose-600 font-bold">-{printCost.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className={`flex justify-between ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    <span>{language === 'en' ? 'Distribution Share:' : 'Comisión de Distribución:'}</span>
                    <span className={`font-mono ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>-{amazonFee.toFixed(2)} €</span>
                  </div>
                  <div className={`flex justify-between pt-1 font-bold ${theme === 'light' ? 'text-slate-900' : 'text-slate-300'}`}>
                    <span className="text-[#D62828]">{t?.calcNetMargin || 'Tu Margen Neto:'}</span>
                    <span className="font-mono text-emerald-600 font-black">+{royaltyPerUnit.toFixed(2)} €</span>
                  </div>
                </div>

                {/* Estimación mensual */}
                <div
                  className={`mt-5 p-4 rounded-xl border space-y-2 ${
                    theme === 'light'
                      ? 'bg-slate-100 border-slate-200 text-slate-900'
                      : 'bg-[#141118] border-white/10 text-white'
                  }`}
                >
                  <div className={`text-[11px] uppercase font-gotham font-bold ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {t?.calcMonthlySim || `Simulación Mensual (${projectedSales} uds):`}
                  </div>
                  <div className={`font-gotham text-2xl sm:text-3xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    ~{simulatedMonthlyRoyalty.toLocaleString('es-ES')} € <span className={`text-xs font-normal ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>{t?.calcPerMonth || '/ mes'}</span>
                  </div>
                  <div className={`text-[11px] ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {t?.calcAnnualSim || 'Proyección anualizada:'}{' '}
                    <strong className="text-[#D62828] font-bold">
                      ~{simulatedAnnualRoyalty.toLocaleString('es-ES')} € / {language === 'en' ? 'year' : 'año'}
                    </strong>
                  </div>
                </div>

                {/* Comparativa con Editorial Tradicional */}
                <div
                  className={`mt-4 p-3.5 rounded-xl border text-xs space-y-1 ${
                    theme === 'light'
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : 'bg-amber-500/10 border-amber-500/25 text-amber-200/90'
                  }`}
                >
                  <div
                    className={`font-gotham font-black uppercase text-[10px] flex items-center gap-1.5 ${
                      theme === 'light' ? 'text-amber-900' : 'text-amber-300'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    {language === 'en' ? 'Comparison with Traditional Publishing (8-10%):' : 'Comparativa con Editorial Tradicional (8-10%):'}
                  </div>
                  <p className={`text-[11px] leading-snug font-medium ${theme === 'light' ? 'text-amber-900' : 'text-amber-200/90'}`}>
                    {t?.calcComparison || `Con una editorial convencional recibirías sólo ~${traditionalRoyaltyPerUnit.toFixed(2)} €/libro (~${traditionalMonthlyRoyalty.toLocaleString('es-ES')} €/mes) y cederías tus derechos de autor por años.`}
                  </p>
                </div>

                <div className="mt-5 pt-2">
                  <a
                    href="#planes"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <span>{t?.calcCta || 'Lanzar mi Libro con 100% Regalías'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* DESCARGO DE RESPONSABILIDAD ÉTICO */}
          <div
            className={`mt-8 pt-6 border-t flex items-start gap-3 text-xs leading-relaxed p-4 rounded-2xl border ${
              theme === 'light'
                ? 'bg-slate-100 border-slate-200 text-slate-600'
                : 'bg-[#080709]/80 border-white/5 text-slate-400'
            }`}
          >
            <Info className="w-4 h-4 text-[#D62828] flex-shrink-0 mt-0.5" />
            <div>
              <span className={`font-gotham font-bold uppercase tracking-wide text-[11px] block mb-1 ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                {language === 'en' ? 'Disclaimer & Editorial Transparency:' : 'Descargo de Responsabilidad y Transparencia Editorial:'}
              </span>
              {t?.calcDisclaimer || 'Los valores presentados en este simulador se calculan aplicando con exactitud las fórmulas oficiales de regalías de Amazon KDP vigentes. Representan simulaciones y proyecciones basadas en los datos ingresados.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
