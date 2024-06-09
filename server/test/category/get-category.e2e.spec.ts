import { mockAPIGatewayEvent, mockContext, reSeedData } from '../test-context'
import { categoryGetByIdHandler } from 'src/category/handler/category-get-by-id-handler'
import { categoryMock } from 'src/db/mock/category-mock'
import { categoryGetAllHandler } from 'src/category/handler/category-get-all-handler'

describe('Category get', () => {
  beforeAll(async () => {
    await reSeedData()
  })

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
      productsIds: [
        '2d4d3f2e-c31c-0003-0000-000000000000',
        '2d4d3f2e-c31c-0003-0000-000000000001',
        '2d4d3f2e-c31c-0003-0000-000000000002',
        '2d4d3f2e-c31c-0003-0000-000000000003',
        '2d4d3f2e-c31c-0003-0000-000000000004',
        '2d4d3f2e-c31c-0003-0000-000000000005',
      ],
      title: 'Memory',
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
          '2d4d3f2e-c31c-0001-0000-000000000000',
          '2d4d3f2e-c31c-0001-0000-000000000001',
          '2d4d3f2e-c31c-0001-0000-000000000002',
          '2d4d3f2e-c31c-0001-0000-000000000003',
          '2d4d3f2e-c31c-0001-0000-000000000004',
          '2d4d3f2e-c31c-0001-0000-000000000005',
        ],
        title: 'Cooling',
        uid: '2d4d3f2e-c31c-0000-0001-000000000000',
      },
      {
        productsIds: [
          '2d4d3f2e-c31c-0002-0000-000000000000',
          '2d4d3f2e-c31c-0002-0000-000000000001',
          '2d4d3f2e-c31c-0002-0000-000000000002',
          '2d4d3f2e-c31c-0002-0000-000000000003',
          '2d4d3f2e-c31c-0002-0000-000000000004',
        ],
        title: 'Motherboard',
        uid: '2d4d3f2e-c31c-0000-0001-000000000001',
      },
      {
        productsIds: [
          '2d4d3f2e-c31c-0003-0000-000000000000',
          '2d4d3f2e-c31c-0003-0000-000000000001',
          '2d4d3f2e-c31c-0003-0000-000000000002',
          '2d4d3f2e-c31c-0003-0000-000000000003',
          '2d4d3f2e-c31c-0003-0000-000000000004',
          '2d4d3f2e-c31c-0003-0000-000000000005',
        ],
        title: 'Memory',
        uid: '2d4d3f2e-c31c-0000-0001-000000000002',
      },
      {
        productsIds: [
          '2d4d3f2e-c31c-0004-0000-000000000000',
          '2d4d3f2e-c31c-0004-0000-000000000001',
          '2d4d3f2e-c31c-0004-0000-000000000002',
          '2d4d3f2e-c31c-0004-0000-000000000003',
          '2d4d3f2e-c31c-0004-0000-000000000004',
        ],
        title: 'Power',
        uid: '2d4d3f2e-c31c-0000-0001-000000000003',
      },
      {
        productsIds: [
          '2d4d3f2e-c31c-0005-0000-000000000000',
          '2d4d3f2e-c31c-0005-0000-000000000001',
          '2d4d3f2e-c31c-0005-0000-000000000002',
          '2d4d3f2e-c31c-0005-0000-000000000003',
          '2d4d3f2e-c31c-0005-0000-000000000004',
        ],
        title: 'Ram',
        uid: '2d4d3f2e-c31c-0000-0001-000000000004',
      },
      {
        productsIds: [
          '2d4d3f2e-c31c-0006-0000-000000000000',
          '2d4d3f2e-c31c-0006-0000-000000000001',
          '2d4d3f2e-c31c-0006-0000-000000000002',
          '2d4d3f2e-c31c-0006-0000-000000000003',
          '2d4d3f2e-c31c-0006-0000-000000000004',
        ],
        title: 'Processor',
        uid: '2d4d3f2e-c31c-0000-0001-000000000005',
      },
      {
        productsIds: [
          '2d4d3f2e-c31c-0007-0000-000000000000',
          '2d4d3f2e-c31c-0007-0000-000000000001',
          '2d4d3f2e-c31c-0007-0000-000000000002',
          '2d4d3f2e-c31c-0007-0000-000000000003',
          '2d4d3f2e-c31c-0007-0000-000000000004',
        ],
        title: 'Videocard',
        uid: '2d4d3f2e-c31c-0000-0001-000000000006',
      },
    ])
  })
})
