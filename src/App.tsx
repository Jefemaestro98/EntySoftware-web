import { useLenis } from '@/hooks/useLenis'

import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Marquee from '@/components/sections/Marquee'
import Services from '@/components/sections/Services'
import PosShowcase from '@/components/sections/PosShowcase'
import Purpose from '@/components/sections/Purpose'
import Plans from '@/components/sections/Plans'
import Gallery from '@/components/sections/Gallery'
import Contact from '@/components/sections/Contact'

import ChatBot from '@/components/chatbot/ChatBot'

export default function App() {
  useLenis()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Marquee />
        <Services />
        <PosShowcase />
        <Purpose />
        <Plans />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </>
  )
}