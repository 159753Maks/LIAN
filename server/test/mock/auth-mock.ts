import { generateToken } from 'src/auth/token.util'
import { usersMock } from 'src/db/mock/users-mock'

export const adminUserToken = generateToken(usersMock[0].uid, usersMock[0].role)
