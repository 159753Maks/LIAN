import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { InternalServerError } from '../errors/application-error'
import { DbError } from '../errors/db-error'
import { ForbiddenError } from '../errors/forbidden-error'
import { NotFoundError } from '../errors/not-found-error'

// Функція для створення успішного відповіді з даними
export const successResponse = (data: unknown): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

// Функція для створення відповіді з помилкою
export const errorResponse = (event: APIGatewayProxyEvent, err: unknown): APIGatewayProxyResult => {
  if (err instanceof NotFoundError) {
    // Якщо помилка є типу NotFoundError
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Ресурс не знайдений',
        error: { name: err.name, message: err.message },
        input: event,
      }),
    }
  } else if (err instanceof ForbiddenError) {
    // Якщо помилка є типу ForbiddenError
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: 'Заборонено',
        error: { name: err.name, message: err.message },
        input: event,
      }),
    }
  } else if (err instanceof InternalServerError || err instanceof DbError) {
    // Якщо помилка є типу InternalServerError або DbError
    return {
      statusCode: 409,
      body: JSON.stringify({
        message: 'Помилка сервера',
        error: { name: err.name, message: err.message },
        input: event,
      }),
    }
  }
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: 'Помилка сервера',
      error: err,
      input: event,
    }),
  }
}
