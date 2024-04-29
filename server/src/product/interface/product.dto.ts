import { BaseDtoEntity } from '../../generic/base.dto.entity'

export interface ProductDto extends BaseDtoEntity {
  uid: string
  title: string
  description: string
  cost: number
  count: number
  categoryIds: Array<string>
}
