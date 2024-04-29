import { Knex, knex } from 'knex'
import { Logger } from 'winston'

import { UserDto } from '../interface/user.dto'

class UserDao {
  static async findOne(
    queryBuilder: Knex,
    uid: string,
    logger: Logger,
  ): Promise<UserDto | undefined> {
    logger.info('user.dao.findOne.start')
    return queryBuilder<UserDto>('user').select('*').where({ uid }).first()
  }

  static async findOneByEmail(
    queryBuilder: Knex,
    email: string,
    logger: Logger,
  ): Promise<UserDto | undefined> {
    logger.info('user.dao.findOneByEmail.start')
    return queryBuilder<UserDto>('user')
      .select('*')
      .where({
        email,
      })
      .first()
  }

  static async insertOne(queryBuilder: Knex, user: UserDto, logger: Logger): Promise<void> {
    logger.info('user.dao.insertOne.start')
    await queryBuilder('user').insert(user)

    logger.info('user.dao.insertOne.end')
    return
  }

  static async updateOne(queryBuilder: Knex, user: UserDto, logger: Logger): Promise<void> {
    logger.info('user.dao.updateOne.start')
    await queryBuilder('user').update(user).where({ uid: user.uid })

    logger.info('user.dao.updateOne.end')
    return
  }
}

export { UserDao }
