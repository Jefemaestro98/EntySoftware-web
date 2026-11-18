import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { about } from '@/data/content'

export default function About() {
  return (
    <section id="quienes" aria-labelledby="quienes-title" className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-16 gap-y-12 px-6 py-20 md:py-32">
        {/* Columna izquierda: etiqueta + título */}
        <div className="min-w-0 flex-[1_1_320px]">
          <SectionLabel number={about.number} label={about.label} />
          <Reveal>
            <h2
              id="quienes-title"
              className="mt-6 font-display text-[clamp(36px,5vw,64px)] leading-[1.05] font-bold tracking-[-0.02em]"
            >
              {about.title}
            </h2>
          </Reveal>
        </div>

        {/* Columna derecha: texto + stack */}
        <div className="min-w-0 flex-[2_1_480px]">
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Stack en filas separadas por líneas (sin tarjetas) */}
          <dl className="mt-12">
            {about.stack.map((row, i) => (
              <Reveal key={row.area} delay={0.2 + i * 0.1}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-line py-5">
                  <dt className="font-display text-xl font-semibold">{row.area}</dt>
                  <dd className="font-mono text-sm text-muted">{row.tech}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}