import { BaseDtoEntity } from '../../generic/base.dto.entity'

export interface UserDto extends BaseDtoEntity {
  uid: string
  firstName: string
  lastName: string
  email: string
  password: string
}
