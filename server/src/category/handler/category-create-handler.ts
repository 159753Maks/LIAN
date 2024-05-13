import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { applyMiddleware } from 'src/utill/middlware.util'
import { authenticate } from 'src/auth/auth-middleware'
import { notUsersMiddleware } from 'src/auth/not-users-middleware'
import { validateCreateCategory } from 'src/category/validation/create.catogory.validation'
import { CategoryService } from 'src/category/service/category.service'
import { errorResponse, successResponse } from 'src/generic/responces'
import { createAppLogger } from 'src/db/generic/app.logger'

export const categoryCreateHandler: APIGatewayProxyHandler = async (
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
    logger.info('category.create.handler.start')
    const data = validateCreateCategory(appEvent)

    logger.info('category.create.handler.validated')
    const result = await CategoryService.createOne(data, logger)

    return successResponse(result)
  } catch (e: unknown) {
    logger.info('category.create.handler.error:', e)
    return errorResponse(event, e)
  }
}
