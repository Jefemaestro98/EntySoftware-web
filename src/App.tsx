import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import Services from './components/sections/Services'
import PosShowcase from './components/PosShowcase'
import Purpose from './components/Purpose'
import Plans from './components/Plans'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import ChatBot from './components/ChatBot'

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
        <Gallery/>
        <Contact/>
      </main>
      <Footer/>
      <ChatBot/>
    </>
  )
}