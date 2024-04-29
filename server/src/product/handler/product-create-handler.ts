import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app.logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { ProductService } from '../service/product.service'
import { validateCreateProduct } from '../validation/create.product.validation'

export const productCreateHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger()
  try {
    logger.info('product.create.handler.start')
    const data = validateCreateProduct(event)
    logger.info('product.create.handler.validated')
    const product = await ProductService.createOne(data, logger)

    logger.info('product.create.handler.end')
    return successResponse(product)
  } catch (e: unknown) {
    logger.info(`product.create.handler.error: ${JSON.stringify(e)}`)
    return errorResponse(event, e)
  }
}
