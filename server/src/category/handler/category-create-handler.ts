import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app.logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { CategoryService } from '../service/category.service'
import { validateCreateCategory } from '../validation/create.catogory.validation'

export const categoryCreateHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()
  try {
    logger.info('category.create.handler.start')
    const data = validateCreateCategory(event)

    logger.info('category.create.handler.validated')
    const result = await CategoryService.createOne(data, logger)

    return successResponse(result)
  } catch (e: unknown) {
    logger.info('category.create.handler.error:', e)
    return errorResponse(event, e)
  }
}
