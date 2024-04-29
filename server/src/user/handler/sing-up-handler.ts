import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app.logger'
import { errorResponse, successResponse } from '../../generic/responces'
import { UserService } from '../service/user.service'
import { validateSingUp } from '../validation/sing.up.validation'

export const singUpHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = createAppLogger()
  try {
    logger.info('user.sing.up.handler.start')
    const user = validateSingUp(event)

    logger.info('user.sing.up.handler.validated')
    await UserService.createUser(user, logger)

    logger.info('user.sing.up.handler.end')
    return successResponse({})
  } catch (e) {
    logger.error('user.sing.up.handler.error: ', e)
    return errorResponse(event, e)
  }
}
