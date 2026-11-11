import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import Reveal from './components/Reveal'
import Services from './components/Services'

// Secciones de prueba que faltan por construir
const pruebas = [
  { id: 'entypos', titulo: 'EntyPOS' },
  { id: 'para', titulo: 'Para qué' },
  { id: 'contacto', titulo: 'Contacto' },
]

export default function App() {
  useLenis()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Marquee />
        <Services/>
        {pruebas.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="flex min-h-screen items-center justify-center border-t border-line"
          >
            <Reveal>
              <h2 className="font-display text-5xl font-bold">{s.titulo}</h2>
            </Reveal>
          </section>
        ))}
      </main>
    </>
  )
}