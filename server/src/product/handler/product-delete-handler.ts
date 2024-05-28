import {
  APIGatewayProxyEvent, // Імпорт типу для події API Gateway
  APIGatewayProxyHandler, // Імпорт типу для обробника API Gateway
  APIGatewayProxyResult, // Імпорт типу для результату API Gateway
  Context, // Імпорт типу для контексту Lambda
} from 'aws-lambda'

import { authenticate } from '../../auth/auth-middleware' // Імпорт middleware для автентифікації
import { notUsersMiddleware } from '../../auth/not-users-middleware' // Імпорт middleware для виключення користувачів
import { createAppLogger } from '../../db/generic/app-logger' // Імпорт функції для створення логгера
import { errorResponse, successResponse } from '../../generic/responces' // Імпорт функцій для обробки відповідей
import { validateUid } from '../../generic/validate' // Імпорт функції для валідації UID
import { applyMiddleware } from '../../utill/middlware-util' // Імпорт утиліти для застосування middleware
import { ProductService } from '../service/product-service' // Імпорт сервісу для роботи з продуктами

/**
 * Обробник видалення продукту
 * @param event - Подія API Gateway
 * @param context - Контекст Lambda
 * @returns Результат виконання Lambda
 */
export const productDeleteHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логгера за допомогою createAppLogger

  try {
    // Застосування middleware для автентифікації та виключення користувачів
    const { appEvent } = await applyMiddleware(event, context, authenticate, notUsersMiddleware)

    // Валідація UID продукту
    const { uid } = validateUid(appEvent, 'productId')

    // Виклик сервісу для видалення продукту
    await ProductService.deleteOne(uid, logger)

    // Повернення успішної відповіді
    return successResponse({})
  } catch (e: unknown) {
    // Повернення відповіді з помилкою
    return errorResponse(event, e)
  }
}

