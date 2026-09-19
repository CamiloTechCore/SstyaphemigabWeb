import { FaShieldAlt } from 'react-icons/fa'

function vimeoEmbed(value) {
  try {
    const url = new URL(value)
    if (!['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(url.hostname)) return null
    const parts = url.pathname.split('/').filter(Boolean)
    const id = parts[0] === 'video' ? parts[1] : parts[0]
    if (!/^\d+$/.test(id || '')) return null
    const embed = new URL(`https://player.vimeo.com/video/${id}`)
    const hash = url.searchParams.get('h') || (parts[0] !== 'video' ? parts[1] : '')
    if (hash) embed.searchParams.set('h', hash)
    for (const [key, value] of Object.entries({ autoplay: '1', muted: '1', loop: '1', playsinline: '1', dnt: '1', badge: '0', autopause: '0' })) embed.searchParams.set(key, value)
    return embed.href
  } catch { return null }
}

export default function HeroPhone() {
  const defaultUrl = 'https://player.vimeo.com/video/1228365227'
  const configuredUrl = import.meta.env.VITE_HERO_VIMEO_URL
  const src = vimeoEmbed(configuredUrl ?? defaultUrl)
  return (
    <div className="hero-phone" aria-label="SST y APH EMIGAB en acción">
      <div className="hero-phone-screen">
        {src ? <iframe src={src} title="APH_Video1 — SST y APH EMIGAB" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : (
          <div className="flex h-full flex-col items-center justify-center gap-5 px-5 text-center text-white">
            <FaShieldAlt size={48} className="text-green" />
            <p className="text-lg font-extrabold">SST Y APH<br />EMIGAB</p>
            <p className="text-xs text-white/75">Prevención, cuidado y respuesta.</p>
          </div>
        )}
      </div>
    </div>
  )
}
