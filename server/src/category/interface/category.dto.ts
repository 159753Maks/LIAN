import { BaseDtoEntity } from '../../generic/base.dto.entity'

export interface CategoryDto extends BaseDtoEntity {
  uid: string
  title: string
  productsIds: Array<string>
}
