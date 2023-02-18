export interface MatchInput {
  players: Array<{
    id: number
    name: string
    roll: string
  }>
}

export interface MatchOutput {
  id: number
  name: string
  matches: number[]
  total: number
}
