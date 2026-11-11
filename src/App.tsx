import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import Services from './components/Services'
import PosShowcase from './components/PosShowcase'
import Purpose from './components/Purpose'
import Plans from './components/Plans'
import Contact from './components/Contact'
import Footer from './components/Footer'



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
        <PosShowcase/>
        <Purpose/>
        <Plans/>
        <Contact/>
      </main>
      <Footer/>
    </>
  )
}