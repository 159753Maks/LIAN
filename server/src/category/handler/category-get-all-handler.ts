import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda' // Імпорт необхідних типів з бібліотеки aws-lambda.

import { createAppLogger } from '../../db/generic/app-logger' // Імпорт функції створення логгера для додатка.
import { errorResponse, successResponse } from '../../generic/responces' // Імпорт функцій для створення відповідей на помилку та успіх.
import { CategoryService } from '../service/category-service' // Імпорт сервісу категорій.

/**
 * Обробник отримання списку всіх категорій.
 * @param event Об'єкт події API Gateway.
 * @returns Об'єкт, який містить відповідь API Gateway.
 */
export const categoryGetAllHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логгера за допомогою функції createAppLogger.

  try {
    logger.debug('category.list.handler.start') // Запис повідомлення про початок обробки запиту в лог.

    logger.debug('category.list.handler.validated') // Запис повідомлення про успішну валідацію вхідних даних в лог.
    const result = await CategoryService.findAll(logger) // Виклик сервісу для отримання всіх категорій.

    return successResponse(result) // Повернення успішної відповіді зі списком всіх категорій.
  } catch (e: unknown) {
    logger.debug('category.list.handler.error:', e) // Запис повідомлення про помилку в лог.
    return errorResponse(event, e) // Повернення відповіді з помилкою.
  }
}
