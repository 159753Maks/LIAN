import { mockAPIGatewayEvent, mockContext } from '../test-context'
import { categoryMock } from 'src/db/mock/category-mock'
import { categoryDeleteHandler } from 'src/category/handler/category-delete-handler'

describe('Category delete', () => {
  it('should delete by ID', async () => {
    // Call the get-by-id handler
    const response: any = await categoryDeleteHandler(
      { ...mockAPIGatewayEvent, pathParameters: { categoryId: categoryMock[0].uid } },
      mockContext,
      (response) => response,
    )

    // Assertions
    expect(response.statusCode).toBe(200)
  })
})
