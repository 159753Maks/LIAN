import { APIGatewayProxyEvent, Context } from 'aws-lambda'

export type middlewareType = (
  event: APIGatewayProxyEvent,
  context: Context,
) => Promise<{ event: APIGatewayProxyEvent; context: Context }>

export const applyMiddleware = async (
  event: APIGatewayProxyEvent,
  context: Context,
  ...middlewares: Array<middlewareType>
): Promise<{ appEvent: APIGatewayProxyEvent; appContext: Context }> => {
  let updatedEvent: APIGatewayProxyEvent = event
  let updatedContext: Context = context

  for (const middleware of middlewares) {
    try {
      const updatedData = await middleware(updatedEvent, updatedContext)

      updatedEvent = updatedData.event
      updatedContext = updatedData.context
    } catch (error) {
      throw error
    }
  }

  return { appEvent: updatedEvent, appContext: updatedContext }
}
