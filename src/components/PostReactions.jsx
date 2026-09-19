import { useRef, useState } from 'react'
import { FaThumbsUp, FaThumbsDown, FaHeart } from 'react-icons/fa'
import '../styles/reactions.css'

const OPTIONS = [ ['like', 'Me gusta', FaThumbsUp], ['dislike', 'No me gusta', FaThumbsDown], ['love', 'Me encanta', FaHeart] ]

export default function PostReactions({ post, onReact, pending = false, compact = false }) {
  const busy = useRef(false)
  const [error, setError] = useState('')
  async function vote(reaction) {
    if (busy.current || pending || post.myReaction === reaction) return
    busy.current = true
    setError('')
    try {
      await onReact(post.id, reaction)
    } catch (err) {
      setError(err.message || 'No se pudo guardar tu reacción. Intenta nuevamente.')
    } finally {
      busy.current = false
    }
  }
  if (!post.id) return null
  return (
    <div className={`post-reactions ${compact ? 'post-reactions-compact' : 'post-reactions-modal'}`}>
      {!compact && <p className="reaction-heading">¿Qué te pareció esta publicación?</p>}
      <div className="reaction-options" role="group" aria-label={`Reacciones a ${post.titulo}`} aria-busy={pending}>
        {OPTIONS.map(([value, label, Icon]) => (
          <button key={value} type="button" disabled={pending} aria-label={`${label}: ${post.reactions?.[value] || 0}`} title={label} aria-pressed={post.myReaction === value} onClick={() => vote(value)} className={`reaction-button reaction-${value}`}>
            <Icon aria-hidden="true" className="reaction-icon" /> <span className={compact ? 'sr-only' : 'reaction-label'}>{label}</span> <span className="reaction-count">{post.reactions?.[value] || 0}</span>
          </button>
        ))}
      </div>
      <span role="status" className="sr-only">{pending ? 'Guardando reacción…' : ''}</span>
      {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  )
}
