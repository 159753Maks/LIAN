import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getConfig } from '../utill/get.config.util'

import { s3 } from './s3-init'
import { AllowedMimeEnum } from './allowed-mime-enum'

// Function to generate file extension based on MIME type
function getFileExtensionFromContentType(contentType: string): string {
  switch (contentType) {
    case AllowedMimeEnum.JPEG:
      return 'jpeg'
    case AllowedMimeEnum.JPG:
      return 'jpg'
    case AllowedMimeEnum.PNG:
      return 'png'
    // Add more cases as needed for other MIME types
    default:
      return 'dat' // Default extension if MIME type is not recognized
  }
}

export async function uploadImageToS3(
  key: string,
  image: Buffer,
  contentType: string,
): Promise<string> {
  const bucketName = 'product'

  // Prepare the parameters for uploading the image
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: image,
    ContentType: contentType,
  }

  try {
    await s3.send(new PutObjectCommand(params))

    // Generate the URL based on the LocalStack endpoint and the bucket name
    const url = `${getConfig('AWS_ENDPOINT')}/${bucketName}/${key}`

    return url
  } catch (error) {
    console.error('Error uploading image to S3:', error)
    throw error
  }
}
