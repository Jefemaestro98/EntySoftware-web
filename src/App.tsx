import { useLenis } from './hooks/useLenis'
import Reveal from './components/Reveal'

export default function App() {
  useLenis()

  return (
    <main>
      <section className="min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="font-mono text-sm text-accent">Paso 2</span>
        <h1 className="font-display text-6xl font-bold tracking-tight">Baja con el scroll ↓</h1>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center gap-6 border-t border-line">
        <Reveal>
          <h2 className="font-display text-5xl font-bold">Esto aparece suave</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-muted text-lg">Y esto llega un poquito después.</p>
        </Reveal>
        <Reveal delay={0.3}>
          <span className="inline-block bg-accent text-bg font-semibold px-6 py-3 rounded-xl">
            Y aquí sí hay fondo verde
          </span>
        </Reveal>
      </section>

      <section className="min-h-screen flex items-center justify-center border-t border-line">
        <Reveal>
          <h2 className="font-display text-5xl font-bold">Fin de la prueba</h2>
        </Reveal>
      </section>
    </main>
  )
}