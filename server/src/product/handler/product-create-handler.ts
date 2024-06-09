import {
  APIGatewayProxyEvent, // Імпорт типу для події API Gateway Proxy
  APIGatewayProxyHandler, // Імпорт типу для обробника API Gateway Proxy
  APIGatewayProxyResult, // Імпорт типу для результату API Gateway Proxy
  Context, // Імпорт типу для контексту Lambda
} from 'aws-lambda'

import { authenticate } from '../../auth/auth-middleware' // Імпорт middleware для автентифікації
import { notUsersMiddleware } from '../../auth/not-users-middleware' // Імпорт middleware для перевірки, що користувач не є звичайним користувачем
import { createAppLogger } from '../../db/generic/app-logger' // Імпорт функції для створення логгера
import { errorResponse, successResponse } from '../../generic/responces' // Імпорт функцій для створення відповідей
import { applyMiddleware } from '../../utill/middlware-util' // Імпорт утиліти для застосування middleware
import { ProductService } from '../service/product-service' // Імпорт сервісу для роботи з продуктами
import { validateCreateProduct } from '../validation/create-product-validation' // Імпорт функції для валідації даних створення продукту

/**
 * Обробник для створення продукту
 * @param event - подія API Gateway Proxy
 * @param context - контекст Lambda
 * @returns результат обробки API Gateway Proxy
 */
export const productCreateHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логгера за допомогою `createAppLogger`.

  try {
    // Застосування middleware для автентифікації та перевірки ролі користувача
    const { appContext, appEvent } = await applyMiddleware(
      event,
      context,
      authenticate,
      notUsersMiddleware,
    )
    logger.debug('product.create.handler.start') // Логування початку обробки запиту

    const data = validateCreateProduct(appEvent) // Валідація даних створення продукту
    logger.debug('product.create.handler.validated') // Логування успішної валідації

    const product = await ProductService.createOne(data, logger) // Створення продукту за допомогою сервісу

    logger.debug('product.create.handler.end') // Логування успішного завершення обробки запиту
    return successResponse(product) // Повернення успішної відповіді з даними продукту
  } catch (e: unknown) {
    logger.debug(`product.create.handler.error: ${JSON.stringify(e)}`) // Логування помилки
    return errorResponse(event, e) // Повернення відповіді з помилкою
  }
}
