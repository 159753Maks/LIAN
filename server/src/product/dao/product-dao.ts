// Імпорт необхідних модулів з Knex.js, UUID та Winston
import { Knex } from 'knex' // Імпорт Knex для роботи з базою даних
import { v4 as uuidv4 } from 'uuid' // Імпорт функції для генерації унікальних ідентифікаторів UUID
import { error, Logger } from 'winston' // Імпорт логера Winston для ведення журналу подій

// Імпорт DAO та DTO для роботи з категоріями продуктів
import { CategoryProductDao } from '../../categoryProduct/dao/category-product-dao' // Імпорт DAO для категорій продуктів
import { CategoryProductDto } from '../../categoryProduct/interface/category-product-dto' // Імпорт DTO для категорій продуктів

// Імпорт функції для сортування
import { sortField } from '../../utill/sort-by-field' // Імпорт утиліти для сортування за полем

// Імпорт інтерфейсів для роботи з продуктами
import { ListProductInput } from '../interface/list-product-input' // Імпорт інтерфейсу для вхідних даних списку продуктів
import { ProductDto } from '../interface/product-dto' // Імпорт DTO для продуктів

// Імпорт маппера для продуктів
import { mapProducts } from './product-mapper' // Імпорт маппера для перетворення даних продуктів

// Клас для роботи з продуктами в базі даних
class ProductDao {
  // Метод для отримання списку продуктів з можливістю пагінації та фільтрації
  static async findAllPaginated(
    queryBuilder: Knex, // Запитувач Knex для виконання запитів
    filter: ListProductInput, // Фільтр для отримання списку продуктів
    logger: Logger, // Логер для запису інформації
  ): Promise<Array<ProductDto>> {
    // Повертає обіцянку з масивом DTO продуктів
    logger.debug('product.dao.findAllPaginated.start') // Логування початку методу

    // Починаємо створення запиту з таблиці 'product'
    const filterQuery = queryBuilder('product').select('product.uid as uid')

    // Додаємо умови фільтрації за назвою продукту
    if (filter.title) {
      filterQuery.andWhereLike('title', `%${filter.title}%`)
    }

    // Додаємо умови фільтрації за описом продукту
    if (filter.description) {
      filterQuery.andWhereLike('description', `%${filter.description}%`)
    }

    // Додаємо умови фільтрації за мінімальною вартістю продукту
    if (filter.minCost) {
      filterQuery.andWhere('cost', '>=', filter.minCost)
    }

    // Додаємо умови фільтрації за максимальною вартістю продукту
    if (filter.maxCost) {
      filterQuery.andWhere('cost', '<=', filter.maxCost)
    }

    // Додаємо умови фільтрації за мінімальною кількістю продукту
    if (filter.minCount) {
      filterQuery.andWhere('count', '>=', filter.minCount)
    }

    // Додаємо умови фільтрації за максимальною кількістю продукту
    if (filter.maxCount) {
      filterQuery.andWhere('count', '<=', filter.maxCount)
    }

    // Додаємо умови фільтрації за лімітом кількості продуктів
    if (filter.limit) {
      filterQuery.limit(filter.limit)
    }

    // Додаємо умови фільтрації за зміщенням для пагінації
    if (filter.offset) {
      filterQuery.offset(filter.offset)
    }

    // Додаємо умови для фільтрації за ID замовлення
    if (filter.orderId) {
      filterQuery.join('orderProduct', 'product.uid', '=', 'orderProduct.productUid')
      filterQuery.where('orderProduct.orderUid', filter.orderId)
    }

    // Додаємо умови фільтрації за категоріями продукту
    if (filter.categoryIds?.length) {
      const subQuery = queryBuilder('categoryProduct')
        .select('productUid')
        .whereIn('categoryUid', filter.categoryIds)

      filterQuery.whereIn('product.uid', subQuery)
    }

    // Виконуємо запит для отримання UID продуктів, що відповідають фільтрам
    const uidsResult = await filterQuery

    // Виконуємо запит для отримання детальної інформації про продукти за UID
    const queryResult = await queryBuilder<ProductDto>('product')
      .leftJoin('categoryProduct', 'product.uid', '=', 'categoryProduct.productUid')
      .leftJoin('category', 'category.uid', '=', 'categoryProduct.categoryUid')
      .leftJoin('productImage', 'product.uid', '=', 'productImage.productUid')
      .leftJoin('image', 'image.uid', '=', 'productImage.imageUid')
      .select(
        'product.uid as uid',
        'product.title as title',
        'product.description as description',
        'product.cost as cost',
        'product.count as count',
        'product.subDescription as subDescription',
        'category.uid as categoryUid',
        'category.title as categoryTitle',
        'image.uid as imageUid',
        'image.fileName as fileName',
        'image.url as url',
      )
      .whereIn(
        'product.uid',
        uidsResult?.map((el) => el.uid),
      )

    // Сортуємо продукти за вказаним полем
    const sortedProducts = sortField(mapProducts(queryResult), filter.sortField, filter.asc)

    // Повертаємо відсортований список продуктів
    return sortedProducts
  }

  // Метод для отримання продуктів за списком UID
  static async findAllByIds(
    queryBuilder: Knex, // Запитувач Knex для виконання запитів
    uids: Array<string>, // Масив UID продуктів для пошуку
    logger: Logger, // Логер для запису інформації
  ): Promise<Array<ProductDto>> {
    // Повертає обіцянку з масивом DTO продуктів
    logger.debug('product.dao.findAllByIds.start') // Логування початку методу
    const queryResult = await queryBuilder<ProductDto>('product')
      .leftJoin('categoryProduct', 'product.uid', '=', 'categoryProduct.productUid')
      .leftJoin('category', 'category.uid', '=', 'categoryProduct.categoryUid')
      .leftJoin('productImage', 'product.uid', '=', 'productImage.productUid')
      .leftJoin('image', 'image.uid', '=', 'productImage.imageUid')
      .select(
        'product.uid as uid',
        'product.title as title',
        'product.description as description',
        'product.cost as cost',
        'product.count as count',
        'product.subDescription as subDescription',
        'category.uid as categoryUid',
        'category.title as categoryTitle',
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

  // Метод для отримання продукту за його UID
  static async findOneById(
    queryBuilder: Knex, // Запитувач Knex для виконання запитів
    uid: string, // UID продукту для пошуку
    logger: Logger, // Логер для запису інформації
  ): Promise<ProductDto | undefined> {
    // Повертає обіцянку з DTO продукту або undefined
    logger.debug('product.dao.findOne.start') // Логування початку методу
    const queryResult = await queryBuilder<ProductDto>('product')
      .leftJoin('categoryProduct', 'product.uid', '=', 'categoryProduct.productUid')
      .leftJoin('category', 'category.uid', '=', 'categoryProduct.categoryUid')
      .leftJoin('productImage', 'product.uid', '=', 'productImage.productUid')
      .leftJoin('image', 'image.uid', '=', 'productImage.imageUid')
      .select(
        'product.uid as uid',
        'product.title as title',
        'product.description as description',
        'product.cost as cost',
        'product.count as count',
        'product.subDescription as subDescription',
        'category.uid as categoryUid',
        'category.title as categoryTitle',
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

  // Метод для додавання нового продукту в базу даних
  static async insertOne(
    queryBuilder: Knex, // Запитувач Knex для виконання запитів
    data: ProductDto, // Дані нового продукту
    logger: Logger, // Логер для запису інформації
  ): Promise<void> {
    // Повертає обіцянку, яка завершується без значення
    logger.debug('product.dao.insertOne.start') // Логування початку методу

    const trx = await queryBuilder.transaction() // Починаємо транзакцію
    try {
      // Вставляємо новий продукт в таблицю 'product'
      await trx<ProductDto>('product').insert({
        uid: data.uid,
        title: data.title,
        description: data.description,
        cost: data.cost,
        count: data.count,
      })

      // Якщо є категорії, додаємо їх у відповідну таблицю
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

      // Якщо є зображення, додаємо їх у відповідну таблицю
      if (data.imgIds?.length) {
        await trx('productImage').insert(
          data.imgIds.map((uid) => ({
            uid: uuidv4(),
            productUid: data.uid,
            imageUid: uid,
          })),
        )
      }

      await trx.commit() // Завершуємо транзакцію
    } catch (error) {
      await trx.rollback() // Відкочуємо транзакцію у разі помилки
      throw error // Піднімаємо помилку далі
    }

    logger.debug('product.dao.insertOne.end') // Логування завершення методу
    return
  }

  // Метод для оновлення існуючого продукту в базі даних
  static async updateOne(
    queryBuilder: Knex, // Запитувач Knex для виконання запитів
    data: ProductDto, // Дані продукту для оновлення
    logger: Logger, // Логер для запису інформації
  ): Promise<void> {
    // Повертає обіцянку, яка завершується без значення
    logger.debug('product.dao.updateOne.start') // Логування початку методу

    const trx = await queryBuilder.transaction() // Починаємо транзакцію
    try {
      // Оновлюємо інформацію про продукт у таблиці 'product'
      await trx<ProductDto>('product')
        .update({
          title: data.title,
          description: data.description,
          cost: data.cost,
          count: data.count,
        })
        .where({ uid: data.uid })

      // Якщо є категорії, оновлюємо їх
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

      // Якщо є зображення, оновлюємо їх
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

      await trx.commit() // Завершуємо транзакцію
    } catch (error) {
      await trx.rollback() // Відкочуємо транзакцію у разі помилки
      throw error // Піднімаємо помилку далі
    }

    logger.debug('product.dao.updateOne.end') // Логування завершення методу
    return
  }

  // Метод для видалення продукту з бази даних
  static async deleteOne(
    queryBuilder: Knex, // Запитувач Knex для виконання запитів
    uid: string, // UID продукту для видалення
    logger: Logger, // Логер для запису інформації
  ): Promise<void> {
    // Повертає обіцянку, яка завершується без значення
    logger.debug('product.dao.deleteOne.start') // Логування початку методу

    // Видаляємо продукт з таблиці 'product'
    await queryBuilder<ProductDto>('product').where('uid', uid).delete()

    logger.debug('product.dao.deleteOne.end') // Логування завершення методу
    return
  }
}

export { ProductDao } // Експортуємо клас ProductDao для використання в інших модулях
