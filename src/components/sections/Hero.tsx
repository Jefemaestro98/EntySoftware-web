import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { hero, posDemo } from '@/data/content'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Progreso del scroll mientras el hero sale de la pantalla (0 → 1)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // La tarjeta baja 120px mientras haces scroll → parece moverse más lento (parallax)
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])

  return (
    <section
      ref={ref}
      id="inicio"
      className="mx-auto flex min-h-screen max-w-6xl flex-wrap items-center gap-16 px-6 pt-32 pb-20"
    >
      {/* ---------- Columna de texto ---------- */}
      <div className="min-w-0 flex-[1_1_520px]">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-block rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 font-mono text-xs text-accent"
        >
          {hero.tag}
        </motion.span>

        {/* Título con máscara: cada línea sube desde dentro de una caja con overflow-hidden */}
        <h1 className="mt-6 font-display text-[clamp(44px,7vw,96px)] leading-[1.02] font-bold tracking-[-0.03em]">
          {hero.titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={reduce ? { opacity: 0 } : { y: '110%' }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="mt-6 max-w-xl text-lg text-muted"
        >
          {hero.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {/* Botón principal: el fondo claro sube desde abajo al pasar el cursor */}
          <a
            href={hero.primary.href}
            className="group relative inline-flex min-h-12 items-center overflow-hidden rounded-xl bg-accent px-6 font-semibold text-bg"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
            />
            <span className="relative">{hero.primary.label}</span>
          </a>

          <a
            href={hero.secondary.href}
            className="inline-flex min-h-12 items-center rounded-xl border border-line px-6 font-semibold transition-colors hover:border-ink"
          >
            {hero.secondary.label}
          </a>
        </motion.div>
      </div>

      {/* ---------- Tarjeta del POS ---------- */}
      <motion.div style={{ y: cardY }} aria-hidden="true" className="w-full max-w-md min-w-0 flex-[1_1_360px]">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-semibold">{posDemo.mesa}</span>
            <span className="rounded-full border border-accent/30 bg-accent/5 px-2.5 py-1 font-mono text-xs text-accent">
              {posDemo.estado}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {posDemo.items.map((item, i) => (
              <motion.div
                key={item.nombre}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.12, ease: EASE }}
                className="flex justify-between rounded-xl bg-bg/60 px-4 py-3"
              >
                <span>{item.nombre}</span>
                <span className="font-mono text-muted">x{item.cant}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {posDemo.chips.map((chip) => (
              <span key={chip} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {chip}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-line pt-4">
            <span className="text-muted">Total</span>
            <span className="font-mono text-2xl font-bold text-accent">$ {posDemo.total}</span>
          </div>

          <div className="rounded-xl bg-accent py-3.5 text-center font-semibold text-bg">
            {posDemo.accion}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}