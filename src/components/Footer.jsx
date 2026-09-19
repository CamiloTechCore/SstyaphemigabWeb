/** Pie de página compacto, dentro del área central de contenido. */
function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="glass-panel fixed bottom-0 left-0 right-0 z-20 border-t border-navy/10 px-4 py-4 text-center text-xs text-navy/50">
      <p>
        © {year} SST Y APH EMIGAB · Seguridad y Salud en el Trabajo · Atención Prehospitalaria
      </p>
    </footer>
  )
}

export default Footer
