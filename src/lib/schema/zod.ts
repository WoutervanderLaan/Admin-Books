import z from 'zod'

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

export type TMonths =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'augustus'
  | 'september'
  | 'october'
  | 'november'
  | 'december'

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password is too short' })
    .max(60, { message: 'Password is too long' })
})

export const searchSchema = z.object({
  search: z
    .string()
    .min(1)
    .max(60, { message: 'Input is too long' })
    .optional(),
  month: z.enum(months).optional()
})

export type TPasswordForm = z.infer<typeof passwordSchema>
export type TSearchForm = z.infer<typeof searchSchema>
