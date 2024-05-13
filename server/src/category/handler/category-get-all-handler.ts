import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { applyMiddleware } from 'src/utill/middlware.util'
import { addLoggerMiddlware } from 'src/utill/add.logger.middlware'
import { validateUid } from 'src/generic/validate'
import { CategoryService } from 'src/category/service/category.service'
import { errorResponse, successResponse } from 'src/generic/responces'
import { createAppLogger } from 'src/db/generic/app.logger'

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
