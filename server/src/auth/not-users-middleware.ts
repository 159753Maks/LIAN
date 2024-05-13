import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

import { UserRoleEnum } from '../user/util/user.role.enum'
import { ForbiddenError } from '../errors/forbidden.error'
import { middlewareType } from '../utill/middlware.util'

export const notUsersMiddleware: middlewareType = (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<{ event: APIGatewayProxyEvent; context: Context }> => {
  try {
    if (context.userData?.role === UserRoleEnum.USER) {
      throw new ForbiddenError('Access')
    }

    return Promise.resolve({ event, context })
  } catch (error) {
    throw error
  }
}
