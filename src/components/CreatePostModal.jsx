import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { createPost } from '../services/api'

const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'clean'],
  ],
}

function hasEditorContent(value) {
  return value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0
}

function isValidMediaUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function getMediaType(url) {
  return /\.(mp4|webm|ogg)(?:$|[?#])/i.test(url) ? 'video/*' : 'image/*'
}

function formatContentForStorage(value) {
  return value
    .replace(/<\/p>\s*<p[^>]*>/gi, '<br>')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '')
}

/**
 * Modal de creación de post del Blog (solo accesible con sesión de admin).
 * Guarda título, contenido y una URL multimedia opcional en la hoja Blog.
 */
function CreatePostModal({ open, onClose, onCreated }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')

  const resetForm = () => {
    setTitle('')
    setContent('')
    setMediaUrl('')
    setStatus('idle')
    setError('')
    setWarning('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !hasEditorContent(content)) {
      setError('El título y el contenido son obligatorios.')
      return
    }
    if (mediaUrl.trim() && !isValidMediaUrl(mediaUrl.trim())) {
      setError('Ingresa una URL válida que inicie con http:// o https://.')
      return
    }

    setStatus('loading')
    setError('')
    try {
      const res = await createPost({
        title,
        content: formatContentForStorage(content),
        mediaUrl: mediaUrl.trim(),
        mediaType: mediaUrl.trim() ? getMediaType(mediaUrl.trim()) : 'none',
      })
      if (res && res.success) {
        setStatus('success')
        setWarning(res.warning || '')
        onCreated?.()
        setTimeout(handleClose, res.warning ? 3500 : 900)
      } else {
        throw new Error(res?.error || 'No se pudo publicar el post.')
      }
    } catch (requestError) {
      setStatus('error')
      setError(
        requestError.response?.data?.error ||
          requestError.message ||
          'Ocurrió un error al publicar. Intenta de nuevo.'
      )
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-white/70 p-4 backdrop-blur-md sm:items-center sm:p-6"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
            className="modal-surface my-auto w-full max-w-3xl rounded-2xl p-5 shadow-2xl sm:p-7"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy">Nueva publicación</h2>
              <button
                onClick={handleClose}
                aria-label="Cerrar"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-navy/60 hover:bg-navy/10"
              >
                <HiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-navy/70">Título</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-navy/15 bg-white/70 px-3 py-2 text-sm outline-none focus:border-green focus:ring-2 focus:ring-green/30"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-navy/70">Contenido</label>
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  modules={editorModules}
                  placeholder="Escribe el contenido de la publicación. Puedes incluir emojis ✨"
                  theme="snow"
                  className="rich-text-editor"
                />
                <p className="mt-2 text-xs text-navy/60">
                  Usa títulos, tamaños, fuentes, listas, enlaces, colores y emojis desde tu teclado.
                </p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-navy/70">
                  URL de imagen o video (opcional)
                </label>
                <input
                  type="url"
                  value={mediaUrl}
                  onChange={(event) => setMediaUrl(event.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full rounded-xl border border-navy/15 bg-white/70 px-3 py-2 text-sm text-navy outline-none focus:border-green focus:ring-2 focus:ring-green/30"
                />
                <p className="mt-2 text-xs text-navy/60">
                  Usa una URL pública. Las extensiones .mp4, .webm y .ogg se mostrarán como video.
                </p>
              </div>

              {status === 'error' && (
                <p className="rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-600">
                  {error}
                </p>
              )}
              {status === 'success' && (
                <p className="rounded-lg bg-green/15 px-3 py-2 text-xs font-medium text-green-dark">
                  ¡Publicación creada con éxito!
                </p>
              )}
              {warning && (
                <p className="rounded-lg bg-amber-100 px-3 py-2 text-xs font-medium text-amber-800">
                  {warning}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-green disabled:opacity-60"
              >
                {status === 'loading' ? 'Publicando…' : 'Publicar'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CreatePostModal
