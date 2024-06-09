import { mockAPIGatewayEvent, mockContext, reSeedData } from '../test-context'
import { singInHandler } from 'src/user/handler/sing-in-handler'

describe('login', () => {
  beforeAll(async () => {
    await reSeedData()
  })

  it('200: login', async () => {
    const response: any = await singInHandler(
      {
        ...mockAPIGatewayEvent,
        body: JSON.stringify({ email: 'john@gmail.com', password: 'test1111' }),
      },
      mockContext,
      (response) => response,
    )

    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body).toStrictEqual({ token: expect.any(String) })
  })
})
