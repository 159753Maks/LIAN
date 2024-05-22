import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from 'winston'

import { dbExecute } from '../../db/generic/db-execute'
import { uploadImageToS3 } from '../../s3/upload-img'
import { ImageDao } from '../dao/image-dao'
import { UploadImageInput } from '../interface/upload-image-input'

class ImageService {
  static async deleteOne(id: string, logger: Logger): Promise<void> {
    return dbExecute(async (connection: Knex) => {
      return ImageDao.deleteOne(connection, id, logger)
    })
  }

  static async createOne(data: UploadImageInput, logger: Logger): Promise<ImageDto> {
    // Decode the base64-encoded image data into a buffer
    const imageBuffer = Buffer.from(data.imageData, 'base64')

    // Now you can upload the image buffer to S3
    const imageUrl = await uploadImageToS3(data.fileName, imageBuffer, data.mimeType)
    logger.info('image.service.createOne.uploaded')

    const toSave: ImageDto = {
      uid: uuidv4(),
      fileName: data.fileName,
      url: `${imageUrl}`,
    }

    await dbExecute(async (connection: Knex): Promise<void> => {
      await ImageDao.insertOne(connection, toSave, logger)

      logger.info('image.service.createOne.saved')
    })

    return toSave
  }
}

export { ImageService }
