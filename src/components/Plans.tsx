import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { plans } from '../data/content'

export default function Plans() {
  return (
    <section id="planes" aria-labelledby="planes-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div className="min-w-0 flex-[1_1_520px]">
            <SectionLabel number={plans.number} label={plans.label} />
            <Reveal>
              <h2
                id="planes-title"
                className="mt-6 font-display text-[clamp(36px,5vw,64px)] leading-[1.05] font-bold tracking-[-0.02em]"
              >
                {plans.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="min-w-0 flex-[1_1_340px]">
            <p className="text-lg text-muted">{plans.text}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {plans.items.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className="bg-bg">
              <div className="flex h-full flex-col gap-6 p-8 transition-colors duration-500 hover:bg-surface">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
                  {plan.featured && (
                    <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-xs text-bg">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className={`font-mono text-3xl font-bold ${plan.featured ? 'text-accent' : ''}`}>
                  {plan.price}
                  <span className="text-sm font-medium text-muted"> /mes</span>
                </p>
                <p className="text-muted">{plan.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}