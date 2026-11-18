import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Package, Store } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { useTrackDistance } from '@/hooks/useTrackDistance'
import { pos } from '@/data/content'
import { pad } from '@/lib/format'

type Module = (typeof pos.modules)[number]

/* ---------- La imagen de cada módulo (o ícono si aún no hay captura) ---------- */
function ModuleVisual({ m }: { m: Module }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-line bg-surface">
      {/* Brillo verde suave detrás de la captura */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(74,222,128,0.16),transparent_65%)]"
      />
      {m.image ? (
        <img
          src={m.image}
          alt={m.alt}
          loading="lazy"
          className="relative max-h-[88%] max-w-[88%] rounded-2xl border border-line object-contain shadow-2xl shadow-black/60"
        />
      ) : (
        <div className="relative flex flex-col items-center gap-4">
          <span className="grid size-20 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
            <Package size={36} aria-hidden="true" />
          </span>
          <p className="font-mono text-xs text-muted">Captura próximamente</p>
        </div>
      )}
    </div>
  )
}

/* ---------- PASARELA (escritorio) ---------- */
function Pasarela() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const distance = useTrackDistance(trackRef)
  const x = useTransform(() => -scrollYProgress.get() * distance.get())

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-line">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-accent" />
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-[70vh] w-max gap-10 pr-[15vw] pl-[max(24px,calc((100vw-72rem)/2+24px))]"
        >
          {pos.modules.map((m, i) => (
            <article
              key={m.title}
              className="grid h-full w-[80vw] max-w-260 shrink-0 grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 border-l border-line pl-10"
            >
              {/* Texto */}
              <div className="flex flex-col justify-between py-2">
                <span className="font-mono text-[clamp(64px,8vw,128px)] leading-none font-bold text-accent">
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(30px,3.5vw,52px)] leading-[1.05] font-bold tracking-tight">
                    {m.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-lg text-muted">{m.text}</p>
                </div>
              </div>

              {/* Imagen */}
              <ModuleVisual m={m} />
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- CARRUSEL (celular o menos movimiento) ---------- */
function Carrusel({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
        {pos.modules.map((m, i) => (
          <article key={m.title} className="flex w-[85vw] max-w-105 shrink-0 snap-start flex-col gap-5">
            <div className="h-80">
              <ModuleVisual m={m} />
            </div>
            <div>
              <span className="font-mono text-sm text-accent">{pad(i + 1)}</span>
              <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">{m.title}</h3>
              <p className="mt-2 text-muted">{m.text}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 px-6 font-mono text-xs text-muted">Desliza para ver los {pos.modules.length} módulos →</p>
    </div>
  )
}

/* ---------- SECCIÓN COMPLETA ---------- */
export default function PosShowcase() {
  const reduce = useReducedMotion()

  return (
    <section id="entypos" aria-labelledby="entypos-title" className="border-t border-line">
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

      {!reduce && (
        <div className="hidden md:block">
          <Pasarela />
        </div>
      )}
      <Carrusel className={reduce ? '' : 'md:hidden'} />

      <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 md:pb-32">
        <Reveal>
          <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-accent/25 bg-accent/5 p-7">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-bg">
              <Store size={22} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-[1_1_400px]">
              <h3 className="font-display text-lg font-semibold">{pos.micro.title}</h3>
              <p className="mt-1 text-sm text-muted">{pos.micro.text}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}