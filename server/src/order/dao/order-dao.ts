import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from 'winston'

import { OrderStatusEnum } from '../util/order-status-enum'
import { OrderInterface } from '../interface/order-interface'
import { mapOrderProductsToOrders } from './order-mapper'

class OrderDao {
  static async findOneById(
    queryBuilder: Knex,
    uid: string,
    logger: Logger,
  ): Promise<OrderInterface | undefined> {
    logger.debug('order.dao.findOneById.start')
    const queryResult = await queryBuilder('order')
      .select(
        'order.uid',
        'order.userUid',
        'order.status',
        'order.createdAt',
        'order.updatedAt',
        'orderProduct.productUid',
        'orderProduct.count',
      )
      .leftJoin('orderProduct', 'order.uid', '=', 'orderProduct.orderUid')
      .where('order.uid', uid)

    if (!queryResult.length) {
      return undefined
    }

    return mapOrderProductsToOrders(queryResult)[0]
  }

  static async findAllByUserUid(
    queryBuilder: Knex,
    userUid: string,
    logger: Logger,
  ): Promise<OrderInterface[]> {
    logger.debug('order.dao.findAllByUserUid.start')
    const queryResult = await queryBuilder('order')
      .select(
        'order.uid',
        'order.userUid',
        'order.status',
        'order.createdAt',
        'order.updatedAt',
        'orderProduct.productUid',
        'orderProduct.count',
      )
      .leftJoin('orderProduct', 'order.uid', '=', 'orderProduct.orderUid')
      .where('userUid', userUid)

    return mapOrderProductsToOrders(queryResult)
  }

  static async findDraft(queryBuilder: Knex, logger: Logger): Promise<OrderInterface | undefined> {
    logger.debug('order.dao.findDraft.start')
    const queryResult = await queryBuilder('order')
      .select(
        'order.uid',
        'order.userUid',
        'order.status',
        'order.createdAt',
        'order.updatedAt',
        'orderProduct.productUid',
        'orderProduct.count',
      )
      .leftJoin('orderProduct', 'order.uid', '=', 'orderProduct.orderUid')
      .where('status', OrderStatusEnum.DRAFT)

    if (!queryResult.length) {
      return undefined
    }

    return mapOrderProductsToOrders(queryResult)[0]
  }

  static async updateProductInOrder(
    queryBuilder: Knex,
    orderUid: string,
    productUid: string,
    count: number,
    logger: Logger,
  ): Promise<void> {
    logger.debug('order.dao.updateProductInOrder.start')
    const check = await queryBuilder('orderProduct')
      .update({
        count,
      })
      .where({
        orderUid,
        productUid,
      })

    logger.debug('order.dao.updateProductInOrder.end')
    return
  }

  static async addProductToOrder(
    queryBuilder: Knex,
    orderUid: string,
    productUid: string,
    logger: Logger,
  ): Promise<void> {
    logger.debug('order.dao.addProductToOrder.start')
    await queryBuilder('orderProduct').insert({
      uid: uuidv4(),
      orderUid,
      productUid,
    })
    logger.debug('order.dao.addProductToOrder.end')
    return
  }

  static async insertOne(
    queryBuilder: Knex,
    productUid: string,
    userUid: string,
    logger: Logger,
  ): Promise<void> {
    logger.debug('order.dao.insertOne.start')
    const trx = await queryBuilder.transaction()

    try {
      const orderUid = uuidv4()
      await trx('order').insert({
        uid: orderUid,
        userUid,
        status: OrderStatusEnum.DRAFT,
      })

      await trx('orderProduct').insert({
        uid: uuidv4(),
        orderUid,
        productUid,
      })

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw error
    }

    logger.debug('order.dao.insertOne.end')
    return
  }

  static async updateOne(
    queryBuilder: Knex,
    orderUid: string,
    status: OrderStatusEnum,
    logger: Logger,
  ): Promise<void> {
    logger.debug('order.dao.updateOne.start')
    await queryBuilder<OrderInterface>('order')
      .update({
        status: status,
      })
      .where({ uid: orderUid })
    logger.debug('order.dao.updateOne.end')
    return
  }

  static async deleteProductFromOrder(
    queryBuilder: Knex,
    orderUid: string,
    productUid: string,
    logger: Logger,
  ): Promise<void> {
    logger.debug('order.dao.deleteProductFromOrder.start')
    await queryBuilder('orderProduct').delete().where({
      orderUid,
      productUid,
    })
    logger.debug('order.dao.deleteProductFromOrder.end')
    return
  }
}

export { OrderDao }
