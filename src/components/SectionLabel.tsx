import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

type Props = { number: number; label: string }

export default function SectionLabel({ number, label }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(number)
      return
    }
    // Anima un número de 0 al valor final y actualiza el estado en cada frame
    const controls = animate(0, number, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, number, reduce])

  return (
    <p ref={ref} className="font-mono text-xs tracking-[0.2em] text-accent">
      {String(value).padStart(2, '0')} — {label}
    </p>
  )
}