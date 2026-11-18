import { useEffect, type RefObject } from 'react'
import { useMotionValue } from 'motion/react'

// Mide cuánto hay que mover una fila horizontal para ver su último elemento
export function useTrackDistance(trackRef: RefObject<HTMLElement | null>) {
  const distance = useMotionValue(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => distance.set(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [trackRef, distance])

  return distance
}