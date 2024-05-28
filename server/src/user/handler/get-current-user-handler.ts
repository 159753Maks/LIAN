import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda'

import { authenticate } from '../../auth/auth-middleware'
import { createAppLogger } from '../../db/generic/app-logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { applyMiddleware } from '../../utill/middlware-util'

export const getCurrentUserHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  const logger = createAppLogger() // Створення логгера за допомогою `createAppLogger`.

  try {
    const { appContext } = await applyMiddleware(event, context, authenticate)
    logger.debug('user.get-current.handler.start') // Запис повідомлення у логгер з рівнем `info` та текстом `'user.sing.in.handler.start'`.

    return successResponse(appContext.userData) // Повернення успішної відповіді з токеном.
  } catch (e) {
    logger.error('user.get-current.handler.error: ', e) // Запис повідомлення про помилку у логгер з рівнем `error` та передачею помилки `e`.
    return errorResponse(event, e) // Повернення відповіді про помилку.
  }
}
