export function errorToString(error: any): string {
  return error instanceof Error ?
    error.message
    : typeof error === 'string' ?
      error :
      JSON.stringify(error)
}