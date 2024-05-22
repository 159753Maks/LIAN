import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import Joi from 'joi'

import { SingUpInput } from '../interface/sing-up-input'
import { UserRoleEnum } from '../util/user-role-enum'

// Схема валідації для перевірки вхідних даних
const schema = Joi.object({
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
export const createUserValidation = (
  event: APIGatewayProxyEvent,
  context: Context,
): SingUpInput => {
  // Парсимо тіло запиту у форматі JSON
  const requestBody = JSON.parse(event.body || '{}')

  // Перевіряємо валідність даних за допомогою схеми
  const { error, value } = schema.validate(requestBody)

  // Якщо є помилки, викидаємо помилку з повідомленням про помилку валідації
  if (error) {
    throw new Error(`Помилка валідації: ${error.details.map((x) => x.message).join(', ')}`)
  }

  if (context.userData.role === UserRoleEnum.MANAGER && value.role === UserRoleEnum.ADMIN) {
    throw new Error(`Помилка валідації: Manager cant create Admin`)
  }

  // Повертаємо перевірені дані як SingInInput
  return value as SingUpInput
}
