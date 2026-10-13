import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { isAdminOrEditor, Users } from '@/features/access'
import { Media } from '@/features/media'
import { isOnVercel, requireEnv, resolveSiteUrl } from '@/shared/env'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname, 'src') },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  serverURL: resolveSiteUrl().origin,
  secret: requireEnv('PAYLOAD_SECRET'),
  db: postgresAdapter({
    pool: {
      connectionString: requireEnv('DATABASE_URI'),
      max: 5,
      idleTimeoutMillis: 5000,
      connectionTimeoutMillis: 10000,
    },
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'src/shared/payload-types.ts'),
  },
  plugins: [
    vercelBlobStorage({
      alwaysInsertFields: true,
      collections: { [Media.slug]: { disablePayloadAccessControl: true } },
      token: isOnVercel() ? requireEnv('BLOB_READ_WRITE_TOKEN') : process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: { access: isAdminOrEditor },
    }),
  ],
  sharp,
})
