import { usersMock } from './users-mock'
import { productMock } from './product-mock'

export const orderMock = [
  {
    uid: '2d4d3f2e-c31c-0001-0001-000000000000',
    userUid: usersMock[0].uid,
    status: 'DRAFT',
    createdAt: '2022-05-29T20:33:32.000Z',
    updatedAt: '2022-05-29T20:33:32.000Z',
  },
]

export const orderProductMock = [
  {
    uid: '2d4d3f2e-c31c-0001-0001-000000000001',
    orderUid: orderMock[0].uid,
    productUid: productMock[0].uid,
    count: 2,
  },
  {
    uid: '2d4d3f2e-c31c-0001-0001-000000000002',
    orderUid: orderMock[0].uid,
    productUid: productMock[1].uid,
    count: 1,
  },
]
