import { mockAPIGatewayEvent, mockContext, reSeedData } from '../test-context'
import { categoryMock } from 'src/db/mock/category-mock'
import { categoryUpdateHandler } from 'src/category/handler/category-update-handler'
import { productMock } from '../../src/db/mock/product-mock'

describe('Category update ', () => {
  beforeAll(async () => {
    await reSeedData()
  })

  it('update by ID', async () => {
    // Mock category ID
    const payload = {
      title: 'Updated with products',
      productsIds: [productMock[0].uid, productMock[1].uid, productMock[2].uid],
    }

    // Call the get-by-id handler
    const response: any = await categoryUpdateHandler(
      {
        ...mockAPIGatewayEvent,
        pathParameters: { categoryId: categoryMock[2].uid },
        body: JSON.stringify(payload),
      },
      mockContext,
      (response) => response,
    )

    // Assertions
    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)

    expect(body).toStrictEqual({
      ...payload,
      uid: categoryMock[2].uid,
    })
  })
})
