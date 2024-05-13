import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import Joi from 'joi'

import { UserRoleEnum } from '../util/user.role.enum'
import { UpdateUserInput } from '../interface/update.user.input'
import { ForbiddenError } from '../../errors/forbidden.error'

// Схема валідації для перевірки вхідних даних
const schema = Joi.object({
  uid: Joi.string().uuid().required(),
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  role: Joi.string()
    .valid(...Object.values(UserRoleEnum))
    .optional()
    .default(UserRoleEnum.USER),
})

// Функція для перевірки валідності вхідних даних
export const updateUserValidation = (
  event: APIGatewayProxyEvent,
  context: Context,
): UpdateUserInput => {
  // Парсимо тіло запиту у форматі JSON
  const requestBody = JSON.parse(event.body || '{}')

  // Парсимо тіло запиту у форматі JSON
  const uid = event.pathParameters?.userId

  // Перевіряємо валідність даних за допомогою схеми
  const { error, value } = schema.validate({ ...requestBody, uid })

  // Якщо є помилки, викидаємо помилку з повідомленням про помилку валідації
  if (error) {
    throw new Error(`Помилка валідації: ${error.details.map((x) => x.message).join(', ')}`)
  }

  if (value.role !== UserRoleEnum.ADMIN || context.userData.userId !== uid) {
    throw new ForbiddenError(`Only admin or Owner can edit record`)
  }

  // Повертаємо перевірені дані як SingInInput
  return value as UpdateUserInput
}
