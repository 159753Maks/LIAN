import { ProductOutputDto } from './product-output-dto'

export interface ListProductInput {
  title?: string
  description?: string
  minCost?: number
  maxCost?: number
  minCount?: number
  maxCount?: number
  limit?: number
  offset?: number
  asc?: boolean
  sortField: keyof ProductOutputDto
  categoryIds?: Array<string>
}
