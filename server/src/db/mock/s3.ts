import { CreateBucketCommand } from '@aws-sdk/client-s3'
import { s3 } from '../../s3/s3-init'

// Function to create a bucket
export async function createBucket(bucketName: string) {
  try {
    await s3.send(new CreateBucketCommand({ Bucket: bucketName }))
    console.log(`Bucket "${bucketName}" created successfully.`)
  } catch (error) {
    console.error('Error creating bucket:', error)
  }
}
