import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'

import { SingInInput } from '../interface/sing.in.input'

const schema = Joi.object({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ua'] } }).required(),
})

export const validateSingIn = (event: APIGatewayProxyEvent): SingInInput => {
  const requestBody = JSON.parse(event.body || '{}')

  const { error, value } = schema.validate(requestBody)

  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  return value as SingInInput
}
