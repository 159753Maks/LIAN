import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'

import { CategoryInputDto } from '../interface/category.input.dto'

const schema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  productsIds: Joi.array().items(Joi.string().uuid()),
})

export const validateCreateCategory = (event: APIGatewayProxyEvent): CategoryInputDto => {
  const requestBody = JSON.parse(event.body || '{}')

  const { error, value } = schema.validate(requestBody)

  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  return value as CategoryInputDto
}
