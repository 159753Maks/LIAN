import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { ForbiddenError } from '../errors/forbidden-error'
import { middlewareType } from '../utill/middlware-util'
import { regenerateToken, verifyToken } from './token-util'

// Middleware to verify JWT token and add user ID to context
export const authenticate: middlewareType = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<{ event: APIGatewayProxyEvent; context: Context }> => {
  try {
    const token = event.headers?.Authorization
    if (!token) {
      throw new ForbiddenError('Unauthorized: Missing token')
    }

    let decoded
    try {
      decoded = await verifyToken(token)
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        // Token has expired, regenerate it
        const refreshToken = regenerateToken(token)

        decoded = await verifyToken(refreshToken)

        // Optionally, update token in event headers
        event.headers.Authorization = refreshToken
      } else {
        throw new ForbiddenError('Unauthorized: Invalid token')
      }
    }

    //Insert data to request context
    context.userData = { userId: decoded.userId, role: decoded.role }

    return { event, context }
  } catch (error) {
    throw error
  }
}
