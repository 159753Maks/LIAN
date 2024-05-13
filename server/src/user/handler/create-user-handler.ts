import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app.logger' // Winston logger
import { errorResponse, successResponse } from '../../generic/responces'
import { UserService } from '../service/user.service'
import { createUserValidation } from '../validation/create.user.validation'
import { applyMiddleware } from '../../utill/middlware.util'
import { authenticate } from '../../auth/auth-middleware'
import { notUsersMiddleware } from '../../auth/not-users-middleware'
import { addLoggerMiddlware } from '../../utill/add.logger.middlware'

// Експорт обробника `singInHandler` типу `APIGatewayProxyHandler`, який виконується асинхронно та приймає подію `APIGatewayProxyEvent`.
export const createUserHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  const logger = createAppLogger() // Створення логгера за допомогою `createAppLogger`.

  try {
    const { appContext, appEvent } = await applyMiddleware(
      event,
      context,
      authenticate,
      notUsersMiddleware,
    )

    logger.info('user.create.handler.start') // Запис повідомлення у логгер з рівнем `info` та текстом `'user.sing.in.handler.start'`.
    const user = createUserValidation(appEvent, appContext) // Валідація даних вхідного запиту за допомогою `validateSingIn`.

    logger.info('user.create.handler.validated') // Запис повідомлення у логгер з рівнем `info` та текстом `'user.sing.in.handler.validated'`.
    await UserService.createUser(user, logger) // Виклик методу `singIn` сервісу `UserService` для аутентифікації користувача.

    logger.info('user.create.handler.end') // Запис повідомлення у логгер з рівнем `info` та текстом `'user.sing.in.handler.end'`.
    return successResponse({}) // Повернення успішної відповіді з токеном.
  } catch (e) {
    logger.error('user.create.handler.error: ', e) // Запис повідомлення про помилку у логгер з рівнем `error` та передачею помилки `e`.
    return errorResponse(event, e) // Повернення відповіді про помилку.
  }
}
