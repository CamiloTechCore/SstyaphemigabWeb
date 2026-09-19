import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiPlay, HiX } from 'react-icons/hi'

function shuffle(items) {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }
  return shuffled
}

function MediaCard({ item, index, onSelect, duplicate = false }) {
  return (
    <button
      type="button"
      tabIndex={duplicate ? -1 : undefined}
      onClick={() => onSelect(item)}
      className="group relative w-36 shrink-0 overflow-hidden rounded-xl border border-white/20 text-left shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green sm:w-44 md:w-52"
      aria-label={`Abrir ${item.title || `contenido multimedia ${index + 1}`}`}
    >
      {item.type === 'video' ? (
        <video
          src={item.url}
          className="h-24 w-full object-cover sm:h-28 md:h-32"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={item.url}
          alt={item.title || `Contenido multimedia ${index + 1}`}
          className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-28 md:h-32"
          loading="lazy"
        />
      )}
      <span className="absolute inset-0 flex items-center justify-center bg-navy/0 text-white transition-colors duration-300 group-hover:bg-navy/45 group-focus-visible:bg-navy/45">
        {item.type === 'video' && <HiPlay className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" size={32} />}
      </span>
    </button>
  )
}

function MarqueeRow({ items, direction, onSelect }) {
  // Each identical group exceeds the largest gallery viewport (max-w-5xl).
  const repeatedItems = Array.from({ length: Math.ceil(8 / items.length) }, () => items).flat()

  return (
    <div className="media-marquee-row">
      <div className={`media-marquee-track media-marquee-track-${direction}`}>
        {[0, 1].map((copy) => <div className="media-marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
        {repeatedItems.map((item, index) => (
          <MediaCard
            key={`${item.url}-${index}`}
            item={item}
            duplicate={copy === 1}
            index={index % items.length}
            onSelect={onSelect}
          />
        ))}
        </div>)}
      </div>
    </div>
  )
}

function MediaCarousel({ media = [] }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const items = useMemo(() => shuffle(media), [media])
  const firstRow = items.filter((_, index) => index % 2 === 0)
  const secondRow = items.filter((_, index) => index % 2 === 1)

  if (items.length < 2) {
    return null
  }

  return (
    <>
      <section className="media-marquee relative py-2" aria-label="Galería multimedia">
        <MarqueeRow items={firstRow} direction="left" onSelect={setSelectedItem} />
        <MarqueeRow items={secondRow.length ? secondRow : firstRow} direction="right" onSelect={setSelectedItem} />
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title || 'Vista multimedia'}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-full max-w-4xl"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute -right-2 -top-2 z-10 rounded-full bg-white p-2 text-navy shadow-lg focus-visible:outline-2 focus-visible:outline-green"
                aria-label="Cerrar vista multimedia"
              >
                <HiX size={20} />
              </button>
              {selectedItem.type === 'video' ? (
                <video
                  className="max-h-[85vh] max-w-full rounded-2xl bg-black"
                  src={selectedItem.url}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title || 'Vista multimedia'}
                  className="max-h-[85vh] max-w-full rounded-2xl object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MediaCarousel
