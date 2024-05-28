// Імпорт необхідних модулів з aws-lambda для обробника API Gateway
import {
  APIGatewayProxyEvent, // Подія API Gateway
  APIGatewayProxyHandler, // Обробник API Gateway
  APIGatewayProxyResult, // Результат API Gateway
  Context, // Контекст виконання
} from 'aws-lambda'
// Імпорт функції для аутентифікації користувача та проміжного ПЗ для перевірки, чи користувач не є адміністратором
import { authenticate } from '../../auth/auth-middleware'
import { notUsersMiddleware } from '../../auth/not-users-middleware'
// Імпорт функції створення логера додатку та функцій для роботи з відповідями
import { createAppLogger } from '../../db/generic/app-logger'
import { errorResponse, successResponse } from '../../generic/responces'
// Імпорт функції для застосування проміжного ПЗ та сервісу для обробки замовлень
import { applyMiddleware } from '../../utill/middlware-util'
import { OrderService } from '../service/order-service'
// Імпорт функції для валідації оновлення статусу замовлення
import { validateOrderStatusUpdate } from '../validation/update-order-status-validation'

// Обробник API Gateway для оновлення статусу замовлення
export const updateOrderStatusHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent, // Подія API Gateway
  context: Context, // Контекст виконання
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логера додатку

  try {
    // Застосування проміжного ПЗ до події та контексту для аутентифікації користувача та перевірки, чи користувач не є адміністратором
    const { appContext, appEvent } = await applyMiddleware(
      event,
      context,
      authenticate,
      notUsersMiddleware,
    )

    logger.debug('order.update-order-status.handler.start') // Логування початку обробки запиту на оновлення статусу замовлення

    // Валідація оновлення статусу замовлення
    const data = validateOrderStatusUpdate(appEvent)
    logger.debug('order.update-order-status.handler.validated') // Логування успішної валідації

    // Оновлення статусу замовлення
    const order = await OrderService.updateOrderStatus(
      data.uid,
      data.status,
      appContext.userData,
      logger,
    )

    logger.debug('order.update-order-status.handler.end') // Логування завершення обробки запиту
    return successResponse(order) // Повернення успішної відповіді з оновленим замовленням
  } catch (e: unknown) {
    logger.debug(`order.update-order-status.handler.error: ${JSON.stringify(e)}`) // Логування помилки
    return errorResponse(event, e) // Повернення відповіді з помилкою
  }
}
