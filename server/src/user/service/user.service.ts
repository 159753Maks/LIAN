import bcrypt from 'bcrypt' // Імпорт модуля bcrypt для хешування паролів
import { Knex } from 'knex' // Імпорт Knex для роботи з базою даних
import { v4 as uuidv4 } from 'uuid' // Імпорт генератора унікальних ідентифікаторів
import { Logger } from 'winston' // Імпорт логгера для журналювання дій

import { generateToken } from '../../auth/token.utill' // Імпорт функції для генерації токенів
import { dbExecute } from '../../db/generic/db.execute' // Імпорт функції для виконання запитів до бази даних
import { ForbiddenError } from '../../errors/forbidden.error' // Імпорт класу помилки доступу
import { NotFoundError } from '../../errors/not.found.error' // Імпорт класу помилки "не знайдено"
import { UserDao } from '../dao/user.dao' // Імпорт DAO для взаємодії з таблицею користувачів
import { SingUpInput } from '../interface/sing.up.input' // Імпорт інтерфейсу для даних реєстрації користувача
import { UserDto } from '../interface/user.dto' // Імпорт інтерфейсу для об'єкта користувача

class UserService {
  static async findOne(id: string, logger: Logger): Promise<UserDto | undefined> {
    logger.info('user.service.findOne.start') // Логування початку операції
    return dbExecute(async (connection: Knex): Promise<UserDto | undefined> => {
      return UserDao.findOne(connection, id, logger) // Виклик методу для пошуку користувача за ID
    })
  }

  static async findOneByEmail(email: string, logger: Logger): Promise<UserDto | undefined> {
    logger.info('user.service.findOneByEmail.start') // Логування початку операції
    return dbExecute(async (connection: Knex): Promise<UserDto | undefined> => {
      return UserDao.findOneByEmail(connection, email, logger) // Виклик методу для пошуку користувача за email
    })
  }

  static async createUser(data: SingUpInput, logger: Logger): Promise<void> {
    logger.info('user.service.createUser.start') // Логування початку операції
    const password = await this.hashPassword(data.password) // Хешування паролю

    const saveObject = { ...data, uid: uuidv4(), password } // Підготовка об'єкту для збереження в базу
    return dbExecute(async (connection: Knex): Promise<void> => {
      return UserDao.insertOne(connection, saveObject, logger) // Виклик методу для створення користувача
    })
  }

  static async updateUser(data: UserDto, logger: Logger): Promise<UserDto> {
    logger.info('user.service.updateUser.start') // Логування початку операції
    await dbExecute(async (connection: Knex): Promise<void> => {
      return UserDao.updateOne(connection, data, logger) // Виклик методу для оновлення користувача
    })

    return data
  }

  static async singIn(email: string, password: string, logger: Logger): Promise<string> {
    logger.info('user.service.singIn.start') // Логування початку операції
    const user = await dbExecute(async (connection: Knex): Promise<UserDto | undefined> => {
      return UserDao.findOneByEmail(connection, email, logger) // Пошук
    })

    if (!user) {
      logger.warn('user.service.singIn.error.not-found')
      throw new ForbiddenError('invalid email or password')
    }

    const isCorrect = await bcrypt.compare(user.password, password)

    if (!isCorrect) {
      logger.warn('user.service.singIn.error.not-correct')
      throw new ForbiddenError('invalid email or password')
    }

    logger.info('user.service.singIn.end')
    return generateToken(user.uid)
  }

  public static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10 // Кількість раундів для генерації солі

    // Генерація солі
    const salt = await bcrypt.genSalt(saltRounds)

    // Хешування паролю з використанням солі
    const hash = await bcrypt.hash(password, salt)

    return hash
  }
}

export { UserService }
