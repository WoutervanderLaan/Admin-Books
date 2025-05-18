import { months } from '@/lib/types/Months'
import z from 'zod'

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
