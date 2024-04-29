import winston, { Logger } from 'winston'

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`
  }),
)

// Create logger instance
const createAppLogger = (): Logger =>
  winston.createLogger({
    level: 'info', // Set logging level
    format: logFormat,
    transports: [
      new winston.transports.Console(), // Log to console
      // Add additional transports as needed, such as file or database
    ],
  })

export { createAppLogger }
