// Імпорт необхідних модулів з aws-lambda для обробника API Gateway
import {
  APIGatewayProxyEvent,        // Подія API Gateway
  APIGatewayProxyHandler,      // Обробник API Gateway
  APIGatewayProxyResult,       // Результат API Gateway
  Context,                     // Контекст виконання
} from 'aws-lambda'
// Імпорт функції для аутентифікації користувача
import { authenticate } from '../../auth/auth-middleware'
// Імпорт функції створення логера додатку та функцій для роботи з відповідями
import { createAppLogger } from '../../db/generic/app-logger'
import { errorResponse, successResponse } from '../../generic/responces'
// Імпорт функції для валідації UID та застосування проміжного ПЗ
import { validateUid } from '../../generic/validate'
import { applyMiddleware } from '../../utill/middlware-util'
// Імпорт сервісу для роботи з замовленнями
import { OrderService } from '../service/order-service'

// Обробник API Gateway для видалення товару з замовлення
export const deleteProductFromOrderHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,  // Подія API Gateway
  context: Context,             // Контекст виконання
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логера додатку

  try {
    // Застосування проміжного ПЗ до події та контексту для аутентифікації користувача
    const { appEvent, appContext } = await applyMiddleware(event, context, authenticate)

    // Валідація UID товару
    const { uid } = validateUid(appEvent, 'productId')

    // Видалення товару з замовлення
    await OrderService.deleteProductFromOrder(uid, logger)

    // Повернення успішної відповіді
    return successResponse({})
  } catch (e: unknown) {
    // Обробка помилки та повернення відповіді з помилкою
    return errorResponse(event, e)
  }
}
