import { mockAPIGatewayEvent, mockContext, reSeedData } from '../test-context'
import { productGetByIdHandler } from 'src/product/handler/product-get-by-id-handler'
import { productMock } from 'src/db/mock/product-mock'
import { productListHandler } from 'src/product/handler/product-list-handler'
import { categoryMock } from 'src/db/mock/category-mock'
import { orderMock } from '../../src/db/mock/order-mock'

describe('Product get', () => {
  beforeAll(async () => {
    await reSeedData()
  })

  it('200: by id', async () => {
    const product = productMock[1]

    const response: any = await productGetByIdHandler(
      { ...mockAPIGatewayEvent, pathParameters: { productId: product.uid } },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body).toStrictEqual({
      uid: product.uid,
      title: product.title,
      subDescription: product.subDescription,
      description: product.description,
      cost: product.cost,
      count: product.count,
      categories: [
        {
          title: 'Cooling',
          uid: '2d4d3f2e-c31c-0000-0001-000000000000',
        },
      ],
      images: [
        {
          fileName: 'deepcool-xfan-120(1).jpg',
          uid: '2d4d3f2e-c31c-0000-0010-000000000003',
          url: 'http://localhost:4566/product/deepcool-xfan-120(1)',
        },
      ],
    })
  })

  it('200: list -> get limit 1 offset 1', async () => {
    const response: any = await productListHandler(
      {
        ...mockAPIGatewayEvent,
        queryStringParameters: {
          limit: '1',
          offset: '1',
          orderId: orderMock[0].uid,
        },
      },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)

    expect(body).toStrictEqual([
      {
        uid: productMock[1].uid,
        title: productMock[1].title,
        subDescription: productMock[1].subDescription,
        description: productMock[1].description,
        cost: productMock[1].cost,
        count: productMock[1].count,
        categories: [
          {
            title: 'Cooling',
            uid: '2d4d3f2e-c31c-0000-0001-000000000000',
          },
        ],
        images: [
          {
            fileName: 'deepcool-xfan-120(1).jpg',
            uid: '2d4d3f2e-c31c-0000-0010-000000000003',
            url: 'http://localhost:4566/product/deepcool-xfan-120(1)',
          },
        ],
      },
    ])
  })

  it('200: list -> by category id', async () => {
    const response: any = await productListHandler(
      {
        ...mockAPIGatewayEvent,
        queryStringParameters: { categoryIds: JSON.stringify([categoryMock[0].uid]) },
      },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)

    expect(body).toHaveLength(6)

    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          uid: productMock[0].uid,
        }),
        expect.objectContaining({
          uid: productMock[1].uid,
        }),
        expect.objectContaining({
          uid: productMock[2].uid,
        }),
        expect.objectContaining({
          uid: productMock[3].uid,
        }),
        expect.objectContaining({
          uid: productMock[4].uid,
        }),
        expect.objectContaining({
          uid: productMock[5].uid,
        }),
      ]),
    )
  })
})
