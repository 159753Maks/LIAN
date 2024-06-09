import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'
import { OrderStatusEnum } from '../util/order-status-enum'

const schema = Joi.object({
  uid: Joi.string().uuid().required(),
  status: Joi.string().valid(Object.values(OrderStatusEnum)).required(),
})

export const validateOrderStatusUpdate = (
  event: APIGatewayProxyEvent,
): { uid: string; status: OrderStatusEnum } => {
  const uid = event.pathParameters?.productId
  const requestBody = JSON.parse(event.body || '{}')

  const { error, value } = schema.validate({ uid, ...requestBody })

  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  return value as { uid: string; status: OrderStatusEnum }
}
