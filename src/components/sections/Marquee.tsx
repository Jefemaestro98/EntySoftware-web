import { marquee } from '@/data/content'

export default function Marquee() {
  return (
    <div aria-hidden="true" className="marquee overflow-hidden border-t border-line py-8">
      <div className="marquee-track flex w-max">
        {/* El contenido va DOS veces: al llegar a -50% vuelve a 0 sin que se note el salto */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {marquee.map((word) => (
              <span
                key={word}
                className="flex items-center font-display text-[clamp(28px,4vw,56px)] font-bold tracking-tight text-ink/40"
              >
                <span className="px-10">{word}</span>
                <span className="size-2.5 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}