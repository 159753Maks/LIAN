import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from 'winston'

import { CategoryProductDao } from '../../categoryProduct/dao/category-product-dao'
import { CategoryProductDto } from '../../categoryProduct/interface/category-product-dto'
import { ListProductInput } from '../interface/list-product-input'
import { ProductDto } from '../interface/product-dto'
import { mapProducts } from './product-mapper'
import { sortField } from '../../utill/sort-by-field'

class ProductDao {
  static async findAllPaginated(
    queryBuilder: Knex,
    filter: ListProductInput,
    logger: Logger,
  ): Promise<Array<ProductDto>> {
    logger.info('product.dao.findAllPaginated.start')

    const filterQuery = queryBuilder('product').select('uid')

    if (filter.title) {
      filterQuery.andWhereLike('title', `%${filter.title}%`)
    }
    if (filter.description) {
      filterQuery.andWhereLike('description', `%${filter.description}%`)
    }
    if (filter.minCost) {
      filterQuery.andWhere('cost', '>=', filter.minCost)
    }
    if (filter.maxCost) {
      filterQuery.andWhere('cost', '<=', filter.maxCost)
    }
    if (filter.minCount) {
      filterQuery.andWhere('count', '>=', filter.minCount)
    }
    if (filter.maxCount) {
      filterQuery.andWhere('count', '<=', filter.maxCount)
    }
    if (filter.limit) {
      filterQuery.limit(filter.limit)
    }
    if (filter.offset) {
      filterQuery.offset(filter.offset, {})
    }

    if (filter.categoryIds?.length) {
      const subQuery = queryBuilder('categoryProduct')
        .select('productUid')
        .whereIn('categoryUid', filter.categoryIds)

      filterQuery.whereIn('product.uid', subQuery)
    }

    const uidsResult = await filterQuery

    const queryResult = await queryBuilder<ProductDto>('product')
      .leftJoin('categoryProduct', 'product.uid', '=', 'categoryProduct.productUid')
      .leftJoin('productImage', 'product.uid', '=', 'productImage.productUid')
      .leftJoin('image', 'image.uid', '=', 'productImage.imageUid')
      .select(
        'product.uid as uid',
        'product.title as title',
        'product.description as description',
        'product.cost as cost',
        'product.count as count',
        'product.subDescription as subDescription',
        'categoryProduct.categoryUid as categoryUid',
        'image.uid as imageUid',
        'image.fileName as fileName',
        'image.url as url',
      )
      .whereIn(
        'product.uid',
        uidsResult.map((el) => el.uid),
      )

    const sortedProducts = sortField(mapProducts(queryResult), filter.sortField, filter.asc)

    return sortedProducts
  }

  static async findAllByIds(
    queryBuilder: Knex,
    uids: Array<string>,
    logger: Logger,
  ): Promise<Array<ProductDto>> {
    logger.info('product.dao.findAllByIds.start')
    const queryResult = await queryBuilder<ProductDto>('product')
      .leftJoin('categoryProduct', 'product.uid', '=', 'categoryProduct.productUid')
      .leftJoin('productImage', 'product.uid', '=', 'productImage.productUid')
      .leftJoin('image', 'image.uid', '=', 'productImage.imageUid')
      .select(
        'product.uid as uid',
        'product.title as title',
        'product.description as description',
        'product.cost as cost',
        'product.count as count',
        'product.subDescription as subDescription',
        'categoryProduct.categoryUid as categoryUid',
        'image.uid as imageUid',
        'image.fileName as fileName',
        'image.url as url',
      )
      .whereIn('product.uid', uids)

    if (!queryResult.length) {
      return []
    }

    return mapProducts(queryResult)
  }

  static async findOneById(
    queryBuilder: Knex,
    uid: string,
    logger: Logger,
  ): Promise<ProductDto | undefined> {
    logger.info('product.dao.findOne.start')
    const queryResult = await queryBuilder<ProductDto>('product')
      .leftJoin('categoryProduct', 'product.uid', '=', 'categoryProduct.productUid')
      .leftJoin('productImage', 'product.uid', '=', 'productImage.productUid')
      .leftJoin('image', 'image.uid', '=', 'productImage.imageUid')
      .select(
        'product.uid as uid',
        'product.title as title',
        'product.description as description',
        'product.cost as cost',
        'product.count as count',
        'product.subDescription as subDescription',
        'categoryProduct.categoryUid as categoryUid',
        'image.uid as imageUid',
        'image.fileName as fileName',
        'image.url as url',
      )
      .where('product.uid', uid)

    if (!queryResult.length) {
      return undefined
    }

    return mapProducts(queryResult)[0]
  }

  static async insertOne(queryBuilder: Knex, data: ProductDto, logger: Logger): Promise<void> {
    logger.info('product.dao.insertOne.start')
    const trx = await queryBuilder.transaction()
    try {
      await trx<ProductDto>('product').insert({
        uid: data.uid,
        title: data.title,
        description: data.description,
        cost: data.cost,
        count: data.count,
      })

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

      if (data.imgIds?.length) {
        await trx('productImage').insert(
          data.imgIds.map((uid) => ({
            uid: uuidv4(),
            productUid: data.uid,
            imageUid: uid,
          })),
        )
      }

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }

    logger.info('product.dao.insertOne.end')
    return
  }

  static async updateOne(queryBuilder: Knex, data: ProductDto, logger: Logger): Promise<void> {
    logger.info('product.dao.updateOne.start')
    const trx = await queryBuilder.transaction()

    try {
      await trx<ProductDto>('product')
        .update({
          title: data.title,
          description: data.description,
          cost: data.cost,
          count: data.count,
        })
        .where({ uid: data.uid })

      if (data.categoryIds?.length) {
        await CategoryProductDao.deleteAllByProductUids(trx, [data.uid], logger)
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

      if (data.imgIds?.length) {
        await trx<CategoryProductDto>('productImage').where('productUid', data.uid).delete()

        await trx('productImage').insert(
          data.imgIds.map((uid) => ({
            uid: uuidv4(),
            productUid: data.uid,
            imageUid: uid,
          })),
        )
      }

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }

    logger.info('product.dao.insertOne.end')
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
