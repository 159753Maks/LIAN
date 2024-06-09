export class NotFoundError extends Error {
  constructor(entity: string, data: string) {
    // Pass the message to the base Error class constructor
    super(`${entity} not found, ${data}`)
    // Set the name property of the error to NotFoundError
    this.name = 'NotFoundError'
    // Ensure that stack traces are properly captured
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError)
    }
  }
}
