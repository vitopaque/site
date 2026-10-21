export type FaqItem = { question: string; answer: string }

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="border-divider max-w-3xl border-t">
      {items.map((item) => (
        <details key={item.question} className="group border-divider border-b">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-headline-sm uppercase">{item.question}</span>
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent-700 shrink-0"
            >
              <path d="M4 12h16" />
              <path d="M12 4v16" className="group-open:hidden" />
            </svg>
          </summary>
          <p className="max-w-prose pb-6 text-neutral-700">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
