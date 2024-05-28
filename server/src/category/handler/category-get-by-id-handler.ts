// Імпорт необхідних модулів з aws-lambda для обробника API Gateway
import {
  APIGatewayProxyEvent, // Подія API Gateway
  APIGatewayProxyHandler, // Обробник API Gateway
  APIGatewayProxyResult, // Результат API Gateway
  Context, // Контекст виконання
} from 'aws-lambda'
// Імпорт функції створення логера додатку з модуля app-logger в db/generic
import { createAppLogger } from '../../db/generic/app-logger'
// Імпорт функцій для обробки відповідей з generic/responces
import { errorResponse, successResponse } from '../../generic/responces'
// Імпорт функції для перевірки правильності UID з generic/validate
import { validateUid } from '../../generic/validate'
// Імпорт функції для застосування проміжного ПЗ з util/middleware-util
import { applyMiddleware } from '../../utill/middlware-util'
// Імпорт сервісу категорій з service/category-service
import { CategoryService } from '../service/category-service'

// Обробник API Gateway для отримання категорії за її ID
export const categoryGetByIdHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent, // Подія API Gateway
  context: Context, // Контекст виконання
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логера додатку

  try {
    // Застосування проміжного ПЗ до події та контексту
    const { appContext, appEvent } = await applyMiddleware(event, context)

    // Логування початку обробки запиту на отримання категорії за ID
    logger.debug('category.get-by-id.handler.start')

    // Перевірка правильності UID категорії з події
    const { uid } = validateUid(appEvent, 'categoryId')

    // Логування успішної перевірки UID категорії
    logger.debug('category.get-by-id.handler.validated')

    // Виклик сервісу категорій для отримання категорії за її ID
    const result = await CategoryService.findOne(uid, logger)

    // Повернення успішної відповіді з результатом
    return successResponse(result)
  } catch (e: unknown) {
    // Логування помилки при обробці запиту
    logger.debug('category.get-by-id.handler.error:', e)

    // Повернення відповіді з помилкою
    return errorResponse(event, e)
  }
}
