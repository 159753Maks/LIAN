import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app-logger'
import { NotFoundError } from '../../errors/not-found-error'
import { errorResponse, successResponse } from '../../generic/responces'
import { validateUid } from '../../generic/validate'
import { ProductService } from '../service/product-service'

export const productGetByIdHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()
  try {
    const { uid } = validateUid(event, 'productId')
    const product = await ProductService.findOne(uid, logger)

    if (!product) {
      throw new NotFoundError('Product', uid)
    }

    return successResponse(product)
  } catch (e: unknown) {
    // throw Error('InternalServerError')
    return errorResponse(event, e)
  }
}
