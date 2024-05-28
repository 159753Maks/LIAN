import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda' // Імпорт необхідних типів з бібліотеки aws-lambda.

import { authenticate } from '../../auth/auth-middleware' // Імпорт функції аутентифікації з middleware для автентифікації.
import { notUsersMiddleware } from '../../auth/not-users-middleware' // Імпорт middleware, що перевіряє, чи не є користувач адміністратором.
import { createAppLogger } from '../../db/generic/app-logger' // Імпорт функції створення логгера для додатка.
import { errorResponse, successResponse } from '../../generic/responces' // Імпорт функцій для створення відповідей на помилку та успіх.
import { applyMiddleware } from '../../utill/middlware-util' // Імпорт функції для застосування middleware.
import { CategoryService } from '../service/category-service' // Імпорт сервісу категорій.
import { validateCreateCategory } from '../validation/create-catogory-validation' // Імпорт функції для валідації створення категорії.

/**
 * Обробник створення категорії.
 * @param event Об'єкт події API Gateway.
 * @param context Контекст виконання функції AWS Lambda.
 * @returns Об'єкт, який містить відповідь API Gateway.
 */
export const categoryCreateHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логгера за допомогою функції createAppLogger.

  try {
    const { appContext, appEvent } = await applyMiddleware(
      event,
      context,
      authenticate,
      notUsersMiddleware,
    ) // Застосування middleware для обробки події.

    logger.debug('category.create.handler.start') // Запис повідомлення про початок обробки запиту в лог.
    const data = validateCreateCategory(appEvent) // Валідація даних для створення категорії.

    logger.debug('category.create.handler.validated') // Запис повідомлення про успішну валідацію в лог.
    const result = await CategoryService.createOne(data, logger) // Виклик сервісу для створення категорії.

    return successResponse(result) // Повернення успішної відповіді з результатом створення категорії.
  } catch (e: unknown) {
    logger.debug('category.create.handler.error:', e) // Запис повідомлення про помилку в лог.
    return errorResponse(event, e) // Повернення відповіді з помилкою.
  }
}
