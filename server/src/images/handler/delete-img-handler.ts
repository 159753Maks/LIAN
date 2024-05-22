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
import { ImageService } from '../service/image-service'

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

    const { uid } = validateUid(appEvent, 'categoryId')

    await ImageService.deleteOne(uid, logger)

    logger.info('upload-image.handler.end')
    return successResponse({})
  } catch (e: unknown) {
    logger.info(`upload-image.handler.error: ${JSON.stringify(e)}`)
    return errorResponse(event, e)
  }
}
