import bcrypt from 'bcrypt'
import { Knex } from 'knex'
import { v4 as uuidv4 } from 'uuid'
import { Logger } from 'winston'

import { generateToken } from '../../auth/token.utill'
import { dbExecute } from '../../db/generic/db.execute'
import { ForbiddenError } from '../../errors/forbidden.error'
import { NotFoundError } from '../../errors/not.found.error'
import { UserDao } from '../dao/user.dao'
import { SingUpInput } from '../interface/sing.up.input'
import { UserDto } from '../interface/user.dto'

class UserService {
  static async findOne(id: string, logger: Logger): Promise<UserDto | undefined> {
    logger.info('user.service.findOne.start')
    return dbExecute(async (connection: Knex): Promise<UserDto | undefined> => {
      return UserDao.findOne(connection, id, logger)
    })
  }

  static async findOneByEmail(email: string, logger: Logger): Promise<UserDto | undefined> {
    logger.info('user.service.findOneByEmail.start')
    return dbExecute(async (connection: Knex): Promise<UserDto | undefined> => {
      return UserDao.findOneByEmail(connection, email, logger)
    })
  }

  static async createUser(data: SingUpInput, logger: Logger): Promise<void> {
    logger.info('user.service.createUser.start')
    const password = await this.hashPassword(data.password)

    const saveObject = { ...data, uid: uuidv4(), password }
    return dbExecute(async (connection: Knex): Promise<void> => {
      return UserDao.insertOne(connection, saveObject, logger)
    })
  }

  static async updateUser(data: UserDto, logger: Logger): Promise<UserDto> {
    logger.info('user.service.updateUser.start')
    await dbExecute(async (connection: Knex): Promise<void> => {
      return UserDao.updateOne(connection, data, logger)
    })

    return data
  }

  static async singIn(email: string, password: string, logger: Logger): Promise<string> {
    logger.info('user.service.singIn.start')
    const user = await dbExecute(async (connection: Knex): Promise<UserDto | undefined> => {
      return UserDao.findOneByEmail(connection, email, logger)
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
    const saltRounds = 10 // Number of salt rounds (cost factor)

    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds)

    // Hash the password using the salt
    const hash = await bcrypt.hash(password, salt)

    return hash
  }
}

export { UserService }
