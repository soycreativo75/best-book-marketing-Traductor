import { BookPreset, ServiceItem, PortfolioCover, BooktrailerItem, TestimonialItem } from '../types';

export const HERO_BOOK_PRESETS: Record<string, BookPreset> = {
  business: {
    id: 'business',
    label: 'Negocios & No-Ficción',
    title: 'EL ARTE DEL BESTSELLER',
    subtitle: 'El método definitivo para dominar el algoritmo de Amazon y monetizar tu autoridad',
    category: 'Nº 1 en Empresa y Estrategia',
    gradient: 'from-[#D62828] via-[#B71C1C] to-[#780016]',
    accentColor: '#F5A623',
    badge: 'Amazon #1 Bestseller',
  },
  fiction: {
    id: 'fiction',
    label: 'Thriller & Ficción',
    title: 'EL ÚLTIMO SUSURRO',
    subtitle: 'Un thriller psicológico vertiginoso donde la verdad es el peor enemigo',
    category: 'Nº 1 en Ficción de Misterio',
    gradient: 'from-[#C1121F] via-[#9D0208] to-[#6A040F]',
    accentColor: '#F5A623',
    badge: 'Selección Kindle Top',
  },
  wellness: {
    id: 'wellness',
    label: 'Desarrollo Personal',
    title: 'HÁBITOS SILENCIOSOS',
    subtitle: 'Cómo reprogramar tu mente para construir una vida extraordinaria día a día',
    category: 'Nº 1 en Crecimiento Personal',
    gradient: 'from-[#E63946] via-[#D62828] to-[#800F2F]',
    accentColor: '#F5A623',
    badge: 'Amazon #1 Bestseller',
  },
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    title: 'Diseño de Portada Cinematográfica',
    tagline: 'El factor visual decisivo que define si un lector compra o te ignora',
    iconName: 'Palette',
    desc: 'Portadas de nivel editorial adaptadas con precisión óptica para destacar tanto en miniaturas de Amazon KDP como en estanterías físicas.',
    features: [
      'Composición tipográfica exclusiva y jerarquía visual de alto impacto',
      'Diseño para eBook, Tapa Blanda y Tapa Dura con cálculo exacto de lomo',
      'Archivos certificados a 300 DPI en perfiles de color CMYK y RGB digital',
      'Kit de mockups 3D de alta definición para tu estrategia publicitaria',
    ],
    deliverables: 'Archivos PDF de imprenta con sangría, portada ePub optimizada y kit de 5 mockups 3D.',
  },
  {
    id: 2,
    title: 'Maquetación Editorial KDP Pro',
    tagline: 'Experiencia de lectura de lujo con estándares editoriales internacionales',
    iconName: 'Layers',
    desc: 'Maquetación artesanal y avanzada. Interiores pulidos con capitulares estéticas, ornamentos tipográficos y diagramación líquida para cualquier dispositivo.',
    features: [
      'Formato ePub reflowable verificado 100% libre de advertencias de Amazon',
      'PDF de imprenta con márgenes de seguridad milimétricos y paginación simétrica',
      'Tipografías licenciadas, cornisas elegantes y ornamentos decorativos',
      'Tabla de contenido interactiva multinivel con notas al pie hipervinculadas',
    ],
    deliverables: 'Archivos maestros .epub para digital, PDF print-ready para Amazon KDP e IngramSpark.',
  },
  {
    id: 3,
    title: 'Booktrailers Cinematográficos 4K',
    tagline: 'El impacto audiovisual que despierta la intriga de miles de lectores',
    iconName: 'Film',
    desc: 'Piezas audiovisuales con ritmo de película, locución profesional, efectos visuales 3D y diseño de sonido envolvente para cautivar en TikTok, Instagram y YouTube.',
    features: [
      'Guión dramático enfocado en el hook emocional de tu libro',
      'Locución en español neutro o acento a elección con dobladores profesionales',
      'Animación 3D de tu portada interactuando con efectos cinemáticos',
      'Formatos verticales 9:16 (Reels/TikTok/Shorts) y horizontal 16:9 (YouTube/Web)',
    ],
    deliverables: 'Videos renderizados en 4K/1080p en 9:16 y 16:9, pista de audio masterizada y miniaturas.',
  },
  {
    id: 4,
    title: 'Estrategia de Lanzamiento Bestseller',
    tagline: 'Domina el algoritmo de Amazon y conquista el codiciado badge nº 1',
    iconName: 'Rocket',
    desc: 'Plan estratégico de 30 días para impulsar tu obra al Top 100 de su categoría. Investigación profunda de palabras clave y reclutamiento de lectores cero.',
    features: [
      'Identificación de hasta 10 categorías de alta conversión y baja competencia',
      'Guía y protocolos para crear un escuadrón de lectores beta (ARC Launch Team)',
      'Optimización de metadatos SEO, título, subtítulo y copywriting persuasivo',
      'Configuración de estrategia de precio escalonado para disparar la velocidad de ventas',
    ],
    deliverables: 'Calendario de lanzamiento día a día, reporte de palabras clave y guiones de preventa.',
  },
  {
    id: 5,
    title: 'Contenido A+ & Brand Story',
    tagline: 'Multiplica hasta x3 la tasa de conversión en tu ficha de Amazon',
    iconName: 'Sparkles',
    desc: 'Módulos visuales inmersivos diseñados a medida para la descripción de tu libro. Convierte a los visitantes curiosos en lectores apasionados con autoridad de marca.',
    features: [
      'Banners gráficos panorámicos con estética editorial cinematográfica',
      'Esquemas visuales de capítulos clave y comparativas de contenido',
      'Sección de autoridad del autor para construir comunidad duradera',
      'Optimización de legibilidad garantizada en la app móvil de Amazon',
    ],
    deliverables: 'Pack de 4 a 6 módulos gráficos en alta resolución listos para cargar en Amazon KDP.',
  },
];

// Portadas sustituibles para el carrusel
export const PORTFOLIO_COVERS: PortfolioCover[] = [
  {
    id: 1,
    title: 'El Arte del Bestseller',
    genre: 'Empresa & Estrategia',
    sales: '+14,200 copias',
    bestsellerRank: '#1 en Empresa y Liderazgo',
    bgGradient: 'from-[#2a0808] to-[#451010]',
    accentColor: '#D62828',
  },
  {
    id: 2,
    title: 'El Último Susurro',
    genre: 'Thriller Psicológico',
    sales: '+18,500 lectores',
    bestsellerRank: '#1 en Misterio y Suspense',
    bgGradient: 'from-[#091522] to-[#132c45]',
    accentColor: '#38bdf8',
  },
  {
    id: 3,
    title: 'Hábitos Silenciosos',
    genre: 'Desarrollo Personal',
    sales: '+22,900 copias',
    bestsellerRank: '#1 en Crecimiento Personal',
    bgGradient: 'from-[#062426] to-[#0b3c40]',
    accentColor: '#2dd4bf',
  },
  {
    id: 4,
    title: 'Capital Inteligente',
    genre: 'Finanzas & Inversión',
    sales: '+9,800 copias',
    bestsellerRank: '#1 en Economía Global',
    bgGradient: 'from-[#1a1c23] to-[#252836]',
    accentColor: '#f59e0b',
  },
  {
    id: 5,
    title: 'La Ciudad de Ceniza',
    genre: 'Fantasía Épica',
    sales: '+11,400 lectores',
    bestsellerRank: '#1 en Ficción Juvenil',
    bgGradient: 'from-[#1f102b] to-[#36154d]',
    accentColor: '#a855f7',
  },
  {
    id: 6,
    title: 'Mente sin Límites',
    genre: 'Productividad & Enfoque',
    sales: '+16,100 copias',
    bestsellerRank: '#1 en Gestión del Tiempo',
    bgGradient: 'from-[#06292b] to-[#0d474b]',
    accentColor: '#10b981',
  },
];

// Booktrailers cinematográficos
export const BOOKTRAILERS_DATA: BooktrailerItem[] = [
  {
    id: 1,
    title: 'El Último Susurro: Tráiler Oficial',
    genre: 'Thriller Psicológico',
    duration: '0:45',
    views: '128K views en TikTok/Reels',
    directorNote: 'Diseñado con música orquestal in crescendo, cortes a negro y tipografía titilante para generar misterio.',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    videoPlaceholderTag: 'Trailer Cinematográfico 4K',
    synopsis: 'Una llamada en la madrugada desencadena una cuenta regresiva donde cada recuerdo es una mentira.',
    youtubeUrl: 'https://www.youtube.com/watch?v=kYfxT2T_D08',
  },
  {
    id: 2,
    title: 'Hábitos Silenciosos: Lanzamiento Editorial',
    genre: 'No Ficción & Superación',
    duration: '0:52',
    views: '94K views en YouTube/Instagram',
    directorNote: 'Locución solemne y planos macro de páginas, reloj y amanecer con sonido binaural inmersivo.',
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    videoPlaceholderTag: 'Campaña de Autoridad',
    synopsis: 'El verdadero cambio no hace ruido. Descubre las microdecisiones que transforman tu destino.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 3,
    title: 'La Ciudad de Ceniza: Booktrailer Épico',
    genre: 'Fantasía & Aventuras',
    duration: '1:05',
    views: '210K views virales',
    directorNote: 'Efectos de fuego digital en 3D, partículas de humo y percusión de guerra para impacto juvenil.',
    thumbnail: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=800&q=80',
    videoPlaceholderTag: 'Efectos 3D & VFX',
    synopsis: 'Cuando la última llama del reino se extinga, solo aquellos que desafían a la muerte sobrevivirán.',
    youtubeUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 1,
    name: 'Dr. Carlos Mendoza',
    role: 'Autor Bestseller & Conferencista',
    book: 'Hábitos Silenciosos (Desarrollo Personal)',
    metric: '#1 Bestseller en 4 categorías simultáneas',
    copies: '14,800+ copias en 90 días',
    quote: 'Best Book Marketing transformó mi manuscrito en un activo de seis cifras. El acabado interior le dio una categoría que superó a las mejores editoriales tradicionales, y su estrategia de lanzamiento me posicionó en el podio de Amazon KDP en menos de 36 horas.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sofía Valenzuela',
    role: 'Novelista de Ficción Independiente',
    book: 'El Último Susurro (Thriller)',
    metric: 'Top 50 Global en Kindle Unlimited',
    copies: '18,200+ lectores en Kindle',
    quote: 'El diseño de portada cinematográfica y el booktrailer provocaron que mi tasa de conversión se triplicara. Los autores independientes solemos descuidar el impacto visual; trabajar con ellos fue el salto profesional definitivo para mi carrera literaria.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 3,
    name: 'Javier Arismendi',
    role: 'Consultor de Finanzas & Emprendimiento',
    book: 'Capital Inteligente (Economía & Negocios)',
    metric: 'Nº 1 en Negocios y Finanzas Personales',
    copies: '9,400+ libros impresos y digitales',
    quote: 'Gracias a su optimización y posicionamiento de palabras clave, mi libro se convirtió en el principal canal de captación de clientes para mi firma. El retorno de inversión se cubrió con creces durante la misma semana de lanzamiento.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];

export const INITIAL_FAQS = [
  {
    id: 'kdp-1',
    category: 'kdp' as const,
    question: '¿Quién es el dueño de la cuenta de Amazon KDP y de las regalías?',
    answer:
      'Tú eres el 100% propietario de tu cuenta de Amazon KDP y de todas las regalías generadas. Best Book Marketing te ayuda a configurar los archivos, metadatos y estrategias de lanzamiento, pero las ventas van directamente desde Amazon a tu cuenta bancaria personal o de empresa. Nunca retenemos comisión sobre tus ventas.',
  },
  {
    id: 'kdp-2',
    category: 'kdp' as const,
    question: '¿Qué porcentaje de regalías paga Amazon KDP?',
    answer:
      'En formato eBook Kindle, Amazon paga un 70% de regalías netas para precios entre $2.99 y $9.99 USD (o 35% fuera de ese rango). En libros impresos (tapa blanda y tapa dura), Amazon paga un 60% del precio de venta menos el costo de impresión. En nuestra calculadora de la página de inicio puedes simular tu beneficio neto exacto.',
  },
  {
    id: 'diseno-1',
    category: 'diseno' as const,
    question: '¿Cómo diseñan la portada de mi libro? ¿Puedo aportar mis ideas?',
    answer:
      'El proceso comienza con un cuestionario de briefing donde nos cuentas la temática, público objetivo, libros de referencia y tus preferencias visuales. Creamos conceptos de portada cinematográficos diseñados para sobresalir en miniatura (thumbnail) en Amazon. Tienes hasta 3 rondas completas de revisiones para que el resultado final sea exactamente el que soñaste.',
  },
  {
    id: 'diseno-2',
    category: 'diseno' as const,
    question: '¿Por qué la maquetación profesional es tan importante en KDP?',
    answer:
      'Una maquetación amateur genera rechazos por parte de los inspectores de imprenta de Amazon (márgenes cortados, fuentes desbordadas, sangrías erróneas) y causa malas reseñas de lectores. Nuestro equipo entrega un PDF de imprenta simétrico con capitulares y acabados de lujo, y un archivo ePub líquido probado en todos los lectores Kindle.',
  },
  {
    id: 'tramites-1',
    category: 'tramites' as const,
    question: '¿Necesito comprar un ISBN propio o puedo usar el gratuito de Amazon?',
    answer:
      'Amazon ofrece un ISBN gratuito para libros impresos, el cual indica a Amazon como distribuidor de imprenta. Si deseas figurar con tu propio sello editorial o vender en librerías físicas tradicionales además de Amazon, te asesoramos en la compra y registro de tu propio bloque de ISBN ante la agencia de tu país.',
  },
  {
    id: 'tramites-2',
    category: 'tramites' as const,
    question: '¿Cómo protejo los derechos de autor de mi manuscrito?',
    answer:
      'Antes de publicar, te orientamos sobre cómo registrar tu obra en el Registro de la Propiedad Intelectual de tu país o a través de registros digitales con validez internacional como Safe Creative. Además, todo material que compartes con nosotros está protegido bajo un acuerdo estricto de confidencialidad (NDA).',
  },
  {
    id: 'marketing-1',
    category: 'marketing' as const,
    question: '¿Cómo funciona la estrategia para alcanzar el #1 Bestseller en Amazon?',
    answer:
      'El algoritmo de Amazon clasifica los libros por velocidad de ventas y relevancia de palabras clave. Analizamos los nichos menos saturados pero de alta demanda dentro de tu temática, optimizamos los 7 términos de búsqueda secretos de KDP, configuramos el prelanzamiento coordinado y desplegamos campañas de Amazon Ads y booktrailers para concentrar el pico de ventas que activa el codiciado distintivo de Bestseller.',
  },
  {
    id: 'marketing-2',
    category: 'marketing' as const,
    question: '¿Qué es un Booktrailer y por qué ayuda a vender?',
    answer:
      'Un booktrailer es un vídeo publicitario cinematográfico de 30 a 60 segundos con locución profesional, música original in crescendo y efectos visuales de alta tensión. Es la herramienta de mayor conversión para pautas en TikTok, Instagram Reels, YouTube Shorts y la página de autor de Amazon.',
  },
  {
    id: 'precios-1',
    category: 'precios' as const,
    question: '¿Cuánto tardan en completar un proyecto editorial integral?',
    answer:
      'El plazo habitual es de 12 a 20 días laborables para un proyecto completo que incluye portada (eBook y papel), maquetación interior completa y preparación de metadatos. Si necesitas un plazo más breve por una fecha fija de lanzamiento, disponemos de servicio express prioritario.',
  },
  {
    id: 'precios-2',
    category: 'precios' as const,
    question: '¿Puedo pagar en cuotas o con tarjeta de crédito?',
    answer:
      'Sí, aceptamos tarjetas de crédito/débito internacionales, transferencia bancaria SEPA/internacional y PayPal. Los proyectos de mayor envergadura pueden dividirse en 2 cuotas: 50% al inicio y 50% a la entrega de los archivos finales listos para subir a KDP.',
  },
];
