export const PLAY_FORMAT_REGEX = /^([0-9]{0,1})[d{1}]([0-9]{1,2})$/g

export function checkPlayFormat(value: string): boolean {
  return new RegExp(PLAY_FORMAT_REGEX).test(value)
}

export function randomMatch(start: number, value: number): number {
  const min = Math.ceil(start)
  const max = Math.floor(value)

  const number = Math.floor(Math.random() * max + min)
  if (number > 0) {
    return number
  }

  return 1
}
