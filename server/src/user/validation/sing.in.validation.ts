import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'

import { SingInInput } from '../interface/sing.in.input'

// Схема валідації для перевірки вхідних даних
const schema = Joi.object({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(), // Пароль повинен бути рядком, який відповідає регулярному виразу, і є обов'язковим
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ua'] } }).required(), // Електронна адреса повинна бути валідною і є обов'язковою
})

// Функція для перевірки валідності вхідних даних
export const validateSingIn = (event: APIGatewayProxyEvent): SingInInput => {
  // Парсимо тіло запиту у форматі JSON
  const requestBody = JSON.parse(event.body || '{}')

  // Перевіряємо валідність даних за допомогою схеми
  const { error, value } = schema.validate(requestBody)

  // Якщо є помилки, викидаємо помилку з повідомленням про помилку валідації
  if (error) {
    throw new Error(`Помилка валідації: ${error.details.map((x) => x.message).join(', ')}`)
  }

  // Повертаємо перевірені дані як SingInInput
  return value as SingInInput
}
