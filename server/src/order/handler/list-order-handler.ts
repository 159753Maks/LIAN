// Імпорт необхідних модулів з aws-lambda для обробника API Gateway
import {
  APIGatewayProxyEvent,        // Подія API Gateway
  APIGatewayProxyHandler,      // Обробник API Gateway
  APIGatewayProxyResult,       // Результат API Gateway
  Context,                     // Контекст виконання
} from 'aws-lambda'
// Імпорт функції створення логера додатку та функцій для роботи з відповідями
import { createAppLogger } from '../../db/generic/app-logger'
import { errorResponse, successResponse } from '../../generic/responces'
// Імпорт функції для застосування проміжного ПЗ та сервісу для обробки замовлень
import { OrderService } from '../service/order-service'
import { applyMiddleware } from '../../utill/middlware-util'
// Імпорт функції для аутентифікації користувача
import { authenticate } from '../../auth/auth-middleware'

// Обробник API Gateway для отримання списку замовлень
export const listOrderHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,  // Подія API Gateway
  context: Context,             // Контекст виконання
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логера додатку

  try {
    // Застосування проміжного ПЗ до події та контексту для аутентифікації користувача
    const { appContext } = await applyMiddleware(event, context, authenticate)

    // Отримання списку замовлень для користувача
    const orders = await OrderService.findAllOrders(appContext.userData.userId, logger)

    // Повернення успішної відповіді з отриманим списком замовлень
    return successResponse(orders)
  } catch (e: unknown) {
    // Обробка помилки та повернення відповіді з помилкою
    return errorResponse(event, e)
  }
}