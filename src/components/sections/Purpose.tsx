import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { purpose } from '../data/content'

export default function Purpose() {
  const pillars = [purpose.mission, purpose.vision]

  return (
    <section id="para" aria-labelledby="para-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <SectionLabel number={purpose.number} label={purpose.label} />
        <Reveal>
          <h2
            id="para-title"
            className="mt-6 max-w-4xl font-display text-[clamp(36px,5vw,64px)] leading-[1.05] font-bold tracking-[-0.02em]"
          >
            {purpose.title}
          </h2>
        </Reveal>

        {/* Misión y Visión */}
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="border-t border-accent pt-6">
                <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-lg text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Valores: el gap-px + fondo de línea dibuja separadores de 1px */}
        <Reveal delay={0.2}>
          <div className="mt-20 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {purpose.values.map((v) => (
              <div key={v.title} className="bg-bg p-6 transition-colors duration-500 hover:bg-surface">
                <h4 className="font-semibold">{v.title}</h4>
                <p className="mt-2 text-sm text-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}