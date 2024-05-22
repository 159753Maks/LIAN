import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda'

export const hello: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: Context, // Контекст виконання, але не використовується в цій функції
) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Привіт, світ!', // Повідомлення "Привіт, світ!"
      input: event, // Вхідні дані події
    }),
  }
}
