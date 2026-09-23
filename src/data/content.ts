export const HERO_BOOK_PRESETS = [
  {
    id: 'hero-1',
    title: 'El Bosque de los Mil Nombres',
    author: 'José Luis Chávez',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'hero-2',
    title: 'LADY BLOOD',
    author: 'Wuicho Chávez',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000',
  }
];

export const covers = [
  {
    id: '1',
    title: 'El Arte del Bestseller',
    author: 'José Luis Chávez',
    category: 'Empresa & Estrategia',
    badge: '#1 en Empresa y Liderazgo',
    salesCount: '+14,200 copias',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000',
    accentColor: 'from-amber-500 to-red-600',
    description: 'Estrategias probadas para posicionar tu libro en los primeros lugares de Amazon KDP.'
  },
  {
    id: '2',
    title: 'LADY BLOOD',
    author: 'Wuicho Chávez',
    category: 'Thriller Psicológico',
    badge: '#1 en Misterio y Suspense',
    salesCount: '+18,500 lectores',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000',
    accentColor: 'from-red-600 to-rose-950',
    description: 'Edición Especial de alta conversión para Amazon KDP.'
  },
  {
    id: '3',
    title: 'El Bosque de los Mil Nombres',
    author: 'José Luis Chávez',
    category: 'Fantasía',
    badge: '#1 en Fantasía Épica',
    salesCount: '+22,900 copias',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000',
    accentColor: 'from-emerald-600 to-teal-900',
    description: 'Diseño de portada impactante y maquetación profesional.'
  }
];

export const pricingTiers = [
  {
    id: 'basic',
    name: 'Esencial',
    price: '$299',
    description: 'Ideal para autores independientes que inician su camino.',
    features: ['Diseño de Portada 2D/3D', 'Maquetación ePub y PDF', 'Asesoría KDP']
  }
];

export const faqs = [
  {
    id: 'faq-1',
    question: '¿Cuánto tarda el proceso de edición?',
    answer: 'El tiempo promedio de entrega es de 7 a 14 días hábiles.'
  }
];

export const booktrailers = [
  {
    id: 'trailer-1',
    title: 'Trailer Oficial',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export const initialData = {
  HERO_BOOK_PRESETS,
  covers,
  pricingTiers,
  faqs,
  booktrailers,
};

export default initialData;