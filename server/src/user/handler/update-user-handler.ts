import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda'

import { authenticate } from '../../auth/auth-middleware'
import { createAppLogger } from '../../db/generic/app-logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { applyMiddleware } from '../../utill/middlware-util'
import { UserService } from '../service/user-service'
import { updateUserValidation } from '../validation/update-user-validation'

// Експорт обробника `singInHandler` типу `APIGatewayProxyHandler`, який виконується асинхронно та приймає подію `APIGatewayProxyEvent`.
export const updateUserHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  const logger = createAppLogger()

  try {
    const { appContext, appEvent } = await applyMiddleware(event, context, authenticate)

    logger.debug('user.update.handler.start') // Запис повідомлення у логгер з рівнем `info` та текстом `'user.sing.in.handler.start'`.
    const user = updateUserValidation(appEvent, appContext) // Валідація даних вхідного запиту за допомогою `validateSingIn`.

    logger.debug('user.update.handler.validated') // Запис повідомлення у логгер з рівнем `info` та текстом `'user.sing.in.handler.validated'`.
    const result = await UserService.updateUser(user, logger) // Виклик методу `singIn` сервісу `UserService` для аутентифікації користувача.

    logger.debug('user.update.in.handler.end') // Запис повідомлення у логгер з рівнем `info` та текстом `'user.sing.in.handler.end'`.
    return successResponse(result) // Повернення успішної відповіді з токеном.
  } catch (e) {
    logger.error('user.update.handler.error: ', e) // Запис повідомлення про помилку у логгер з рівнем `error` та передачею помилки `e`.
    return errorResponse(event, e) // Повернення відповіді про помилку.
  }
}
