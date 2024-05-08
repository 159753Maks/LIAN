// Імпорт необхідних модулів
import { Knex, knex } from 'knex'
import { Logger } from 'winston'

// Імпорт інтерфейсу для об'єкта користувача
import { UserDto } from '../interface/user.dto'

// Клас, який представляє об'єкт доступу до даних користувачів
class UserDao {
  // Метод для знаходження користувача за унікальним ідентифікатором
  static async findOne(
    queryBuilder: Knex, // Об'єкт для побудови та виконання SQL-запитів
    uid: string, // Унікальний ідентифікатор користувача
    logger: Logger, // Логгер для ведення журналу подій
  ): Promise<UserDto | undefined> {
    logger.info('user.dao.findOne.start') // Інформація в журналі про початок операції
    return queryBuilder<UserDto>('user').select('*').where({ uid }).first() // Виконання запиту до бази даних для пошуку користувача за UID
  }

  // Метод для знаходження користувача за електронною поштою
  static async findOneByEmail(
    queryBuilder: Knex, // Об'єкт для побудови та виконання SQL-запитів
    email: string, // Електронна пошта користувача
    logger: Logger, // Логгер для ведення журналу подій
  ): Promise<UserDto | undefined> {
    logger.info('user.dao.findOneByEmail.start') // Інформація в журналі про початок операції
    return queryBuilder<UserDto>('user') // Виконання запиту до бази даних для пошуку користувача за електронною поштою
      .select('*')
      .where({
        email,
      })
      .first()
  }

  // Метод для вставки нового користувача в базу даних
  static async insertOne(queryBuilder: Knex, user: UserDto, logger: Logger): Promise<void> {
    logger.info('user.dao.insertOne.start') // Інформація в журналі про початок операції
    await queryBuilder('user').insert(user) // Виконання запиту до бази даних для вставки нового користувача

    logger.info('user.dao.insertOne.end') // Інформація в журналі про завершення операції
  }

  // Метод для оновлення інформації про користувача в базі даних
  static async updateOne(queryBuilder: Knex, user: UserDto, logger: Logger): Promise<void> {
    logger.info('user.dao.updateOne.start') // Інформація в журналі про початок операції
    await queryBuilder('user').update(user).where({ uid: user.uid })  // Виконання запиту до бази даних для оновлення інформації про користувача

    logger.info('user.dao.updateOne.end') // Інформація в журналі про завершення операції
    return
  }
}

export { UserDao } // Експорт класу UserDao
