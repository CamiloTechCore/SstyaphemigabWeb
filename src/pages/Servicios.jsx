import {
  FaClipboardCheck,
  FaAmbulance,
  FaChalkboardTeacher,
  FaUserShield,
  FaFireExtinguisher,
  FaFileMedicalAlt,
} from 'react-icons/fa'
import GlassCard from '../components/GlassCard'

const SERVICIOS = [
  {
    icon: FaClipboardCheck,
    title: 'Implementación SG-SST',
    text: 'Diseño, documentación e implementación del Sistema de Gestión de Seguridad y Salud en el Trabajo bajo la normatividad vigente.',
  },
  {
    icon: FaAmbulance,
    title: 'Atención Prehospitalaria',
    text: 'Cobertura APH para eventos, empresas e instituciones, con personal certificado y equipos de última generación.',
  },
  {
    icon: FaChalkboardTeacher,
    title: 'Pistas de Entrenamiento ',
    text: 'Formación en brigadas integrales de emergencias y simulacros prácticos.',
  },
  {
    icon: FaUserShield,
    title: 'Asesoría en Riesgos Laborales',
    text: 'Identificación, evaluación y control de peligros para la reducción de accidentalidad y enfermedad laboral.',
  },
  {
    icon: FaFireExtinguisher,
    title: 'Venta de Insumos',
    text: 'Recarga de Extintores, venta de botiquines , señalización de emergencia y equipos de seguridad.',
  },
  {
    icon: FaFileMedicalAlt,
    title: 'Exámenes y Vigilancia Médica',
    text: 'Programas de vigilancia epidemiológica y gestión de exámenes médicos ocupacionales.',
  },
]

function Servicios() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="page-heading">
        <h1 className="mb-3 text-3xl font-extrabold text-navy">Nuestros Servicios</h1>
        <p className="max-w-2xl text-sm text-navy/70 sm:text-base">
          Soluciones integrales pensadas para proteger a tu equipo y cumplir con la normatividad de
          Seguridad y Salud en el Trabajo.
        </p>
      </header>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
        {SERVICIOS.map(({ icon: Icon, title, text }) => (
          <GlassCard key={title}>
            <Icon className="mb-3 text-green" size={30} />
            <h2 className="mb-2 text-lg font-bold text-navy">{title}</h2>
            <p className="text-sm text-navy/70">{text}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

export default Servicios
