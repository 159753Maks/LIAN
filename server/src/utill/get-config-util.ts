import dotenv from 'dotenv'
dotenv.config()

export function getConfig(paramName: string, defaultValue?: string): string {
  const paramValue = process.env[paramName]
  if (paramValue) {
    return paramValue
  }

  return defaultValue || 'defaultValue'
}

export const isProd = (): boolean => false
