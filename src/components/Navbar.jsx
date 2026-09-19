import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/blog', label: 'Blog' },
  { to: '/contacto', label: 'Contacto' },
]

const linkBase =
  'block rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-300 ease-in-out'

/**
 * Barra de navegación:
 * - Desktop (>= lg): columna vertical fija a la izquierda (logo + nav).
 * - Móvil: barra superior con logo + botón hamburguesa que abre un panel lateral.
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const renderLinks = (onClick) =>
    NAV_ITEMS.map(({ to, label, end }) => (
      <NavLink
        key={to}
        to={to}
        end={end}
        onClick={onClick}
        className={({ isActive }) =>
          `${linkBase} ${
            isActive
              ? 'bg-navy !text-white shadow-md ring-1 ring-navy-dark/30 hover:bg-navy-light'
              : 'text-navy/70 hover:bg-navy/10 hover:text-navy'
          }`
        }
      >
        {label}
      </NavLink>
    ))

  return (
    <>
      {/* --- Desktop sidebar --- */}
      <aside className="glass-panel sticky top-0 hidden h-screen w-56 shrink-0 flex-col gap-8 border-r border-navy/10 px-4 py-6 lg:flex">
        <Logo />
        <nav className="flex flex-col gap-1.5" aria-label="Navegación principal">
          {renderLinks()}
        </nav>
        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </aside>

      {/* --- Mobile top bar --- */}
      <header className="glass-panel sticky top-0 z-30 flex items-center justify-between border-b border-navy/10 px-4 py-3 lg:hidden">
        <Logo compact />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menú de navegación"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-navy transition-all duration-300 ease-in-out hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
          >
            <HiMenu size={24} />
          </button>
        </div>
      </header>

      {/* --- Mobile drawer --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              aria-label="Navegación móvil"
              className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col gap-8 bg-white/95 px-5 py-6 shadow-2xl backdrop-blur-lg lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar menú"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-navy hover:bg-navy/10"
                >
                  <HiX size={22} />
                </button>
              </div>
              <div className="flex flex-col gap-1.5">{renderLinks(() => setIsOpen(false))}</div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
