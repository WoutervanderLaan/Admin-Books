export const months = [
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
] as const

export type TMonths = (typeof months)[number]
