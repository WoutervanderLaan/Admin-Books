export const parseDate = (str: string | number) => {
  const string = String(str)

  const y = Number(string.slice(0, 4))
  const m = Number(string.slice(4, 6)) - 1
  const d = Number(string.slice(6, 8))
  return new Date(y, m, d)
}

export enum months {
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'augustus',
  'september',
  'october',
  'november',
  'december'
}
