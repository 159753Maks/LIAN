import { mockAPIGatewayEvent, mockContext } from '../test-context'
import { categoryMock } from 'src/db/mock/category-mock'
import { categoryUpdateHandler } from 'src/category/handler/category-update-handler'

describe('Category update ', () => {
  it('update by ID', async () => {
    // Mock category ID
    const payload = {
      title: 'Updated with products',
      productsIds: ['2d4d3f2e-c31c-0000-0001-000000000006'],
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
