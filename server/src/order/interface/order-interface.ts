export interface OrderInterface {
  uid: string
  userUid: string
  status: string
  createdAt: Date
  updatedAt: Date
  products: { productUid: string; count: number }[]
}
