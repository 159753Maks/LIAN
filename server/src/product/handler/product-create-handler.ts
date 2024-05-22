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
import { ProductService } from '../service/product-service'
import { validateCreateProduct } from '../validation/create-product-validation'

export const productCreateHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Створення логгера за допомогою `createAppLogger`.

  try {
    const { appContext, appEvent } = await applyMiddleware(
      event,
      context,
      authenticate,
      notUsersMiddleware,
    )
    logger.info('product.create.handler.start')
    const data = validateCreateProduct(appEvent)
    logger.info('product.create.handler.validated')
    const product = await ProductService.createOne(data, logger)

    logger.info('product.create.handler.end')
    return successResponse(product)
  } catch (e: unknown) {
    logger.info(`product.create.handler.error: ${JSON.stringify(e)}`)
    return errorResponse(event, e)
  }
}
