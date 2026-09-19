import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChatAlt2, HiX } from 'react-icons/hi'
import GlassCard from './GlassCard'
import ContactForm from './ContactForm'

const INACTIVITY_DELAY = 30_000

function ContactPanel({ isOpen, onOpenChange }) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/contacto' || !isOpen) return undefined

    let inactivityTimeout
    const hidePanel = () => onOpenChange(false)
    const restartInactivityTimer = () => {
      window.clearTimeout(inactivityTimeout)
      inactivityTimeout = window.setTimeout(hidePanel, INACTIVITY_DELAY)
    }
    const activityEvents = ['pointerdown', 'pointermove', 'keydown', 'scroll', 'touchstart']
    activityEvents.forEach((eventName) =>
      window.addEventListener(eventName, restartInactivityTimer, { passive: true })
    )
    restartInactivityTimer()

    return () => {
      window.clearTimeout(inactivityTimeout)
      activityEvents.forEach((eventName) =>
        window.removeEventListener(eventName, restartInactivityTimer)
      )
    }
  }, [isOpen, onOpenChange, pathname])

  if (pathname === '/contacto') {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.aside
          key="contact-panel"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="glass-panel fixed right-0 top-0 z-40 hidden h-screen w-80 overflow-y-auto border-l border-navy/10 p-4 shadow-2xl lg:block"
          aria-label="Formulario de contacto"
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 rounded-lg p-2 text-navy transition-all hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
            aria-label="Ocultar formulario de contacto"
          >
            <HiX size={20} />
          </button>
          <div className="flex min-h-full flex-col gap-4 pt-7">
            <GlassCard className="flex-1" hover={false}>
              <h3 className="mb-1 text-base font-bold text-navy">Formulario de contacto</h3>
              <p className="mb-4 text-xs text-navy/60">
                Escríbenos y te responderemos a la brevedad.
              </p>
              <ContactForm compact />
            </GlassCard>
          </div>
        </motion.aside>
      ) : (
        <motion.button
          key="contact-tab"
          type="button"
          initial={{ x: 72, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 72, opacity: 0 }}
          onClick={() => onOpenChange(true)}
          className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-l-2xl bg-navy px-3 py-4 text-white shadow-xl transition-all hover:bg-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green lg:flex"
          aria-label="Abrir formulario de contacto"
        >
          <HiChatAlt2 size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ContactPanel
