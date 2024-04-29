import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.uuid('uid').primary()
    table.string('firstName', 255).notNullable()
    table.string('lastName', 255).notNullable()
    table.string('email', 255).notNullable().unique()
    table.string('phone', 24).nullable()
    table.string('password').notNullable()
  })

  await knex.schema.createTable('product', (table) => {
    table.uuid('uid').primary()
    table.string('title', 255).notNullable()
    table.string('description', 255).notNullable()
    table.double('cost', 255).nullable()
    table.integer('count').notNullable().defaultTo(0)
  })

  await knex.schema.createTable('category', (table) => {
    table.uuid('uid').primary()
    table.string('title', 255).notNullable()
  })

  await knex.schema.createTable('categoryProduct', (table) => {
    table.uuid('uid').primary()
    table.uuid('productUid')
    table.uuid('categoryUid')
    table.foreign('productUid').references('product.uid')
    table.foreign('categoryUid').references('category.uid')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user')
  await knex.schema.dropTable('product')
  await knex.schema.dropTable('category')
  await knex.schema.dropTable('categoryProduct')
}
