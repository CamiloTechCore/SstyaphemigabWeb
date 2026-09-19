import { useEffect, useState } from 'react'
import { HiMoon, HiSun } from 'react-icons/hi'

const THEME_KEY = 'emigab_theme'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem(THEME_KEY) === 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <button
      type="button"
      onClick={() => setIsDark((current) => !current)}
      className="flex h-10 w-10 items-center justify-center rounded-lg text-navy transition-all hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
      aria-label={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
      title={isDark ? 'Activar tema claro' : 'Activar tema oscuro'}
    >
      {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
    </button>
  )
}

export default ThemeToggle
