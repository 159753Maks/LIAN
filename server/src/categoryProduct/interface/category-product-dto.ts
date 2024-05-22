import { BaseDtoEntity } from '../../generic/base-dto-entity'

export interface CategoryProductDto extends BaseDtoEntity {
  uid: string
  categoryUid: string
  productUid: string
}
