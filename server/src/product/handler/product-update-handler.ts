import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app.logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { ProductService } from '../service/product.service'
import { validateUpdateProduct } from '../validation/update.product.validation'

export const productUpdateHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()
  try {
    const data = validateUpdateProduct(event)
    const product = await ProductService.updateOne(data, logger)

    return successResponse(product)
  } catch (e: unknown) {
    // throw Error('InternalServerError')
    return errorResponse(event, e)
  }
}
