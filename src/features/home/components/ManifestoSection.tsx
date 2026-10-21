import { ManifestoReveal } from './ManifestoReveal'

export function ManifestoSection() {
  return (
    <section
      aria-labelledby="manifeste-titre"
      className="on-dark bg-accent-900 text-background grid-lines relative overflow-hidden"
    >
      <div className="max-w-page px-margin py-statement mx-auto flex flex-col gap-9">
        <p id="manifeste-titre" className="label-caps text-accent-300">
          Manifeste
        </p>
        <ManifestoReveal
          lead="Nous ne cachons pas vos fenêtres."
          emphasis="Nous choisissons ce qu’elles laissent passer."
        />
      </div>
    </section>
  )
}
