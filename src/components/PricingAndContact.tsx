import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, Sparkles, Send, Calendar, Clock, Star, ArrowRight } from 'lucide-react';
import { ThemeMode } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface PricingAndContactProps {
  theme: ThemeMode;
}

export const PricingAndContact: React.FC<PricingAndContactProps> = ({ theme }) => {
  const { config, addLead, t, language } = useSiteConfig();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    genero: 'No-Ficción / Negocios',
    estado: 'Manuscrito Terminado',
    mensaje: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      source: 'contact_form',
      name: formData.nombre,
      email: formData.email,
      genre: formData.genero,
      manuscriptStatus: formData.estado,
      message: formData.mensaje,
    });
    setFormSubmitted(true);
  };

  const plans = [
    {
      name: language === 'en' ? 'KDP Essential Launch' : config.planStarterTitle,
      badge: language === 'en' ? 'Ideal for First-Time Authors' : 'Ideal para Primerizos',
      price: `$${config.planStarterPrice.toLocaleString()}`,
      period: t?.pricingOneTimePayment || (language === 'en' ? 'one-time fee' : 'pago único'),
      desc: language === 'en'
        ? 'Everything required to publish with professional editorial quality and eliminate technical rejections.'
        : 'Todo lo indispensable para publicar con calidad editorial profesional y evitar rechazos técnicos.',
      features: language === 'en'
        ? [
            'eBook and Paperback Cover Design',
            'KDP Editorial Formatting (ePub & Print-Ready PDF)',
            'Metadata Optimization & 10 KDP Subcategories',
            '3-Piece High-Def 3D Mockup Pack',
            '100% Amazon Technical Ingestion Guarantee',
          ]
        : [
            'Diseño de Portada para eBook y Tapa Blanda',
            'Maquetación Editorial KDP (ePub & PDF de Imprenta)',
            'Optimización de Metadatos y 10 Categorías KDP',
            'Kit de 3 Mockups 3D Publicitarios',
            'Garantía de Aprobación 100% en Amazon',
          ],
      popular: false,
    },
    {
      name: language === 'en' ? 'Bestseller Authority Pro' : config.planProTitle,
      badge: language === 'en' ? 'Author Favorite' : 'El Más Elegido',
      price: `$${config.planProPrice.toLocaleString()}`,
      period: t?.pricingOneTimePayment || (language === 'en' ? 'one-time fee' : 'pago único'),
      desc: language === 'en'
        ? 'Our flagship solution with 4K booktrailer and pre-order campaign to hit the #1 badge.'
        : 'Nuestra solución insignia con Booktrailer 4K y estrategia de preventa para alcanzar el badge #1.',
      features: language === 'en'
        ? [
            'Everything in the Essential Launch Pack',
            'Cinematic 4K Booktrailer (9:16 vertical & 16:9 widescreen)',
            'Premium A+ Content Design (4 Custom Modules)',
            '30-Day Launch Roadmap & ARC Review Squad Strategy',
            'Guided Amazon Ads Campaign for launch week',
            'Priority 1-on-1 WhatsApp Support with Executive Director',
          ]
        : [
            'Todo lo del Pack Lanzamiento Esencial',
            'Booktrailer Cinematográfico 4K (9:16 y 16:9)',
            'Diseño de Contenido A+ (4 Módulos Premium)',
            'Estrategia de 30 Días para Equipo de Lanzamiento (ARC)',
            'Campaña de Amazon Ads guiada para el día de estreno',
            'Soporte prioritario 1 a 1 por WhatsApp con el Director',
          ],
      popular: true,
    },
    {
      name: language === 'en' ? '360° Comprehensive Campaign' : config.planEliteTitle,
      badge: language === 'en' ? 'For Leaders & Brands' : 'Para Líderes y Marcas',
      price: `$${config.planElitePrice.toLocaleString()}`,
      period: t?.pricingOneTimePayment || (language === 'en' ? 'one-time fee' : 'pago único'),
      desc: language === 'en'
        ? 'For executives, keynote speakers, and founders who want their book to become their company’s primary growth engine.'
        : 'Para empresarios y conferencistas que buscan usar su libro como la palanca maestra de su negocio.',
      features: language === 'en'
        ? [
            'Everything in the Bestseller Authority Pack',
            '2-Booktrailer Suite (Cinematic Teaser & Pitch Trailer)',
            'Reader Acquisition Funnel & Lead Magnet Setup',
            'Full Author Brand Story & High-Impact Bio Architecture',
            'Press Release & Digital PR Distribution Framework',
            'Contractual Commitment to Top 10 Bestseller Ranking',
          ]
        : [
            'Todo lo del Pack Bestseller Élite',
            'Pack de 2 Booktrailers (Ficción/Emocional y Pitch)',
            'Embudo de Captación de Lectores para tu Negocio',
            'Diseño de Ficha de Autor y Brand Story Completa',
            'Estrategia de Difusión en Prensa y Medios Digitales',
            'Garantía Contractual de Top 10 Bestseller',
          ],
      popular: false,
    },
  ];

  return (
    <>
      {/* Sección de Planes */}
      <section
        id="planes"
        className={`relative z-10 py-20 lg:py-28 border-t transition-colors ${
          theme === 'light'
            ? 'bg-slate-50/70 border-slate-200'
            : 'bg-[#080709] border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080709] border border-[#D62828]/45 text-[#F5A623] text-xs font-gotham font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D62828]" />
              {t?.pricingBadge || 'Inversión Transparente'}
            </div>
            <h2 className={`font-gotham text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              {t?.pricingTitle || 'Planes Diseñados para tu'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] to-[#F5A623]">
                {t?.pricingTitleHighlight || 'Éxito Editorial'}
              </span>
            </h2>
            <p className={`text-base ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              {t?.pricingSubtitle || 'Sin sorpresas ni regalías ocultas. El 100% de los derechos y ganancias de tu libro son siempre tuyos.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'border-[#D62828] ring-2 ring-[#D62828]/50 shadow-[0_0_45px_rgba(214,40,40,0.25)] scale-[1.02] bg-[#141118]'
                    : theme === 'light'
                    ? 'bg-white border-slate-200 shadow-lg'
                    : 'bg-[#141118]/80 border-white/10'
                } ${theme === 'light' && plan.popular ? 'bg-white ring-[#D62828]/30' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-gotham font-bold text-slate-400 uppercase tracking-wider block">
                      {plan.name}
                    </span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className={`font-gotham text-4xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{plan.period}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {plan.desc}
                    </p>
                  </div>

                  <ul className="space-y-3 pt-6 border-t border-white/10 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs">
                        <Check className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                        <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contacto"
                  className={`w-full py-3.5 rounded-xl font-gotham font-black text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white hover:brightness-110 shadow-[0_0_20px_rgba(214,40,40,0.4)]'
                      : theme === 'light'
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <span>{t?.pricingSelectPlan || 'Seleccionar este plan'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Contacto / Agendar Consulta */}
      <section
        id="contacto"
        className={`relative z-10 py-20 lg:py-28 border-t transition-colors ${
          theme === 'light'
            ? 'bg-white border-slate-200'
            : 'bg-[#080709] border-white/10'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-3xl p-8 sm:p-12 border backdrop-blur-2xl shadow-2xl relative overflow-hidden ${
              theme === 'light'
                ? 'bg-slate-50 border-slate-200 shadow-slate-200'
                : 'bg-[#141118]/90 border-white/10 shadow-[0_0_50px_rgba(214,40,40,0.15)]'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Info y Propuesta de Valor */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080709] border border-[#D62828]/45 text-[#F5A623] text-xs font-gotham font-bold uppercase tracking-widest mb-3 shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-[#D62828]" />
                    {t?.contactBadge || 'Sesión Estratégica Gratuita'}
                  </div>
                  <h3 className={`font-gotham text-2xl sm:text-3xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    {t?.contactTitle || 'Analicemos el Potencial Comercial de tu'}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D62828] to-[#F5A623]">
                      {t?.contactTitleHighlight || 'Libro en Amazon'}
                    </span>
                  </h3>
                  <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                    {t?.contactSubtitle || 'Agenda una llamada de 20 minutos sin compromiso. Evaluaremos tu portada, género y estrategia de lanzamiento para diseñar tu hoja de ruta Bestseller.'}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <div className="w-7 h-7 rounded-lg bg-[#D62828]/20 flex items-center justify-center text-[#F5A623]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>
                      {t?.contactResponseTime || 'Respuesta garantizada en menos de 24 horas laborales'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <div className="w-7 h-7 rounded-lg bg-[#D62828]/20 flex items-center justify-center text-[#F5A623]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>
                      {t?.contactConfidentialityNote || 'Acuerdo de Confidencialidad (NDA) para proteger tu manuscrito y propiedad intelectual.'}
                    </span>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-2xl border ${
                    theme === 'light'
                      ? 'bg-slate-100 border-slate-200 text-slate-700'
                      : 'bg-[#080709] border-white/10 text-slate-300'
                  }`}
                >
                  <p className="text-xs italic">
                    {language === 'en'
                      ? '"Publishing on Amazon without a strategic launch campaign is like opening a luxury bookstore in the desert. We help place you on the main boulevard."'
                      : '"Publicar en Amazon sin una estrategia editorial es como abrir un local en el desierto. Te ayudamos a colocarlo en la avenida principal."'}
                  </p>
                  <span className="text-[11px] font-gotham font-bold text-[#F5A623] mt-2 block">
                    — Best Book Marketing
                  </span>
                </div>
              </div>

              {/* Formulario */}
              <div className="lg:col-span-7">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-[#D62828]/10 border border-[#D62828] text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white flex items-center justify-center mx-auto shadow-lg">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className={`font-gotham text-2xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      {t?.contactSuccessTitle || '¡Solicitud Recibida con Éxito!'}
                    </h4>
                    <p className={`text-xs sm:text-sm ${theme === 'light' ? 'text-slate-800 font-medium' : 'text-slate-300'}`}>
                      {t?.contactSuccessDesc || 'Uno de nuestros directores editoriales revisará los detalles de tu obra y te contactará a la brevedad en tu correo'} <strong>{formData.email}</strong>.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className={`px-6 py-2.5 rounded-xl text-xs font-gotham font-bold transition-colors cursor-pointer ${
                        theme === 'light'
                          ? 'bg-slate-900 text-white hover:bg-slate-800'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {t?.contactSendAnother || 'Enviar otra consulta'}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-gotham font-bold mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                          {t?.contactNameLabel || 'Tu Nombre o Seudónimo'}:
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          placeholder={language === 'en' ? 'e.g. Alex Morgan' : 'Ej. Miguel Ángel Reyes'}
                          className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] transition-all ${
                            theme === 'light'
                              ? 'bg-slate-100 border-slate-300 text-slate-900 focus:bg-white placeholder:text-slate-400'
                              : 'bg-[#080709] border-white/10 text-white placeholder:text-slate-500'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-gotham font-bold mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                          {t?.contactEmailLabel || 'Correo Electrónico'}:
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="autor@ejemplo.com"
                          className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] transition-all ${
                            theme === 'light'
                              ? 'bg-slate-100 border-slate-300 text-slate-900 focus:bg-white placeholder:text-slate-400'
                              : 'bg-[#080709] border-white/10 text-white placeholder:text-slate-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-gotham font-bold mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                          {t?.contactGenreLabel || 'Género del Libro'}:
                        </label>
                        <select
                          value={formData.genero}
                          onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] transition-all ${
                            theme === 'light'
                              ? 'bg-slate-100 border-slate-300 text-slate-900 focus:bg-white'
                              : 'bg-[#080709] border-white/10 text-white'
                          }`}
                        >
                          <option value="No-Ficción / Negocios">
                            {language === 'en' ? 'Non-Fiction / Business' : 'No-Ficción / Negocios'}
                          </option>
                          <option value="Desarrollo Personal">
                            {language === 'en' ? 'Personal Growth / Self-Help' : 'Desarrollo Personal / Autoayuda'}
                          </option>
                          <option value="Ficción / Novela">
                            {language === 'en' ? 'Fiction / Novel / Thriller' : 'Ficción / Novela / Thriller'}
                          </option>
                          <option value="Fantasía / Ciencia Ficción">
                            {language === 'en' ? 'Fantasy / Sci-Fi' : 'Fantasía / Ciencia Ficción'}
                          </option>
                          <option value="Poesía / Biografía">
                            {language === 'en' ? 'Biography / Memoirs' : 'Poesía / Biografía'}
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-xs font-gotham font-bold mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                          {t?.contactStatusLabel || 'Estado del Manuscrito'}:
                        </label>
                        <select
                          value={formData.estado}
                          onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] transition-all ${
                            theme === 'light'
                              ? 'bg-slate-100 border-slate-300 text-slate-900 focus:bg-white'
                              : 'bg-[#080709] border-white/10 text-white'
                          }`}
                        >
                          <option value="Manuscrito Terminado">
                            {language === 'en' ? 'Manuscript 100% Complete' : 'Manuscrito 100% Terminado'}
                          </option>
                          <option value="En Corrección Final">
                            {language === 'en' ? 'Final Proofreading Phase' : 'En Corrección Final'}
                          </option>
                          <option value="En Proceso de Escritura">
                            {language === 'en' ? 'Currently Writing Draft' : 'En Proceso de Escritura'}
                          </option>
                          <option value="Libro Ya Publicado para Relanzar">
                            {language === 'en' ? 'Already Published (Looking to Relaunch)' : 'Libro Ya Publicado (Quiero Relanzar)'}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-gotham font-bold mb-1.5 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                        {t?.contactMessageLabel || 'Detalles sobre tu Proyecto o Dudas'}:
                      </label>
                      <textarea
                        rows={3}
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        placeholder={language === 'en' ? 'Briefly describe your book and publishing goals...' : 'Cuéntanos brevemente de qué trata tu libro y tus metas de ventas...'}
                        className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#D62828] transition-all ${
                          theme === 'light'
                            ? 'bg-slate-100 border-slate-300 text-slate-900 focus:bg-white placeholder:text-slate-400'
                            : 'bg-[#080709] border-white/10 text-white placeholder:text-slate-500'
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D62828] to-[#b71c1c] text-white font-gotham font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_25px_rgba(214,40,40,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t?.contactSendBtn || 'Solicitar Diagnóstico Editorial Gratuito'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
