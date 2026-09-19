import { useRef, useState } from 'react'
import { FaThumbsUp, FaThumbsDown, FaHeart } from 'react-icons/fa'
import { reactToPost } from '../services/api'

const OPTIONS = [ ['like', 'Me gusta', FaThumbsUp], ['dislike', 'No me gusta', FaThumbsDown], ['love', 'Me encanta', FaHeart] ]

export default function PostReactions({ post, onUpdate }) {
  const busy = useRef(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  async function vote(reaction) {
    if (busy.current) return
    busy.current = true
    setPending(true)
    setError('')
    try {
      const response = await reactToPost(post.id, reaction)
      onUpdate(post.id, response.data)
    } catch (err) {
      setError(err.message || 'No se pudo guardar tu reacción. Intenta nuevamente.')
    } finally {
      busy.current = false
      setPending(false)
    }
  }
  if (!post.id) return null
  return (
    <div className="mt-6 border-t border-navy/10 pt-4">
      <div className="flex flex-wrap gap-2" aria-label="Reacciones a la publicación" aria-busy={pending}>
        {OPTIONS.map(([value, label, Icon]) => (
          <button key={value} type="button" disabled={pending} aria-pressed={post.myReaction === value} onClick={() => vote(value)} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors disabled:opacity-60 ${post.myReaction === value ? 'border-green bg-green/20 text-navy' : 'border-navy/15 text-navy hover:bg-green/10'}`}>
            <Icon aria-hidden="true" /> {label} <span>{post.reactions?.[value] || 0}</span>
          </button>
        ))}
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  )
}
