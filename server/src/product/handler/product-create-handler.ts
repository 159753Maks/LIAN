import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'
import { createAppLogger } from 'src/db/generic/app.logger'
import { applyMiddleware } from 'src/utill/middlware.util'
import { authenticate } from 'src/auth/auth-middleware'
import { notUsersMiddleware } from 'src/auth/not-users-middleware'
import { validateCreateProduct } from 'src/product/validation/create.product.validation'
import { ProductService } from 'src/product/service/product.service'
import { errorResponse, successResponse } from 'src/generic/responces'

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
