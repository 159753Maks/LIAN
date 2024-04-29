import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app.logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { validateUid } from '../../generic/validate'
import { ProductService } from '../service/product.service'

export const productDeleteHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()
  try {
    const { uid } = validateUid(event, 'productId')
    const product = await ProductService.deleteOne(uid, logger)

    return successResponse({})
  } catch (e: unknown) {
    // throw Error('InternalServerError')
    return errorResponse(event, e)
  }
}
