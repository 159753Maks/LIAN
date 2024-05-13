import { UserService } from '../../user/service/user.service'
import { UserRoleEnum } from '../../user/util/user.role.enum'

export const usersMock = [
  {
    uid: '2d4d3f2e-c31c-0000-0000-000000000000',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@gmail.com',
    phone: '123456789',
    password: 'test1111',
    role: UserRoleEnum.ADMIN,
  },
  {
    uid: '2d4d3f2e-c31c-0000-0000-000000000001',
    firstName: 'Bruse',
    lastName: 'Vayne',
    email: 'bruse@gmail.com',
    phone: '123456789',
    password: 'test1111',
    role: UserRoleEnum.MANAGER,
  },
  {
    uid: '2d4d3f2e-c31c-0000-0000-000000000002',
    firstName: 'Registered',
    lastName: 'User',
    email: 'registered@gmail.com',
    phone: '123456789',
    password: 'test1111',
    role: UserRoleEnum.USER,
  },
]

export const usersInsert = async () => {
  const hashedUsers = []

  for (const user of usersMock) {
    hashedUsers.push({
      ...user,
      password: await UserService.hashPassword(user.password),
    })
  }
  return hashedUsers
}
