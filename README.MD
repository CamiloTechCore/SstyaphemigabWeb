# **Portafolio Web \- SST Y APH EMIGAB**

## Configuración de producción

`codigo.gs` es la fuente del backend. `codigo.txt` es una referencia antigua; no debe usarse para actualizar el Web App.

1. Copiar `codigo.gs` en el proyecto de Apps Script vinculado a la hoja existente. Ejecutar `configurarEntorno` y autorizar los permisos necesarios. La migración conserva las publicaciones, agrega la columna `ID` con UUID persistentes y crea `Reacciones` con Post ID, Voter ID, Reacción y Actualizado. Mantener la columna ID junto a cada publicación al ordenar filas.
2. Actualizar la implementación del Web App a una **nueva versión**, ejecutada como propietario, con acceso público. Copiar su URL `https://script.google.com/macros/s/…/exec`.
3. El frontend incluye como valor predeterminado la URL pública facilitada por el propietario en `src/services/api.js`; funciona aunque Vercel no tenga variables configuradas. Para otro backend, configurar `VITE_API_URL` en Production/Preview y reconstruir. Una variable vacía o el marcador antiguo `TU_SCRIPT_ID` usa el valor predeterminado. Para desarrollo se puede copiar `.env.example` a `.env.local`. Los IDs de Sheets y Drive de `codigo.gs` no son la URL del Web App. Las variables VITE se incluyen en el bundle público; nunca colocar contraseñas ni credenciales ahí.
4. La galería del hero muestra videos verticales 9:16 y se alinea a la derecha en escritorio. Configurar `VITE_HERO_VIMEO_URLS` con enlaces de Vimeo separados por comas, por ejemplo `https://vimeo.com/ID_1,https://vimeo.com/ID_2`. Reiniciar Vite tras editar `.env` o reconstruir para producción. Admite enlaces normales, player y no listados con hash; ignora enlaces inválidos y duplicados. Los controles anterior/siguiente aparecen con más de un video; solo se monta el reproductor seleccionado, con reproducción automática sin sonido y en bucle. La variable plural tiene prioridad, incluso vacía (muestra la marca). Se mantiene compatibilidad con `VITE_HERO_VIMEO_URL` y, sin ninguna variable, se usa APH_Video1 (`https://player.vimeo.com/video/1228365227`). Permitir el dominio del sitio en Vimeo: la galería no modifica los permisos ni la disponibilidad del video.

Las reacciones se guardan por publicación y un UUID anónimo persistido en el navegador. Repetir la misma solicitud no suma votos; elegir otra reacción reemplaza la anterior. Un bloqueo de Apps Script serializa migraciones y escrituras. No es un mecanismo de identidad: borrar almacenamiento o cambiar de navegador permite otro voto. El ID de publicación no se muestra en el modal. Las reacciones necesitan la versión actualizada del backend.

Validación local: `npm ci`, `npm run build`, `npm run lint` y `node --test tests/backend.test.cjs`. La validación real de Sheets/Vimeo requiere las URLs y el despliegue autorizados.

## **🚀 Descripción del Proyecto**

Plataforma web integral para **SST Y APH EMIGAB**, empresa dedicada a brindar soluciones en Seguridad y Salud en el Trabajo (SG-SST) y Atención Prehospitalaria (APH).

Este portafolio no solo presenta los servicios de la empresa, sino que incluye un sistema de contacto dinámico y un módulo de Blog autogestionable con autenticación de administrador, ideal para proyectos enfocados en la gestión de seguridad y salud ocupacional.

## **🎨 Paleta de Colores y Diseño UI/UX**

Basado en la identidad visual de EMIGAB (Logo y Flyer), se define la siguiente paleta:

* **Azul Marino Corporativo:** \#06315A (Uso en textos principales, headers, footers y botones primarios. Transmite profesionalismo, seguridad y confianza).  
* **Verde Prevención:** \#6DC045 (Uso en llamados a la acción (CTAs), iconos de checklist y detalles visuales. Transmite salud, bienestar y prevención).  
* **Blanco Puro:** \#FFFFFF (Fondo general para legibilidad).  
* **Gris Claro (Fondo Glassmorphism):** \#F3F4F6 o tonos semitransparentes.

### **Estilo Visual: Glassmorphism (Vidrio Líquido)**

Para lograr un diseño moderno, fluido y profesional, se utilizará el efecto *Glassmorphism* en tarjetas (servicios, posts del blog, formularios).

**Ejemplo de CSS base:**

.glass-card {  
  background: rgba(255, 255, 255, 0.25);  
  backdrop-filter: blur(12px);  
  \-webkit-backdrop-filter: blur(12px);  
  border-radius: 20px;  
  border: 1px solid rgba(255, 255, 255, 0.18);  
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);  
}

## **⚙️ Stack Tecnológico**

* **Frontend:** React (con Vite), React Router DOM (para enrutamiento).  
* **Backend / API:** Node.js (opcional intermedio) \+ Google Apps Script (Serverless API en Google Cloud).  
* **Base de Datos:** Google Sheets (Hojas: BD Contacto, Blog, Usuarios).  
* **Contenido del Blog:** Publicaciones de texto enriquecido.  
* **Estilos:** CSS Modules / Tailwind CSS (Optimizado para animaciones fluidas y Glassmorphism).

## **📋 Requisitos Funcionales**

1. **Navegación Principal:** Sistema de rutas que incluya /Home, /SobreNosotros, /Servicios, /Blog y /Contacto.  
2. **Módulo de Contacto:** Formulario funcional que envíe datos a Google Sheets (Hoja: BD) y dispare una notificación por correo electrónico.  
3. **Módulo de Blog (Vista Pública):**  
   * Listado de artículos extraídos desde Google Sheets (Hoja: Blog).  
   * Visualización de imágenes, videos y GIFs asociados a cada publicación.  
4. **Módulo de Administración de Blog:**  
   * Botón flotante **(+)** o "Crear" visible en la ruta /Blog.  
   * Al hacer clic, debe solicitar **Usuario y Contraseña**.  
   * Autenticación validada contra la base de datos (Hoja: Usuarios).  
   * Formulario de creación: Permite registrar título y contenido enriquecido.
   * Las publicaciones se guardan directamente en Google Sheets.

## **📐 Requisitos No Funcionales**

1. **Transiciones y Animaciones:** Toda la fluidez de la web debe ser suave (transition: all 0.3s ease-in-out). Las vistas deben tener un efecto *fade-in* al cargar.  
2. **Reproducción Multimedia Automática:** Los videos incorporados (especialmente en la hero section o galerías) deben reproducirse automáticamente (autoPlay), en bucle (loop) y estrictamente sin sonido (muted).  
3. **Diseño Responsivo:** Adaptabilidad total a dispositivos móviles, tablets y escritorios, priorizando la legibilidad de los servicios de emergencia y contacto rápido (botón de WhatsApp siempre accesible).  
4. **Rendimiento (Performance):** Carga perezosa (*Lazy Loading*) para las imágenes y videos del portafolio y el blog.

## **📂 Arquitectura y Mapa de Carpetas (Frontend)**

/emigab-portfolio  
├── /public  
│   ├── favicon.ico  
│   └── /assets\_estaticos (Logo, videos de fondo)  
├── /src  
│   ├── /assets  
│   │   ├── /images // Imágenes estáticas de la aplicación
│   │   └── /icons  
│   ├── /components  
│   │   ├── Navbar.jsx  
│   │   ├── Footer.jsx  
│   │   ├── GlassCard.jsx  
│   │   ├── Loader.jsx  
│   │   └── ProtectedRoute.jsx (Para ocultar el form de crear blog)  
│   ├── /pages  
│   │   ├── Home.jsx  
│   │   ├── SobreNosotros.jsx  
│   │   ├── Servicios.jsx  
│   │   ├── Blog.jsx  
│   │   └── Contacto.jsx  
│   ├── /services  
│   │   ├── api.js (Llamadas Axios/Fetch a Google Apps Script)  
│   │   └── auth.js (Manejo de sesión de admin)  
│   ├── /styles  
│   │   ├── globals.css  
│   │   └── glassmorphism.css  
│   ├── App.jsx  
│   └── main.jsx  
├── README.md  
├── package.json  
└── vite.config.js  
