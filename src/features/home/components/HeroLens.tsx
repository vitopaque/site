'use client'

import { useEffect, useRef } from 'react'

export function HeroLens({ label }: { label: string }) {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const canTrack = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canTrack || reduced) return

    let frame = 0
    let pointer: { x: number; y: number } | null = null

    const paint = () => {
      frame = 0
      const rect = stage.getBoundingClientRect()
      const inside =
        pointer !== null &&
        pointer.x >= rect.left &&
        pointer.x <= rect.right &&
        pointer.y >= rect.top &&
        pointer.y <= rect.bottom
      if (pointer && inside) {
        stage.style.setProperty('--lens-x', `${pointer.x - rect.left}px`)
        stage.style.setProperty('--lens-y', `${pointer.y - rect.top}px`)
      } else {
        stage.style.removeProperty('--lens-x')
        stage.style.removeProperty('--lens-y')
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      pointer = { x: event.clientX, y: event.clientY }
      schedule()
    }
    const onLeave = () => {
      pointer = null
      schedule()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      className="lens-stage pointer-events-none absolute inset-0"
    >
      <div className="glass-veil lens-mask absolute inset-0" />
      <div className="border-outline-inverse absolute top-(--lens-y) left-(--lens-x) z-10 size-(--lens-size) -translate-1/2 rounded-full border transition-[width,height] duration-(--duration-lens)">
        <span className="bg-background absolute top-1/2 left-1/2 -ml-1.75 h-px w-3.5" />
        <span className="bg-background absolute top-1/2 left-1/2 -mt-1.75 h-3.5 w-px" />
        <span className="label-sm text-accent-200 bg-accent-900 absolute top-full left-1/2 mt-2.5 -translate-x-1/2 px-1.5 py-0.5 whitespace-nowrap sm:top-1/2 sm:left-full sm:mt-0 sm:ml-2.5 sm:translate-x-0 sm:-translate-y-1/2">
          {label}
        </span>
      </div>
    </div>
  )
}
