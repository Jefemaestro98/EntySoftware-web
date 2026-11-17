import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { InstagramIcon } from './icons'
import { gallery, links, social } from '../data/content'

const EASE = [0.22, 1, 0.36, 1] as const
const total = gallery.images.length

export default function Gallery() {
  const rowRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<number | null>(null) // índice de la imagen abierta

  // Botones ← → de la fila
  const scrollRow = (dir: 1 | -1) => {
    const row = rowRef.current
    if (!row) return
    row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: 'smooth' })
  }

  const next = () => setOpen((i) => (i === null ? i : (i + 1) % total))
  const prev = () => setOpen((i) => (i === null ? i : (i - 1 + total) % total))

  // Teclado solo mientras el visor está abierto
  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel number={gallery.number} label={gallery.label} />
            <Reveal>
              <h2
                id="galeria-title"
                className="mt-6 font-display text-[clamp(32px,4.5vw,52px)] leading-[1.08] font-bold tracking-[-0.02em]"
              >
                {gallery.title}
              </h2>
            </Reveal>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={links.instagram}
              target="_blank"
              rel="noreferrer"
              className="mr-2 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <InstagramIcon size={18} />@{social.instagramUser}
            </a>
            <button
              type="button"
              onClick={() => scrollRow(-1)}
              aria-label="Anterior"
              className="hidden size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent md:grid"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollRow(1)}
              aria-label="Siguiente"
              className="hidden size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent md:grid"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Fila deslizable */}
      <div
        ref={rowRef}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-20 md:px-[max(24px,calc((100vw-72rem)/2+24px))] md:pb-32"
      >
        {gallery.images.map((img, i) => (
          <Reveal key={img.src} delay={i * 0.06} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Ver imagen ${i + 1} de ${total}`}
              className="group block aspect-[4/5] w-[75vw] max-w-85 overflow-hidden rounded-2xl border border-line"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={864}
                height={1080}
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {/* Visor a pantalla completa */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Visor de imágenes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md"
          >
            <motion.img
              key={open}
              src={gallery.images[open].src}
              alt={gallery.images[open].alt}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-auto rounded-2xl border border-line"
            />

            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-surface"
            >
              <X size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Imagen anterior"
              className="absolute left-4 grid size-11 place-items-center rounded-full bg-surface"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Imagen siguiente"
              className="absolute right-4 grid size-11 place-items-center rounded-full bg-surface"
            >
              <ArrowRight size={20} />
            </button>
            <p className="absolute bottom-4 font-mono text-xs text-muted">
              {String(open + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}