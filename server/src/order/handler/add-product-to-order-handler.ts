// Імпорт необхідних модулів з aws-lambda для обробника API Gateway
import {
  APIGatewayProxyEvent, // Подія API Gateway
  APIGatewayProxyHandler, // Обробник API Gateway
  APIGatewayProxyResult, // Результат API Gateway
  Context, // Контекст виконання
} from 'aws-lambda'
// Імпорт функції для аутентифікації користувача
import { authenticate } from '../../auth/auth-middleware'
// Імпорт функції створення логера додатку та функцій для роботи з відповідями
import { createAppLogger } from '../../db/generic/app-logger'
import { errorResponse, successResponse } from '../../generic/responces'
// Імпорт функції для застосування проміжного ПЗ та сервісу для обробки замовлень
import { applyMiddleware } from '../../utill/middlware-util'
import { OrderService } from '../service/order-service'
// Імпорт функції для перевірки правильності UID
import { validateUid } from '../../generic/validate'

// Обробник API Gateway для додавання товару до замовлення
export const addProductToOrderHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent, // Подія API Gateway
  context: Context, // Контекст виконання
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логгера за допомогою `createAppLogger`.

  try {
    // Застосування проміжного ПЗ до події та контексту
    const { appContext, appEvent } = await applyMiddleware(event, context, authenticate)
    logger.debug('order.add-product-to-order.handler.start') // Логування початку обробки запиту на додавання товару до замовлення

    // Перевірка правильності UID товару
    const data = validateUid(event, 'productId')
    logger.debug('order.add-product-to-order.handler.validated') // Логування успішної перевірки

    // Додавання товару до замовлення
    const order = await OrderService.addProductToOrder(data.uid, appContext.userData.userId, logger)

    logger.debug('order.add-product-to-order.handler.end') // Логування завершення обробки запиту
    return successResponse(order) // Повернення успішної відповіді з даними замовлення
  } catch (e: unknown) {
    logger.debug(`order.add-product-to-order.handler.error: ${JSON.stringify(e)}`) // Логування помилки
    return errorResponse(event, e) // Повернення відповіді з помилкою
  }
}
