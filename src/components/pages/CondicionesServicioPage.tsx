import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { FileCheck, ArrowLeft, ShieldAlert, Award, RefreshCw, DollarSign, HelpCircle, Check } from 'lucide-react';
import { ThemeMode, AppPage } from '../../types';
import { BestBookLogo } from '../BestBookLogo';
import { useSiteConfig } from '../../context/SiteConfigContext';

interface CondicionesServicioPageProps {
  theme: ThemeMode;
  onNavigate: (page: AppPage) => void;
}

export const CondicionesServicioPage: React.FC<CondicionesServicioPageProps> = ({
  theme,
  onNavigate,
}) => {
  const { config } = useSiteConfig();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const isLight = theme === 'light';

  const title = config.termsConditionsTitle || 'Condiciones del Servicio Editorial';
  const subtitle = config.termsConditionsContent || 'Directrices claras, plazos de entrega y compromisos mutuos que aseguran un proceso de producción y lanzamiento editorial con la máxima calidad y transparencia.';

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isLight ? 'bg-[#F4F6F8] text-slate-800' : 'bg-[#080709] text-slate-100'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Barra superior */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-10">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-2 text-xs font-gotham font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                : 'bg-[#141118] hover:bg-white/10 text-slate-200 border border-white/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-[#D62828]" />
            <span>Volver al Inicio</span>
          </button>

          <BestBookLogo theme={theme} size="sm" />
        </div>

        {/* Encabezado */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080709] border border-[#D62828]/45 text-[#F5A623] text-xs font-gotham font-bold uppercase tracking-wider mb-4 shadow-sm">
            <FileCheck className="w-4 h-4 text-[#D62828]" />
            Marco Contractual y Normativo
          </div>
          <h1 className={`font-gotham text-3xl sm:text-4xl font-black tracking-tight mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {title}
          </h1>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
            {subtitle}
          </p>
        </div>

        {/* Bloque especial: Transparencia y Realismo Comercial */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border mb-10 ${
            isLight
              ? 'bg-amber-50/90 border-amber-300 text-slate-900 shadow-sm'
              : 'bg-[#141118] border-amber-500/30 text-amber-200'
          }`}
        >
          <div className="flex items-start gap-4">
            <ShieldAlert className="w-6 h-6 text-[#D62828] flex-shrink-0 mt-1" />
            <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
              <h2 className="font-gotham font-black text-base text-[#D62828] uppercase tracking-wide">
                Cláusula de Transparencia Editorial y Simulaciones de Venta
              </h2>
              <p className={isLight ? 'text-slate-900 font-normal' : 'text-slate-300'}>
                En Best Book Marketing garantizamos la máxima excelencia técnica en diseño gráfico de portadas, maquetación profesional y optimización de palabras clave según las mejores prácticas de Amazon KDP.
              </p>
              <p className={isLight ? 'text-slate-900 font-semibold' : 'text-amber-200 font-medium'}>
                Sin embargo, el volumen final de ventas y la permanencia en el ranking dependen de factores comerciales independientes a la agencia (la calidad intrínseca del manuscrito, la aceptación del público, la coyuntura del mercado y el esfuerzo promocional continuo del propio autor). Las herramientas de cálculo o estimaciones presentadas en nuestra plataforma son simulaciones orientativas y en ningún caso constituyen una promesa o garantía de ingresos futuros.
              </p>
            </div>
          </div>
        </div>

        {/* Artículos principales */}
        <div
          className={`p-8 sm:p-10 rounded-3xl border shadow-xl space-y-8 text-sm leading-relaxed ${
            isLight ? 'bg-white border-slate-200 shadow-slate-200 text-slate-900' : 'bg-[#141118]/80 border-white/10 text-slate-200'
          }`}
        >
          {/* 1. Objeto y Alcance */}
          <section className="space-y-3">
            <h3 className="font-gotham font-black text-lg sm:text-xl text-[#D62828]">
              1. Objeto de la Contratación
            </h3>
            <p className={isLight ? 'text-slate-900 font-medium' : 'text-slate-300'}>
              Best Book Marketing provee servicios profesionales especializados para autores independientes y corporativos en las siguientes áreas según el paquete contratado:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className={`p-3.5 rounded-xl border flex items-center gap-2.5 ${isLight ? 'bg-slate-100 border-slate-300 text-slate-900 font-medium' : 'bg-white/5 border-white/10 text-slate-200'}`}>
                <Check className="w-4 h-4 text-[#D62828] flex-shrink-0" />
                <span>Diseño de portada frontal, lomo y contraportada</span>
              </div>
              <div className={`p-3.5 rounded-xl border flex items-center gap-2.5 ${isLight ? 'bg-slate-100 border-slate-300 text-slate-900 font-medium' : 'bg-white/5 border-white/10 text-slate-200'}`}>
                <Check className="w-4 h-4 text-[#D62828] flex-shrink-0" />
                <span>Maquetación ePub reflowable y PDF de imprenta</span>
              </div>
              <div className={`p-3.5 rounded-xl border flex items-center gap-2.5 ${isLight ? 'bg-slate-100 border-slate-300 text-slate-900 font-medium' : 'bg-white/5 border-white/10 text-slate-200'}`}>
                <Check className="w-4 h-4 text-[#D62828] flex-shrink-0" />
                <span>Producción audiovisual de booktrailers cinematográficos</span>
              </div>
              <div className={`p-3.5 rounded-xl border flex items-center gap-2.5 ${isLight ? 'bg-slate-100 border-slate-300 text-slate-900 font-medium' : 'bg-white/5 border-white/10 text-slate-200'}`}>
                <Check className="w-4 h-4 text-[#D62828] flex-shrink-0" />
                <span>Optimización de metadatos, categorías y Amazon Ads</span>
              </div>
            </div>
          </section>

          {/* 2. Propiedad Intelectual y Regalías */}
          <section className={`space-y-3 pt-6 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
            <h3 className="font-gotham font-black text-lg sm:text-xl text-[#D62828]">
              2. 100% de Regalías y Derechos Exclusivos
            </h3>
            <p className={isLight ? 'text-slate-900 font-medium' : 'text-slate-300'}>
              El cliente conserva en todo momento el 100% de las regalías y derechos de autor. Best Book Marketing no solicita comisiones por ventas ni participa como coeditor en las plataformas de distribución.
            </p>
            <p className={`text-xs ${isLight ? 'text-slate-700 font-normal' : 'text-slate-400'}`}>
              Todas las cuentas en Amazon KDP, IngramSpark o distribuidoras afines son de propiedad directa y exclusiva del autor.
            </p>
          </section>

          {/* 3. Proceso de Revisiones y Aprobación */}
          <section className={`space-y-3 pt-6 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
            <h3 className="font-gotham font-black text-lg sm:text-xl text-[#D62828]">
              3. Rondas de Revisión y Entregables
            </h3>
            <p className={isLight ? 'text-slate-900 font-medium' : 'text-slate-300'}>
              Para garantizar la satisfacción plena del autor, cada proyecto incluye hasta 3 rondas exhaustivas de revisión sobre los conceptos de portada y la maqueta interior.
            </p>
            <p className={`text-xs ${isLight ? 'text-slate-700 font-normal' : 'text-slate-400'}`}>
              Una vez aprobado el archivo final y entregados los archivos de alta resolución (PDF certificado para imprenta y ePub para Kindle), cualquier modificación de texto que altere el número de páginas requerirá un ajuste técnico adicional.
            </p>
          </section>

          {/* 4. Plazos de Ejecución */}
          <section className={`space-y-3 pt-6 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
            <h3 className="font-gotham font-black text-lg sm:text-xl text-[#D62828]">
              4. Plazos de Producción
            </h3>
            <p className={isLight ? 'text-slate-900 font-medium' : 'text-slate-300'}>
              Los plazos habituales de entrega son de 10 a 20 días hábiles a partir de la recepción del manuscrito final corregido y el briefing de portada completado. Los plazos urgentes podrán acordarse bajo modalidad express.
            </p>
          </section>

          {/* 5. Pagos y Cancelaciones */}
          <section className={`space-y-3 pt-6 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
            <h3 className="font-gotham font-black text-lg sm:text-xl text-[#D62828]">
              5. Pagos, Facturación y Garantía
            </h3>
            <p className={isLight ? 'text-slate-900 font-medium' : 'text-slate-300'}>
              Los proyectos se inician formalmente tras la confirmación del pago inicial estipulado en la propuesta comercial. Todos los importes incluyen factura fiscal desglosada.
            </p>
            <p className={`text-xs ${isLight ? 'text-slate-700 font-normal' : 'text-slate-400'}`}>
              Garantizamos que los archivos cumplen con el 100% de las directrices técnicas de Amazon KDP para su aceptación sin rechazos de imprenta.
            </p>
          </section>
        </div>

        {/* Botón de pie */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(214,40,40,0.35)] transition-all cursor-pointer"
          >
            Aceptar y Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};
