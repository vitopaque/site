import Link from 'next/link'

import type { ServiceSilo } from '@/shared/catalog'

export function LinkedService({ silo }: { silo: ServiceSilo }) {
  return (
    <section
      aria-labelledby="service-lie-titre"
      className="blueprint blueprint-card [--card-min-height:0px]"
    >
      <div className="flex flex-col gap-2">
        <p className="label-caps text-accent-700">Page de service liée</p>
        <h2 id="service-lie-titre" className="text-headline-sm uppercase">
          {silo.label}
        </h2>
      </div>
      <p className="text-body-md text-neutral-700">
        Le détail de la prestation, des réalisations et les réponses aux questions fréquentes.
      </p>
      <Link
        href={silo.href}
        className="label-btn-lg text-accent-700 self-start underline underline-offset-4"
      >
        Voir la prestation
      </Link>
    </section>
  )
}
