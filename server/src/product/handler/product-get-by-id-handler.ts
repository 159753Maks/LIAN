import {
  APIGatewayProxyEvent, // Імпорт типу для події API Gateway
  APIGatewayProxyHandler, // Імпорт типу для обробника API Gateway
  APIGatewayProxyResult, // Імпорт типу для результату API Gateway
  Context, // Імпорт типу для контексту Lambda
} from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app-logger' // Імпорт функції для створення логгера
import { NotFoundError } from '../../errors/not-found-error' // Імпорт класу помилки "Не знайдено"
import { errorResponse, successResponse } from '../../generic/responces' // Імпорт функцій для обробки відповідей
import { validateUid } from '../../generic/validate' // Імпорт функції для валідації UID
import { ProductService } from '../service/product-service' // Імпорт сервісу для роботи з продуктами

/**
 * Обробник отримання продукту за UID
 * @param event - Подія API Gateway
 * @param _context - Контекст Lambda (не використовується)
 * @returns Результат виконання Lambda
 */
export const productGetByIdHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логгера за допомогою createAppLogger
  try {
    // Валідація UID продукту з події
    const { uid } = validateUid(event, 'productId')

    // Виклик сервісу для отримання продукту за UID
    const product = await ProductService.findOne(uid, logger)

    // Якщо продукт не знайдено, викидається помилка NotFoundError
    if (!product) {
      throw new NotFoundError('Product', uid)
    }

    // Повернення успішної відповіді з даними продукту
    return successResponse(product)
  } catch (e: unknown) {
    // Повернення відповіді з помилкою
    return errorResponse(event, e)
  }
}

