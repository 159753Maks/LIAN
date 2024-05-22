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
import { applyMiddleware } from '../../utill/middlware-util'
import { CategoryService } from '../service/category-service'
import { validateUpdateCategory } from '../validation/update-catogory-validation'

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
