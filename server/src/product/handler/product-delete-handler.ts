import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { errorResponse, successResponse } from '../../generic/responces'
import { validateUid } from '../../generic/validate'
import { ProductService } from '../service/product.service'
import { applyMiddleware } from '../../utill/middlware.util'
import { addLoggerMiddlware } from '../../utill/add.logger.middlware'
import { authenticate } from '../../auth/auth-middleware'
import { notUsersMiddleware } from '../../auth/not-users-middleware'
import { createAppLogger } from 'src/db/generic/app.logger'

export const productDeleteHandler: APIGatewayProxyHandler = async (
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
    const { uid } = validateUid(appEvent, 'productId')
    const product = await ProductService.deleteOne(uid, logger)

    return successResponse({})
  } catch (e: unknown) {
    // throw Error('InternalServerError')
    return errorResponse(event, e)
  }
}
