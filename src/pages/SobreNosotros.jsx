import { FaBullseye, FaEye, FaHandsHelping } from 'react-icons/fa'
import GlassCard from '../components/GlassCard'

const VALUES = [
  'Compromiso con la vida',
  'Integridad y transparencia',
  'Excelencia en el servicio',
  'Mejora continua',
]

function SobreNosotros() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="page-heading">
        <h1 className="mb-3 text-3xl font-extrabold text-navy">Sobre Nosotros</h1>
        <p className="max-w-2xl text-sm text-navy/70 sm:text-base">
          <strong>SST Y APH EMIGAB</strong> es una empresa dedicada a brindar soluciones integrales
          en Seguridad y Salud en el Trabajo (SG-SST) y Atención Prehospitalaria (APH), con un
          equipo humano comprometido con la prevención y el cuidado de la vida.
        </p>
      </header>

      <div className="mb-10 grid gap-5 sm:grid-cols-2">
        <GlassCard>
          <FaBullseye className="mb-3 text-green" size={28} />
          <h2 className="mb-2 text-lg font-bold text-navy">Misión</h2>
          <p className="text-sm text-navy/70">
            Brindar servicios de seguridad y salud en el trabajo y atención prehospitalaria de
            alta calidad, contribuyendo al bienestar y la reducción de riesgos laborales de
            nuestros clientes.
          </p>
        </GlassCard>
        <GlassCard delay={0.1}>
          <FaEye className="mb-3 text-green" size={28} />
          <h2 className="mb-2 text-lg font-bold text-navy">Visión</h2>
          <p className="text-sm text-navy/70">
            Ser reconocidos como la empresa líder en SG-SST y APH, referentes en innovación,
            calidad y compromiso con la prevención en la región.
          </p>
        </GlassCard>
      </div>

      <GlassCard variant="dark" hover={false} className="mb-10">
        <div className="flex items-start gap-4">
          <FaHandsHelping size={30} className="mt-1 shrink-0 text-green" />
          <div>
            <h2 className="mb-2 text-lg font-bold">Nuestros valores</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm text-white/85">
              {VALUES.map((v) => (
                <li key={v}>• {v}</li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

export default SobreNosotros
