import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DOMPurify from 'dompurify'
import { HiPlus, HiX } from 'react-icons/hi'
import GlassCard from '../components/GlassCard'
import Loader from '../components/Loader'
import AdminAuthModal from '../components/AdminAuthModal'
import CreatePostModal from '../components/CreatePostModal'
import ProtectedRoute from '../components/ProtectedRoute'
import { getPosts } from '../services/api'
import { isAuthenticated } from '../services/auth'

function PostMedia({ url, type }) {
  if (!url) return null

  if (type?.startsWith('video')) {
    return (
      <video
        src={url}
        className="mb-4 h-48 w-full rounded-xl object-cover"
        autoPlay
        loop
        muted
        playsInline
        controls
        preload="none"
      />
    )
  }

  return (
    <img
      src={url}
      alt=""
      loading="lazy"
      className="mb-4 h-48 w-full rounded-xl object-cover"
    />
  )
}

function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const fetchPosts = async () => {
    setLoading(true)
    setLoadError(false)
    try {
      const res = await getPosts()
      setPosts(res?.data || [])
    } catch {
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchTimeout = window.setTimeout(fetchPosts, 0)
    return () => window.clearTimeout(fetchTimeout)
  }, [])

  const handleFabClick = () => {
    if (isAuthenticated()) {
      setShowCreate(true)
    } else {
      setShowAuth(true)
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="page-heading">
        <h1 className="mb-3 text-3xl font-extrabold text-navy">Blog</h1>
        <p className="max-w-2xl text-sm text-navy/70 sm:text-base">
          Noticias, consejos de prevención y actualizaciones sobre Seguridad y Salud en el Trabajo
          y Atención Prehospitalaria.
        </p>
      </header>

      {loading && <Loader label="Cargando publicaciones…" />}

      {!loading && loadError && (
        <GlassCard hover={false} className="text-center text-sm text-navy/60">
          No se pudieron cargar las publicaciones. Verifica la conexión con la API.
        </GlassCard>
      )}

      {!loading && !loadError && posts.length === 0 && (
        <GlassCard hover={false} className="text-center text-sm text-navy/60">
          Aún no hay publicaciones. ¡Vuelve pronto!
        </GlassCard>
      )}

      {!loading && !loadError && posts.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <GlassCard
              key={`${post.fecha}-${i}`}
              as={motion.button}
              delay={(i % 3) * 0.08}
              onClick={() => setSelectedPost(post)}
              className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
              aria-label={`Leer publicación: ${post.titulo}`}
            >
              <PostMedia url={post.urlArchivo} type={post.tipoArchivo} />
              <h2 className="mb-1 text-lg font-bold text-navy">{post.titulo}</h2>
              <p className="mb-2 text-xs text-navy/50">
                {post.fecha ? new Date(post.fecha).toLocaleDateString('es-CO') : ''}
              </p>
              <div
                className="post-content line-clamp-4 text-sm text-navy/70"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contenido || '') }}
              />
            </GlassCard>
          ))}
        </div>
      )}

      {/* Botón flotante de creación (solo en /Blog) */}
      <motion.button
        onClick={handleFabClick}
        aria-label="Crear publicación"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-colors duration-300 ease-in-out hover:bg-green md:bottom-6 md:left-6"
      >
        <HiPlus size={26} />
      </motion.button>

      <AdminAuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={() => {
          setShowAuth(false)
          setShowCreate(true)
        }}
      />

      <ProtectedRoute fallback={null}>
        <CreatePostModal
          open={showCreate}
          onClose={() => setShowCreate(false)}
          onCreated={fetchPosts}
        />
      </ProtectedRoute>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/70 p-4 backdrop-blur-md sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedPost.titulo}
          >
            <motion.article
              className="modal-surface my-auto w-full max-w-3xl rounded-2xl p-5 shadow-2xl sm:p-8"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs text-navy/50">
                    {selectedPost.fecha
                      ? new Date(selectedPost.fecha).toLocaleDateString('es-CO')
                      : ''}
                  </p>
                  <h2 className="text-2xl font-extrabold text-navy">{selectedPost.titulo}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="rounded-lg p-2 text-navy hover:bg-navy hover:text-white"
                  aria-label="Cerrar publicación"
                >
                  <HiX size={22} />
                </button>
              </div>
              <PostMedia url={selectedPost.urlArchivo} type={selectedPost.tipoArchivo} />
              <div
                className="post-content text-sm text-navy/70 sm:text-base"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPost.contenido || '') }}
              />
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Blog
