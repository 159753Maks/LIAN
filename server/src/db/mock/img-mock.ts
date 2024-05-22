import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import { AllowedMimeEnum } from '../../s3/allowed-mime-enum'
import { uploadImageToS3 } from '../../s3/upload-img'
import { coolingMock } from '../mock/img/cooling-img-mock'
import { createBucket } from './s3'

const motherBoardFileNames = [
  'asus-prime-b660-plus-d4-s1700-intel-b660(1).png',
  'asus-prime-b660-plus-d4-s1700-intel-b660(2).png',
  'asus-prime-b660-plus-d4-s1700-intel-b660(3).png',
  'asus-prime-b660-plus-d4-s1700-intel-b660(4).png',
  'asus-rog-strix-b650-a-gaming-wifi(1).jpg',
  'asus-rog-strix-b650-a-gaming-wifi(2).jpg',
  'asus-rog-strix-b650-a-gaming-wifi(3).jpg',
  'asus-rog-strix-b650-a-gaming-wifi(4).jpg',
  'gigabyte-b760-gaming-x-ax-ddr4-s1700(1).png',
  'gigabyte-b760-gaming-x-ax-ddr4-s1700(2).png',
  'gigabyte-b760-gaming-x-ax-ddr4-s1700(3).png',
  'gigabyte-b760-gaming-x-ax-ddr4-s1700(4).png',
  'msi-mag-z790-tomahawk-max-wifi-s1700(1).png',
  'msi-mag-z790-tomahawk-max-wifi-s1700(2).png',
  'msi-mag-z790-tomahawk-max-wifi-s1700(3).png',
  'msi-mag-z790-tomahawk-max-wifi-s1700(4).png',
  'msi-pro-b760m-p-ddr4-s1700(1).png',
  'msi-pro-b760m-p-ddr4-s1700(2).png',
  'msi-pro-b760m-p-ddr4-s1700(3).png',
  'msi-pro-b760m-p-ddr4-s1700(4).png',
]
const memoryFileNames = [
  'kingston-kc3000-3d-nand-tlc-1tb-m2-2280(1).jpg',
  'kingston-kc3000-3d-nand-tlc-1tb-m2-2280(2).jpg',
  'kingston-kc3000-3d-nand-tlc-1tb-m2-2280(3).jpg',
  'kingston-nv2-3d-nand-1tb-m2-2280(1).jpg',
  'kingston-nv2-3d-nand-1tb-m2-2280(2).jpg',
  'kingston-nv2-3d-nand-1tb-m2-2280(3).jpg',
  'samsung-970-evo-plus-v-nand-mlc-1tb-m2(1).jpg',
  'samsung-970-evo-plus-v-nand-mlc-1tb-m2(2).jpg',
  'samsung-970-evo-plus-v-nand-mlc-1tb-m2(3).jpg',
  'seagate-barracuda-2tb-128mb-5400rpm(1).jpg',
  'seagate-barracuda-2tb-128mb-5400rpm(2).jpg',
  'seagate-barracuda-2tb-128mb-5400rpm(3).jpg',
  'toshiba-p300-1tb-64mb-7200rpm(1).png',
  'toshiba-p300-1tb-64mb-7200rpm(2).png',
  'toshiba-p300-1tb-64mb-7200rpm(3).png',
  'western-digital-caviar-blue-1tb-64mb-7200rpm(1).png',
]
const powerFileNames = [
  'asus-tuf-gaming-750w(1).png',
  'asus-tuf-gaming-750w(2).png',
  'asus-tuf-gaming-750w(3).png',
  'asus-tuf-gaming-750w(4).png',
  'corsair-cv650-650w(1).png',
  'corsair-cv650-650w(2).png',
  'corsair-cv650-650w(3).png',
  'corsair-rm1000x-1000w(1).jpg',
  'corsair-rm1000x-1000w(2).jpg',
  'corsair-rm1000x-1000w(3).jpg',
  'msi-mpg-850w(1).jpg',
  'msi-mpg-850w(2).jpg',
  'msi-mpg-850w(3).jpg',
  'msi-mpg-850w(4).jpg',
  'xpg-kyber-750w-kyber(1).png',
  'xpg-kyber-750w-kyber(2).png',
  'xpg-kyber-750w-kyber(3).png',
]
const processorsFileNames = [
  'amd-ryzen-5-3600-3642ghz-32mb-sam4-box(1).png',
  'amd-ryzen-5-3600-3642ghz-32mb-sam4-box(2).jpg',
  'amd-ryzen-5-3600-3642ghz-32mb-sam4-box(3).jpg',
  'amd-ryzen-7-7800x3d-4250ghz-96mb-sam5-box(1).jpg',
  'amd-ryzen-7-7800x3d-4250ghz-96mb-sam5-box(2).png',
  'intel-core-i5-11400f-26ghz-12mb-s1200-tray.png',
  'intel-core-i5-12400f-2544ghz-18mb-s1700-box.png',
  'intel-pentium-gold-g6405-41ghz-4mb-s1200-box.png',
]
const ramFileNames = [
  'crucial-ddr4-8gb-3200mhz(1).png',
  'geil-ddr4-8gb-2400mhz(1).jpg',
  'geil-ddr4-8gb-2400mhz(2).jpg',
  'goodram-ddr4-16gb-2x8gb-3200mhz(1).png',
  'goodram-ddr4-16gb-2x8gb-3200mhz(2).png',
  'goodram-ddr4-16gb-2x8gb-3200mhz(3).png',
  'gskill-ddr4-16gb-2x8gb-3200mhz(1).png',
  'gskill-ddr4-16gb-2x8gb-3200mhz(2).png',
  'gskill-ddr4-16gb-2x8gb-3200mhz(3).png',
  'kingston-ddr5-32gb-2x16gb-6000mhz(1).jpg',
  'kingston-ddr5-32gb-2x16gb-6000mhz(2).jpg',
  'kingston-ddr5-32gb-2x16gb-6000mhz(3).jpg',
  'kingston-ddr5-32gb-2x16gb-6000mhz(4).jpg',
]
// const staticFileNames = [
//   '01.jpg',
//   '02.jpg',
//   '03.jpg',
//   '04.jpg',
//   'bcc_slider_1.jpg',
//   'Clip1.jpg',
//   'Clip2.jpg',
//   'Clip3.jpg',
//   'grid 1.png',
//   'grid 2.png',
//   'grid 3.png',
//   'grid 4.png',
//   'grid 5.png',
//   'grid 6.png',
//   'grid 7.png',
//   'grid 8.png',
//   'grid 9.png',
//   'grid 10.png',
//   'worker1.jpg',
//   'worker2.jpg',
//   'worker3.jpg',
// ]
const videoCardsFileNames = [
  'asus-dual-radeon-rx-6600-v2-8192mb(1).jpg',
  'asus-dual-radeon-rx-6600-v2-8192mb(2).jpg',
  'asus-dual-radeon-rx-6600-v2-8192mb(3).jpg',
  'asus-dual-radeon-rx-6600-v2-8192mb(4).jpg',
  'gigabyte-geforce-rtx-4060-ti-windforce-oc-8192mb(1).png',
  'gigabyte-geforce-rtx-4060-ti-windforce-oc-8192mb(2).png',
  'gigabyte-geforce-rtx-4060-ti-windforce-oc-8192mb(3).png',
  'gigabyte-geforce-rtx-4060-ti-windforce-oc-8192mb(4).png',
  'gigabyte-radeon-rx-7900-xt-gaming-oc-20480mb(1).png',
  'gigabyte-radeon-rx-7900-xt-gaming-oc-20480mb(2).png',
  'gigabyte-radeon-rx-7900-xt-gaming-oc-20480mb(3).png',
  'gigabyte-radeon-rx-7900-xt-gaming-oc-20480mb(4).png',
  'msi-geforce-rtx-4060-ventus-2x-black-oc-8192mb(1).png',
  'msi-geforce-rtx-4060-ventus-2x-black-oc-8192mb(2).png',
  'msi-geforce-rtx-4060-ventus-2x-black-oc-8192mb(3).png',
  'msi-geforce-rtx-4060-ventus-2x-black-oc-8192mb(4).png',
  'sapphire-radeon-rx-550-pulse-4096mb(1).jpg',
  'sapphire-radeon-rx-550-pulse-4096mb(2).jpg',
  'sapphire-radeon-rx-550-pulse-4096mb(3).jpg',
]

export function getFileDetails(filename: string) {
  const extension = path.extname(filename).toLowerCase()
  let mimeType

  switch (extension) {
    case '.jpg':
      mimeType = AllowedMimeEnum.JPG
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
  categoryItems: Array<{
    uid: string
    fileName: string
    productUid: string
  }>,
): Promise<{ img: Array<imgSeed>; imgProd: Array<imgProductSeed> }> => {
  const imgDir = path.join(__dirname, 'img', dirName)

  const img: Array<imgSeed> = []
  const imgProd: Array<imgProductSeed> = []

  for (const item of categoryItems) {
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

  return { img, imgProd }
}
