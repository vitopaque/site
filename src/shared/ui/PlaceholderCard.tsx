import { ToIntegrateBadge } from './ToIntegrateBadge'

export type Placeholder = { id: string; placeholder: true; hint: string }

export function PlaceholderCard({ hint }: { hint: string }) {
  return (
    <div className="blueprint flex h-full min-h-48 flex-col gap-4 border-dashed p-7">
      <ToIntegrateBadge />
      <p className="text-neutral-700">{hint}</p>
    </div>
  )
}
