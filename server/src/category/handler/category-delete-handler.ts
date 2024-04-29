import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app.logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { validateUid } from '../../generic/validate'
import { CategoryService } from '../service/category.service'

export const categoryDeleteHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()
  try {
    logger.info('category.delete.handler.start')
    const { uid } = validateUid(event, 'categoryId')

    logger.info('category.delete.handler.validated')
    const result = await CategoryService.deleteOne(uid, logger)

    return successResponse(result)
  } catch (e: unknown) {
    logger.info('category.delete.handler.error:', e)
    return errorResponse(event, e)
  }
}
