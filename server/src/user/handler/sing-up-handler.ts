import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app-logger' // Імпорт функції для створення логгера
import { errorResponse, successResponse } from '../../generic/responces' // Імпорт функцій для відповідей на запити
import { UserService } from '../service/user-service' // Імпорт сервісу користувача
import { validateSingUp } from '../validation/sing-up-validation' // Імпорт функції для перевірки даних при реєстрації

// Обробник для реєстрації нового користувача
export const singUpHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = createAppLogger() // Створення логгера

  try {
    logger.debug('user.sing.up.handler.start') // Логування початку обробки запиту

    const user = validateSingUp(event) // Перевірка та отримання даних користувача з запиту

    logger.debug('user.sing.up.handler.validated') // Логування успішної перевірки даних

    await UserService.createUser(user, logger) // Створення нового користувача в базі даних

    logger.debug('user.sing.up.handler.end') // Логування завершення обробки запиту

    return successResponse({}) // Відповідь з кодом 200 та пустим об'єктом
  } catch (e) {
    logger.error('user.sing.up.handler.error: ', e) // Логування помилки в разі її виникнення

    return errorResponse(event, e) // Відповідь з кодом помилки та об'єктом помилки
  }
}
