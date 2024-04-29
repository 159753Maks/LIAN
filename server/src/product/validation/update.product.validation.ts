import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'

import { ProductDto } from '../interface/product.dto'

const schema = Joi.object({
  uid: Joi.string().uuid().required(),
  title: Joi.string().alphanum().min(3).max(100).required(),
  description: Joi.string().alphanum().min(3).required(),
  cost: Joi.number().positive().required(),
  count: Joi.number().positive().required(),
})

export const validateUpdateProduct = (event: APIGatewayProxyEvent): ProductDto => {
  const uid = event.pathParameters?.productId
  const requestBody = JSON.parse(event.body || '{}')

  const { error, value } = schema.validate({ uid, ...requestBody })

  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  return value as ProductDto
}
