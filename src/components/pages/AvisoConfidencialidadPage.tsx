import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, FileText, ArrowLeft, CheckCircle2, EyeOff, UserCheck, Scale } from 'lucide-react';
import { ThemeMode, AppPage } from '../../types';
import { BestBookLogo } from '../BestBookLogo';
import { useSiteConfig } from '../../context/SiteConfigContext';

interface AvisoConfidencialidadPageProps {
  theme: ThemeMode;
  onNavigate: (page: AppPage) => void;
}

export const AvisoConfidencialidadPage: React.FC<AvisoConfidencialidadPageProps> = ({
  theme,
  onNavigate,
}) => {
  const { config } = useSiteConfig();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const isLight = theme === 'light';

  const title = config.privacyNoticeTitle || 'Aviso de Confidencialidad y Protección de Manuscritos';
  const subtitle = config.privacyNoticeContent || 'Garantía vinculante de no divulgación, custodia digital y preservación íntegra de la propiedad intelectual de cada autor que confía en Best Book Marketing.';
  const email = config.notificationEmail || 'soycreativo2023@gmail.com';

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isLight ? 'bg-[#F4F6F8] text-slate-800' : 'bg-[#080709] text-slate-100'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Barra superior de navegación */}
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

        {/* Encabezado del documento */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080709] border border-[#D62828]/45 text-[#F5A623] text-xs font-gotham font-bold uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#D62828]" />
            Compromiso Legal & Ético Editorial
          </div>
          <h1 className={`font-gotham text-3xl sm:text-4xl font-black tracking-tight mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {title}
          </h1>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
            {subtitle}
          </p>
        </div>

        {/* Tarjetas de garantía destacadas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div
            className={`p-5 rounded-2xl border ${
              isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-[#141118] border-white/10 text-white'
            }`}
          >
            <Lock className="w-6 h-6 text-[#D62828] mb-3" />
            <h2 className="font-gotham font-bold text-sm mb-1 text-[#D62828]">NDA Automático</h2>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
              Cada borrador, capítulo o sinopsis compartida está sujeta a secreto profesional y protección estricta contra divulgación.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border ${
              isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-[#141118] border-white/10 text-white'
            }`}
          >
            <UserCheck className="w-6 h-6 text-[#D62828] mb-3" />
            <h2 className="font-gotham font-bold text-sm mb-1 text-[#D62828]">100% Titularidad del Autor</h2>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
              El autor conserva en todo momento el 100% de los derechos morales y patrimoniales de su obra sin excepciones.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border ${
              isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-[#141118] border-white/10 text-white'
            }`}
          >
            <EyeOff className="w-6 h-6 text-[#D62828] mb-3" />
            <h2 className="font-gotham font-bold text-sm mb-1 text-[#D62828]">Cero Fugas o Filtraciones</h2>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
              Almacenamiento en servidores cifrados AES-256 con acceso restringido exclusivamente al equipo técnico asignado.
            </p>
          </div>
        </div>

        {/* Artículos y Clausulado detallado */}
        <div
          className={`p-8 sm:p-10 rounded-3xl border shadow-xl space-y-8 text-sm leading-relaxed ${
            isLight ? 'bg-white border-slate-200 shadow-slate-200 text-slate-900' : 'bg-[#141118]/80 border-white/10 text-slate-200'
          }`}
        >
          {/* Sección 1 */}
          <section className="space-y-3">
            <h3 className="font-gotham font-black text-lg sm:text-xl text-[#D62828] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#D62828]" />
              1. Alcance y Compromiso de No Divulgación (NDA)
            </h3>
            <p className={isLight ? 'text-slate-900 font-medium' : 'text-slate-300'}>
              En Best Book Marketing consideramos el manuscrito de un autor como un secreto comercial y una obra de valor inestimable. Toda información, archivo digital, borrador, sinopsis, esquema o material gráfico transmitido a través de nuestros canales de comunicación o plataformas de carga goza de la consideración de <strong>Información Estrictamente Confidencial</strong>.
            </p>
            <p className={`text-xs ${isLight ? 'text-slate-700 font-normal' : 'text-slate-400'}`}>
              Nuestro personal directivo, diseñadores de portada, maquetadores y estrategas de marketing firman acuerdos individuales vinculantes de confidencialidad con sanciones legales expresas ante cualquier intento de reproducción no autorizada.
            </p>
          </section>

          {/* Sección 2 */}
          <section className={`space-y-3 pt-6 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
            <h3 className="font-gotham font-black text-lg sm:text-xl text-[#D62828] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#D62828]" />
              2. Propiedad Intelectual Inalienable
            </h3>
            <p className={isLight ? 'text-slate-900 font-medium' : 'text-slate-300'}>
              Best Book Marketing actúa exclusivamente como prestador de servicios de diseño, diagramación técnica y consultoría de lanzamiento. En ningún caso la contratación de nuestros servicios implica cesión, licencia exclusiva o transferencia de derechos de autor.
            </p>
            <ul className={`space-y-2 text-xs pl-4 border-l-2 border-[#D62828] ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
              <li>• El autor es y será siempre el único titular legal de la obra.</li>
              <li>• Todas las regalías generadas en Amazon KDP u otras plataformas pertenecen al autor en su totalidad (100%).</li>
              <li>• Best Book Marketing no solicita ni retiene comisión porcentual sobre las ventas de los libros.</li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section className={`space-y-3 pt-6 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
            <h3 className="font-gotham font-black text-lg sm:text-xl text-[#D62828] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#D62828]" />
              3. Seguridad y Protocolos de Almacenamiento
            </h3>
            <p className={isLight ? 'text-slate-900 font-medium' : 'text-slate-300'}>
              Los archivos de trabajo se almacenan en repositorios privados con autenticación de dos factores (2FA) y cifrado de extremo a extremo. Una vez finalizado y aprobado el proyecto por el cliente, los borradores intermedios son archivados bajo custodia segura o eliminados a solicitud expresa del autor.
            </p>
          </section>

          {/* Sección 4 */}
          <section className={`space-y-3 pt-6 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
            <h3 className="font-gotham font-black text-lg sm:text-xl text-[#D62828] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#D62828]" />
              4. Cumplimiento Normativo (RGPD y Leyes Internacionales)
            </h3>
            <p className={isLight ? 'text-slate-900 font-medium' : 'text-slate-300'}>
              Tratamos los datos de carácter personal (nombres, direcciones de correo, teléfonos y datos de facturación) bajo los más estrictos estándares del Reglamento General de Protección de Datos (RGPD) de la Unión Europea y las legislaciones aplicables en Latinoamérica y Estados Unidos.
            </p>
            <p className={`text-xs ${isLight ? 'text-slate-700 font-normal' : 'text-slate-400'}`}>
              Para ejercer sus derechos de acceso, rectificación, supresión o solicitar un acuerdo de confidencialidad personalizado firmado con sello de nuestra agencia, puede escribir a: <strong>{email}</strong>.
            </p>
          </section>
        </div>

        {/* Botón de pie */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(214,40,40,0.35)] transition-all cursor-pointer"
          >
            Entendido, Regresar al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};
