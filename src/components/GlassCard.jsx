import { motion } from 'framer-motion'

/**
 * Tarjeta con efecto Glassmorphism, reutilizada en Servicios, Blog y Formularios.
 * variant: 'light' (por defecto, sobre fondos claros) | 'dark' (sobre fondos navy/imagen)
 */
function GlassCard({
  children,
  className = '',
  variant = 'light',
  as: Component = motion.div,
  hover = true,
  ...props
}) {
  const base = variant === 'dark' ? 'glass-card-dark' : 'glass-card'

  return (
    <Component
      className={`${base} p-6 ${className}`}
      whileHover={hover ? { y: -6, transition: { duration: 0.25 } } : undefined}
      {...props}
    >
      {children}
    </Component>
  )
}

export default GlassCard
