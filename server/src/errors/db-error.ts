export class DbError extends Error {
  constructor(message?: string) {
    // Pass the message to the base Error class constructor
    super(message)
    // Set the name property of the error to NotFoundError
    this.name = 'InternalServerError:dbError'
    // Ensure that stack traces are properly captured
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DbError)
    }
  }
}
