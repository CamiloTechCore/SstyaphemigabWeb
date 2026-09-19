import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import ContactPanel from './ContactPanel'
import WhatsAppButton from './WhatsAppButton'
import Footer from './Footer'
import PageTransition from './PageTransition'
import SocialLinks from './SocialLinks'

/**
 * Shell persistente de la aplicación (ver mockup "Versión Web"):
 *  - Izquierda: logo + barra de navegación vertical (Navbar).
 *  - Centro: DOM donde se renderizan las secciones/páginas (Outlet + fade).
 *  - Derecha: formulario de contacto + acceso a WhatsApp + redes sociales.
 *  - Botón flotante de WhatsApp, siempre visible (desktop y móvil).
 *
 * En móvil, el panel de contacto pasa de columna fija a bloque apilado
 * debajo del contenido principal, sin perder ninguna funcionalidad.
 */
function Layout() {
  const { pathname } = useLocation()
  const [isContactPanelOpen, setIsContactPanelOpen] = useState(true)
  const reservesContactSpace = pathname !== '/contacto' && isContactPanelOpen

  return (
    <div
      className="flex min-h-screen w-full flex-col bg-bg-soft lg:flex-row"
      data-contact-panel-open={reservesContactSpace}
    >
      <Navbar />

      <main className={`scroll-thin relative flex-1 px-4 pb-24 pt-6 transition-[padding] duration-300 sm:px-6 lg:h-screen lg:overflow-y-auto lg:px-10 lg:pb-24 lg:pt-8 ${reservesContactSpace ? 'lg:pr-96' : ''}`}>
        {pathname !== '/' && (
          <div className="mb-8 flex justify-end sm:absolute sm:right-6 sm:top-6 sm:z-10 sm:mb-0 lg:right-10 lg:top-8">
            <div className="social-panel rounded-2xl px-5 py-3 text-center shadow-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-navy/60">
                Síguenos
              </p>
              <SocialLinks />
            </div>
          </div>
        )}
        <PageTransition />
      </main>

      <ContactPanel isOpen={isContactPanelOpen} onOpenChange={setIsContactPanelOpen} />
      <WhatsAppButton />
      <Footer />
    </div>
  )
}

export default Layout
