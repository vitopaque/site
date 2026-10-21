export function ToIntegrateBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`label-sm border-accent-700 text-accent-700 self-start border px-2.5 py-1 ${className}`}
    >
      À intégrer
    </span>
  )
}
