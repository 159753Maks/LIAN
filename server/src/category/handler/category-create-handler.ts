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
import { validateCreateCategory } from '../validation/create-catogory-validation'

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
