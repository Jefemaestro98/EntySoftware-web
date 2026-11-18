import { useEffect, type RefObject } from 'react'

// Convierte la rueda del mouse (arriba/abajo) en scroll horizontal
export function useHorizontalWheel(ref: RefObject<HTMLElement | null>, active = true) {
  useEffect(() => {
    const el = ref.current
    if (!el || !active) return

    const onWheel = (e: WheelEvent) => {
      // Si ya se mueve de lado (touchpad) o no hay nada que desplazar, no hacemos nada
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      if (el.scrollWidth <= el.clientWidth) return

      e.preventDefault() // evita que la página de atrás se mueva
      el.scrollLeft += e.deltaY
    }

    // passive: false es necesario para poder usar preventDefault
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [ref, active])
}