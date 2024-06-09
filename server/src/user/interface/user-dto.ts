import { BaseDtoEntity } from '../../generic/base-dto-entity'
import { UserRoleEnum } from '../util/user-role-enum'

export interface UserDto extends BaseDtoEntity {
  uid: string
  firstName: string
  role: UserRoleEnum
  lastName: string
  email: string
  password: string
}
