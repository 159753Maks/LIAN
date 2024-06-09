import { Knex } from 'knex' // Імпорт типу Knex для роботи з базою даних
import { v4 as uuidv4 } from 'uuid' // Імпорт функції для генерації унікальних ідентифікаторів (UUID)
import { Logger } from 'winston' // Імпорт типу Logger з бібліотеки winston для логування

import { CategoryDao } from '../../category/dao/category-dao' // Імпорт DAO для роботи з категоріями
import { dbExecute } from '../../db/generic/db-execute' // Імпорт утиліти для виконання запитів до бази даних
import { NotFoundError } from '../../errors/not-found-error' // Імпорт класу для помилки "не знайдено"
import { ImageDao } from '../../images/dao/image-dao' // Імпорт DAO для роботи з зображеннями
import { ProductDao } from '../dao/product-dao' // Імпорт DAO для роботи з продуктами
import { CreateProductInput } from '../interface/create-product-input' // Імпорт інтерфейсу для вхідних даних створення продукту
import { ListProductInput } from '../interface/list-product-input' // Імпорт інтерфейсу для вхідних даних фільтрації продуктів
import { ProductDto } from '../interface/product-dto' // Імпорт інтерфейсу DTO для продукту

class ProductService {
  /**
   * Знаходить продукт за його ідентифікатором
   * @param id - Ідентифікатор продукту
   * @param logger - Логгер для логування
   * @returns Продукт або undefined, якщо продукт не знайдено
   */
  static async findOne(id: string, logger: Logger): Promise<ProductDto | undefined> {
    logger.debug('product.service.findOne.start')
    return dbExecute(async (connection: Knex): Promise<ProductDto | undefined> => {
      return ProductDao.findOneById(connection, id, logger)
    })
  }

  /**
   * Знаходить продукти за списком ідентифікаторів
   * @param ids - Список ідентифікаторів продуктів
   * @param logger - Логгер для логування
   * @returns Список знайдених продуктів
   */
  static async findAllByIds(ids: Array<string>, logger: Logger): Promise<Array<ProductDto>> {
    logger.debug('product.service.findAllByIds.start')
    return dbExecute(async (connection: Knex): Promise<Array<ProductDto>> => {
      return ProductDao.findAllByIds(connection, ids, logger)
    })
  }

  /**
   * Знаходить продукти з можливістю пагінації та фільтрації
   * @param filter - Фільтр для пошуку продуктів
   * @param logger - Логгер для логування
   * @returns Список знайдених продуктів
   */
  static async findAllPaginated(
    filter: ListProductInput,
    logger: Logger,
  ): Promise<Array<ProductDto>> {
    logger.debug('product.service.findAllPaginated.start')
    return dbExecute(async (connection: Knex): Promise<Array<ProductDto>> => {
      return ProductDao.findAllPaginated(connection, filter, logger)
    })
  }

  /**
   * Створює новий продукт
   * @param data - Дані для створення продукту
   * @param logger - Логгер для логування
   * @returns Створений продукт
   */
  static async createOne(data: CreateProductInput, logger: Logger): Promise<ProductDto> {
    logger.debug('product.service.createOne.start')
    const saveObject = {
      ...data,
      uid: uuidv4(), // Генерація унікального ідентифікатора для продукту
    }
    await dbExecute(async (connection: Knex) => {
      // Перевірка наявності категорій за їх ідентифікаторами
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

      // Перевірка наявності зображень за їх ідентифікаторами
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

      await ProductDao.insertOne(connection, saveObject, logger) // Вставка нового продукту в базу даних
    })
    return saveObject
  }

  /**
   * Оновлює існуючий продукт
   * @param data - Дані для оновлення продукту
   * @param logger - Логгер для логування
   * @returns Оновлений продукт
   */
  static async updateOne(data: ProductDto, logger: Logger): Promise<ProductDto> {
    logger.debug('product.service.updateOne.start')
    await dbExecute(async (connection: Knex): Promise<void> => {
      const current = await ProductDao.findOneById(connection, data.uid, logger)

      if (!current) {
        throw new NotFoundError('Product', data.uid)
      }

      await ProductDao.updateOne(connection, data, logger) // Оновлення продукту в базі даних
    })

    return data
  }

  /**
   * Видаляє продукт за його ідентифікатором
   * @param uid - Ідентифікатор продукту
   * @param logger - Логгер для логування
   */
  static async deleteOne(uid: string, logger: Logger): Promise<void> {
    logger.debug('product.service.deleteOne.start')
    await dbExecute(async (connection: Knex): Promise<void> => {
      return ProductDao.deleteOne(connection, uid, logger) // Видалення продукту з бази даних
    })

    return
  }
}

export { ProductService } // Експорт класу ProductService
