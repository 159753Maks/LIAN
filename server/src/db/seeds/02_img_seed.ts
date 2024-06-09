import { Knex } from 'knex'

import { getImgMock } from '../mock/img-mock'

export async function seed(knex: Knex): Promise<void> {
  const { img, imgProd } = await getImgMock()

  await knex('image').insert(img)
  await knex('productImage').insert(imgProd)
}
