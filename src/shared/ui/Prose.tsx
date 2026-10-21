import Link from 'next/link'

export type ProseSegment = string | { text: string; href: string }

export function Prose({ segments }: { segments: readonly ProseSegment[] }) {
  return segments.map((segment) =>
    typeof segment === 'string' ? (
      segment
    ) : (
      <Link key={segment.href} href={segment.href} className="underline underline-offset-4">
        {segment.text}
      </Link>
    ),
  )
}
