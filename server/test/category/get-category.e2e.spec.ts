import { mockAPIGatewayEvent, mockContext } from '../test-context'
import { categoryGetByIdHandler } from 'src/category/handler/category-get-by-id-handler'
import { categoryMock } from 'src/db/mock/category-mock'
import { categoryGetAllHandler } from 'src/category/handler/category-get-all-handler'

describe('Category get', () => {
  it('should get a category by ID', async () => {
    const response: any = await categoryGetByIdHandler(
      { ...mockAPIGatewayEvent, pathParameters: { categoryId: categoryMock[2].uid } },
      mockContext,
      (response) => response,
    )

    // Assertions
    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)

    expect(body).toStrictEqual({
      productsIds: ['2d4d3f2e-c31c-0000-0001-000000000005', '2d4d3f2e-c31c-0000-0001-000000000006'],
      title: 'memory',
      uid: '2d4d3f2e-c31c-0000-0001-000000000002',
    })
  })

  it('get all', async () => {
    const response: any = await categoryGetAllHandler(
      { ...mockAPIGatewayEvent },
      mockContext,
      (response) => response,
    )

    // Assertions
    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)

    expect(body).toStrictEqual([
      {
        productsIds: [
          '2d4d3f2e-c31c-0000-0001-000000000003',
          '2d4d3f2e-c31c-0000-0001-000000000004',
        ],
        title: 'Motherboard',
        uid: '2d4d3f2e-c31c-0000-0001-000000000001',
      },
      {
        productsIds: [
          '2d4d3f2e-c31c-0000-0001-000000000005',
          '2d4d3f2e-c31c-0000-0001-000000000006',
          '2d4d3f2e-c31c-0000-0001-000000000005',
        ],
        title: 'memory',
        uid: '2d4d3f2e-c31c-0000-0001-000000000002',
      },
      {
        productsIds: ['2d4d3f2e-c31c-0000-0001-000000000007'],
        title: 'power',
        uid: '2d4d3f2e-c31c-0000-0001-000000000003',
      },
      {
        productsIds: ['2d4d3f2e-c31c-0000-0001-000000000008'],
        title: 'ram',
        uid: '2d4d3f2e-c31c-0000-0001-000000000004',
      },
    ])
  })
})
