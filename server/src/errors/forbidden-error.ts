export class ForbiddenError extends Error {
  constructor(reason: string) {
    // Pass the message to the base Error class constructor
    super(`Forbidden: ${reason}`)
    // Set the name property of the error to NotFoundError
    this.name = 'Forbidden'
    // Ensure that stack traces are properly captured
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError)
    }
  }
}
