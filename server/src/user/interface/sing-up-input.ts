import { UserRoleEnum } from '../util/user-role-enum'

export interface SingUpInput {
  firstName: string
  lastName: string
  role: UserRoleEnum
  email: string
  password: string
}
