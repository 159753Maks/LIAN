import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { applyMiddleware } from 'src/utill/middlware.util'
import { authenticate } from 'src/auth/auth-middleware'
import { notUsersMiddleware } from 'src/auth/not-users-middleware'
import { CategoryService } from 'src/category/service/category.service'
import { errorResponse, successResponse } from 'src/generic/responces'
import { createAppLogger } from 'src/db/generic/app.logger'
import { validateUpdateCategory } from 'src/category/validation/update.catogory.validation'

export const categoryUpdateHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()

  try {
    const { appContext, appEvent } = await applyMiddleware(
      event,
      context,
      authenticate,
      notUsersMiddleware,
    )
    logger.info('category.update.handler.start')
    const data = validateUpdateCategory(appEvent)

    logger.info('category.update.handler.validated')
    const result = await CategoryService.updateOne(data, logger)

    return successResponse(result)
  } catch (e: unknown) {
    logger.info('category.update.handler.error:', e)
    return errorResponse(event, e)
  }
}
