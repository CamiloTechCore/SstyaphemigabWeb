/**
 * Loader / spinner reutilizable.
 * `fullscreen` lo centra en toda la ventana (usado como fallback de Suspense).
 */
function Loader({ fullscreen = false, label = 'Cargando…' }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <span
        className="h-10 w-10 rounded-full border-4 border-navy/15 border-t-green animate-spin"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-navy/70">{label}</p>
    </div>
  )

  if (!fullscreen) return content

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm animate-fade-in">
      {content}
    </div>
  )
}

export default Loader
