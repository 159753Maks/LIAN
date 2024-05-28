import { mockAPIGatewayEvent, mockContext, reSeedData } from '../test-context'
import { createUserHandler } from 'src/user/handler/create-user-handler'
import { usersMock } from 'src/db/mock/users-mock'

describe('user update ', () => {
  beforeAll(async () => {
    await reSeedData()
  })

  it('200: updated from admin', async () => {
    const payload = {
      firstName: 'DeggetUpdated',
      lastName: 'BeaverUpdated',
      password: 'BEAVERS1',
      email: 'deggetUpdated@gmail.com',
    }

    const response: any = await createUserHandler(
      {
        ...mockAPIGatewayEvent,
        body: JSON.stringify(payload),
        pathParameters: { userId: usersMock[2].uid },
      },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body).toStrictEqual({})
  })
})
