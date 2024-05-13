// Import the original Context type from aws-lambda
import { Context } from 'aws-lambda'
import { UserRoleEnum } from '../user/util/user.role.enum'
import winston from 'winston'

declare module 'aws-lambda' {
  interface Context {
    userData: { userId: string; role: UserRoleEnum }
  }
}
