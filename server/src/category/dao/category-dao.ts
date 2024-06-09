import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from 'winston'

import { CategoryProductDao } from '../../categoryProduct/dao/category-product-dao'
import { CategoryProductDto } from '../../categoryProduct/interface/category-product-dto'
import { CategoryDto } from '../interface/category-dto'
import { CategoryInputDto } from '../interface/category-input-dto'
import { mapCategories } from './category-mapper'

class CategoryDao {
  static async findOne(
    queryBuilder: Knex,
    uid: string,
    logger: Logger,
  ): Promise<CategoryDto | undefined> {
    logger.debug('category.dao.findOne.start')
    const queryResult = await queryBuilder('category')
      .leftJoin('categoryProduct', 'category.uid', '=', 'categoryProduct.categoryUid')
      .select(
        'category.uid as uid',
        'category.title as title',
        'categoryProduct.productUid as productUid',
      )
      .where('category.uid', uid)

    if (!queryResult?.length) {
      logger.debug('category.dao.findOne.end.empty')
      return undefined
    }

    logger.debug('category.dao.findOne.map.start')

    const result = mapCategories(queryResult)

    logger.debug('category.dao.findOne.end')
    return result[0]
  }

  static async findAll(queryBuilder: Knex, logger: Logger): Promise<Array<CategoryDto>> {
    logger.debug('category.dao.findAll.start')
    const queryResult = await queryBuilder('category')
      .leftJoin('categoryProduct', 'category.uid', '=', 'categoryProduct.categoryUid')
      .select(
        'category.uid as uid',
        'category.title as title',
        'categoryProduct.productUid as productUid',
      )

    if (!queryResult?.length) {
      logger.debug('category.dao.findAll.end.empty')
      return []
    }

    const result = mapCategories(queryResult)

    logger.debug('category.dao.findAll.end')
    return result
  }

  static async findAllByIds(
    queryBuilder: Knex,
    ids: Array<string>,
    logger: Logger,
  ): Promise<Array<CategoryDto>> {
    logger.debug('category.dao.findAll.start')
    const queryResult = await queryBuilder('category')
      .leftJoin('categoryProduct', 'category.uid', '=', 'categoryProduct.categoryUid')
      .select(
        'category.uid as uid',
        'category.title as title',
        'categoryProduct.productUid as productUid',
      )
      .whereIn('category.uid', ids)

    if (!queryResult?.length) {
      logger.debug('category.dao.findAll.end.empty')
      return []
    }

    const result = mapCategories(queryResult)

    logger.debug('category.dao.findAll.end')
    return result
  }

  static async insertOne(
    queryBuilder: Knex,
    data: CategoryInputDto,
    logger: Logger,
  ): Promise<void> {
    logger.debug('category.dao.insertOne.start')
    const trx: Knex.Transaction = await queryBuilder.transaction()

    try {
      await trx<CategoryDto>('category').insert({
        uid: data.uid,
        title: data.title,
      })

      if (data.productsIds?.length) {
        await trx<CategoryProductDto>('categoryProduct').insert(
          data.productsIds.map((uid) => ({
            uid: uuidv4(),
            productUid: data.uid,
            categoryUid: uid,
          })),
        )
      }

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      logger.error('category.dao.insertOne.transactionRolledBack', { error })
      throw error
    }

    logger.debug('category.dao.insertOne.end')
    return
  }

  static async updateOne(
    queryBuilder: Knex,
    data: CategoryInputDto,
    logger: Logger,
  ): Promise<void> {
    logger.debug('category.dao.updateOne.start')
    const trx: Knex.Transaction = await queryBuilder.transaction()

    try {
      await trx('category').update({ title: data.title }).where({ uid: data.uid })
      logger.debug('category.dao.updateOne.categoryUpdated', { uid: data.uid })

      await CategoryProductDao.deleteAllByCategoryUids(trx, [data.uid], logger)
      logger.debug('category.dao.updateOne.productsDeleted', { uid: data.uid })

      if (data.productsIds?.length) {
        const categories = data.productsIds.map((productUid) => ({
          uid: uuidv4(),
          productUid,
          categoryUid: data.uid,
        }))

        await CategoryProductDao.insert(trx, categories, logger)
        logger.debug('category.dao.updateOne.productsInserted', { categories })
      }

      await trx.commit()
      logger.debug('category.dao.updateOne.transactionCommitted')
    } catch (error) {
      await trx.rollback()
      logger.error('category.dao.updateOne.transactionRolledBack', { error })
      throw error
    }

    logger.debug('category.dao.updateOne.end')
    return
  }

  static async deleteOne(queryBuilder: Knex, uid: string, logger: Logger): Promise<void> {
    await queryBuilder<CategoryDto>('category').where({ uid }).delete()

    return
  }
}

export { CategoryDao }
