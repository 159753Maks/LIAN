export interface CreateProductInput {
  title: string
  description: string
  subDescription: string
  cost: number
  count: number
  categoryIds?: Array<string>
  imgIds?: Array<string>
}
