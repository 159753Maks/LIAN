import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'

import { CategoryInputDto } from '../interface/category.input.dto'

const schema = Joi.object({
  uid: Joi.string().uuid().required(),
  title: Joi.string().alphanum().min(3).max(100).required(),
  productsIds: Joi.array().items(Joi.string().uuid()),
})

export const validateUpdateCategory = (event: APIGatewayProxyEvent): CategoryInputDto => {
  const requestBody = JSON.parse(event.body || '{}')

  const { error, value } = schema.validate(requestBody)

  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  return value as CategoryInputDto
}
