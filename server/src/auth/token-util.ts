import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

import { UserRoleEnum } from '../user/util/user-role-enum'
require('dotenv').config()

// Function to generate JWT token for a user
export function generateToken(userUid: string, role: UserRoleEnum): string {
  const secret = process.env.JWT_SECRET || ''
  return jwt.sign({ userId: userUid, role }, secret, {
    expiresIn: '1h',
  })
}

// Middleware to verify JWT token
export async function verifyToken(token: string): Promise<JwtPayload> {
  try {
    const secret = process.env.JWT_SECRET || ''

    const decoded: string | JwtPayload = jwt.verify(token, secret)
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
