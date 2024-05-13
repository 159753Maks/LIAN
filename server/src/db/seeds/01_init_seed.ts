import { Knex } from 'knex'
import { categoryMock } from '../mock/category-mock'
import { productMock } from '../mock/product-mock'
import { categoryProductMock } from '../mock/categoryProduct-mock'
import { usersInsert } from '../mock/users-mock'

export async function seed(knex: Knex): Promise<void> {
  await knex('user').insert(await usersInsert())
  await knex('category').insert(categoryMock)

  await knex('product').insert(productMock)

  await knex('categoryProduct').insert(categoryProductMock)
}
