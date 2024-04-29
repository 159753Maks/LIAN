import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from 'winston'

import { CategoryProductDao } from '../../categoryProduct/dao/category.product.dao'
import { dbExecute } from '../../db/generic/db.execute'
import { NotFoundError } from '../../errors/not.found.error'
import { ProductDao } from '../../product/dao/product.dao'
import { CategoryDao } from '../dao/category.dao'
import { CategoryDto } from '../interface/category.dto'
import { CategoryInputDto } from '../interface/category.input.dto'

class CategoryService {
  static async findOne(id: string, logger: Logger): Promise<CategoryDto | undefined> {
    logger.info('category.service.findOne.start')
    return dbExecute(async (connection: Knex): Promise<CategoryDto | undefined> => {
      return CategoryDao.findOne(connection, id, logger)
    })
  }

  static async deleteOne(id: string, logger: Logger): Promise<void> {
    return dbExecute(async (connection: Knex) => {
      return CategoryDao.deleteOne(connection, id, logger)
    })
  }

  static async createOne(data: CategoryInputDto, logger: Logger): Promise<CategoryDto> {
    const toSave: CategoryInputDto = {
      uid: uuidv4(),
      title: data.title,
    }

    await dbExecute(async (connection: Knex): Promise<void> => {
      if (data.productsIds?.length) {
        const products = await ProductDao.findAllByIds(connection, data.productsIds, logger)

        if (products?.length !== data.productsIds.length) {
          const dbProductsUids = products.map((product) => product.uid)

          data.productsIds.forEach((uid) => {
            if (!dbProductsUids.includes(uid)) {
              throw new NotFoundError('product', uid)
            }
          })
        }
      }

      await CategoryDao.insertOne(connection, toSave, logger)
      if (data.productsIds?.length) {
        await CategoryProductDao.insert(
          connection,
          data.productsIds.map((uid) => ({
            uid: uuidv4(),
            categoryUid: toSave.uid,
            productUid: uid,
          })),
          logger,
        )
      }
    })

    return { ...toSave, productsIds: data.productsIds || [] }
  }

  static async updateOne(data: CategoryInputDto, logger: Logger): Promise<CategoryDto> {
    const result = await dbExecute(async (connection: Knex) => {
      const current = await CategoryDao.findOne(connection, data.uid, logger)

      if (!current) {
        throw new NotFoundError('Category', data.uid)
      }

      await CategoryDao.updateOne(connection, data, logger)

      if (data.productsIds?.length) {
        await CategoryProductDao.insert(
          connection,
          data.productsIds.map((uid) => ({
            uid: uuidv4(),
            categoryUid: data.uid,
            productUid: uid,
          })),
          logger,
        )
      }

      return current
    })

    return result
  }
}

export { CategoryService }
