import { Knex } from 'knex'
import { Logger } from 'winston'

class ImageDao {
  // Метод для вставки одного запису про зображення до бази даних
  static async insertOne(queryBuilder: Knex, data: ImageDto, logger: Logger): Promise<void> {
    logger.debug('image.dao.insertOne.start') // Початок записування зображення до бази даних

    // Вставка запису в таблицю 'image'
    await queryBuilder<ImageDto>('image').insert({
      uid: data.uid,
      fileName: data.fileName,
      url: data.url,
    })

    logger.debug('image.dao.insertOne.end') // Завершення записування зображення до бази даних
    return
  }

  // Метод для пошуку зображень за їхніми унікальними ідентифікаторами
  static async findAddByIds(
    queryBuilder: Knex,
    uids: Array<string>,
    logger: Logger,
  ): Promise<Array<ImageDto>> {
    logger.debug('image.dao.findAllByIds.start') // Початок пошуку зображень за їхніми ідентифікаторами

    // Пошук зображень в базі даних за унікальними ідентифікаторами
    return queryBuilder<ImageDto>('image').select().whereIn('uid', uids)
  }

  // Метод для видалення одного запису про зображення з бази даних за його унікальним ідентифікатором
  static async deleteOne(queryBuilder: Knex, uid: string, logger: Logger): Promise<void> {
    // Видалення запису з таблиці 'image'
    await queryBuilder<ImageDto>('image').where({ uid }).delete()

    return
  }
}

export { ImageDao }
