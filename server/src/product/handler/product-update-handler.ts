import {
  APIGatewayProxyEvent, // Імпорт типу для події API Gateway
  APIGatewayProxyHandler, // Імпорт типу для обробника API Gateway
  APIGatewayProxyResult, // Імпорт типу для результату API Gateway
  Context, // Імпорт типу для контексту Lambda
} from 'aws-lambda'

import { authenticate } from '../../auth/auth-middleware' // Імпорт функції для аутентифікації
import { notUsersMiddleware } from '../../auth/not-users-middleware' // Імпорт функції для перевірки, що користувач не є анонімним
import { createAppLogger } from '../../db/generic/app-logger' // Імпорт функції для створення логгера
import { errorResponse, successResponse } from '../../generic/responces' // Імпорт функцій для обробки відповідей
import { applyMiddleware } from '../../utill/middlware-util' // Імпорт функції для застосування посередників
import { ProductService } from '../service/product-service' // Імпорт сервісу для роботи з продуктами
import { validateUpdateProduct } from '../validation/update-product-validation' // Імпорт функції для валідації оновлення продукту

/**
 * Обробник для оновлення продукту
 * @param event - Подія API Gateway
 * @param context - Контекст Lambda
 * @returns Результат виконання Lambda
 */
export const productUpdateHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логгера за допомогою createAppLogger
  try {
    // Застосування посередників аутентифікації та перевірки на анонімність
    const { appEvent } = await applyMiddleware(event, context, authenticate, notUsersMiddleware)

    // Валідація даних оновлення продукту
    const data = validateUpdateProduct(appEvent)

    // Оновлення продукту за допомогою сервісу
    const product = await ProductService.updateOne(data, logger)

    // Повернення успішної відповіді з оновленим продуктом
    return successResponse(product)
  } catch (e: unknown) {
    // Повернення відповіді з помилкою
    return errorResponse(event, e)
  }
}
