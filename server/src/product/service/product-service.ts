import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from 'winston'

import { CategoryDao } from '../../category/dao/category-dao'
import { dbExecute } from '../../db/generic/db-execute'
import { NotFoundError } from '../../errors/not-found-error'
import { ImageDao } from '../../images/dao/image-dao'
import { ProductDao } from '../dao/product-dao'
import { CreateProductInput } from '../interface/create-product-input'
import { ListProductInput } from '../interface/list-product-input'
import { ProductDto } from '../interface/product-dto'

class ProductService {
  static async findOne(id: string, logger: Logger): Promise<ProductDto | undefined> {
    logger.info('product.service.findOne.start')
    return dbExecute(async (connection: Knex): Promise<ProductDto | undefined> => {
      return ProductDao.findOneById(connection, id, logger)
    })
  }

  static async findAllByIds(ids: Array<string>, logger: Logger): Promise<Array<ProductDto>> {
    logger.info('product.service.findAllByIds.start')
    return dbExecute(async (connection: Knex): Promise<Array<ProductDto>> => {
      return ProductDao.findAllByIds(connection, ids, logger)
    })
  }

  static async findAllPaginated(
    filter: ListProductInput,
    logger: Logger,
  ): Promise<Array<ProductDto>> {
    logger.info('product.service.findAllPaginated.start')
    return dbExecute(async (connection: Knex): Promise<Array<ProductDto>> => {
      return ProductDao.findAllPaginated(connection, filter, logger)
    })
  }

  static async createOne(data: CreateProductInput, logger: Logger): Promise<ProductDto> {
    logger.info('product.service.createOne.start')
    const saveObject = {
      ...data,
      uid: uuidv4(),
    }
    await dbExecute(async (connection: Knex) => {
      if (data.categoryIds) {
        const categories = await CategoryDao.findAllByIds(connection, data.categoryIds, logger)

        if (data.categoryIds.length !== categories.length) {
          data.categoryIds.forEach((uid) => {
            const exist = categories.find((category) => category.uid === uid)
            if (!exist) {
              logger.error('category.service.createOne.create-category-products.error.not-found')
              throw new NotFoundError('Category', uid)
            }
          })
        }
      }

      if (data.imgIds) {
        const imgs = await ImageDao.findAddByIds(connection, data.imgIds, logger)

        if (data.imgIds.length !== imgs.length) {
          data.imgIds.forEach((uid) => {
            const exist = imgs.find((img) => img.uid === uid)
            if (!exist) {
              logger.error('category.service.createOne.create-category-products.error.not-found')
              throw new NotFoundError('Category', uid)
            }
          })
        }
      }

      await ProductDao.insertOne(connection, saveObject, logger)
    })
    return saveObject
  }

  static async updateOne(data: ProductDto, logger: Logger): Promise<ProductDto> {
    logger.info('product.service.updateOne.start')
    await dbExecute(async (connection: Knex): Promise<void> => {
      const current = await ProductDao.findOneById(connection, data.uid, logger)

      if (!current) {
        throw new NotFoundError('Product', data.uid)
      }

      await ProductDao.updateOne(connection, data, logger)
    })

    return data
  }

  static async deleteOne(uid: string, logger: Logger): Promise<void> {
    logger.info('product.service.deleteOne.start')
    await dbExecute(async (connection: Knex): Promise<void> => {
      return ProductDao.deleteOne(connection, uid, logger)
    })

    return
  }
}

export { ProductService }
