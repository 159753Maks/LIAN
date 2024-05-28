import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { UserRoleEnum } from 'src/user/util/user-role-enum'
import { adminUserToken } from './mock/auth-mock'
import { dbExecute } from '../src/db/generic/db-execute'
import { productMock } from '../src/db/mock/product-mock'
import { categoryMock } from '../src/db/mock/category-mock'
import { usersInsert, usersMock } from '../src/db/mock/users-mock'
import { coolingMock } from '../src/db/mock/img/cooling-img-mock'
import { memoryMock } from '../src/db/mock/img/memory-img-mock'
import { videocardsMock } from '../src/db/mock/img/videocards-img-mock'
import { staticImgMock } from '../src/db/mock/img/static-img-mock'
import { ramMock } from '../src/db/mock/img/ram-img-mock'
import { processorsMock } from '../src/db/mock/img/processors-img-mock'
import { powerMock } from '../src/db/mock/img/power-img-mock'
import { motherBoardMock } from '../src/db/mock/img/motherBoard-img.mock'
import { Knex } from 'knex'
import { categoryProductMock } from '../src/db/mock/categoryProduct-mock'
import { getImgMock } from '../src/db/mock/img-mock'
import { orderMock, orderProductMock } from '../src/db/mock/order-mock'

export const mockContext: Context = {
  awsRequestId: 'mock-request-id',
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'mock-function',
  functionVersion: 'mock-version',
  invokedFunctionArn: 'mock-function-arn',
  logGroupName: 'mock-log-group',
  logStreamName: 'mock-log-stream',
  memoryLimitInMB: '256', // Or any other memory limit you want to mock
  getRemainingTimeInMillis: () => 5000, // Mock remaining time function
  done: () => {
    /* Your done callback implementation here */
  },
  fail: (error: Error | string) => {
    /* Your fail callback implementation here */
  },
  userData: { userId: '', role: UserRoleEnum.USER },
  succeed: (messageOrObject: any) => {
    /* Your succeed callback implementation here */
  },
}

// Mock API Gateway event
export const mockAPIGatewayEvent: APIGatewayProxyEvent = {
  body: JSON.stringify({
    /* Your event body here */
  }),
  headers: {
    Authorization: `Bearer ${adminUserToken}`,
  },
  queryStringParameters: {
    /* Your query string parameters here */
  },
  pathParameters: {
    /* Your path parameters here */
  },
  isBase64Encoded: false, // Or true if your event body is base64-encoded
} as unknown as APIGatewayProxyEvent

const deleteAllMock = async (knex: Knex) => {
  await knex('user').del()
  await knex('category').del()
  await knex('product').del()
  await knex('image').del()
  await knex('order').del()
  await knex('categoryProduct').del()
}

const seedMock = async (knex: Knex) => {
  await knex('user').insert(await usersInsert())
  await knex('category').insert(categoryMock)

  await knex('product').insert(productMock)

  await knex('categoryProduct').insert(categoryProductMock)

  const { img, imgProd } = await getImgMock()

  await knex('image').insert(img)
  await knex('productImage').insert(imgProd)

  await knex('order').insert(orderMock)
  await knex('orderProduct').insert(orderProductMock)
}

export const reSeedData = async () => {
  await dbExecute(async (connection) => {
    await deleteAllMock(connection)

    await seedMock(connection)
  })
}
