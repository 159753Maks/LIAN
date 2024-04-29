import { APIGatewayProxyEvent } from 'aws-lambda'
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

// Function to generate JWT token for a user
export function generateToken(userUid: string): string {
  return jwt.sign({ userUid: userUid }, process.env.JWT_SECRET || '', {
    expiresIn: '1h',
  })
}

// Middleware to verify JWT token
export function verifyToken(token: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    try {
      const decoded: string | JwtPayload = jwt.verify(token, process.env.JWT_SECRET || '')
      resolve(decoded as JwtPayload)
    } catch (err) {
      reject(err)
    }
  })
}

// Middleware to verify JWT token and add user ID to context
export async function authenticate(event: APIGatewayProxyEvent): Promise<APIGatewayProxyEvent> {
  try {
    const token = event.headers?.Authorization
    if (!token) {
      throw new Error('Unauthorized: Missing token')
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
        throw new Error('Unauthorized: Invalid token')
      }
    }

    const userId = decoded.userId

    // Add user ID to event context
    event.requestContext.identity.user = userId

    return event
  } catch (error) {
    throw new Error('Unauthorized: Invalid token')
  }
}

// Function to regenerate JWT token
export function regenerateToken(token: string): string {
  try {
    const decoded = jwt.decode(token)
    if (!decoded || typeof decoded === 'string' || typeof decoded === 'number') {
      throw new Error('Invalid token payload')
    }

    return generateToken(decoded.userUid)
  } catch (error) {
    throw new Error('Unable to regenerate token')
  }
}
