import { mockAPIGatewayEvent, mockContext, reSeedData } from '../test-context'
import { productMock } from 'src/db/mock/product-mock'
import { addProductToOrderHandler } from '../../src/order/handler/add-product-to-order-handler'

describe('Order add ', () => {
  beforeAll(async () => {
    await reSeedData()
  })

  it('new order with item', async () => {
    const response: any = await addProductToOrderHandler(
      { ...mockAPIGatewayEvent, pathParameters: { productId: productMock[0].uid } },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body).toStrictEqual({
      uid: expect.any(String),
      userUid: '2d4d3f2e-c31c-0000-0000-000000000000',
      status: 'DRAFT',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      products: [
        {
          productUid: '2d4d3f2e-c31c-0001-0000-000000000001',
          count: 1,
        },
        {
          productUid: '2d4d3f2e-c31c-0001-0000-000000000000',
          count: 3,
        },
      ],
    })
  })
})
