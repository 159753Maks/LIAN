import { BaseDtoEntity } from '../../generic/base-dto-entity'

export interface ProductOutputDto extends BaseDtoEntity {
  uid: string
  title: string
  description: string
  subDescription: string
  cost: number
  count: number
  categories: Array<{ uid: string; title: string }>
  images: Array<ImageDto>
}
