import {
  APIGatewayProxyEvent, // Імпорт типу для події API Gateway
  APIGatewayProxyHandler, // Імпорт типу для обробника API Gateway
  APIGatewayProxyResult, // Імпорт типу для результату API Gateway
  Context, // Імпорт типу для контексту Lambda
} from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app-logger' // Імпорт функції для створення логгера
import { errorResponse, successResponse } from '../../generic/responces' // Імпорт функцій для обробки відповідей
import { ProductService } from '../service/product-service' // Імпорт сервісу для роботи з продуктами
import { validateListProduct } from '../validation/list-products-validation' // Імпорт функції для валідації списку продуктів

/**
 * Обробник для отримання списку продуктів
 * @param event - Подія API Gateway
 * @param _context - Контекст Lambda (не використовується)
 * @returns Результат виконання Lambda
 */
export const productListHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логгера за допомогою createAppLogger
  try {
    // Валідація фільтра списку продуктів
    const filter = validateListProduct(event)

    // Виклик сервісу для отримання списку продуктів з пагінацією
    const products = await ProductService.findAllPaginated(filter, logger)

    // Повернення успішної відповіді зі списком продуктів
    return successResponse(products)
  } catch (e: unknown) {
    // Повернення відповіді з помилкою
    return errorResponse(event, e)
  }
}

