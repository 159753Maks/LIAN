import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app-logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { validateUid } from '../../generic/validate'
import { applyMiddleware } from '../../utill/middlware-util'
import { CategoryService } from '../service/category-service'

export const categoryGetByIdHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()

  try {
    const { appContext, appEvent } = await applyMiddleware(event, context)

    logger.info('category.get-by-id.handler.start')
    const { uid } = validateUid(appEvent, 'categoryId')

    logger.info('category.get-by-id.handler.validated')
    const result = await CategoryService.findOne(uid, logger)

    return successResponse(result)
  } catch (e: unknown) {
    logger.info('category.get-by-id.handler.error:', e)
    return errorResponse(event, e)
  }
}
