'use client'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import type { LabFilm } from './film'
import { FilmMeters } from './FilmMeters'
import { ordinal } from './ordinal'
import { SplitSlider } from './SplitSlider'

type Props = { films: readonly LabFilm[]; image: { src: StaticImageData; alt: string } }

export function FilmLab({ films, image }: Props) {
  const [selected, setSelected] = useState(0)
  const [flash, setFlash] = useState(0)
  const film = films[selected] ?? films[0]
  if (!film) return null

  const select = (index: number) => {
    setSelected(index)
    setFlash((count) => count + 1)
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-10 lg:grid-cols-3">
        <SplitSlider
          label="Comparer le verre sans film et le verre avec film"
          valueText={(split) => `Film visible sur ${100 - split} % de la vitre`}
          className="aspect-16/10 min-h-115 lg:col-span-2"
        >
          <div className="duotone absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              quality={75}
              sizes="(min-width: 64rem) 66vw, 100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className={`film-clip pointer-events-none absolute inset-0 transition-[background,backdrop-filter] duration-(--duration-film) ${film.veil}`}
          />
          {flash > 0 ? (
            <div
              key={flash}
              aria-hidden="true"
              className="film-clip pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen motion-reduce:hidden"
            >
              <div className="sweep-band animate-flash absolute -inset-x-3/10 -inset-y-1/5" />
            </div>
          ) : null}
          <span className="label-sm bg-accent-900 text-background pointer-events-none absolute top-4 left-4 px-2.5 py-1.5">
            Sans film
          </span>
          <span className="label-sm bg-background text-accent-900 pointer-events-none absolute top-4 right-4 px-2.5 py-1.5">
            {film.name}
          </span>
        </SplitSlider>

        <div aria-live="polite" className="blueprint flex flex-col gap-5 p-8">
          <div className="border-divider flex items-baseline justify-between border-b pb-3.5">
            <p className="label-caps text-accent-700">Fiche film</p>
            <p className="text-numeral font-heading text-accent">{ordinal(selected)}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-headline-md uppercase">{film.name}</h3>
            <p className="text-neutral-700">{film.description}</p>
          </div>
          <FilmMeters meters={film.meters} />
          <ul className="flex flex-wrap gap-2">
            {film.uses.map((use) => (
              <li key={use} className="label-sm bg-accent-100 text-accent-700 px-2.5 py-1">
                {use}
              </li>
            ))}
          </ul>
          <Link
            href={film.href}
            className="label-btn-lg text-accent-700 mt-auto underline underline-offset-4"
          >
            Découvrir ce film
            <span className="sr-only"> : {film.name}</span>
          </Link>
        </div>
      </div>

      <ul
        aria-label="Films à comparer"
        className="border-divider grid grid-cols-[repeat(auto-fit,minmax(10.625rem,1fr))] border-t border-l"
      >
        {films.map((item, index) => (
          <li key={item.id} className="border-divider border-r border-b">
            <button
              type="button"
              aria-pressed={index === selected}
              onClick={() => select(index)}
              className={`hover:bg-accent-100 flex h-full w-full cursor-pointer flex-col gap-3.5 p-4.5 text-left transition-colors duration-(--duration-hover) ${index === selected ? 'bg-accent-200' : 'bg-transparent'}`}
            >
              <span className="relative block aspect-4/3 overflow-hidden">
                <span className="duotone absolute inset-0">
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(min-width: 64rem) 20vw, 50vw"
                    className="object-cover"
                  />
                </span>
                <span className={`absolute inset-0 ${item.veil}`} />
              </span>
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-heading text-title-md tracking-wide uppercase">
                  {item.name}
                </span>
                <span className="font-heading text-body-sm text-accent-700">{ordinal(index)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
