import { mockAPIGatewayEvent, mockContext, reSeedData } from '../test-context'
import { productCreateHandler } from 'src/product/handler/product-create-handler'

describe('product create ', () => {
  beforeAll(async () => {
    await reSeedData()
  })

  it('200: just product', async () => {
    const payload = {
      title: 'some',
      subDescription: 'yaamy',
      description: 'just eat',
      cost: 43.55,
      count: 5,
    }

    const response: any = await productCreateHandler(
      { ...mockAPIGatewayEvent, body: JSON.stringify(payload) },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body).toStrictEqual({ ...payload, uid: expect.any(String) })
  })
})
