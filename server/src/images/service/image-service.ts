// Імпорт необхідних модулів
import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from 'winston'

// Імпорт функції для виконання запитів до бази даних
import { dbExecute } from '../../db/generic/db-execute'

// Імпорт функції для завантаження зображення до S3
import { uploadImageToS3 } from '../../s3/upload-img'

// Імпорт DAO для зображення
import { ImageDao } from '../dao/image-dao'

// Імпорт інтерфейсу для вхідних даних для завантаження зображення
import { UploadImageInput } from '../interface/upload-image-input'

class ImageService {
  // Метод для видалення запису про зображення
  static async deleteOne(id: string, logger: Logger): Promise<void> {
    return dbExecute(async (connection: Knex) => {
      return ImageDao.deleteOne(connection, id, logger)
    })
  }

  // Метод для створення запису про зображення
  static async createOne(data: UploadImageInput, logger: Logger): Promise<ImageDto> {
    // Декодування base64-кодованих даних зображення у буфер
    const imageBuffer = Buffer.from(data.imageData, 'base64')

    // Завантаження буфера зображення до S3
    const imageUrl = await uploadImageToS3(data.fileName, imageBuffer, data.mimeType)
    logger.debug('image.service.createOne.uploaded') // Логування завантаження зображення

    // Підготовка даних для збереження
    const toSave: ImageDto = {
      uid: uuidv4(), // Генерація унікального ідентифікатора
      fileName: data.fileName,
      url: `${imageUrl}`,
    }

    // Збереження даних про зображення до бази даних
    await dbExecute(async (connection: Knex): Promise<void> => {
      await ImageDao.insertOne(connection, toSave, logger)

      logger.debug('image.service.createOne.saved') // Логування збереження зображення
    })

    return toSave // Повернення даних про збережене зображення
  }
}

export { ImageService }
