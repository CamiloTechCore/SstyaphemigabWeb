import { isAuthenticated } from '../services/auth'

/**
 * Gatekeeper para contenido de administrador (ej. formulario de creación de posts).
 * No es una ruta de router: envuelve el contenido protegido y solo lo muestra
 * si existe una sesión de admin válida en localStorage.
 */
function ProtectedRoute({ children, fallback = null }) {
  return isAuthenticated() ? children : fallback
}

export default ProtectedRoute
