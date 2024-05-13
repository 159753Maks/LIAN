import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { UserRoleEnum } from 'src/user/util/user.role.enum'
import { adminUserToken } from './mock/auth-mock'

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
    Authorization: adminUserToken,
  },
  queryStringParameters: {
    /* Your query string parameters here */
  },
  pathParameters: {
    /* Your path parameters here */
  },
  isBase64Encoded: false, // Or true if your event body is base64-encoded
} as unknown as APIGatewayProxyEvent
