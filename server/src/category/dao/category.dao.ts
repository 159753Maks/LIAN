import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from 'winston'

import { CategoryProductDao } from '../../categoryProduct/dao/category.product.dao'
import { CategoryProductDto } from '../../categoryProduct/interface/category.product.dto'
import { CategoryProductRawDto } from '../../categoryProduct/interface/category.product.raw.dto'
import { CategoryDto } from '../interface/category.dto'
import { CategoryInputDto } from '../interface/category.input.dto'

class CategoryDao {
  static async findOne(
    queryBuilder: Knex,
    uid: string,
    logger: Logger,
  ): Promise<CategoryDto | undefined> {
    logger.info('category.dao.findOne.start')
    const queryResult = await queryBuilder('category')
      .leftJoin('categoryProduct', 'category.uid', '=', 'categoryProduct.categoryUid')
      .select(
        'category.uid as uid',
        'category.title as title',
        'categoryProduct.productUid as productUid'
      )
      .where({ uid });

    if (!queryResult?.length) {
      logger.info('category.dao.findOne.end.empty')
      return undefined
    }

    const result: CategoryDto = {
      uid: queryResult[0].uid,
      title: queryResult[0].title,
      productsIds: [],
    }

    logger.info('category.dao.findOne.map.start')

    queryResult.forEach((row) => {
      if (row.productUid) {
        result.productsIds?.push(row.productUid)
      }
    })

    logger.info('category.dao.findOne.end')
    return result
  }

  static async insertOne(
    queryBuilder: Knex,
    data: CategoryInputDto,
    logger: Logger,
  ): Promise<void> {
    logger.info('category.dao.insertOne.start')
    const trx = await queryBuilder.transaction()
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
    logger.info('category.dao.insertOne.end')
    return
  }

  static async updateOne(
    queryBuilder: Knex,
    data: CategoryInputDto,
    logger: Logger,
  ): Promise<void> {
    logger.info('category.dao.updateOne.start')
    const trx = await queryBuilder.transaction()
    await trx('category').update({ title: data.title }).where({ uid: data.uid })

    await CategoryProductDao.deleteAllByCategoryUids(trx, [data.uid], logger)

    if (data.productsIds?.length) {
      await CategoryProductDao.insert(
        trx,
        data.productsIds.map((uid) => ({
          uid: uuidv4(),
          productUid: data.uid,
          categoryUid: uid,
        })),
        logger,
      )
    }

    trx.commit()
    logger.info('category.dao.updateOne.end')
    return
  }

  static async deleteOne(queryBuilder: Knex, uid: string, logger: Logger): Promise<void> {
    await queryBuilder<CategoryDto>('category').where({ uid }).delete()

    return
  }
}

export { CategoryDao }
