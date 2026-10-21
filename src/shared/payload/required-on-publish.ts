export const requiredOnPublish = (
  data: unknown,
  present: boolean,
  message: string,
): true | string =>
  (data as { _status?: string } | undefined)?._status === 'published' && !present ? message : true
