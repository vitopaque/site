import Image from 'next/image'
import Link from 'next/link'

import monogram from '@/shared/assets/brand/monogramme-v.webp'

import { siteConfig } from '../config'

export function BrandLockup() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image src={monogram} alt="" height={40} className="h-10 w-auto" />
      <span className="wordmark">{siteConfig.name}</span>
    </Link>
  )
}
