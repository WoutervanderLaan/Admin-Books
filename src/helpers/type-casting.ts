import { transactions } from '@prisma/client'

export const convertTransactionType = (transactions: transactions[]) =>
  transactions.map((t) => ({
    ...t,
    account_number: Number(t.account_number),
    mutation: Number(t.mutation),
    total_amount_after: Number(t.total_amount_after),
    total_amount_before: Number(t.total_amount_before)
  }))
