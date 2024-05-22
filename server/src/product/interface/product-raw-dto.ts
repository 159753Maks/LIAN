import { BaseDtoEntity } from '../../generic/base-dto-entity'

export interface ProductRawDto extends BaseDtoEntity {
  uid: string
  title: string
  description: string
  cost: number
  count: number
  subDescription: string
  categoryUid?: string
  imageUid?: string
  fileName?: string
  url?: string
}
