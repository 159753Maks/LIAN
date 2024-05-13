import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { applyMiddleware } from 'src/utill/middlware.util'
import { authenticate } from 'src/auth/auth-middleware'
import { notUsersMiddleware } from 'src/auth/not-users-middleware'
import { validateUid } from 'src/generic/validate'
import { CategoryService } from 'src/category/service/category.service'
import { errorResponse, successResponse } from 'src/generic/responces'
import { createAppLogger } from 'src/db/generic/app.logger'

export const categoryDeleteHandler: APIGatewayProxyHandler = async (
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
    logger.info('category.delete.handler.start')
    const { uid } = validateUid(appEvent, 'categoryId')

    logger.info('category.delete.handler.validated')
    const result = await CategoryService.deleteOne(uid, logger)

    return successResponse(result)
  } catch (e: unknown) {
    logger.info('category.delete.handler.error:', e)
    return errorResponse(event, e)
  }
}
