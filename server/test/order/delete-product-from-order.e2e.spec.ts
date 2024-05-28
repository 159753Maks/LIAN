import { mockAPIGatewayEvent, mockContext, reSeedData } from '../test-context'
import { deleteProductFromOrderHandler } from '../../src/order/handler/delete-product-from-order-handler'
import { productMock } from '../../src/db/mock/product-mock'

describe('order delete', () => {
  beforeAll(async () => {
    await reSeedData()
  })

  it('should delete product', async () => {
    const response: any = await deleteProductFromOrderHandler(
      { ...mockAPIGatewayEvent, pathParameters: { productId: productMock[0].uid } },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    expect(JSON.parse(response.body)).toStrictEqual({})
  })

  it('should FAIL: delete not existing product', async () => {
    const response: any = await deleteProductFromOrderHandler(
      { ...mockAPIGatewayEvent, pathParameters: { productId: productMock[0].uid } },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(409)

    const body = JSON.parse(response.body)
    expect(body.error.message).toStrictEqual(JSON.stringify({ name: 'NotFoundError' }))
  })
})
