import 'dotenv'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda'

export const hello: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: Context,
) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello, world!',
      input: event,
    }),
  }
}
