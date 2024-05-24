import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import { AllowedMimeEnum } from '../../s3/allowed-mime-enum'
import { uploadImageToS3 } from '../../s3/upload-img'
import { coolingMock } from './img/cooling-img-mock'
import { createBucket } from './s3'
import { staticImgMock } from './img/static-img-mock'

export function getFileDetails(filename: string) {
  const extension = path.extname(filename).toLowerCase()
  let mimeType

  switch (extension) {
    case '.jpg':
      mimeType = AllowedMimeEnum.JPG
      break
    case '.jpeg':
      mimeType = AllowedMimeEnum.JPEG
      break
    case '.png':
      mimeType = AllowedMimeEnum.PNG
      break
    default:
      throw new Error('Unsupported file type')
  }

  return {
    filename: path.basename(filename, extension),
    mimeType,
  }
}

type imgSeed = {
  uid: string
  url: string
  fileName: string
}

type imgProductSeed = {
  uid: string
  imageUid: string
  productUid: string
}

const getAllFromCategoryImg = async (
  dirName: string,
  imgItems: Array<{
    uid: string
    fileName: string
    productUid: string
  }>,
): Promise<{ img: Array<imgSeed>; imgProd: Array<imgProductSeed> }> => {
  const imgDir = path.join(__dirname, 'img', dirName)

  const img: Array<imgSeed> = []
  const imgProd: Array<imgProductSeed> = []

  for (const item of imgItems) {
    const filePath = path.join(imgDir, item.fileName)
    const fileBuffer = fs.readFileSync(filePath)
    const { filename, mimeType } = getFileDetails(item.fileName)
    const key = `${filename}`

    // Upload the image to S3 and get the URL
    const url = await uploadImageToS3(key, fileBuffer, mimeType)

    img.push({
      uid: item.uid,
      fileName: item.fileName,
      url,
    })

    imgProd.push({
      uid: uuidv4(),
      productUid: item.productUid,
      imageUid: item.uid,
    })
  }

  return { img, imgProd }
}

export const getImgMock = async (): Promise<{
  img: Array<imgSeed>
  imgProd: Array<imgProductSeed>
}> => {
  await createBucket('product')
  const img = []
  const imgProd = []

  const coolingUploadResult = await getAllFromCategoryImg('cooling', coolingMock)
  img.push(...coolingUploadResult.img)
  imgProd.push(...coolingUploadResult.imgProd)

  const staticUploadResult = await getAllFromCategoryImg('static', staticImgMock)
  img.push(...staticUploadResult.img)

  return { img, imgProd }
}
