// Імпорт необхідних модулів з aws-lambda для обробника API Gateway
import {
  APIGatewayProxyEvent, // Подія API Gateway
  APIGatewayProxyHandler, // Обробник API Gateway
  APIGatewayProxyResult, // Результат API Gateway
  Context, // Контекст виконання
} from 'aws-lambda'

// Імпорт функцій для аутентифікації та обробки запитів
import { authenticate } from '../../auth/auth-middleware'
import { notUsersMiddleware } from '../../auth/not-users-middleware'
// Імпорт функції створення логера додатку та функцій для роботи з відповідями
import { createAppLogger } from '../../db/generic/app-logger'
import { errorResponse, successResponse } from '../../generic/responces'
// Імпорт функцій для валідації зображення та застосування проміжного ПЗ
import { applyMiddleware } from '../../utill/middlware-util'
import { ImageService } from '../service/image-service'
import { validateImageInput } from '../validation/image-upload-validation'

// Обробник API Gateway для завантаження зображення
export const uploadImageHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent, // Подія API Gateway
  context: Context, // Контекст виконання
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логера додатку за допомогою `createAppLogger`.

  try {
    // Застосування проміжного ПЗ до події та контексту
    const { appEvent } = await applyMiddleware(event, context, authenticate, notUsersMiddleware)
    logger.debug('upload-image.handler.start') // Логування початку обробки запиту на завантаження зображення

    // Валідація вхідних даних для зображення
    const data = validateImageInput(appEvent)

    // Створення нового запису зображення
    const saved = await ImageService.createOne(data, logger)

    logger.debug('upload-image.handler.end') // Логування завершення обробки запиту на завантаження зображення
    return successResponse(saved) // Повернення успішної відповіді з даними про збережене зображення
  } catch (e) {
    logger.error(`upload-image.handler.error: ${JSON.stringify(e)}`, e) // Логування помилки при обробці запиту
    return errorResponse(event, e) // Повернення відповіді з помилкою
  }
}
