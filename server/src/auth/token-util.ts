import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

import { UserRoleEnum } from '../user/util/user-role-enum'

// Function to generate JWT token for a user
export function generateToken(userUid: string, role: UserRoleEnum): string {
  return jwt.sign({ userId: userUid, role }, process.env.JWT_SECRET || '', {
    expiresIn: '1h',
  })
}

// Middleware to verify JWT token
export async function verifyToken(token: string): Promise<JwtPayload> {
  try {
    const decoded: string | JwtPayload = jwt.verify(token, process.env.JWT_SECRET || '')
    return decoded as JwtPayload
  } catch (err) {
    throw err
  }
}

// Function to regenerate JWT token
export function regenerateToken(token: string): string {
  try {
    const decoded = jwt.decode(token)
    if (!decoded || typeof decoded === 'string' || typeof decoded === 'number') {
      throw new Error('Invalid token payload')
    }

    return generateToken(decoded.userid, decoded.role)
  } catch (error) {
    throw new Error('Unable to regenerate token')
  }
}
