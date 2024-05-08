import winston, { Logger } from 'winston'

// Визначаємо формат логів
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Додаємо до логів час форматування у вигляді 'YYYY-MM-DD HH:mm:ss'
  winston.format.printf(({ level, message, timestamp }) => { // Використовуємо printf для форматування логів
    return `${timestamp} ${level}: ${message}` // Форматування логів у вигляді 'час:хвилини:секунди дата.місяць.рік рівень: повідомлення'
  }),
)

// Функція для створення логгера
const createAppLogger = (): Logger =>
  winston.createLogger({
    level: 'info', // Встановлюємо рівень логів на 'info'
    format: logFormat, // Встановлюємо формат логів
    transports: [
      new winston.transports.Console(), // Записуємо логи у консоль
      // Додамо додаткові транспорти, якщо потрібно, наприклад, у файл або базу даних
    ],
  })

export { createAppLogger }
