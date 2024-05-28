import { Knex } from 'knex'

const clearDatabase = async (db: Knex): Promise<void> => {
  try {
    await db.transaction(async (trx) => {
      await trx.raw('TRUNCATE TABLE "user" CASCADE')
      await trx.raw('TRUNCATE TABLE "categoryProduct" CASCADE')
      await trx.raw('TRUNCATE TABLE "category" CASCADE')
      await trx.raw('TRUNCATE TABLE "productImage" CASCADE')
      await trx.raw('TRUNCATE TABLE "product" CASCADE')
      await trx.raw('TRUNCATE TABLE "image" CASCADE')
      await trx.raw('TRUNCATE TABLE "orderProduct" CASCADE')
      await trx.raw('TRUNCATE TABLE "order" CASCADE')
    })
  } catch (error) {
    console.error(`Error clearing database:`, error)
    throw error
  }
}

export { clearDatabase }
