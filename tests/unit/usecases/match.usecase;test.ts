import { MatchUsecase } from '../../../src/app/usecases/match.usecase'
import { IMatchInput } from '../../../src/app/entities/match.entity'
import { BadRequestException } from '../../../src/config/interfaces/exceptions'

describe('MatchUsecase', () => {
  let usecase: MatchUsecase

  beforeAll(() => {
    usecase = new MatchUsecase()
  })

  const arraysIntersect = (from: number[], to: number[]) => from.some(item => to.includes(item))
  const arrayFill = (count: number) => Array.from({ length: count }, (_, i) => i + 1)

  test('should return Exception with invalid roll', async () => {
    const data: IMatchInput = {
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
      expect(e.message).toStrictEqual('Falha ao processar jogada')
      expect(e.errors).toHaveLength(1)
      expect(e.errors[0]).toHaveProperty('message')
      expect(e.errors[0].message).toStrictEqual('O jogador "Player 2" fez uma jogada incorreta.')
    }
  })

  test('should return Exception with invalid length array', async () => {
    const data: IMatchInput = {
      players: []
    }

    try {
      await usecase.getResultMatch(data)
    } catch (e: Error | any) {
      expect(e).toBeInstanceOf(BadRequestException)
      expect(e.message).toStrictEqual('Nenhum jogador encontrado')
    }
  })

  test('should validate payload output', async () => {
    const data: IMatchInput = {
      players: [
        {
          id: 1,
          name: 'Jogador 1',
          roll: '2d6'
        }, {
          id: 2,
          name: 'Jogador 2',
          roll: 'd5'
        }, {
          id: 3,
          name: 'Jogador 3',
          roll: '4d10'
        }
      ]
    }

    const payload = await usecase.getResultMatch(data)

    expect(payload).toHaveLength(3)
    expect(payload[0].matches).toHaveLength(2)
    expect(arraysIntersect(payload[0].matches, arrayFill(6))).toBe(true)

    expect(payload[1].matches).toHaveLength(1)
    expect(arraysIntersect(payload[1].matches, arrayFill(5))).toBe(true)

    expect(payload[2].matches).toHaveLength(4)
    expect(arraysIntersect(payload[2].matches, arrayFill(10))).toBe(true)

    expect(payload).toStrictEqual([
      {
        id: 1,
        name: 'Jogador 1',
        matches: expect.any(Array),
        total: expect.any(Number)
      },
      {
        id: 2,
        name: 'Jogador 2',
        matches: expect.any(Array),
        total: expect.any(Number)
      },
      {
        id: 3,
        name: 'Jogador 3',
        matches: expect.any(Array),
        total: expect.any(Number)
      }
    ])
  })
})