import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'

import { ListProductInput } from '../interface/list-product-input'

const schema = Joi.object({
  title: Joi.string().alphanum().min(3).max(100),
  description: Joi.string().alphanum().min(3),
  minCost: Joi.number().min(0).default(0),
  maxCost: Joi.number().positive().greater(Joi.ref('minCost')),
  minCount: Joi.number().min(0),
  maxCount: Joi.number().positive().greater(Joi.ref('minCount')),
  limit: Joi.number().positive(),
  offset: Joi.number().min(0),
  asc: Joi.boolean().default(true),
  sortField: Joi.string().default('title').valid('title', 'description', 'cost', 'count'),
  categoryIds: Joi.array().items(Joi.string().uuid()),
  orderId: Joi.string().uuid(),
})

export const validateListProduct = (event: APIGatewayProxyEvent): ListProductInput => {
  const queryParams = event.queryStringParameters || {}

  const categoryIds = queryParams.categoryIds ? JSON.parse(queryParams.categoryIds) : []
  const { error, value } = schema.validate({ ...queryParams, categoryIds })

  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  return value as ListProductInput
}
