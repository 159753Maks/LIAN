import { Knex } from 'knex'

import { orderMock, orderProductMock } from '../mock/order-mock'

export async function seed(knex: Knex): Promise<void> {
  await knex('order').insert(orderMock)
  await knex('orderProduct').insert(orderProductMock)
}
