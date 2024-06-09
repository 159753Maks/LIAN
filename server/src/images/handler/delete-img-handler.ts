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
// Імпорт функції для перевірки правильності UID та застосування проміжного ПЗ
import { validateUid } from '../../generic/validate'
import { applyMiddleware } from '../../utill/middlware-util'
// Імпорт сервісу зображень
import { ImageService } from '../service/image-service'

// Обробник API Gateway для видалення зображення
export const deleteImgHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent, // Подія API Gateway
  context: Context, // Контекст виконання
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логера додатку за допомогою `createAppLogger`.

  try {
    // Застосування проміжного ПЗ до події та контексту
    const { appContext, appEvent } = await applyMiddleware(
      event,
      context,
      authenticate,
      notUsersMiddleware,
    )
    logger.debug('upload-image.handler.start') // Логування початку обробки запиту на видалення зображення

    // Перевірка правильності UID зображення
    const { uid } = validateUid(appEvent, 'imageId')

    // Виклик сервісу для видалення зображення
    await ImageService.deleteOne(uid, logger)

    logger.debug('upload-image.handler.end') // Логування завершення обробки запиту на видалення зображення
    return successResponse({}) // Повернення успішної відповіді
  } catch (e: unknown) {
    logger.debug(`upload-image.handler.error: ${JSON.stringify(e)}`) // Логування помилки при обробці запиту
    return errorResponse(event, e) // Повернення відповіді з помилкою
  }
}
