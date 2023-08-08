/**
 * This util function is used for debugging and testing purposes in development
 * environments. It allows developers to verify certain conditions and
 * throw an error with a provided message if the condition is not met.
 */

export const assertProd = (condition: boolean, message: string) => {
  if (!condition) {
    // eslint-disable-next-line no-console
    console.error('ASSERTION_FAILED', message)
    throw new Error(`ASSERTION_ERROR: ${message}`)
  }
}
