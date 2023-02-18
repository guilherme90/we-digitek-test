import { Injectable } from '@decorators/di'
import { IMatchInput, IMatchOutput } from '@/app/entities/match.entity'
import { checkPlayFormat, randomMatch } from '@/utils'
import { BadRequestException } from '@/config/interfaces/exceptions'

interface IMatchItem {
  id: number
  name: string
  roll: string
  rollItems: string[]
  match?: {
    quantity: number | null
    limit: number
    result?: {
      matches: number[]
      total: number
    }
  }
}

@Injectable()
export class MatchUsecase {
  private async translateRolls(players: Map<number, any>): Promise<Map<number, IMatchItem>> {
    if (!players.size) {
      throw new BadRequestException('Nenhum jogador encontrado')
    }

    const result = new Map<number, IMatchItem>()

    for (const [_, player] of players) {
      player.rollItems.reduce((_, item, index) => {
        if (null === item) {
          const { rollItems } = player
          const thridIndex = rollItems[index + 1]
          const fourthIndex = rollItems[index + 2]

          result.set(player.id, {
            ...player,
            match: {
              quantity: rollItems[index - 1] ? Number(rollItems[index - 1]) : 1,
              limit: fourthIndex ? Number(`${thridIndex}${fourthIndex}`) : Number(thridIndex)
            }
          })
        }
      }, {} as Map<number, IMatchItem>)
    }

    return result
  }

  private async randomMatches(players: Map<number, IMatchItem>): Promise<any> {
    const result: IMatchOutput[] = []

    for (const [_, player] of players) {
      const { quantity, limit } = player.match

      const countMatches = Array.from({ length: quantity }, (_, index) =>
        randomMatch(quantity > 1 ? index : 1, limit)
      )
      result.push({
        id: player.id,
        name: player.name,
        matches: countMatches,
        total: countMatches.reduce((a, b) => a + b, 0 as number)
      })
    }

    return result
  }

  async getResultMatch(data: IMatchInput): Promise<IMatchOutput[]> {
    const players = new Map<number, IMatchItem>()

    data.players.reduce((acc, item) => {
      if (!checkPlayFormat(item.roll)) {
        throw new BadRequestException('Falha ao processar jogada', [
          {
            message: `O jogador "${item.name}" fez uma jogada incorreta.`
          }
        ])
      }

      players.set(item.id, {
        id: item.id,
        name: item.name,
        roll: item.roll,
        rollItems: item.roll.split('').map((roll) => (roll === 'd' ? null : roll))
      })
      return acc
    }, {} as Map<number, IMatchItem>)

    const result = await this.translateRolls(players)
    return await this.randomMatches(result)
  }
}
