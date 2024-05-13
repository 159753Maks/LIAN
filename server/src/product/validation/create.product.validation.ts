import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'

import { CreateProductInput } from '../interface/create.product.input'

const schema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).required(),
  subDescription: Joi.string().min(3).required(),
  cost: Joi.number().positive().required(),
  count: Joi.number().positive().required(),
  categoryIds: Joi.array().items(Joi.string().uuid()),
  imgIds: Joi.array().items(Joi.string().uuid()),
})

export const validateCreateProduct = (event: APIGatewayProxyEvent): CreateProductInput => {
  const requestBody = JSON.parse(event.body || '{}')

  const { error, value } = schema.validate(requestBody)

  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  return value as CreateProductInput
}
