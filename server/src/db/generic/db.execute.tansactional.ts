import { Knex, knex } from 'knex'

import { knexConfig } from '../knex.config'

export async function dbExecuteTransactional<T>(func: (db: Knex) => Promise<T>): Promise<T> {
  const db: Knex = knex(knexConfig['development'])
  try {
    // Connect to the database
    await db.raw('SELECT 1')

    const trx = await db.transaction()
    // Execute the provided function with the Knex instance
    const result = await func(db)

    await trx.commit()
    // Close the connection
    await db.destroy()

    return result
  } catch (error) {
    await db.destroy()
    throw error
  }
}
