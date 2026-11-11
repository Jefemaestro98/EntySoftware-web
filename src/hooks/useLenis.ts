import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    // Si la persona pidió menos movimiento en su sistema, no activamos el scroll suave
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.2,   // qué tan "largo" se siente el deslizamiento
      autoRaf: true,   // Lenis se actualiza solo en cada frame
      anchors: true,   // los enlaces tipo #seccion también se deslizan suave
    })

    return () => lenis.destroy() // limpieza al desmontar
  }, [])
}