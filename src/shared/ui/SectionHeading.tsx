export type SectionTitle = { kicker: string; lines: readonly string[] }

type Props = SectionTitle & {
  id: string
  tone?: 'light' | 'dark'
}

export function SectionHeading({ id, kicker, lines, tone = 'light' }: Props) {
  return (
    <div className="flex flex-col gap-3.5">
      <p className={`label-caps ${tone === 'dark' ? 'text-accent-300' : 'text-accent-700'}`}>
        {kicker}
      </p>
      <h2 id={id} className="text-headline-lg wrap-break-word uppercase">
        {lines.map((line, index) => (
          <span key={line} className="block">
            {line}
            {index < lines.length - 1 ? ' ' : null}
          </span>
        ))}
      </h2>
    </div>
  )
}
