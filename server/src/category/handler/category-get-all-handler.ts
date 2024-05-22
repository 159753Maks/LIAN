import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app-logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { CategoryService } from '../service/category-service'

export const categoryGetAllHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()

  try {
    logger.info('category.list.handler.start')

    logger.info('category.list.handler.validated')
    const result = await CategoryService.findAll(logger)

    return successResponse(result)
  } catch (e: unknown) {
    logger.info('category.list.handler.error:', e)
    return errorResponse(event, e)
  }
}
