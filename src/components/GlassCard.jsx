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
  delay = 0,
  hover = true,
  ...props
}) {
  const base = variant === 'dark' ? 'glass-card-dark' : 'glass-card'

  return (
    <Component
      className={`${base} p-6 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={hover ? { y: -6, transition: { duration: 0.25 } } : undefined}
      transition={{ duration: 0.5, ease: 'easeInOut', delay }}
      {...props}
    >
      {children}
    </Component>
  )
}

export default GlassCard
