import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { nav } from '../data/content'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 20)
    setHidden(y > prev && y > 120 && !open)
  })

  const close = () => setOpen(false)

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open
            ? 'border-line bg-bg/70 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#inicio" onClick={close} className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-accent font-display text-xl font-bold text-bg">
              E
            </span>
            <span className="font-display text-xl font-bold tracking-tight">EntySoftware</span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
            {nav.links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                {link.label}
              </a>
            ))}
            <a
              href={nav.cta.href}
              className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              {nav.cta.label}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="grid size-11 place-items-center rounded-lg md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col gap-2 bg-bg px-6 pt-28 md:hidden"
          >
            {[...nav.links, nav.cta].map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={close}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: EASE }}
                className="border-b border-line py-4 font-display text-4xl font-bold tracking-tight"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}