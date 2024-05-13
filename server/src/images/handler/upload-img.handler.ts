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
import { errorResponse, successResponse } from 'src/generic/responces'
import { validateImageInput } from 'src/images/validation/image-upload-validation'
import { ImageService } from 'src/images/service/ImageService'

export const uploadImageHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  const logger = createAppLogger() // Create a logger using `createAppLogger`.

  try {
    const { appContext, appEvent } = await applyMiddleware(
      event,
      context,
      authenticate,
      notUsersMiddleware,
    )
    logger.info('upload-image.handler.start')

    const data = validateImageInput(appEvent)

    const saved = await ImageService.createOne(data, logger)

    logger.info('upload-image.handler.end')
    return successResponse(saved)
  } catch (e: unknown) {
    logger.info(`upload-image.handler.error: ${JSON.stringify(e)}`)
    return errorResponse(event, e)
  }
}
