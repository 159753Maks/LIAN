import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { authenticate } from '../../auth/auth-middleware'
import { notUsersMiddleware } from '../../auth/not-users-middleware'
import { createAppLogger } from '../../db/generic/app-logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { validateUid } from '../../generic/validate'
import { applyMiddleware } from '../../utill/middlware-util'
import { CategoryService } from '../service/category-service'

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
