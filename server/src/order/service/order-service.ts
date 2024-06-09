import { Knex } from 'knex'
import { Logger } from 'winston'

import { dbExecute } from '../../db/generic/db-execute'
import { NotFoundError } from '../../errors/not-found-error'
import { OrderDao } from '../dao/order-dao'
import { ProductDao } from '../../product/dao/product-dao'
import { OrderInterface } from '../interface/order-interface'
import { OrderStatusEnum } from '../util/order-status-enum'
import { ForbiddenError } from '../../errors/forbidden-error'
import { UserRoleEnum } from '../../user/util/user-role-enum'

class OrderService {
  static async addProductToOrder(
    productUid: string,
    userUid: string,
    logger: Logger,
  ): Promise<OrderInterface> {
    return dbExecute(async (connection: Knex) => {
      const existingProduct = await ProductDao.findOneById(connection, productUid, logger)
      const existingOrder = await OrderDao.findDraft(connection, logger)

      if (!existingProduct) {
        throw new NotFoundError('Product', productUid)
      }

      if (existingOrder) {
        const existingProductInOrder = existingOrder.products.find(
          (product) => product.productUid === productUid,
        )
        if (existingProductInOrder) {
          await OrderDao.updateProductInOrder(
            connection,
            existingOrder.uid,
            productUid,
            existingProductInOrder.count + 1,
            logger,
          )
        } else {
          await OrderDao.addProductToOrder(connection, existingOrder.uid, productUid, logger)
        }
      } else {
        await OrderDao.insertOne(connection, productUid, userUid, logger)
      }

      const updatedOrder = await OrderDao.findDraft(connection, logger)

      if (!updatedOrder) {
        throw new NotFoundError('Order', 'draft')
      }
      return updatedOrder
    })
  }

  static async deleteProductFromOrder(productUid: string, logger: Logger): Promise<void> {
    logger.debug('product.service.deleteOne.start')
    await dbExecute(async (connection: Knex): Promise<void> => {
      const existingOrder = await OrderDao.findDraft(connection, logger)

      if (
        !existingOrder ||
        !existingOrder.products.find((product) => product.productUid === productUid)
      ) {
        throw new NotFoundError('Product', productUid)
      }

      await OrderDao.deleteProductFromOrder(connection, existingOrder.uid, productUid, logger)

      return
    })

    return
  }

  static async updateOrderStatus(
    orderUid: string,
    status: OrderStatusEnum,
    currentUserData: { userId: string; role: UserRoleEnum },
    logger: Logger,
  ): Promise<void> {
    logger.debug('order.service.updateOrderStatus.start')
    await dbExecute(async (connection: Knex): Promise<void> => {
      const existingOrder = await OrderDao.findOneById(connection, orderUid, logger)

      if (!existingOrder) {
        throw new NotFoundError('Order', orderUid)
      }

      if (
        currentUserData.role !== UserRoleEnum.ADMIN &&
        existingOrder.userUid !== currentUserData.userId
      ) {
        throw new ForbiddenError('You are not allowed to update this order')
      }

      await OrderDao.updateOne(connection, orderUid, status, logger)
      return
    })
    logger.debug('order.service.updateOrderStatus.end')
    return
  }

  static async findAllOrders(userUid: string, logger: Logger): Promise<OrderInterface[]> {
    logger.debug('order.service.findAllOrders.start')
    const orders = await dbExecute(async (connection: Knex): Promise<OrderInterface[]> => {
      const orders = await OrderDao.findAllByUserUid(connection, userUid, logger)
      return orders
    })
    logger.debug('order.service.findAllOrders.end')
    return orders
  }
}

export { OrderService }
