import { APIGatewayProxyEvent } from 'aws-lambda'
import Joi from 'joi'
import { AllowedMimeEnum } from 'src/s3/allowed-mime-enum'
import { UploadImageInput } from '../interface/UploadImageInput'

// Define the Joi schema for image data validation
const imageSchema = Joi.object({
  fileName: Joi.string().required(),
  mimeType: Joi.string()
    .valid(...Object.values(AllowedMimeEnum))
    .required(),
  imageData: Joi.string().required().base64(), // Validate as a required base64-encoded string
})

// Function to validate image input from API Gateway event
export const validateImageInput = (event: APIGatewayProxyEvent): UploadImageInput => {
  // Parse the event body to extract the image data
  const body = JSON.parse(event.body || '{}')

  // Validate the image data against the Joi schema
  const { error, value } = imageSchema.validate(body)

  // If validation fails, throw an error with details
  if (error) {
    throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`)
  }

  // If validation passes, return the base64-encoded image data
  return value
}
