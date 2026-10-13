export default function HomePage() {
  return (
    <>
      <section className="max-w-page py-3xl px-margin mx-auto">
        <p className="label-caps text-on-surface-variant">Films de prestige</p>
        <h1 className="mt-md text-display-hero">Page provisoire VIT&apos;OPAQUE</h1>
        <p className="mt-lg text-body-lg text-on-surface-variant max-w-prose">
          Vérification des tokens : couleurs, typographie, rayons, filets et dégradé.
        </p>
        <div className="mt-xl gap-gutter flex flex-wrap">
          <a href="#contenu" className="label-md bg-primary px-lg py-sm text-on-primary rounded-md">
            Bouton principal
          </a>
          <a href="#contenu" className="label-cta bg-signature px-lg py-sm rounded-md">
            Demander un devis
          </a>
          <a
            href="#contenu"
            className="label-md border-outline px-lg py-sm text-on-surface hover:border-primary rounded-md border"
          >
            Bouton secondaire
          </a>
        </div>
        <div className="bg-signature mt-xl h-1 rounded-sm" aria-hidden="true" />
      </section>
      <section className="bg-surface-container-high">
        <div className="max-w-page py-3xl px-margin mx-auto">
          <h2 className="text-headline-lg">Surface secondaire</h2>
          <p className="mt-md text-on-surface-variant">
            Texte courant en argent sur Gris Anthracite.
          </p>
          <p className="mt-md text-outline text-headline-md">Gris signature, grand texte</p>
          <p className="mt-md text-primary text-headline-md">Cuivre, grand texte</p>
          <div className="glass glass-panel glass-border mt-lg p-lg shadow-halo rounded-md">
            <p className="text-on-surface">Panneau verre, filet bleu et halo.</p>
          </div>
        </div>
      </section>
    </>
  )
}
