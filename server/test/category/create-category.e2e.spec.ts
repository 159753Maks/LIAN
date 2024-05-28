import { mockAPIGatewayEvent, mockContext, reSeedData } from '../test-context'
import { categoryCreateHandler } from 'src/category/handler/category-create-handler'
import { productMock } from 'src/db/mock/product-mock'

describe('Category create ', () => {
  beforeAll(async () => {
    await reSeedData()
  })

  it('new category without products', async () => {
    const payload = {
      title: 'New Category',
    }

    const response: any = await categoryCreateHandler(
      { ...mockAPIGatewayEvent, body: JSON.stringify(payload) },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body).toStrictEqual({ ...payload, uid: expect.any(String), productsIds: [] })
  })

  it('new category with existing products', async () => {
    const payload = {
      title: 'Category with products',
      productsIds: [productMock[0].uid, productMock[1].uid, productMock[2].uid],
    }

    const response: any = await categoryCreateHandler(
      { ...mockAPIGatewayEvent, body: JSON.stringify(payload) },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body).toStrictEqual({ ...payload, uid: expect.any(String) })
  })
})
