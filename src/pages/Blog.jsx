import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DOMPurify from 'dompurify'
import { HiBell, HiPlus, HiX } from 'react-icons/hi'
import GlassCard from '../components/GlassCard'
import Loader from '../components/Loader'
import AdminAuthModal from '../components/AdminAuthModal'
import CreatePostModal from '../components/CreatePostModal'
import ProtectedRoute from '../components/ProtectedRoute'
import PostReactions from '../components/PostReactions'
import { getPosts, reactToPost } from '../services/api'
import { isAuthenticated } from '../services/auth'

function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const pendingIds = useRef(new Set())
  const [pendingReactions, setPendingReactions] = useState({})
  const updateReactions = (id, data) => {
    setPosts(current => current.map(post => post.id === id ? { ...post, ...data } : post))
    setSelectedPost(current => current?.id === id ? { ...current, ...data } : current)
  }
  const handleReaction = async (id, reaction) => {
    if (pendingIds.current.has(id)) return
    pendingIds.current.add(id)
    setPendingReactions(current => ({ ...current, [id]: true }))
    try {
      const response = await reactToPost(id, reaction)
      updateReactions(id, response.data)
    } finally {
      pendingIds.current.delete(id)
      setPendingReactions(current => ({ ...current, [id]: false }))
    }
  }

  const hasContentLink = (post) => {
    const document = new DOMParser().parseFromString(post.contenido || '', 'text/html')
    return Boolean(document.querySelector('a[href^="http://"], a[href^="https://"]'))
  }

  const fetchPosts = async () => {
    setLoading(true)
    setLoadError(false)
    try {
      const res = await getPosts()
      setPosts(res?.data || [])
    } catch (error) {
      setLoadError(error.message || 'No se pudieron cargar las publicaciones.')
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
          {loadError}
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
            <article key={post.id || `${post.fecha}-${i}`} className="flex min-w-0 flex-col gap-3">
            <GlassCard
              as={motion.button}
              onClick={() => setSelectedPost(post)}
              className="relative w-full flex-1 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
              aria-label={`Leer publicación: ${post.titulo}`}
            >
              {hasContentLink(post) && (
                <span
                  className="group absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white shadow-md"
                  title="Este párrafo contiene un enlace"
                >
                  <HiBell size={18} />
                  <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
                  <span className="pointer-events-none absolute right-0 top-11 w-44 rounded-lg bg-navy px-2 py-1.5 text-center text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    Este párrafo contiene un enlace
                  </span>
                </span>
              )}
              <h2 className="mb-1 text-lg font-bold text-navy">{post.titulo}</h2>
              <p className="mb-2 text-xs text-navy/50">
                {post.fecha ? new Date(post.fecha).toLocaleDateString('es-CO') : ''}
              </p>
              <div
                className="post-content line-clamp-4 text-sm text-navy/70"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.contenido || '') }}
              />
            </GlassCard>
            <PostReactions post={post} onReact={handleReaction} pending={Boolean(pendingReactions[post.id])} compact />
            </article>
          ))}
        </div>
      )}

      {/* Botón flotante de creación (solo en /Blog) */}
      <motion.button
        onClick={handleFabClick}
        aria-label="Crear publicación"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
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
              className="blog-note modal-surface my-auto w-full max-w-3xl overflow-hidden rounded-3xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(event) => event.stopPropagation()}
            >
              <header className="blog-note-header flex items-start justify-between gap-4 p-5 sm:p-8">
                <div className="min-w-0">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-navy/60">
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
              </header>
              <div className="blog-note-content p-5 sm:p-8">
                {hasContentLink(selectedPost) && (
                  <p className="mb-5 flex items-center gap-2 rounded-xl bg-green/15 px-3 py-2 text-xs font-semibold text-green-dark">
                    <HiBell size={17} />
                    Esta publicación contiene uno o más enlaces.
                  </p>
                )}
                <div
                  className="post-content text-sm text-navy/70 sm:text-base"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPost.contenido || '') }}
                />
                <PostReactions key={selectedPost.id} post={selectedPost} onReact={handleReaction} pending={Boolean(pendingReactions[selectedPost.id])} />
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Blog
