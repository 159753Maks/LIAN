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

export const categoryGetByIdHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()

  try {
    const { appContext, appEvent } = await applyMiddleware(event, context, addLoggerMiddlware)

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
