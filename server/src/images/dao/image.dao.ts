import { Knex } from 'knex'
import { Logger } from 'winston'

class ImageDao {
  static async insertOne(queryBuilder: Knex, data: ImageDto, logger: Logger): Promise<void> {
    logger.info('image.dao.insertOne.start')

    await queryBuilder<ImageDto>('image').insert({
      uid: data.uid,
      fileName: data.fileName,
      url: data.url,
    })

    logger.info('image.dao.insertOne.end')
    return
  }

  static async findAddByIds(
    queryBuilder: Knex,
    uids: Array<string>,
    logger: Logger,
  ): Promise<Array<ImageDto>> {
    logger.info('image.dao.findAllByIds.start')

    return queryBuilder<ImageDto>('image').select().whereIn('uid', uids)
  }

  static async deleteOne(queryBuilder: Knex, uid: string, logger: Logger): Promise<void> {
    await queryBuilder<ImageDto>('image').where({ uid }).delete()

    return
  }
}

export { ImageDao }
