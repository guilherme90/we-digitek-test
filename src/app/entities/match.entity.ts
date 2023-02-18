export interface IMatchInput {
  players: Array<{
    id: number
    name: string
    roll: string
  }>
}

export interface IMatchOutput {
  id: number
  name: string
  matches: number[]
  total: number
}
