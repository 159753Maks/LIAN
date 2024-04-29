import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'

const schema = Joi.object({
  uid: Joi.string().uuid().required(),
})

export const validateUid = (event: APIGatewayProxyEvent, paramName: string): { uid: string } => {
  const uid = event.pathParameters?.[paramName]

  const { error, value } = schema.validate({ uid })

  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  return value as { uid: string }
}
