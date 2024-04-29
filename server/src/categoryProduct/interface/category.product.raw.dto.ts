import { BaseDtoEntity } from '../../generic/base.dto.entity'

export interface CategoryProductRawDto extends BaseDtoEntity {
  uid: string
  title: string
  productUid?: string
}
