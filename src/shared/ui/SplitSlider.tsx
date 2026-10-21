'use client'

import { useRef, type CSSProperties, type ReactNode } from 'react'

const SPLIT_MIN = 2
const SPLIT_MAX = 98
const SPLIT_START = 50

type Props = {
  label: string
  valueText: (split: number) => string
  className?: string
  children: ReactNode
}

export function SplitSlider({ label, valueText, className = '', children }: Props) {
  const frame = useRef<HTMLDivElement>(null)

  const move = (input: HTMLInputElement) => {
    frame.current?.style.setProperty('--split', `${input.value}%`)
    input.setAttribute('aria-valuetext', valueText(Number(input.value)))
  }

  return (
    <div
      ref={frame}
      style={{ '--split': `${SPLIT_START}%` } as CSSProperties}
      className={`blueprint has-focus-visible:outline-accent w-full min-w-0 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">{children}</div>
      <input
        type="range"
        min={SPLIT_MIN}
        max={SPLIT_MAX}
        step={1}
        defaultValue={SPLIT_START}
        onInput={(event) => move(event.currentTarget)}
        aria-label={label}
        aria-valuetext={valueText(SPLIT_START)}
        className="range-bare absolute inset-0 z-20 size-full cursor-ew-resize touch-pan-y opacity-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-(--split) z-10 -ml-5.5 flex w-11 items-center justify-center"
      >
        <span className="bg-background shadow-handle absolute inset-y-0 left-1/2 w-px" />
        <span className="blueprint bg-accent border-accent text-background relative flex size-11 items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="m9 18-6-6 6-6" />
            <path d="m15 6 6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  )
}
