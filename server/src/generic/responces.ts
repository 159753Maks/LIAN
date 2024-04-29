import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { InternalServerError } from '../errors/application.error'
import { DbError } from '../errors/db.error'
import { ForbiddenError } from '../errors/forbidden.error'
import { NotFoundError } from '../errors/not.found.error'

export const successResponse = (data: unknown): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

export const errorResponse = (event: APIGatewayProxyEvent, err: unknown): APIGatewayProxyResult => {
  if (err instanceof NotFoundError) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Resource not found',
        error: { name: err.name, message: err.message },
        input: event,
      }),
    }
  } else if (err instanceof ForbiddenError) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: 'Forbidden',
        error: { name: err.name, message: err.message },
        input: event,
      }),
    }
  } else if (err instanceof InternalServerError || err instanceof DbError) {
    return {
      statusCode: 409,
      body: JSON.stringify({
        message: 'InternalServerError',
        error: { name: err.name, message: err.message },
        input: event,
      }),
    }
  }
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: 'Internal server error',
      error: err,
      input: event,
    }),
  }
}
