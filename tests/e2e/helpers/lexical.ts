export const text = (value: string, format = 0) => ({
  type: 'text',
  text: value,
  format,
  version: 1,
})

export const node = (type: string, children: object[], extra: object = {}) => ({
  type,
  children,
  version: 1,
  ...extra,
})
