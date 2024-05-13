import { mockAPIGatewayEvent, mockContext } from '../test-context'
import { productMock } from 'src/db/mock/product-mock'
import { productDeleteHandler } from 'src/product/handler/product-delete-handler'

describe('Product delete', () => {
  it('200: success', async () => {
    const response: any = await productDeleteHandler(
      { ...mockAPIGatewayEvent, pathParameters: { productId: productMock[8].uid } },
      mockContext,
      (response) => response,
    )
    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body).toStrictEqual({})
  })
})
