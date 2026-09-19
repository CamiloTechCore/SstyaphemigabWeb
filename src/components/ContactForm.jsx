import { useState } from 'react'
import { motion } from 'framer-motion'
import { sendContact } from '../services/api'

const initialState = { name: '', email: '', message: '' }

/**
 * Formulario de contacto reutilizable (panel lateral y página /Contacto).
 * Envía los datos a Google Sheets vía Apps Script (acción "contact").
 */
function ContactForm({ compact = false }) {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      setErrorMsg('Por favor completa todos los campos.')
      return
    }

    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await sendContact(form)
      if (res && res.success) {
        setStatus('success')
        setForm(initialState)
      } else {
        throw new Error(res?.error || 'No se pudo enviar el mensaje.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Ocurrió un error al enviar. Intenta de nuevo.')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-navy/15 bg-white/70 px-3 py-2 text-sm text-navy placeholder:text-navy/40 outline-none transition-all duration-300 ease-in-out focus:border-green focus:ring-2 focus:ring-green/30'

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-3' : 'space-y-4'}>
      <div>
        <label className="mb-1 block text-xs font-semibold text-navy/70">Nombre</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tu nombre completo"
          className={inputClass}
          autoComplete="name"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-navy/70">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tucorreo@ejemplo.com"
          className={inputClass}
          autoComplete="email"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-navy/70">Mensaje</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Cuéntanos qué servicio necesitas…"
          rows={compact ? 3 : 5}
          className={`${inputClass} resize-none`}
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        whileTap={{ scale: 0.96 }}
        className="w-full rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-green disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
      </motion.button>

      {status === 'success' && (
        <p className="animate-fade-in rounded-lg bg-green/15 px-3 py-2 text-xs font-medium text-green-dark">
          ¡Gracias! Tu mensaje fue enviado, te contactaremos pronto. te quiero
        </p>
      )}
      {status === 'error' && (
        <p className="animate-fade-in rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-600">
          {errorMsg}
        </p>
      )}
    </form>
  )
}

export default ContactForm
