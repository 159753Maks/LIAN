import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'

import { SingUpInput } from '../interface/sing.up.input'

const schema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
})

export const validateSingUp = (event: APIGatewayProxyEvent): SingUpInput => {
  const requestBody = JSON.parse(event.body || '{}')

  const { error, value } = schema.validate(requestBody)

  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  return value as SingUpInput
}
