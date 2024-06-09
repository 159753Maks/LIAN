import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'

import { CategoryInputDto } from '../interface/category-input-dto'

const schema = Joi.object({
  uid: Joi.string().uuid().required(),
  title: Joi.string().min(3).max(100).required(),
  productsIds: Joi.array().items(Joi.string().uuid()),
})

export const validateUpdateCategory = (event: APIGatewayProxyEvent): CategoryInputDto => {
  const uid = event.pathParameters?.categoryId

  const requestBody = JSON.parse(event.body || '{}')

  const { error, value } = schema.validate({ ...requestBody, uid })

  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  return value as CategoryInputDto
}
