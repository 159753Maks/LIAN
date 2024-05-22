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
import { validateUid } from '../../generic/validate'
import { applyMiddleware } from '../../utill/middlware-util'
import { ProductService } from '../service/product-service'

export const productDeleteHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()

  try {
    const { appEvent } = await applyMiddleware(event, context, authenticate, notUsersMiddleware)
    const { uid } = validateUid(appEvent, 'productId')
    await ProductService.deleteOne(uid, logger)

    return successResponse({})
  } catch (e: unknown) {
    // throw Error('InternalServerError')
    return errorResponse(event, e)
  }
}
