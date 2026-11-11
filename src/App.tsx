import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Reveal from './components/Reveal'

const pruebas = [
  { id: 'inicio', titulo: 'Inicio' },
  { id: 'quienes', titulo: 'Quiénes somos' },
  { id: 'que', titulo: 'Qué hacemos' },
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