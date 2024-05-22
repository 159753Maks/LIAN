import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app-logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { UserService } from '../service/user-service'
import { validateSingIn } from '../validation/sing-in-validation'

// Експорт обробника `singInHandler` типу `APIGatewayProxyHandler`, який виконується асинхронно та приймає подію `APIGatewayProxyEvent`.
export const singInHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = createAppLogger() // Створення логгера за допомогою `createAppLogger`.
  try {
    logger.info('user.sing.in.handler.start') // Запис повідомлення у логгер з рівнем `info` та текстом `'user.sing.in.handler.start'`.
    const user = validateSingIn(event) // Валідація даних вхідного запиту за допомогою `validateSingIn`.

    logger.info('user.sing.in.handler.validated') // Запис повідомлення у логгер з рівнем `info` та текстом `'user.sing.in.handler.validated'`.
    const token = await UserService.singIn(user.email, user.password, logger) // Виклик методу `singIn` сервісу `UserService` для аутентифікації користувача.

    logger.info('user.sing.in.handler.end') // Запис повідомлення у логгер з рівнем `info` та текстом `'user.sing.in.handler.end'`.
    return successResponse({ token }) // Повернення успішної відповіді з токеном.
  } catch (e) {
    logger.error('user.sing.in.handler.error: ', e) // Запис повідомлення про помилку у логгер з рівнем `error` та передачею помилки `e`.
    return errorResponse(event, e) // Повернення відповіді про помилку.
  }
}
