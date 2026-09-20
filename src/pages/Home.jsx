import { Link } from 'react-router-dom'
import { FaShieldAlt, FaHeartbeat, FaChalkboardTeacher, FaCheckCircle } from 'react-icons/fa'
import GlassCard from '../components/GlassCard'
import HomeMediaCarousel from '../components/HomeMediaCarousel'
import HeroVideoGallery from '../components/HeroVideoGallery'

const HIGHLIGHTS = [
  {
    icon: FaShieldAlt,
    title: 'SG-SST',
    text: 'Diseño e implementación del Sistema de Gestión de Seguridad y Salud en el Trabajo.',
  },
  {
    icon: FaHeartbeat,
    title: 'APH',
    text: 'Atención Prehospitalaria y cobertura de emergencias en eventos y empresas.',
  },
  {
    icon: FaChalkboardTeacher,
    title: 'Capacitaciones',
    text: 'Formación certificada en primeros auxilios, brigadas y prevención de riesgos.',
  },
]

const STATS = [
  { value: '+500', label: 'Personas capacitadas' },
  { value: '+80', label: 'Empresas atendidas' },
  { value: '24/7', label: 'Disponibilidad de APH' },
]

function Home() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* HERO */}
      <section className="home-hero relative mb-14 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/75 to-green/60" />

        <div className="home-hero-content relative z-10 flex flex-col items-start gap-8 px-6 py-10 sm:px-10 sm:py-14">
          <div className="flex min-w-0 max-w-xl flex-1 flex-col items-start gap-5">
            <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              Seguridad y Salud en el Trabajo, Atención Prehospitalaria
            </h1>
            <p className="max-w-lg text-sm text-white/85 sm:text-base">
              En SST Y APH EMIGAB protegemos la vida y el bienestar de tu equipo con soluciones
              integrales en prevención, capacitación y respuesta a emergencias.
            </p>
            <div className="flex flex-wrap gap-3">
            <Link
              to="/servicios"
              className="rounded-xl bg-green px-5 py-2.5 text-sm font-bold text-navy shadow-lg shadow-green/20 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-white hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Ver servicios
            </Link>
            <Link
              to="/contacto"
              className="rounded-xl border-2 border-white/80 bg-white/15 px-5 py-2.5 text-sm font-bold !text-white shadow-lg shadow-navy/20 backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-white hover:!text-navy hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contáctanos
            </Link>
            </div>
          </div>
          <HeroVideoGallery />
        </div>
      </section>

      <div className="home-media-carousel mb-14">
        <HomeMediaCarousel />
      </div>

      {/* STATS */}
      <section className="mb-14 grid grid-cols-3 gap-4">
        {STATS.map((s) => (
          <GlassCard key={s.label} hover={false} className="text-center">
            <p className="text-2xl font-extrabold text-navy sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-navy/60 sm:text-sm">{s.label}</p>
          </GlassCard>
        ))}
      </section>

      {/* HIGHLIGHTS */}
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-bold text-navy">¿Qué hacemos?</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
            <GlassCard key={title}>
              <Icon className="mb-3 text-green" size={30} />
              <h3 className="mb-2 text-lg font-bold text-navy">{title}</h3>
              <p className="text-sm text-navy/70">{text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="mb-6">
        <GlassCard variant="dark" hover={false} className="grid gap-4 sm:grid-cols-2">
          <div>
            <h2 className="mb-2 text-xl font-bold">¿Por qué elegirnos?</h2>
            <p className="text-sm text-white/80">
              Equipo profesional certificado, protocolos actualizados y acompañamiento
              cercano en cada etapa de implementación.
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            {['Personal certificado', 'Respuesta rápida', 'Cumplimiento normativo', 'Acompañamiento continuo'].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green" /> {item}
                </li>
              )
            )}
          </ul>
        </GlassCard>
      </section>
    </div>
  )
}

export default Home
