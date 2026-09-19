import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from 'react-icons/fa'
import GlassCard from '../components/GlassCard'
import ContactForm from '../components/ContactForm'

function Contacto() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="page-heading">
        <h1 className="mb-3 text-3xl font-extrabold text-navy">Contacto</h1>
        <p className="max-w-2xl text-sm text-navy/70 sm:text-base">
          Escríbenos y nos pondremos en contacto contigo a la brevedad.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard hover={false}>
          <h2 className="mb-4 text-lg font-bold text-navy">Envíanos un mensaje</h2>
          <ContactForm />
        </GlassCard>

        <div className="flex flex-col gap-4">
          <GlassCard hover={false}>
            <h2 className="mb-4 text-lg font-bold text-navy">Información de contacto</h2>
            <ul className="space-y-3 text-sm text-navy/70">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green" /> Colombia | Bogotá
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-green" /> +57 321 3351917
              </li>
              <li className="flex items-center gap-3">
                <FaClock className="text-green" /> Lun - Vie: 8:00 AM - 6:00 PM
              </li>
            </ul>
          </GlassCard>

          <GlassCard variant="dark" hover={false}>
            <p className="text-sm text-white/85">
              Para emergencias o requerimientos urgentes de APH, contáctanos directamente por
              WhatsApp usando el botón flotante disponible en toda la web.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

export default Contacto
