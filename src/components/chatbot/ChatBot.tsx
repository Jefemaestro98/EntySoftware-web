import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MessageCircle, Send, X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/icons'
import { chatbot } from '@/data/content'
import { links } from '@/data/social'
import { useHorizontalWheel } from '@/hooks/useHorizontalWheel'

type Msg = { from: 'bot' | 'user'; text: string; whatsapp?: boolean }

const EASE = [0.22, 1, 0.36, 1] as const

// Quita mayúsculas y tildes: "Demostración" → "demostracion"
const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

// Busca la pregunta con más palabras clave dentro del texto
function findAnswer(text: string) {
  const t = normalize(text)
  let best = null as (typeof chatbot.faqs)[number] | null
  let bestScore = 0
  for (const faq of chatbot.faqs) {
    const score = faq.keywords.filter((k) => t.includes(k)).length
    if (score > bestScore) {
      best = faq
      bestScore = score
    }
  }
  return best
    ? { text: best.a, whatsapp: best.whatsapp }
    : { text: chatbot.fallback, whatsapp: true }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([{ from: 'bot', text: chatbot.greeting }])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  useHorizontalWheel(chipsRef, open)

  // Baja al último mensaje
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const ask = (text: string) => {
    const clean = text.trim()
    if (!clean || typing) return
    setMessages((m) => [...m, { from: 'user', text: clean }])
    setInput('')
    setTyping(true)
    const answer = findAnswer(clean)
    // Pequeña espera para que se sienta como una conversación
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', ...answer }])
      setTyping(false)
    }, 700)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    ask(input)
  }

  return (
    <>
      {/* Panel del chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            role="dialog"
            aria-label="Chat de EntySoftware"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed right-4 bottom-24 z-50 flex h-[min(560px,calc(100dvh-140px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/50"
          >
            {/* Encabezado */}
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <img src="/simbolo.png" alt="" width={28} height={23} className="h-6 w-auto" />
              <div className="min-w-0 flex-1">
                <p className="font-display font-semibold">Asistente EntySoftware</p>
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <span className="size-1.5 rounded-full bg-accent" /> Responde al instante
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
                className="grid size-10 place-items-center rounded-lg text-muted hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mensajes */}
            <div ref={listRef} aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className={`flex max-w-[85%] flex-col gap-2 ${m.from === 'user' ? 'self-end' : 'self-start'}`}
                >
                  <p
                    className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'rounded-br-md bg-accent text-bg'
                        : 'rounded-bl-md border border-line bg-bg'
                    }`}
                  >
                    {m.text}
                  </p>
                  {m.whatsapp && (
                    <a
                      href={links.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 self-start rounded-full border border-accent/40 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-bg"
                    >
                      <WhatsAppIcon size={14} /> Seguir por WhatsApp
                    </a>
                  )}
                </motion.div>
              ))}

              {/* Indicador "escribiendo..." */}
              {typing && (
                <div className="flex gap-1 self-start rounded-2xl rounded-bl-md border border-line bg-bg px-4 py-3" aria-label="Escribiendo">
                  <span className="size-1.5 animate-bounce rounded-full bg-muted" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
                </div>
              )}
            </div>

            {/* Preguntas rápidas */}
             <div
              ref={chipsRef}
              className="no-scrollbar flex gap-2 overflow-x-auto border-t border-line px-4 py-3 mask-[linear-gradient(to_right,black_85%,transparent)]"
            >
              {chatbot.faqs.map((f) => (
                <button
                  key={f.q}
                  type="button"
                  onClick={() => ask(f.q)}
                  disabled={typing}
                  className="shrink-0 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-ink disabled:opacity-50"
                >
                  {f.q}
                </button>
              ))}
            </div>

            {/* Campo para escribir */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line p-3">
              <label htmlFor="chat-input" className="sr-only">Escribe tu pregunta</label>
              <input
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta…"
                autoComplete="off"
                className="min-h-11 flex-1 rounded-xl border border-line bg-bg px-3 text-sm outline-none placeholder:text-muted focus:border-accent"
              />
              <button
                type="submit"
                aria-label="Enviar"
                disabled={!input.trim() || typing}
                className="grid size-11 place-items-center rounded-xl bg-accent text-bg transition-opacity disabled:opacity-40"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat'}
        aria-expanded={open}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-5 bottom-5 z-50 grid size-14 place-items-center rounded-full bg-accent text-bg shadow-lg shadow-accent/20"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'chat'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X size={24} /> : <MessageCircle size={24} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  )
}