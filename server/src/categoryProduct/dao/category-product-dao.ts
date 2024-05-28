import { Knex } from 'knex'
import { Logger } from 'winston'

import { CategoryProductDto } from '../interface/category-product-dto'

class CategoryProductDao {
  static async insert(
    queryBuilder: Knex.Transaction,
    categories: Array<CategoryProductDto>,
    logger: Logger,
  ): Promise<void> {
    logger.debug('category-product.dao.insert.start')
    const result = await queryBuilder<CategoryProductDto>('categoryProduct').insert(categories)
    logger.debug('category-product.dao.insert.end', result)
    return
  }

  static async updateOne(
    queryBuilder: Knex,
    category: CategoryProductDto,
    logger: Logger,
  ): Promise<void> {
    logger.debug('category-product.dao.updateOne.start')
    await queryBuilder<CategoryProductDto>('categoryProduct')
      .update(category)
      .where({ uid: category.uid })
    logger.debug('category-product.dao.updateOne.end')

    return
  }

  static async deleteOne(queryBuilder: Knex, uid: string, logger: Logger): Promise<void> {
    logger.debug('category-product.dao.deleteOne.start')
    await queryBuilder<CategoryProductDto>('categoryProduct').where('uid', uid).delete()
    logger.debug('category-product.dao.deleteOne.end')
    return
  }

  static async deleteAllByCategoryUids(
    queryBuilder: Knex.Transaction,
    uids: Array<string>,
    logger: Logger,
  ): Promise<void> {
    logger.debug('category-product.dao.deleteAllByCategoryUids.start')
    await queryBuilder<CategoryProductDto>('categoryProduct').whereIn('categoryUid', uids).delete()

    logger.debug('category-product.dao.deleteAllByCategoryUids.end')
    return
  }

  static async deleteAllByProductUids(
    queryBuilder: Knex.Transaction,
    uids: Array<string>,
    logger: Logger,
  ): Promise<void> {
    logger.debug('category-product.dao.deleteAllByProductUids.start')
    await queryBuilder<CategoryProductDto>('categoryProduct').whereIn('productUid', uids).delete()
    logger.debug('category-product.dao.deleteAllByProductUids.end')
    return
  }
}

export { CategoryProductDao }
