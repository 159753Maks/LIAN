import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from 'src/s3/s3-init'

// Function to delete an image from S3
export async function deleteImageFromS3(key: string): Promise<void> {
  const bucketName = 'product'

  // Prepare the parameters for deleting the image
  const params = {
    Bucket: bucketName,
    Key: key,
  }

  try {
    // Delete the image from S3
    await s3.send(new DeleteObjectCommand(params))
  } catch (error) {
    // Handle errors
    console.error('Error deleting image from S3:', error)
    throw error
  }
}
