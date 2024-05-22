import fs from 'fs'
import path from 'path'
import { uploadImageToS3 } from 'src/s3/upload-img'
import { deleteImageFromS3 } from 'src/s3/delete-img'
import { createBucket } from 'src/db/mock/s3'
import { mockAPIGatewayEvent, mockContext } from '../test-context'
import { uploadImageHandler } from 'src/images/handler/upload-img-handler'
import { getFileDetails } from 'src/db/mock/img-mock'

describe('img handlers', () => {
  it('200: upload', async () => {
    const file = 'amd-ryzen-5-3600-3642ghz-32mb-sam4-box.jpg'
    const filePath = path.join(__dirname, file)

    const { filename, mimeType } = getFileDetails(file)

    const base64 = fs.readFileSync(filePath).toString('base64')
    const payload = {
      fileName: filename,
      mimeType: mimeType,
      imageData: base64,
    }

    const response: any = await uploadImageHandler(
      { ...mockAPIGatewayEvent, body: JSON.stringify(payload) },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    console.log(body)
    expect(body).toStrictEqual({
      uid: expect.any(String),
      fileName: expect.any(String),
      url: expect.any(String),
    })
  })

  it.skip('should upload an JPG to S3 and return the URL', async () => {
    const fileName = 'amd-ryzen-5-3600-3642ghz-32mb-sam4-box.jpg'

    // Read the image file as a buffer
    const imagePath = path.join(__dirname, fileName)
    const image = fs.readFileSync(imagePath)

    const contentType = 'image/jpg'

    // Call the uploadImageToS3 function
    const url = await uploadImageToS3(fileName, image, contentType)

    // Assert that the URL is not empty
    expect(url).toBeTruthy()
    // You might add more assertions based on your requirements

    // Assert that deleteImageFromS3 does not throw an error
    expect(async () => {
      await deleteImageFromS3(fileName)
    }).not.toThrow()
  })

  it('should upload logo', async () => {
    const fileName = 'lian_logo.png'
    // Read the image file as a buffer
    const imagePath = path.join(__dirname, fileName)
    const image = fs.readFileSync(imagePath)

    const contentType = 'image/png'

    // Call the uploadImageToS3 function
    const url = await uploadImageToS3(fileName, image, contentType)
    console.log(url)

    // Assert that the URL is not empty
    expect(url).toBeTruthy()
    // You might add more assertions based on your requirements

    // Assert that deleteImageFromS3 does not throw an error
    // expect(async () => {
    //   await deleteImageFromS3(fileName)
    // }).not.toThrow()
  })

  it.skip('create bucket', async () => {
    expect(async () => {
      await createBucket('product')
    }).not.toThrow()
  })
})
