import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { UserRoleEnum } from '../user/util/user.role.enum'
import { ForbiddenError } from '../errors/forbidden.error'
import { middlewareType } from '../utill/middlware.util'

export const onlyAdminsMiddleware: middlewareType = (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  try {
    if (context.userData.role !== UserRoleEnum.ADMIN) {
      throw new ForbiddenError('Access')
    }

    return Promise.resolve({ event, context })
  } catch (error) {
    throw error
  }
}
