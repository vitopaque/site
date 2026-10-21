'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

type Props = { lead: string; emphasis: string }

const VIEWPORT_SHARE = 0.55
const BOX_SHARE = 0.5

export function ManifestoReveal({ lead, emphasis }: Props) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const leadWords = lead.split(' ')
  const words = [...leadWords, ...emphasis.split(' ')]
  const vars = { '--n': words.length } as CSSProperties

  useEffect(() => {
    const text = textRef.current
    const section = text?.closest('section')
    if (!text || !section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const paint = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const height = window.innerHeight
      const progress = (height - rect.top) / (height * VIEWPORT_SHARE + rect.height * BOX_SHARE)
      text.style.setProperty('--p', Math.max(0, Math.min(1, progress)).toFixed(3))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    paint()
    text.dataset.reveal = ''
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      delete text.dataset.reveal
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <p ref={textRef} style={vars} className="font-heading text-display-statement uppercase">
      <span className="sr-only">
        {lead} {emphasis}
      </span>
      <span aria-hidden="true" className="flex flex-wrap gap-x-(--word-gap)">
        {words.map((word, index) => (
          <span
            key={index}
            style={{ '--i': index } as CSSProperties}
            className={`manifesto-word inline-block transition-[filter,opacity] duration-(--duration-word) ease-linear ${index >= leadWords.length ? 'text-accent-300' : ''}`}
          >
            {word}
          </span>
        ))}
      </span>
    </p>
  )
}
