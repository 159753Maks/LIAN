import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('order', (table) => {
    table.uuid('uid').primary()
    table.uuid('userUid').notNullable()
    table.enum('status', ['DRAFT', 'WAITING', 'INPROGRESS', 'DONE', 'CANCELED']).notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
    table.foreign('userUid').references('user.uid').onDelete('CASCADE')
  })

  await knex.schema.createTable('orderProduct', (table) => {
    table.uuid('uid').primary()
    table.uuid('orderUid').notNullable()
    table.uuid('productUid').notNullable()
    table.integer('count').notNullable().defaultTo(1)
    table.foreign('orderUid').references('order.uid').onDelete('CASCADE')
    table.foreign('productUid').references('product.uid').onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order')
  await knex.schema.dropTable('orderProduct')
}
