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
import { validateUpdateProduct } from '../validation/update-product-validation'

export const productUpdateHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()

  try {
    const { appEvent } = await applyMiddleware(event, context, authenticate, notUsersMiddleware)

    const data = validateUpdateProduct(appEvent)
    const product = await ProductService.updateOne(data, logger)

    return successResponse(product)
  } catch (e: unknown) {
    // throw Error('InternalServerError')
    return errorResponse(event, e)
  }
}
