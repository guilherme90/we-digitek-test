import { MatchUsecase } from '../../../src/app/usecases/match.usecase'
import { MatchInput } from '../../../src/app/entities/match.entity'
import { BadRequestException } from '../../../src/config/interfaces/exceptions'

describe('MatchUsecase', () => {
  let usecase: MatchUsecase

  beforeAll(() => {
    usecase = new MatchUsecase()
  })

  test('should return Exception with invalid roll', async () => {
    const data: MatchInput = {
      players: [
        {
          id: 1,
          name: 'Player 1',
          roll: '3d6'
        },
        {
          id: 2,
          name: 'Player 2',
          roll: null
        }
      ]
    }

    try {
      await usecase.getResultMatch(data)
    } catch (e: Error | any) {
      expect(e).toBeInstanceOf(BadRequestException)
      expect(e.message).toStrictEqual('O jogador Player 2 fez sua jogada incorreta.')
    }
  })
})