import { FaTiktok, FaLinkedin, FaFacebook } from 'react-icons/fa'

const links = [
  { href: import.meta.env.VITE_TIKTOK_URL || 'https://www.tiktok.com', icon: FaTiktok, label: 'TikTok' },
  { href: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
  { href: import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com', icon: FaFacebook, label: 'Facebook' },
]

/** Fila de íconos de redes sociales (TikTok, LinkedIn, Facebook). */
function SocialLinks({ vertical = false }) {
  return (
    <div className={`flex ${vertical ? 'flex-col items-center' : 'items-center justify-center'} gap-3`}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/10 text-navy transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-navy hover:text-white"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
