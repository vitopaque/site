import { METER_LABELS, METER_MAX, type LabFilm } from './film'

export function FilmMeters({ meters }: { meters: LabFilm['meters'] }) {
  return (
    <ul className="flex flex-col gap-3">
      {METER_LABELS.map((label, index) => {
        const level = meters[index] ?? 0
        return (
          <li key={label} className="grid grid-cols-[1fr_auto] items-center gap-3">
            <span className="text-body-sm tracking-wide">
              {label}
              <span className="sr-only">
                {' '}
                : {level} sur {METER_MAX}
              </span>
            </span>
            <span aria-hidden="true" className="flex gap-0.75">
              {Array.from({ length: METER_MAX }, (_, cell) => (
                <span
                  key={cell}
                  className={`border-accent h-2 w-5.5 border transition-colors duration-(--duration-meter) ${cell < level ? 'bg-accent' : 'bg-transparent'}`}
                />
              ))}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
