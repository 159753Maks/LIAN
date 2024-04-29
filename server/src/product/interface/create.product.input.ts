export interface CreateProductInput {
  title: string
  description: string
  cost: number
  count: number
  categoryIds: Array<string>
}
