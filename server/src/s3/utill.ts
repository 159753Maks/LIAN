import * as AWS from 'aws-sdk'
import { PutObjectRequest } from 'aws-sdk/clients/s3'

// Initialize the S3 client
const s3 = new AWS.S3({
  endpoint: 'http://localhost:4566', // LocalStack endpoint
  s3ForcePathStyle: true, // Necessary for LocalStack
})

// Function to upload an image to S3 and get its URL
export async function uploadImageToS3(
  bucketName: string,
  key: string,
  image: Buffer,
  contentType: string,
): Promise<string> {
  // Prepare the parameters for uploading the image
  const params: PutObjectRequest = {
    Bucket: bucketName,
    Key: key,
    Body: image,
    ContentType: contentType,
  }

  try {
    // Upload the image to S3
    await s3.upload(params).promise()

    // Get the URL for the uploaded image
    const url = s3.getSignedUrl('getObject', { Bucket: bucketName, Key: key, Expires: 3600 })

    // Return the URL
    return url
  } catch (error) {
    // Handle errors
    console.error('Error uploading image to S3:', error)
    throw error
  }
}

// Example usage:
// const bucketName = 'your-bucket-name';
// const key = 'image.jpg'; // Object key for the uploaded image
// const imageBuffer = Buffer.from('your-image-data', 'utf-8'); // Convert your image data to a buffer
// const contentType = 'image/jpeg'; // Content type of the image
//
// uploadImageToS3(bucketName, key, imageBuffer, contentType)
//   .then(url => console.log('Uploaded image URL:', url))
//   .catch(error => console.error('Error:', error));
