import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Loader from './components/Loader'

const Home = lazy(() => import('./pages/Home'))
const SobreNosotros = lazy(() => import('./pages/SobreNosotros'))
const Servicios = lazy(() => import('./pages/Servicios'))
const Blog = lazy(() => import('./pages/Blog'))
const Contacto = lazy(() => import('./pages/Contacto'))

function App() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
