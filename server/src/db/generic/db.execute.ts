import { Knex, knex } from 'knex'

import { DbError } from '../../errors/db.error'
import { knexConfig } from '../knex.config'

export async function dbExecute<T>(func: (db: Knex) => Promise<T>): Promise<T> {
  const db: Knex = knex(knexConfig['development'])
  try {
    // Connect to the database
    await db.raw('SELECT 1')

    // Execute the provided function with the Knex instance
    const result = await func(db)

    // Close the connection
    await db.destroy()

    return result
  } catch (error) {
    // If an error occurs, throw the error and close the connection
    await db.destroy()
    throw new DbError(JSON.stringify(error))
  }
}
