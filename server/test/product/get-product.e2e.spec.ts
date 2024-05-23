import { mockAPIGatewayEvent, mockContext } from '../test-context'
import { productGetByIdHandler } from 'src/product/handler/product-get-by-id-handler'
import { productMock } from 'src/db/mock/product-mock'
import { productListHandler } from 'src/product/handler/product-list-handler'
import { categoryMock } from 'src/db/mock/category-mock'

describe('Product get', () => {
  it('200: by id', async () => {
    const response: any = await productGetByIdHandler(
      { ...mockAPIGatewayEvent, pathParameters: { productId: productMock[1].uid } },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body).toStrictEqual({
      categoryIds: ['2d4d3f2e-c31c-0000-0001-000000000000'],
      cost: 150,
      count: 0,
      description: 'Description for Product 2',
      images: [
        {
          fileName: 'be-quiet-pure-wings-2-120mm(1).jpg',
          uid: '2d4d3f2e-c31c-0000-0010-000000000004',
          url: 'http://localhost:4566/product/be-quiet-pure-wings-2-120mm(1)-39a21d31-f824-4924-a9cd-f54d28eac93e',
        },
        {
          fileName: 'be-quiet-pure-wings-2-120mm(2).jpg',
          uid: '2d4d3f2e-c31c-0000-0010-000000000005',
          url: 'http://localhost:4566/product/be-quiet-pure-wings-2-120mm(2)-6cc96f3c-f0d0-4da2-a424-abe2d574d8a4',
        },
        {
          fileName: 'be-quiet-pure-wings-2-120mm(3).jpg',
          uid: '2d4d3f2e-c31c-0000-0010-000000000006',
          url: 'http://localhost:4566/product/be-quiet-pure-wings-2-120mm(3)-6d6c09a9-e0f6-4ccd-829c-d47000fa96a5',
        },
      ],
      subDescription: 'Sub Description for Product 2',
      title: 'Product 2',
      uid: '2d4d3f2e-c31c-0000-0001-000000000001',
    })
  })

  it('200: list -> get limit 1 offset 1', async () => {
    const response: any = await productListHandler(
      { ...mockAPIGatewayEvent, queryStringParameters: { limit: '1', offset: '1' } },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)

    console.log(response.body)
    expect(body).toStrictEqual([
      {
        uid: '2d4d3f2e-c31c-0000-0001-000000000001',
        title: 'Product 2',
        description: 'Description for Product 2',
        subDescription: 'Sub Description for Product 2',
        cost: 150,
        count: 0,
        categories: [{ uid: '2d4d3f2e-c31c-0000-0001-000000000000', title: 'Cooling' }],
        images: [
          {
            uid: '2d4d3f2e-c31c-0000-0010-000000000004',
            url: 'http://localhost:4566/product/be-quiet-pure-wings-2-120mm(1)',
            fileName: 'be-quiet-pure-wings-2-120mm(1).jpg',
          },
          {
            uid: '2d4d3f2e-c31c-0000-0010-000000000005',
            url: 'http://localhost:4566/product/be-quiet-pure-wings-2-120mm(2)',
            fileName: 'be-quiet-pure-wings-2-120mm(2).jpg',
          },
          {
            uid: '2d4d3f2e-c31c-0000-0010-000000000006',
            url: 'http://localhost:4566/product/be-quiet-pure-wings-2-120mm(3)',
            fileName: 'be-quiet-pure-wings-2-120mm(3).jpg',
          },
        ],
      },
    ])
  })

  it('200: list -> by category id', async () => {
    const response: any = await productListHandler(
      {
        ...mockAPIGatewayEvent,
        queryStringParameters: { categoryIds: JSON.stringify([categoryMock[0].uid]), limit: '2' },
      },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)

    console.log(response.body)
    expect(body).toStrictEqual([
      {
        uid: '2d4d3f2e-c31c-0000-0001-000000000000',
        title: 'Product 1',
        description: 'Description for Product 1',
        subDescription: 'Sub Description for Product 1',
        cost: 10.99,
        count: 100,
        categoryIds: ['2d4d3f2e-c31c-0000-0001-000000000000'],
        images: [
          {
            uid: '2d4d3f2e-c31c-0000-0010-000000000000',
            url: 'http://localhost:4566/product/be-quiet-dark-rock-4(1)',
            fileName: 'be-quiet-dark-rock-4(1).jpg',
          },
          {
            uid: '2d4d3f2e-c31c-0000-0010-000000000001',
            url: 'http://localhost:4566/product/be-quiet-dark-rock-4(2)',
            fileName: 'be-quiet-dark-rock-4(2).jpg',
          },
          {
            uid: '2d4d3f2e-c31c-0000-0010-000000000002',
            url: 'http://localhost:4566/product/be-quiet-dark-rock-4(3)',
            fileName: 'be-quiet-dark-rock-4(3).jpg',
          },
          {
            uid: '2d4d3f2e-c31c-0000-0010-000000000003',
            url: 'http://localhost:4566/product/be-quiet-dark-rock-4(4)',
            fileName: 'be-quiet-dark-rock-4(4).jpg',
          },
        ],
      },
      {
        uid: '2d4d3f2e-c31c-0000-0001-000000000001',
        title: 'Product 2',
        description: 'Description for Product 2',
        subDescription: 'Sub Description for Product 2',
        cost: 150,
        count: 0,
        categoryIds: ['2d4d3f2e-c31c-0000-0001-000000000000'],
        images: [
          {
            uid: '2d4d3f2e-c31c-0000-0010-000000000004',
            url: 'http://localhost:4566/product/be-quiet-pure-wings-2-120mm(1)',
            fileName: 'be-quiet-pure-wings-2-120mm(1).jpg',
          },
          {
            uid: '2d4d3f2e-c31c-0000-0010-000000000005',
            url: 'http://localhost:4566/product/be-quiet-pure-wings-2-120mm(2)',
            fileName: 'be-quiet-pure-wings-2-120mm(2).jpg',
          },
          {
            uid: '2d4d3f2e-c31c-0000-0010-000000000006',
            url: 'http://localhost:4566/product/be-quiet-pure-wings-2-120mm(3)',
            fileName: 'be-quiet-pure-wings-2-120mm(3).jpg',
          },
        ],
      },
    ])
  })
})
