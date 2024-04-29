import { BaseDtoEntity } from '../../generic/base.dto.entity'

export interface ProductCategoryRawDto extends BaseDtoEntity {
  uid: string
  title: string
  description: string
  cost: number
  count: number
  categoryUid: string
}
