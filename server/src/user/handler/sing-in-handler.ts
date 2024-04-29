import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'

import { createAppLogger } from '../../db/generic/app.logger' // Winston logger
import { errorResponse, successResponse } from '../../generic/responces'
import { UserService } from '../service/user.service'
import { validateSingIn } from '../validation/sing.in.validation'

export const singInHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const logger = createAppLogger()
  try {
    logger.info('user.sing.in.handler.start')
    const user = validateSingIn(event)

    logger.info('user.sing.in.handler.validated')
    const token = await UserService.singIn(user.email, user.password, logger)
    logger.info('user.sing.in.handler.end')
    return successResponse({ token })
  } catch (e) {
    logger.error('user.sing.in.handler.error: ', e)
    return errorResponse(event, e)
  }
}
