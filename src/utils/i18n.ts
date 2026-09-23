export type Language = 'es' | 'en';

export interface Translations {
  // Nav & Header
  navHome: string;
  navServices: string;
  navBooktrailers: string;
  navCovers: string;
  navTestimonials: string;
  navCalculator: string;
  navPricing: string;
  navFaqs: string;
  navSchedule: string;
  themeDark: string;
  themeLight: string;
  langSwitch: string;

  // Hero
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroTitleSuffix: string;
  heroSubtitle: string;
  heroCta: string;
  heroSecondaryCta: string;
  stats1Label: string;
  stats2Label: string;
  stats3Label: string;
  stats4Label: string;

  // Services
  servicesBadge: string;
  servicesTitle: string;
  servicesTitleHighlight: string;
  servicesSubtitle: string;
  servicesDetailsBtn: string;
  servicesDeliverables: string;
  servicesCloseBtn: string;
  servicesRequestBtn: string;

  // Covers
  coversBadge: string;
  coversTitle: string;
  coversSubtitle: string;
  coversAutoActive: string;
  coversPaused: string;
  coversViewDetails: string;
  coversCopiesSold: string;
  coversResolution: string;

  // Booktrailers
  trailersBadge: string;
  trailersTitle: string;
  trailersTitleHighlight: string;
  trailersSubtitle: string;
  trailersSoundTag: string;
  trailersCatalogTitle: string;
  trailersOf: string;
  trailersCtaBtn: string;
  trailersCloseBtn: string;

  // Testimonials
  testimonialsBadge: string;
  testimonialsTitle: string;
  testimonialsTitleHighlight: string;
  testimonialsSubtitle: string;
  testimonialsVerifiedAuthor: string;

  // Calculator
  calculatorBadge: string;
  calculatorTitle: string;
  calculatorTitleHighlight: string;
  calculatorSubtitle: string;
  calculatorBookPrice: string;
  calculatorPageCount: string;
  calculatorEstimatedRoyalties: string;
  calculatorMonthlySales: string;
  calculatorPotentialEarnings: string;
  calculatorPaperback: string;
  calculatorEbook: string;
  calculatorAnnualEarnings: string;
  calculatorTraditionalComparison: string;
  calculatorCta: string;
  calcBadge?: string;
  calcTitle?: string;
  calcTitleHighlight?: string;
  calcSubtitle?: string;
  calcFormatLabel?: string;
  calcPaperback?: string;
  calcEbook?: string;
  calcPriceLabel?: string;
  calcPagesLabel?: string;
  calcVolumeLabel?: string;
  calcRoyaltyPerUnit?: string;
  calcUnit?: string;
  calcNetMargin?: string;
  calcMonthlySim?: string;
  calcPerMonth?: string;
  calcAnnualSim?: string;
  calcComparison?: string;
  calcCta?: string;
  calcDisclaimer?: string;

  // Pricing
  pricingBadge: string;
  pricingTitle: string;
  pricingTitleHighlight: string;
  pricingSubtitle: string;
  pricingSelectPlan: string;
  pricingRecommendedBadge: string;
  pricingIncludes: string;
  pricingOneTimePayment: string;
  planStarterTitle: string;
  planStarterBadge: string;
  planStarterDesc: string;
  planProTitle: string;
  planProBadge: string;
  planProDesc: string;
  planEliteTitle: string;
  planEliteBadge: string;
  planEliteDesc: string;

  // Contact & Booking
  contactBadge: string;
  contactTitle: string;
  contactTitleHighlight: string;
  contactSubtitle: string;
  contactNameLabel: string;
  contactEmailLabel: string;
  contactPhoneLabel: string;
  contactGenreLabel: string;
  contactStatusLabel: string;
  contactMessageLabel: string;
  contactSendBtn: string;
  contactSuccessTitle: string;
  contactSuccessDesc: string;
  contactConfidentialityNote: string;
  contactResponseTime: string;
  contactSendAnother: string;

  // Schedule Modal
  bookingBadge: string;
  bookingTitle: string;
  bookingSubtitle: string;
  bookingSuccessTitle: string;
  bookingSuccessDesc: string;
  bookingConfirmBtn: string;

  // Footer & Legal
  footerRights: string;
  footerPrivacy: string;
  footerTerms: string;
  footerFaqs: string;
  footerAdmin: string;
  footerBackToTop: string;
  footerConfidentialityText: string;
  footerAgencyDesc: string;
  footerTagline?: string;
  footerNavTitle?: string;
  footerLegalTitle?: string;
  footerGuarantee?: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  es: {
    navHome: 'Inicio',
    navServices: 'Servicios',
    navBooktrailers: 'Booktrailers',
    navCovers: 'Portadas',
    navTestimonials: 'Casos de Éxito',
    navCalculator: 'Calculadora',
    navPricing: 'Planes',
    navFaqs: 'FAQs',
    navSchedule: 'Agendar Consulta',
    themeDark: 'Fondo Oscuro',
    themeLight: 'Fondo Claro',
    langSwitch: 'Idioma',

    heroBadge: 'Agencia Nº 1 en Lanzamientos KDP & Bestsellers',
    heroTitle1: 'Publica Tu Libro y Hazlo',
    heroTitleHighlight: '#1 Bestseller',
    heroTitleSuffix: 'en Amazon KDP',
    heroSubtitle:
      'Maquetación técnica impecable, portadas 3D de alta conversión, booktrailers cinematográficos en 4K y estrategia de lanzamiento diseñada para posicionarte en el Top 10 mientras conservas el 100% de tus regalías.',
    heroCta: 'Agendar Diagnóstico Gratuito',
    heroSecondaryCta: 'Calcular Mis Regalías',
    stats1Label: 'Libros Bestseller',
    stats2Label: 'Tus Regalías',
    stats3Label: 'Calificación Autores',
    stats4Label: 'Satisfacción',

    servicesBadge: 'Servicios Editoriales 360',
    servicesTitle: 'Servicios Integrales para Posicionar tu Obra en',
    servicesTitleHighlight: 'Amazon KDP',
    servicesSubtitle:
      'Diseño, maquetación profesional y producción audiovisual de nivel internacional para autores independientes que buscan el estándar de las grandes editoriales.',
    servicesDetailsBtn: 'Ver detalles técnicos',
    servicesDeliverables: 'Entregables incluidos:',
    servicesCloseBtn: 'Cerrar',
    servicesRequestBtn: 'Solicitar este servicio',

    coversBadge: 'Galería de Lanzamientos Destacados',
    coversTitle: 'Portadas Diseñadas para Convertir Lectores',
    coversSubtitle:
      'Cada portada es calibrada para sobresalir en las miniaturas de Amazon KDP y catapultarse a las listas Bestseller.',
    coversAutoActive: 'Carrusel Continuo',
    coversPaused: 'Pausado (Hover)',
    coversViewDetails: 'Ver ficha',
    coversCopiesSold: 'copias vendidas',
    coversResolution: '300 DPI CMYK',

    trailersBadge: 'Producción Audiovisual Cinematográfica',
    trailersTitle: 'Booktrailers que Convierten Espectadores en',
    trailersTitleHighlight: 'Lectores Obsesivos',
    trailersSubtitle:
      'Lanza tu libro con la misma emoción que un estreno cinematográfico. Producimos trailers en 4K con efectos visuales y sonido envolvente para tus anuncios en Meta, TikTok y YouTube.',
    trailersSoundTag: 'Sonido Estéreo / 5.1',
    trailersCatalogTitle: 'Catálogo de Trailers',
    trailersOf: 'de',
    trailersCtaBtn: 'Solicitar Booktrailer para mi Libro',
    trailersCloseBtn: 'Cerrar video',

    testimonialsBadge: 'Testimonios & Autoridad',
    testimonialsTitle: 'Historias de Autores que Conquistaron',
    testimonialsTitleHighlight: 'Amazon Bestseller',
    testimonialsSubtitle:
      'Descubre cómo transformamos manuscritos en marcas editoriales de referencia.',
    testimonialsVerifiedAuthor: 'Autor Verificado',

    calculatorBadge: 'Simulador de Márgenes & Regalías KDP',
    calculatorTitle: 'Calcula tus Regalías Reales en',
    calculatorTitleHighlight: 'Amazon KDP',
    calculatorSubtitle:
      'A diferencia del modelo editorial tradicional (donde el autor sólo recibe el 8-10%), en Amazon KDP retienes hasta el 70% de cada ejemplar vendido. Simula tus márgenes con las fórmulas oficiales de Amazon.',
    calculatorBookPrice: 'Precio de venta de tu libro ($USD)',
    calculatorPageCount: 'Número estimado de páginas',
    calculatorEstimatedRoyalties: 'Regalías estimadas por copia vendida',
    calculatorMonthlySales: 'Ventas estimadas por mes',
    calculatorPotentialEarnings: 'Ganancias mensuales proyectadas',
    calculatorPaperback: 'Tapa Blanda (Papel)',
    calculatorEbook: 'eBook (Kindle)',
    calculatorAnnualEarnings: 'Proyección Anual Estimada',
    calculatorTraditionalComparison: 'Comparativa: Con editorial tradicional solo ganarías aprox.',
    calculatorCta: 'Quiero Potenciar mis Ventas en KDP',
    calcBadge: 'Simulador de Márgenes & Regalías KDP',
    calcTitle: 'Calcula tus Regalías Reales en',
    calcTitleHighlight: 'Amazon KDP',
    calcSubtitle:
      'A diferencia del modelo editorial tradicional (donde el autor sólo recibe el 8-10%), en Amazon KDP retienes hasta el 70% de cada ejemplar vendido. Simula tus márgenes con las fórmulas oficiales de Amazon.',
    calcFormatLabel: '1. Formato de Edición',
    calcPaperback: '📖 Tapa Blanda (Impreso)',
    calcEbook: '📱 eBook Kindle (Digital)',
    calcPriceLabel: '2. Precio de Venta al Público (PVP)',
    calcPagesLabel: '3. Extensión del Manuscrito',
    calcVolumeLabel: '4. Volumen Mensual Estimado',

    pricingBadge: 'Inversión Transparente',
    pricingTitle: 'Planes Diseñados para tu',
    pricingTitleHighlight: 'Éxito Editorial',
    pricingSubtitle:
      'Sin sorpresas ni regalías ocultas. El 100% de los derechos y ganancias de tu libro son siempre tuyos.',
    pricingSelectPlan: 'Seleccionar este plan',
    pricingRecommendedBadge: 'El Más Elegido',
    pricingIncludes: 'Incluye garantía de satisfacción y archivos fuente:',
    pricingOneTimePayment: 'pago único',
    planStarterTitle: 'Lanzamiento Esencial KDP',
    planStarterBadge: 'Ideal para Primerizos',
    planStarterDesc: 'Todo lo indispensable para publicar con calidad editorial profesional y evitar rechazos técnicos.',
    planProTitle: 'Bestseller Authority Pro',
    planProBadge: 'El Más Elegido',
    planProDesc: 'Nuestra solución insignia con Booktrailer 4K y estrategia de preventa para alcanzar el badge #1.',
    planEliteTitle: 'Campaña Integral 360',
    planEliteBadge: 'Para Líderes y Marcas',
    planEliteDesc: 'Para empresarios y conferencistas que buscan usar su libro como la palanca maestra de su negocio.',

    contactBadge: 'Sesión Estratégica Gratuita',
    contactTitle: 'Analicemos el Potencial Comercial de tu',
    contactTitleHighlight: 'Libro en Amazon',
    contactSubtitle:
      'Agenda una llamada de 20 minutos sin compromiso. Evaluaremos tu portada, género y estrategia de lanzamiento para diseñar tu hoja de ruta Bestseller.',
    contactNameLabel: 'Tu Nombre o Seudónimo',
    contactEmailLabel: 'Correo Electrónico',
    contactPhoneLabel: 'WhatsApp / Teléfono',
    contactGenreLabel: 'Género o Temática de la Obra',
    contactStatusLabel: 'Estado Actual de tu Manuscrito',
    contactMessageLabel: 'Cuéntanos sobre tu libro y objetivos',
    contactSendBtn: 'Enviar Consulta y Solicitar Diagnóstico',
    contactSuccessTitle: '¡Solicitud Recibida con Éxito!',
    contactSuccessDesc:
      'Uno de nuestros directores editoriales revisará los detalles de tu obra y te contactará en menos de 24 horas laborales.',
    contactConfidentialityNote:
      'Acuerdo de Confidencialidad (NDA) para proteger tu manuscrito y propiedad intelectual.',
    contactResponseTime: 'Respuesta garantizada en menos de 24 horas laborales',
    contactSendAnother: 'Enviar otra consulta',

    bookingBadge: 'Diagnóstico Gratuito',
    bookingTitle: 'Agendar Diagnóstico Gratuito',
    bookingSubtitle: 'Sesión 1-a-1 de 30 minutos vía Google Meet',
    bookingSuccessTitle: '¡Solicitud Enviada con Éxito!',
    bookingSuccessDesc:
      'Hemos registrado tu solicitud correctamente. Nuestro equipo editorial te contactará en menos de 24 horas.',
    bookingConfirmBtn: 'Confirmar y Agendar',

    footerRights: 'Todos los derechos reservados.',
    footerPrivacy: 'Aviso de Confidencialidad y Custodia',
    footerTerms: 'Condiciones del Servicio Editorial',
    footerFaqs: 'Preguntas Frecuentes',
    footerAdmin: 'Panel de Control',
    footerBackToTop: 'Volver arriba',
    footerConfidentialityText:
      'Garantía vinculante de confidencialidad editorial. Preservación absoluta de la propiedad intelectual de cada autor.',
    footerAgencyDesc:
      'Agencia editorial y audiovisual líder en lanzamiento, maquetación de lujo y posicionamiento de libros Bestseller en Amazon KDP y librerías internacionales.',
  },
  en: {
    navHome: 'Home',
    navServices: 'Services',
    navBooktrailers: 'Booktrailers',
    navCovers: 'Book Covers',
    navTestimonials: 'Case Studies',
    navCalculator: 'Royalty Calculator',
    navPricing: 'Plans',
    navFaqs: 'FAQs',
    navSchedule: 'Book Strategy Call',
    themeDark: 'Dark Mode',
    themeLight: 'Light Mode',
    langSwitch: 'Language',

    heroBadge: '#1 Agency in KDP Launches & International Bestsellers',
    heroTitle1: 'Publish Your Book and Make It a',
    heroTitleHighlight: '#1 Bestseller',
    heroTitleSuffix: 'on Amazon KDP',
    heroSubtitle:
      'Flawless technical layout, high-converting 3D book covers, cinematic 4K booktrailers, and strategic launch campaigns engineered to rank in the Top 10 while you keep 100% of your royalties.',
    heroCta: 'Book Free Diagnostic Call',
    heroSecondaryCta: 'Calculate My Royalties',
    stats1Label: 'Bestselling Books',
    stats2Label: 'Your Royalties',
    stats3Label: 'Author Rating',
    stats4Label: 'Satisfaction',

    servicesBadge: '360° Publishing Services',
    servicesTitle: 'Comprehensive Services to Position Your Work on',
    servicesTitleHighlight: 'Amazon KDP',
    servicesSubtitle:
      'World-class design, professional book formatting, and cinematic audiovisual production for independent authors who demand the standards of major publishing houses.',
    servicesDetailsBtn: 'View technical details',
    servicesDeliverables: 'Included deliverables:',
    servicesCloseBtn: 'Close',
    servicesRequestBtn: 'Request this service',

    coversBadge: 'Featured Release Gallery',
    coversTitle: 'Book Covers Engineered to Hook Readers',
    coversSubtitle:
      'Every cover is precisely calibrated to stand out in Amazon KDP thumbnails and surge into Bestseller charts.',
    coversAutoActive: 'Continuous Carousel',
    coversPaused: 'Paused (Hover)',
    coversViewDetails: 'View details',
    coversCopiesSold: 'copies sold',
    coversResolution: '300 DPI CMYK',

    trailersBadge: 'Cinematic Audiovisual Production',
    trailersTitle: 'Booktrailers That Turn Viewers Into',
    trailersTitleHighlight: 'Obsessive Readers',
    trailersSubtitle:
      'Launch your book with the thrill of a Hollywood movie premiere. We produce 4K trailers with visual effects and surround sound engineered for Meta, TikTok, and YouTube ads.',
    trailersSoundTag: 'Stereo / 5.1 Surround',
    trailersCatalogTitle: 'Trailer Catalog',
    trailersOf: 'of',
    trailersCtaBtn: 'Order a Booktrailer for My Book',
    trailersCloseBtn: 'Close player',

    testimonialsBadge: 'Client Success & Authority',
    testimonialsTitle: 'Stories of Authors Who Dominated',
    testimonialsTitleHighlight: 'Amazon Bestseller Lists',
    testimonialsSubtitle:
      'Discover how we turn raw manuscripts into benchmark publishing brands.',
    testimonialsVerifiedAuthor: 'Verified Author',

    calculatorBadge: 'KDP Margin & Royalty Simulator',
    calculatorTitle: 'Calculate Your Real Royalties on',
    calculatorTitleHighlight: 'Amazon KDP',
    calculatorSubtitle:
      'Unlike traditional publishing houses (where authors only receive 8-10%), on Amazon KDP you keep up to 70% of every book sold. Simulate your profits using Amazon’s official equations.',
    calculatorBookPrice: 'Your book retail price ($USD)',
    calculatorPageCount: 'Estimated page count',
    calculatorEstimatedRoyalties: 'Estimated royalty per sold copy',
    calculatorMonthlySales: 'Estimated monthly unit sales',
    calculatorPotentialEarnings: 'Projected monthly revenue',
    calculatorPaperback: 'Paperback (Print)',
    calculatorEbook: 'eBook (Kindle)',
    calculatorAnnualEarnings: 'Projected Annual Royalties',
    calculatorTraditionalComparison: 'Comparison: Traditional publisher royalty would only be approx.',
    calculatorCta: 'Scale My KDP Sales Today',
    calcBadge: 'KDP Margin & Royalty Simulator',
    calcTitle: 'Calculate Your Real Royalties on',
    calcTitleHighlight: 'Amazon KDP',
    calcSubtitle:
      'Unlike traditional publishing houses (where authors only receive 8-10%), on Amazon KDP you keep up to 70% of every book sold. Simulate your profits using Amazon’s official equations.',
    calcFormatLabel: '1. Edition Format',
    calcPaperback: '📖 Paperback (Print)',
    calcEbook: '📱 Kindle eBook (Digital)',
    calcPriceLabel: '2. Retail Price (MSRP)',
    calcPagesLabel: '3. Manuscript Page Count',
    calcVolumeLabel: '4. Estimated Monthly Volume',

    pricingBadge: 'Transparent Investment',
    pricingTitle: 'Plans Engineered for Your',
    pricingTitleHighlight: 'Publishing Success',
    pricingSubtitle:
      'No surprise cuts or hidden royalties. You keep 100% of your book rights and profits, forever.',
    pricingSelectPlan: 'Select this plan',
    pricingRecommendedBadge: 'Author Favorite',
    pricingIncludes: 'Includes satisfaction guarantee & full source files:',
    pricingOneTimePayment: 'one-time fee',
    planStarterTitle: 'KDP Essential Launch',
    planStarterBadge: 'Ideal for First-Time Authors',
    planStarterDesc: 'Everything required to publish with professional editorial quality and eliminate technical rejections.',
    planProTitle: 'Bestseller Authority Pro',
    planProBadge: 'Most Popular',
    planProDesc: 'Our flagship publishing solution with 4K Booktrailer and pre-order strategy to conquer the #1 badge.',
    planEliteTitle: '360° Comprehensive Campaign',
    planEliteBadge: 'For Leaders & Brands',
    planEliteDesc: 'For executives, keynote speakers, and founders who want their book to become their company’s primary growth engine.',

    contactBadge: 'Free Strategy Consultation',
    contactTitle: 'Let’s Analyze the Commercial Potential of Your',
    contactTitleHighlight: 'Book on Amazon',
    contactSubtitle:
      'Book a 20-minute no-obligation strategy session. We will evaluate your cover, genre, and launch plan to design your Bestseller roadmap.',
    contactNameLabel: 'Your Name or Pen Name',
    contactEmailLabel: 'Email Address',
    contactPhoneLabel: 'WhatsApp / Phone',
    contactGenreLabel: 'Book Genre & Category',
    contactStatusLabel: 'Manuscript Status',
    contactMessageLabel: 'Tell us about your book and publishing goals',
    contactSendBtn: 'Submit Request & Get Roadmap',
    contactSuccessTitle: 'Request Received Successfully!',
    contactSuccessDesc:
      'One of our senior publishing directors will review your project details and contact you within 24 business hours.',
    contactConfidentialityNote:
      'Non-Disclosure Agreement (NDA) legally protecting your manuscript and intellectual property.',
    contactResponseTime: 'Guaranteed reply in less than 24 business hours',
    contactSendAnother: 'Send another message',

    bookingBadge: 'Free Strategy Call',
    bookingTitle: 'Book Free Diagnostic Consultation',
    bookingSubtitle: '30-minute 1-on-1 strategy call via Google Meet',
    bookingSuccessTitle: 'Request Sent Successfully!',
    bookingSuccessDesc:
      'We have registered your appointment request. Our editorial team will send your invite link within 24 hours.',
    bookingConfirmBtn: 'Confirm & Schedule',

    footerRights: 'All rights reserved.',
    footerPrivacy: 'Confidentiality & Custody Policy',
    footerTerms: 'Publishing Terms of Service',
    footerFaqs: 'Frequently Asked Questions',
    footerAdmin: 'Admin Console',
    footerBackToTop: 'Back to top',
    footerConfidentialityText:
      'Binding editorial non-disclosure agreement. Absolute intellectual property protection for every author.',
    footerAgencyDesc:
      'Leading publishing agency and creative studio specializing in luxury book formatting, 3D design, and Bestseller launch strategies on Amazon KDP and worldwide book distributors.',
  },
};

export const SERVICES_TRANSLATIONS_EN: Record<number, { title: string; tagline: string; desc: string; deliverables: string; features: string[] }> = {
  1: {
    title: 'Cinematic Book Cover Design',
    tagline: 'The decisive visual asset that determines whether a reader buys or scrolls past',
    desc: 'Top-tier publishing covers optically tuned to dominate Amazon KDP search thumbnails and physical bookstore shelves alike.',
    features: [
      'Bespoke typographic composition and high-impact visual hierarchy',
      'Design for eBook, Paperback, and Hardcover with exact spine calculation',
      'Certified 300 DPI files in CMYK and digital RGB color spaces',
      'High-definition 3D mockup kit for advertising campaigns',
    ],
    deliverables: 'Print-ready bleed PDF, optimized ePub cover, and 5-piece 3D mockup kit.',
  },
  2: {
    title: 'KDP Pro Editorial Formatting',
    tagline: 'Luxury reading experience complying with global publishing standards',
    desc: 'Artisanal layout design. Clean interior typography with drop caps, elegant ornaments, and dynamic fluid pagination across all e-readers.',
    features: [
      'Reflowable ePub format 100% verified against Amazon ingestion errors',
      'Print-ready interior PDF with precise margins and symmetrical gutters',
      'Commercial licensed fonts, elegant running headers, and decorative accents',
      'Multi-level interactive table of contents with linked footnotes',
    ],
    deliverables: 'Master .epub file for digital, print-ready PDF for Amazon KDP & IngramSpark.',
  },
  3: {
    title: 'Cinematic 4K Booktrailers',
    tagline: 'Audiovisual storytelling that hooks readers from the first second',
    desc: 'Hollywood-style promotional trailers with dynamic editing, voice acting, 3D animated covers, and spatial sound design for TikTok, Instagram Reels, and YouTube.',
    features: [
      'Emotional narrative script crafted around your book’s central hook',
      'Professional native voiceover in multiple language & accent options',
      '3D animated book cover integrated with cinematic visual effects',
      'Vertical 9:16 (TikTok/Reels/Shorts) and horizontal 16:9 (YouTube/Web) formats',
    ],
    deliverables: '4K/1080p rendered videos in 9:16 and 16:9, mastered audio track, and thumbnails.',
  },
  4: {
    title: 'Bestseller Launch Strategy',
    tagline: 'Master the Amazon algorithm and capture the coveted #1 Bestseller badge',
    desc: '30-day comprehensive roadmap to push your book into the Top 100 of its categories. Deep keyword mining and zero-day reader mobilization.',
    features: [
      'Identification of up to 10 high-conversion, low-competition subcategories',
      'Framework and guidelines to build an Advance Review Copy (ARC) team',
      'SEO metadata optimization, title & subtitle copywriting, and persuasive hook',
      'Tiered pricing launch strategy to accelerate initial algorithmic velocity',
    ],
    deliverables: 'Day-by-day launch timeline, keyword research audit, and pre-order scripts.',
  },
  5: {
    title: 'A+ Content & Brand Story',
    tagline: 'Boost conversion rates by up to 300% on your Amazon product page',
    desc: 'Immersive visual modules tailored for your book description. Turn casual page visitors into committed readers through visual authority.',
    features: [
      'Panoramic editorial graphic banners with custom typography',
      'Comparative author matrices and character spotlight graphics',
      'Author profile modules, brand storytelling, and review highlights',
      'Ready-to-upload files formatted according to Amazon KDP specifications',
    ],
    deliverables: 'Set of ready-to-upload A+ modules with mobile and desktop preview assets.',
  },
};

export interface TranslationFieldMeta {
  key: keyof Translations;
  label: string;
  section: string;
  isTextarea?: boolean;
  type?: 'text' | 'textarea';
}

export const TRANSLATION_SECTIONS: { id: string; name: string; icon: string }[] = [
  { id: 'all', name: 'Todas las Secciones', icon: 'Sparkles' },
  { id: 'nav', name: '1. Menú & Cabecera', icon: 'Compass' },
  { id: 'hero', name: '2. Hero Principal & 3D', icon: 'Rocket' },
  { id: 'services', name: '3. Servicios Editoriales', icon: 'Settings' },
  { id: 'covers', name: '4. Carrusel de Portadas', icon: 'BookOpen' },
  { id: 'trailers', name: '5. Booktrailers 4K', icon: 'Video' },
  { id: 'testimonials', name: '6. Testimonios & Casos', icon: 'MessageSquare' },
  { id: 'calculator', name: '7. Calculadora Regalías', icon: 'Calculator' },
  { id: 'pricing', name: '8. Planes & Precios', icon: 'DollarSign' },
  { id: 'contact', name: '9. Formulario Contacto', icon: 'Mail' },
  { id: 'booking', name: '10. Agendar Cita (Modal)', icon: 'Calendar' },
  { id: 'footer', name: '11. Pie de Página & Legal', icon: 'ShieldCheck' },
];

export const TRANSLATION_FIELDS_META: TranslationFieldMeta[] = [
  // 1. Menú & Cabecera
  { key: 'navHome', label: 'Enlace: Inicio', section: 'nav' },
  { key: 'navServices', label: 'Enlace: Servicios', section: 'nav' },
  { key: 'navBooktrailers', label: 'Enlace: Booktrailers', section: 'nav' },
  { key: 'navCovers', label: 'Enlace: Portadas', section: 'nav' },
  { key: 'navTestimonials', label: 'Enlace: Testimonios', section: 'nav' },
  { key: 'navCalculator', label: 'Enlace: Calculadora', section: 'nav' },
  { key: 'navPricing', label: 'Enlace: Planes', section: 'nav' },
  { key: 'navFaqs', label: 'Enlace: FAQs', section: 'nav' },
  { key: 'navSchedule', label: 'Botón CTA Cabecera: Agendar Consulta', section: 'nav' },
  { key: 'themeDark', label: 'Tooltip: Tema Oscuro', section: 'nav' },
  { key: 'themeLight', label: 'Tooltip: Tema Claro', section: 'nav' },
  { key: 'langSwitch', label: 'Etiqueta Selector de Idioma', section: 'nav' },

  // 2. Hero
  { key: 'heroBadge', label: 'Hero: Badge Superior', section: 'hero' },
  { key: 'heroTitle1', label: 'Hero: Título Línea 1', section: 'hero' },
  { key: 'heroTitleHighlight', label: 'Hero: Título Texto Resaltado (Gradient)', section: 'hero' },
  { key: 'heroTitleSuffix', label: 'Hero: Título Línea 2 / Sufijo', section: 'hero' },
  { key: 'heroSubtitle', label: 'Hero: Párrafo Descriptivo Principal', section: 'hero', isTextarea: true },
  { key: 'heroCta', label: 'Hero: Botón Primario (Llamado a la Acción)', section: 'hero' },
  { key: 'heroSecondaryCta', label: 'Hero: Botón Secundario (Calculadora)', section: 'hero' },
  { key: 'stats1Label', label: 'Hero: Métrica 1 (Libros Bestseller)', section: 'hero' },
  { key: 'stats2Label', label: 'Hero: Métrica 2 (Tus Regalías)', section: 'hero' },
  { key: 'stats3Label', label: 'Hero: Métrica 3 (Calificación)', section: 'hero' },
  { key: 'stats4Label', label: 'Hero: Métrica 4 (Satisfacción)', section: 'hero' },

  // 3. Servicios
  { key: 'servicesBadge', label: 'Servicios: Badge de Sección', section: 'services' },
  { key: 'servicesTitle', label: 'Servicios: Título Principal', section: 'services' },
  { key: 'servicesTitleHighlight', label: 'Servicios: Título Resaltado', section: 'services' },
  { key: 'servicesSubtitle', label: 'Servicios: Subtítulo Descriptivo', section: 'services', isTextarea: true },
  { key: 'servicesDetailsBtn', label: 'Servicios: Botón Ver Ficha Técnica', section: 'services' },
  { key: 'servicesDeliverables', label: 'Servicios: Encabezado de Entregables', section: 'services' },
  { key: 'servicesCloseBtn', label: 'Servicios: Botón Cerrar Modal', section: 'services' },
  { key: 'servicesRequestBtn', label: 'Servicios: Botón Solicitar Servicio', section: 'services' },

  // 4. Portadas
  { key: 'coversBadge', label: 'Portadas: Badge de Sección', section: 'covers' },
  { key: 'coversTitle', label: 'Portadas: Título Principal', section: 'covers' },
  { key: 'coversSubtitle', label: 'Portadas: Subtítulo Descriptivo', section: 'covers', isTextarea: true },
  { key: 'coversAutoActive', label: 'Portadas: Estado Carrusel Activo', section: 'covers' },
  { key: 'coversPaused', label: 'Portadas: Estado Carrusel Pausado en Hover', section: 'covers' },
  { key: 'coversViewDetails', label: 'Portadas: Botón Ver Ficha', section: 'covers' },
  { key: 'coversCopiesSold', label: 'Portadas: Etiqueta Copias Vendidas', section: 'covers' },
  { key: 'coversResolution', label: 'Portadas: Badge Resolución', section: 'covers' },

  // 5. Booktrailers
  { key: 'trailersBadge', label: 'Booktrailers: Badge de Sección', section: 'trailers' },
  { key: 'trailersTitle', label: 'Booktrailers: Título Principal', section: 'trailers' },
  { key: 'trailersTitleHighlight', label: 'Booktrailers: Título Resaltado', section: 'trailers' },
  { key: 'trailersSubtitle', label: 'Booktrailers: Subtítulo Descriptivo', section: 'trailers', isTextarea: true },
  { key: 'trailersSoundTag', label: 'Booktrailers: Tag de Formato de Audio', section: 'trailers' },
  { key: 'trailersCatalogTitle', label: 'Booktrailers: Título del Catálogo Lateral', section: 'trailers' },
  { key: 'trailersOf', label: 'Booktrailers: Conector Numérico (ej. 1 "de" 5)', section: 'trailers' },
  { key: 'trailersCtaBtn', label: 'Booktrailers: Botón Solicitar Trailer', section: 'trailers' },
  { key: 'trailersCloseBtn', label: 'Booktrailers: Botón Cerrar Reproductor', section: 'trailers' },

  // 6. Testimonios
  { key: 'testimonialsBadge', label: 'Testimonios: Badge de Sección', section: 'testimonials' },
  { key: 'testimonialsTitle', label: 'Testimonios: Título Principal', section: 'testimonials' },
  { key: 'testimonialsTitleHighlight', label: 'Testimonios: Título Resaltado', section: 'testimonials' },
  { key: 'testimonialsSubtitle', label: 'Testimonios: Subtítulo Descriptivo', section: 'testimonials', isTextarea: true },
  { key: 'testimonialsVerifiedAuthor', label: 'Testimonios: Badge Autor Verificado', section: 'testimonials' },

  // 7. Calculadora
  { key: 'calcBadge', label: 'Calculadora: Badge de Sección', section: 'calculator' },
  { key: 'calcTitle', label: 'Calculadora: Título Principal', section: 'calculator' },
  { key: 'calcTitleHighlight', label: 'Calculadora: Título Resaltado', section: 'calculator' },
  { key: 'calcSubtitle', label: 'Calculadora: Subtítulo Explicativo', section: 'calculator', isTextarea: true },
  { key: 'calcFormatLabel', label: 'Calculadora: Etiqueta Selector de Formato', section: 'calculator' },
  { key: 'calcPaperback', label: 'Calculadora: Botón Formato Tapa Blanda', section: 'calculator' },
  { key: 'calcEbook', label: 'Calculadora: Botón Formato eBook Kindle', section: 'calculator' },
  { key: 'calcPriceLabel', label: 'Calculadora: Etiqueta Control Precio de Venta', section: 'calculator' },
  { key: 'calcPagesLabel', label: 'Calculadora: Etiqueta Control Páginas', section: 'calculator' },
  { key: 'calcVolumeLabel', label: 'Calculadora: Etiqueta Control Volumen Mensual', section: 'calculator' },
  { key: 'calculatorEstimatedRoyalties', label: 'Calculadora: Etiqueta Regalía Unitaria', section: 'calculator' },
  { key: 'calculatorPotentialEarnings', label: 'Calculadora: Ganancias Mensuales Estimadas', section: 'calculator' },
  { key: 'calculatorAnnualEarnings', label: 'Calculadora: Proyección Anual', section: 'calculator' },
  { key: 'calculatorTraditionalComparison', label: 'Calculadora: Texto Comparativa Editorial Tradicional', section: 'calculator' },
  { key: 'calculatorCta', label: 'Calculadora: Botón CTA Final', section: 'calculator' },

  // 8. Planes & Precios
  { key: 'pricingBadge', label: 'Precios: Badge de Sección', section: 'pricing' },
  { key: 'pricingTitle', label: 'Precios: Título Principal', section: 'pricing' },
  { key: 'pricingTitleHighlight', label: 'Precios: Título Resaltado', section: 'pricing' },
  { key: 'pricingSubtitle', label: 'Precios: Subtítulo', section: 'pricing', isTextarea: true },
  { key: 'pricingSelectPlan', label: 'Precios: Botón Elegir Plan', section: 'pricing' },
  { key: 'pricingRecommendedBadge', label: 'Precios: Badge Más Recomendado', section: 'pricing' },
  { key: 'pricingIncludes', label: 'Precios: Encabezado Características Incluidas', section: 'pricing' },
  { key: 'pricingOneTimePayment', label: 'Precios: Etiqueta "Pago Único"', section: 'pricing' },
  { key: 'planStarterTitle', label: 'Plan 1 (Starter): Título', section: 'pricing' },
  { key: 'planStarterBadge', label: 'Plan 1 (Starter): Badge Destacado', section: 'pricing' },
  { key: 'planStarterDesc', label: 'Plan 1 (Starter): Descripción', section: 'pricing', isTextarea: true },
  { key: 'planProTitle', label: 'Plan 2 (Pro): Título', section: 'pricing' },
  { key: 'planProBadge', label: 'Plan 2 (Pro): Badge Destacado', section: 'pricing' },
  { key: 'planProDesc', label: 'Plan 2 (Pro): Descripción', section: 'pricing', isTextarea: true },
  { key: 'planEliteTitle', label: 'Plan 3 (Elite): Título', section: 'pricing' },
  { key: 'planEliteBadge', label: 'Plan 3 (Elite): Badge Destacado', section: 'pricing' },
  { key: 'planEliteDesc', label: 'Plan 3 (Elite): Descripción', section: 'pricing', isTextarea: true },

  // 9. Formulario Contacto
  { key: 'contactBadge', label: 'Contacto: Badge Superior', section: 'contact' },
  { key: 'contactTitle', label: 'Contacto: Título Principal', section: 'contact' },
  { key: 'contactTitleHighlight', label: 'Contacto: Título Resaltado', section: 'contact' },
  { key: 'contactSubtitle', label: 'Contacto: Párrafo de Instrucción', section: 'contact', isTextarea: true },
  { key: 'contactNameLabel', label: 'Contacto: Campo Nombre / Seudónimo', section: 'contact' },
  { key: 'contactEmailLabel', label: 'Contacto: Campo Correo', section: 'contact' },
  { key: 'contactPhoneLabel', label: 'Contacto: Campo Teléfono / WhatsApp', section: 'contact' },
  { key: 'contactGenreLabel', label: 'Contacto: Campo Género Literario', section: 'contact' },
  { key: 'contactStatusLabel', label: 'Contacto: Campo Estado del Manuscrito', section: 'contact' },
  { key: 'contactMessageLabel', label: 'Contacto: Campo Mensaje u Objetivos', section: 'contact' },
  { key: 'contactSendBtn', label: 'Contacto: Botón Enviar Consulta', section: 'contact' },
  { key: 'contactSuccessTitle', label: 'Contacto: Título Mensaje Enviado', section: 'contact' },
  { key: 'contactSuccessDesc', label: 'Contacto: Descripción Mensaje Enviado', section: 'contact', isTextarea: true },
  { key: 'contactConfidentialityNote', label: 'Contacto: Nota de Confidencialidad y NDA', section: 'contact' },
  { key: 'contactResponseTime', label: 'Contacto: Compromiso Tiempo de Respuesta', section: 'contact' },
  { key: 'contactSendAnother', label: 'Contacto: Botón Enviar Otro Mensaje', section: 'contact' },

  // 10. Modal Citas
  { key: 'bookingBadge', label: 'Citas: Badge de Diagnóstico', section: 'booking' },
  { key: 'bookingTitle', label: 'Citas: Título de Modal', section: 'booking' },
  { key: 'bookingSubtitle', label: 'Citas: Subtítulo Modal', section: 'booking' },
  { key: 'bookingSuccessTitle', label: 'Citas: Confirmación Título', section: 'booking' },
  { key: 'bookingSuccessDesc', label: 'Citas: Confirmación Descripción', section: 'booking' },
  { key: 'bookingConfirmBtn', label: 'Citas: Botón Confirmar Cita', section: 'booking' },

  // 11. Footer
  { key: 'footerRights', label: 'Pie de Página: Derechos Reservados', section: 'footer' },
  { key: 'footerPrivacy', label: 'Pie de Página: Enlace Aviso de Confidencialidad', section: 'footer' },
  { key: 'footerTerms', label: 'Pie de Página: Enlace Condiciones del Servicio', section: 'footer' },
  { key: 'footerFaqs', label: 'Pie de Página: Enlace Preguntas Frecuentes', section: 'footer' },
  { key: 'footerAdmin', label: 'Pie de Página: Enlace Panel de Administración', section: 'footer' },
  { key: 'footerBackToTop', label: 'Pie de Página: Botón Subir Arriba', section: 'footer' },
  { key: 'footerConfidentialityText', label: 'Pie de Página: Compromiso Confidencialidad', section: 'footer', isTextarea: true },
  { key: 'footerAgencyDesc', label: 'Pie de Página: Declaración de Misión Editorial', section: 'footer', isTextarea: true },
];

