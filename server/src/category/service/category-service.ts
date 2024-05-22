import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from 'winston'

import { dbExecute } from '../../db/generic/db-execute'
import { NotFoundError } from '../../errors/not-found-error'
import { ProductDao } from '../../product/dao/product-dao'
import { CategoryDao } from '../dao/category-dao'
import { CategoryDto } from '../interface/category-dto'
import { CategoryInputDto } from '../interface/category-input-dto'

class CategoryService {
  static async findOne(id: string, logger: Logger): Promise<CategoryDto | undefined> {
    logger.info('category.service.findOne.start')
    return dbExecute(async (connection: Knex): Promise<CategoryDto | undefined> => {
      return CategoryDao.findOne(connection, id, logger)
    })
  }

  static async findAll(logger: Logger): Promise<Array<CategoryDto>> {
    logger.info('category.service.findAll.start')
    return dbExecute(async (connection: Knex) => {
      return CategoryDao.findAll(connection, logger)
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
        logger.info('category.service.createOne.create-category-products.start')
        const existingProducts = await ProductDao.findAllByIds(connection, data.productsIds, logger)

        if (existingProducts.length !== data.productsIds?.length) {
          data.productsIds.forEach((uid) => {
            const exist = existingProducts.find((product) => product.uid === uid)
            if (!exist) {
              logger.error('category.service.createOne.create-category-products.error.not-found')
              throw new NotFoundError('Product', uid)
            }
          })
        }
      }

      await CategoryDao.insertOne(connection, toSave, logger)
      logger.info('category.service.createOne.transaction.end')
    })

    return { ...toSave, productsIds: data.productsIds || [] }
  }

  static async updateOne(data: CategoryInputDto, logger: Logger): Promise<CategoryDto> {
    const result = await dbExecute(async (connection: Knex) => {
      const current = await CategoryDao.findOne(connection, data.uid, logger)

      if (!current) {
        logger.error('category.service.updateOne.error.not-found')
        throw new NotFoundError('Category', data.uid)
      }

      if (data.productsIds?.length) {
        logger.info('category.service.updateOne.update-category-products.start')
        const existingProducts = await ProductDao.findAllByIds(connection, data.productsIds, logger)

        if (existingProducts.length !== data.productsIds?.length) {
          data.productsIds.forEach((uid) => {
            const exist = existingProducts.find((product) => product.uid === uid)
            if (!exist) {
              logger.error('category.service.updateOne.update-category-products.error.not-found')
              throw new NotFoundError('Product', data.uid)
            }
          })
        }
      }

      await CategoryDao.updateOne(connection, data, logger)

      logger.info('category.service.updateOne.end')
      return {
        ...data,
        productsIds: data.productsIds || [],
      }
    })

    return result
  }
}

export { CategoryService }
