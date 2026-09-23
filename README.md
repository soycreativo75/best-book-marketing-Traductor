# Best Book Marketing - Sitio Web Oficial & Panel de Administración

Sitio web de alta conversión para agencia editorial especializada en Amazon KDP, maquetación, portadas 3D, booktrailers y posicionamiento Bestseller.

## Características Principales
- **Libro 3D Interactivo**: Animación continua al pasar el ratón (apertura de portada, hojeo de páginas interiores, cierre y giro 360° mostrando lomo y contraportada con código de barras).
- **Portada de Marca**: Diseño en color rojo editorial (#D62828 y degradados de lujo) con tipografía Gotham de alto impacto y sellos KDP.
- **Panel de Administración Completo**:
  - Acceso desde el enlace discreto `Admin` en el pie de página.
  - Credenciales oficiales:
    - **Usuario**: `socabento`
    - **Contraseña**: `Joseluis75*`
  - 11 Módulos de administración:
    1. Encender/Apagar secciones del sitio en vivo.
    2. Buzón central de leads y cotizaciones.
    3. Configuración de correo receptor (`soycreativo2023@gmail.com`) y WhatsApp.
    4. Editor de títulos, subtítulos del Hero y estadísticas numéricas.
    5. Gestor de Portadas Bestseller (CRUD y subida de imágenes).
    6. Gestor de Testimonios y valoraciones de autores.
    7. Galería de Booktrailers 4K.
    8. Servicios Editoriales 360.
    9. Preguntas Frecuentes (FAQs).
    10. Editor de Planes y Precios (Starter, Pro, Élite).
    11. Editor del Logotipo Oficial.
- **Tablas de Precios KDP**: 3 niveles con entregables detallados y botones de acción.
- **Calculadora Interactiva de Regalías KDP**: Simulador de ganancias según precio y número de páginas.
- **Páginas Legales y FAQs**: Aviso de Confidencialidad, Términos y Condiciones, y Centro de Preguntas Frecuentes.

## Despliegue en Vercel
Este proyecto está optimizado para desplegarse en **Vercel** como aplicación React + Vite:

1. **Subir a GitHub** o importar la carpeta del proyecto en Vercel.
2. Vercel detectará automáticamente la configuración:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Incluye `vercel.json` con reescritura para manejo limpio de rutas y hashes.

## Desarrollo Local
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
