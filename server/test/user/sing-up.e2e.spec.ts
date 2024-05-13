import { mockAPIGatewayEvent, mockContext } from '../test-context'
import { singUpHandler } from 'src/user/handler/sing-up-handler'

describe('register', () => {
  it('200: register', async () => {
    const payload = {
      firstName: 'norbert',
      lastName: 'Beaver',
      password: 'BEAVERS1',
      email: 'norbert@gmail.com',
    }

    const response: any = await singUpHandler(
      {
        ...mockAPIGatewayEvent,
        body: JSON.stringify(payload),
      },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body).toStrictEqual({})
  })
})
