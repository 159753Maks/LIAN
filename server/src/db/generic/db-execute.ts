import { Knex, knex } from 'knex'

import { DbError } from '../../errors/db-error' // Імпорт класу помилки бази даних
import { knexConfig } from '../knex.config' // Імпорт конфігурації Knex

// Функція для виконання запитів до бази даних
export async function dbExecute<T>(func: (db: Knex) => Promise<T>): Promise<T> {
  const db: Knex = knex(knexConfig['development']) // Ініціалізація підключення до бази даних

  try {
    // Підключення до бази даних
    await db.raw('SELECT 1')

    // Виконання переданої функції з екземпляром Knex
    const result = await func(db)

    // Закриття з'єднання з базою даних
    await db.destroy()

    return result
  } catch (error) {
    // Якщо виникає помилка, викидання помилки та закриття з'єднання
    await db.destroy()
    throw new DbError(JSON.stringify(error)) // Викидання власної помилки бази даних з описом помилки
  }
}
