import { S3Client } from '@aws-sdk/client-s3'

import { getConfig, isProd } from '../utill/get-config-util'

export const s3 = new S3Client({
  region: getConfig('AWS_REGION'),
  endpoint: getConfig('AWS_ENDPOINT'),
  credentials: {
    accessKeyId: getConfig('AWS_ACCESS_KEY_ID'),
    secretAccessKey: getConfig('AWS_SECRET_ACCESS_KEY'),
  },
  forcePathStyle: !isProd(),
})

// export const getBucketName = (): string => {
//   return 'product-bucket'
// }
