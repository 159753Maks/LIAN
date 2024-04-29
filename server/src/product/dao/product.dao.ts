import { Knex, knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from 'winston'

import { CategoryProductDao } from '../../categoryProduct/dao/category.product.dao'
import { CategoryProductDto } from '../../categoryProduct/interface/category.product.dto'
import { ListProductInput } from '../interface/list.product.input'
import { ProductDto } from '../interface/product.dto'

class ProductDao {
  static async findAllPaginated(
    queryBuilder: Knex,
    filter: ListProductInput,
    logger: Logger,
  ): Promise<Array<ProductDto>> {
    logger.info('product.dao.findAllPaginated.start')
    const builder = queryBuilder<ProductDto>('product').select('*')

    if (filter.title) {
      queryBuilder.andWhereLike('title', `%${filter.title}%`)
    }
    if (filter.description) {
      queryBuilder.andWhereLike('description', `%${filter.description}%`)
    }
    if (filter.minCost) {
      queryBuilder.andWhere('cost', '>=', filter.minCost)
    }
    if (filter.maxCost) {
      queryBuilder.andWhere('cost', '<=', filter.maxCost)
    }
    if (filter.minCount) {
      queryBuilder.andWhere('count', '>=', filter.minCount)
    }
    if (filter.maxCount) {
      queryBuilder.andWhere('count', '<=', filter.maxCount)
    }
    if (filter.limit) {
      queryBuilder.limit(filter.limit)
    }
    if (filter.offset) {
      queryBuilder.offset(filter.offset, {})
    }

    queryBuilder.orderBy(filter.sortField, filter.asc ? 'ASC' : 'DESC')
    return builder
  }

  static async findAllByIds(
    queryBuilder: Knex,
    uids: Array<string>,
    logger: Logger,
  ): Promise<Array<ProductDto>> {
    logger.info('product.dao.findAllByIds.start')
    return queryBuilder<ProductDto>('product').select('*').whereIn('uid', uids)
  }

  static async findOne(
    queryBuilder: Knex,
    uid: string,
    logger: Logger,
  ): Promise<ProductDto | undefined> {
    logger.info('product.dao.findOne.start')
    return queryBuilder<ProductDto>('product').select('*').where({ uid }).first()
  }

  static async insertOne(queryBuilder: Knex, data: ProductDto, logger: Logger): Promise<void> {
    logger.info('product.dao.insertOne.start')
    const trx = await queryBuilder.transaction()
    await trx<ProductDto>('product').insert({
      uid: data.uid,
      title: data.title,
      description: data.description,
      cost: data.cost,
      count: data.count,
    })

    if (data.categoryIds?.length) {
      await trx<CategoryProductDto>('categoryProduct').insert(
        data.categoryIds.map((uid) => ({
          uid: uuidv4(),
          productUid: data.uid,
          categoryUid: uid,
        })),
      )
    }

    await trx.commit()
    logger.info('product.dao.insertOne.end')
    return
  }

  static async updateOne(queryBuilder: Knex, data: ProductDto, logger: Logger): Promise<void> {
    logger.info('product.dao.updateOne.start')
    const trx = await queryBuilder.transaction()
    await trx<ProductDto>('product')
      .update({
        title: data.title,
        description: data.description,
        cost: data.cost,
        count: data.count,
      })
      .where({ uid: data.uid })

    await CategoryProductDao.deleteAllByProductUids(trx, [data.uid], logger)

    if (data.categoryIds?.length) {
      await CategoryProductDao.insert(
        trx,
        data.categoryIds.map((uid) => ({
          uid: uuidv4(),
          productUid: data.uid,
          categoryUid: uid,
        })),
        logger,
      )
    }

    trx.commit()
    logger.info('product.dao.updateOne.end')
    return
  }

  static async deleteOne(queryBuilder: Knex, uid: string, logger: Logger): Promise<void> {
    logger.info('product.dao.deleteOne.start')
    await queryBuilder<ProductDto>('product').where('uid', uid).delete()
    logger.info('product.dao.deleteOne.end')
    return
  }
}

export { ProductDao }
