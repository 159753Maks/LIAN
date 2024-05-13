import { mockAPIGatewayEvent, mockContext } from '../test-context'
import { createUserHandler } from 'src/user/handler/create-user-handler'

describe('user create ', () => {
  it('200: user from admin', async () => {
    const payload = {
      firstName: 'Degget',
      lastName: 'Beaver',
      password: 'BEAVERS1',
      email: 'degget@gmail.com',
    }

    const response: any = await createUserHandler(
      { ...mockAPIGatewayEvent, body: JSON.stringify(payload) },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body).toStrictEqual({})
  })
})
