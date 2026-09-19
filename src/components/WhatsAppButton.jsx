import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '573000000000'
const DEFAULT_MESSAGE = 'Hola, quiero más información sobre los servicios de SST Y APH EMIGAB.'

/**
 * Botón flotante de WhatsApp, siempre accesible (desktop y móvil),
 * por encima del resto de la interfaz.
 */
function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green text-white shadow-lg md:bottom-6 md:right-6"
    >
      <FaWhatsapp size={28} />
    </motion.a>
  )
}

export default WhatsAppButton
