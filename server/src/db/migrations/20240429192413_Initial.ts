import type { Knex } from 'knex'

import { UserRoleEnum } from '../../user/util/user-role-enum'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.uuid('uid').primary()
    table.string('firstName', 255).notNullable()
    table.string('lastName', 255).notNullable()
    table.string('email', 255).notNullable().unique()
    table.string('phone', 24).nullable()
    table.string('password').notNullable()
    table.enum('role', [UserRoleEnum.ADMIN, UserRoleEnum.MANAGER, UserRoleEnum.USER]).nullable()
  })

  await knex.schema.createTable('product', (table) => {
    table.uuid('uid').primary()
    table.string('title', 255).notNullable()
    table.text('description').notNullable()
    table.double('cost').nullable()
    table.integer('count').notNullable().defaultTo(0)
    table.text('subDescription').nullable()
  })

  await knex.schema.createTable('category', (table) => {
    table.uuid('uid').primary()
    table.string('title', 255).notNullable()
  })

  await knex.schema.createTable('categoryProduct', (table) => {
    table.uuid('uid').primary()
    table.uuid('productUid')
    table.uuid('categoryUid')
    table.foreign('productUid').references('product.uid').onDelete('CASCADE')
    table.foreign('categoryUid').references('category.uid').onDelete('CASCADE')
  })

  await knex.schema.createTable('image', (table) => {
    table.uuid('uid').primary()
    table.string('fileName', 255).notNullable()
    table.string('url', 255).notNullable()
  })

  await knex.schema.createTable('productImage', (table) => {
    table.uuid('uid').primary()
    table.uuid('imageUid').notNullable()
    table.uuid('productUid').notNullable()
    table.foreign('productUid').references('product.uid').onDelete('CASCADE')
    table.foreign('imageUid').references('image.uid').onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('productImage')
  await knex.schema.dropTable('image')
  await knex.schema.dropTable('categoryProduct')
  await knex.schema.dropTable('category')
  await knex.schema.dropTable('product')
  await knex.schema.dropTable('user')
}
