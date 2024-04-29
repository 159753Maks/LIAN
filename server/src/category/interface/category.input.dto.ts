import { BaseDtoEntity } from '../../generic/base.dto.entity'

export interface CategoryInputDto extends BaseDtoEntity {
  uid: string
  title: string
  productsIds?: Array<string>
}
