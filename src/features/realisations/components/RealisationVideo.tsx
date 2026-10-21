import { getImageProps } from 'next/image'

import type { RealisationVideo as Video } from '../types'

const POSTER_WIDTH = 600
const POSTER_HEIGHT = 338

export function RealisationVideo({ video, label }: { video: Video; label: string }) {
  const { props } = getImageProps({
    src: video.poster,
    alt: '',
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
  })
  return (
    <figure className="blueprint">
      <video
        controls
        muted
        playsInline
        preload="none"
        poster={props.src}
        aria-label={label}
        className="bg-accent-900 aspect-video w-full"
      >
        <source src={video.url} type="video/mp4" />
        Votre navigateur ne peut pas lire cette vidéo.
      </video>
    </figure>
  )
}
