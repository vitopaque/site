import { getPayload } from 'payload'

export const getPayloadClient = async () => {
  const { default: config } = await import('@payload-config')
  return getPayload({ config })
}
