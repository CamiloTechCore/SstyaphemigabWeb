# Assets estáticos

Coloca aquí los archivos estáticos reales de la marca (no se gestionan desde el Blog/Drive):

- `logo.png` / `logo.svg` — Logo oficial de EMIGAB (reemplaza el placeholder de `src/components/Logo.jsx`).
- `hero-video.mp4` — Video de fondo del Hero en Home (se reproduce autoPlay + loop + muted).
- `hero-poster.jpg` — Imagen de respaldo mientras carga el video del Hero.
- `favicon.ico` — Ícono de pestaña del navegador (reemplaza `public/favicon.svg`).

Estos archivos se sirven directamente desde `/assets_estaticos/<archivo>` (carpeta `public`), sin pasar por el bundler.
