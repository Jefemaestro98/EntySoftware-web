import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useReducedMotion, useSpring } from 'motion/react'

type Props = { children: ReactNode; strength?: number }

export default function Magnetic({ children, strength = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // useSpring hace que el movimiento sea elástico, no brusco
  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })

  const handleMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    // Distancia del cursor al centro, de -1 a 1, multiplicada por la fuerza
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 2 * strength)
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 2 * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}