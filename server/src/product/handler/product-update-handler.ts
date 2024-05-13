import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { errorResponse, successResponse } from '../../generic/responces'
import { ProductService } from '../service/product.service'
import { validateUpdateProduct } from '../validation/update.product.validation'
import { applyMiddleware } from '../../utill/middlware.util'
import { authenticate } from '../../auth/auth-middleware'
import { notUsersMiddleware } from '../../auth/not-users-middleware'
import { createAppLogger } from 'src/db/generic/app.logger'

export const productUpdateHandler: APIGatewayProxyHandler = async (
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

    const data = validateUpdateProduct(appEvent)
    const product = await ProductService.updateOne(data, logger)

    return successResponse(product)
  } catch (e: unknown) {
    // throw Error('InternalServerError')
    return errorResponse(event, e)
  }
}
