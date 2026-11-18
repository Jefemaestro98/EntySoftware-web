import { ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionLabel from '../ui/SectionLabel'
import { services } from '../../data/content'

export default function Services() {
  return (
    <section id="que" aria-labelledby="que-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <SectionLabel number={services.number} label={services.label} />
        <Reveal>
          <h2
            id="que-title"
            className="mt-6 max-w-3xl font-display text-[clamp(36px,5vw,64px)] leading-[1.05] font-bold tracking-[-0.02em]"
          >
            {services.title}
          </h2>
        </Reveal>

        <ul className="mt-16 border-t border-line">
          {services.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.1}>
                <a
                  href={item.href}
                  className="group relative flex flex-wrap items-center gap-x-10 gap-y-3 py-8 outline-none md:py-10"
                >
                  {/* Número */}
                  <span className="w-10 font-mono text-sm text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Título: se mueve a la derecha al pasar el cursor */}
                  <h3 className="min-w-0 flex-[1_1_320px] font-display text-[clamp(26px,3.5vw,44px)] font-bold tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 group-focus-visible:translate-x-3 motion-reduce:transition-none">
                    {item.title}
                  </h3>

                  {/* Descripción: se aclara al pasar el cursor */}
                  <p className="min-w-0 flex-[1_1_300px] text-muted transition-colors duration-500 group-hover:text-ink">
                    {item.text}
                  </p>

                  {/* Flecha: visible siempre en celular; en escritorio aparece con hover */}
                  <ArrowUpRight
                    aria-hidden="true"
                    size={28}
                    className="shrink-0 text-accent transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:-translate-x-2 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 md:group-focus-visible:translate-x-0 md:group-focus-visible:opacity-100"
                  />

                  {/* Línea de abajo: gris fija + verde que se dibuja encima */}
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                  />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}