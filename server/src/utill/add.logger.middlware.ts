import { middlewareType } from './middlware.util'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { createAppLogger } from '../db/generic/app.logger'

export const addLoggerMiddlware: middlewareType = (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  const logger = createAppLogger() // Створення логгера за допомогою `createAppLogger`.

  return Promise.resolve({ event, context: { ...context, logger } })
}
