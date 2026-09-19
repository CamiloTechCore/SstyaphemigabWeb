import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { loginAdmin } from '../services/auth'

/**
 * Modal de autenticación de administrador, requerido antes de poder
 * crear un post en el Blog (validado contra la Hoja "Usuarios").
 */
function AdminAuthModal({ open, onClose, onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const res = await loginAdmin(username.trim(), password)
      if (res && res.success) {
        setStatus('idle')
        setUsername('')
        setPassword('')
        onSuccess?.()
      } else {
        setStatus('error')
        setError(res?.message || 'Credenciales inválidas.')
      }
    } catch {
      setStatus('error')
      setError('No se pudo validar el acceso. Intenta de nuevo.')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card w-full max-w-sm bg-white/80 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy">Acceso administrador</h2>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-navy/60 hover:bg-navy/10"
              >
                <HiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-navy/70">Usuario</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-navy/15 bg-white/70 px-3 py-2 text-sm outline-none focus:border-green focus:ring-2 focus:ring-green/30"
                  autoFocus
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-navy/70">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-navy/15 bg-white/70 px-3 py-2 text-sm outline-none focus:border-green focus:ring-2 focus:ring-green/30"
                />
              </div>

              {status === 'error' && (
                <p className="rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-green disabled:opacity-60"
              >
                {status === 'loading' ? 'Verificando…' : 'Ingresar'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AdminAuthModal
