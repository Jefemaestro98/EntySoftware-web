import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Store } from 'lucide-react'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { pos } from '../data/content'

const pad = (n: number) => String(n).padStart(2, '0')

/* ============================================================
   PASARELA (escritorio): la sección se fija y el scroll vertical
   mueve los paneles en horizontal.
   ============================================================ */
function Pasarela() {
  const containerRef = useRef<HTMLDivElement>(null) // la caja alta (400vh)
  const trackRef = useRef<HTMLDivElement>(null)     // la fila de paneles

  // 0 cuando la caja alta empieza arriba, 1 cuando su final llega abajo
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Cuántos píxeles hay que mover la fila para llegar al último panel
  const distance = useMotionValue(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => distance.set(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [distance])

  // Progreso (0→1) × distancia = cuánto mover la fila a la izquierda
  const x = useTransform(() => -scrollYProgress.get() * distance.get())

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Barra de progreso */}
        <div className="absolute inset-x-0 top-0 h-px bg-line">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-accent" />
        </div>

        {/* Fila de paneles */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-[62vh] w-max pr-[20vw] pl-[max(24px,calc((100vw-72rem)/2+24px))]"
        >
          {pos.modules.map((m, i) => (
            <article
              key={m.title}
              className="flex h-full w-[70vw] max-w-220 shrink-0 flex-col justify-between border-l border-line pr-16 pl-10"
            >
              <span className="font-mono text-[clamp(72px,10vw,160px)] leading-none font-bold text-accent">
                {pad(i + 1)}
              </span>
              <div>
                <h3 className="font-display text-[clamp(32px,4vw,56px)] leading-[1.05] font-bold tracking-tight">
                  {m.title}
                </h3>
                <p className="mt-4 max-w-md text-lg text-muted">{m.text}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ============================================================
   CARRUSEL (celular o menos movimiento): scroll horizontal
   nativo con imán (scroll-snap).
   ============================================================ */
function Carrusel({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
        {pos.modules.map((m, i) => (
          <article
            key={m.title}
            className="flex min-h-85 w-[85vw] max-w-105 shrink-0 snap-start flex-col justify-between border-l border-line py-2 pl-6"
          >
            <span className="font-mono text-7xl leading-none font-bold text-accent">{pad(i + 1)}</span>
            <div>
              <h3 className="font-display text-3xl font-bold tracking-tight">{m.title}</h3>
              <p className="mt-3 text-muted">{m.text}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 px-6 font-mono text-xs text-muted">Desliza para ver los {pos.modules.length} módulos →</p>
    </div>
  )
}

/* ============================================================
   SECCIÓN COMPLETA
   ============================================================ */
export default function PosShowcase() {
  const reduce = useReducedMotion()

  return (
    <section id="entypos" aria-labelledby="entypos-title" className="border-t border-line">
      {/* Intro */}
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-x-16 gap-y-8 px-6 pt-20 pb-12 md:pt-32 md:pb-16">
        <div className="min-w-0 flex-[1_1_520px]">
          <SectionLabel number={pos.number} label={pos.label} />
          <Reveal>
            <h2
              id="entypos-title"
              className="mt-6 font-display text-[clamp(36px,5vw,64px)] leading-[1.05] font-bold tracking-[-0.02em]"
            >
              {pos.title}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="min-w-0 flex-[1_1_340px]">
          <p className="text-lg text-muted">{pos.intro}</p>
        </Reveal>
      </div>

      {/* Pasarela en escritorio (solo si no se pidió menos movimiento) */}
      {!reduce && (
        <div className="hidden md:block">
          <Pasarela />
        </div>
      )}

      {/* Carrusel en celular (o en todas las pantallas si se pidió menos movimiento) */}
      <Carrusel className={reduce ? '' : 'md:hidden'} />

      {/* Modo micro-emprendimiento */}
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 md:pb-32">
        <Reveal>
          <div className="flex flex-wrap items-center gap-6 border-t border-line pt-10">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-bg">
              <Store size={24} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-[1_1_400px]">
              <h3 className="font-display text-2xl font-semibold">{pos.micro.title}</h3>
              <p className="mt-1 text-muted">{pos.micro.text}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}